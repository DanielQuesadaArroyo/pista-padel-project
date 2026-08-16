ALTER TABLE public.bookings DROP CONSTRAINT bookings_status_check;

ALTER TABLE public.bookings
  ADD CONSTRAINT bookings_status_check
  CHECK (status IN ('active', 'completed', 'cancelled_by_user', 'cancelled_by_admin', 'maintenance'));

CREATE OR REPLACE FUNCTION public.complete_expired_bookings() RETURNS integer
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public', 'pg_temp'
AS $$
DECLARE
  v_completed_count integer;
  v_local_now timestamp := now() AT TIME ZONE 'Europe/Madrid';
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Usuario no autenticado';
  END IF;

  UPDATE public.bookings AS b
  SET status = 'completed'
  FROM public.slots AS s
  WHERE b.slot_id = s.id
    AND b.status = 'active'
    AND b.booking_date + s.end_time + interval '1 minute' <= v_local_now;

  GET DIAGNOSTICS v_completed_count = ROW_COUNT;
  RETURN v_completed_count;
END;
$$;

REVOKE ALL ON FUNCTION public.complete_expired_bookings() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.complete_expired_bookings() FROM anon;
GRANT EXECUTE ON FUNCTION public.complete_expired_bookings() TO authenticated;
GRANT EXECUTE ON FUNCTION public.complete_expired_bookings() TO service_role;

CREATE OR REPLACE FUNCTION public.create_booking(p_slot_id bigint, p_booking_date date) RETURNS uuid
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public', 'pg_temp'
AS $$
DECLARE
  v_booking_id uuid;
  v_user_id uuid := auth.uid();
  v_local_now timestamp := now() AT TIME ZONE 'Europe/Madrid';
  v_current_date date;
  v_first_booking_date date;
  v_summer_start date;
  v_summer_end date;
  v_current_season varchar(20);
  v_requested_season varchar(20);
  v_rollover_time time;
  v_slot_end_time time;
  v_active_count integer;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Usuario no autenticado';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = v_user_id AND active = true
  ) THEN
    RAISE EXCEPTION 'Usuario desactivado';
  END IF;

  SELECT summer_start, summer_end
  INTO v_summer_start, v_summer_end
  FROM public.settings;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'No existe configuración de temporadas';
  END IF;

  v_current_date := v_local_now::date;
  v_current_season := CASE
    WHEN v_current_date BETWEEN v_summer_start AND v_summer_end THEN 'summer'
    ELSE 'winter'
  END;
  v_rollover_time := CASE WHEN v_current_season = 'summer' THEN time '23:01' ELSE time '22:01' END;
  v_first_booking_date := v_current_date + CASE WHEN v_local_now::time >= v_rollover_time THEN 1 ELSE 0 END;

  IF p_booking_date NOT BETWEEN v_first_booking_date AND v_first_booking_date + 6 THEN
    RAISE EXCEPTION 'La fecha no está dentro de la ventana de reserva';
  END IF;

  v_requested_season := CASE
    WHEN p_booking_date BETWEEN v_summer_start AND v_summer_end THEN 'summer'
    ELSE 'winter'
  END;

  SELECT end_time INTO v_slot_end_time
  FROM public.slots
  WHERE id = p_slot_id AND season = v_requested_season;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'La franja no corresponde a la temporada de la fecha seleccionada';
  END IF;

  IF p_booking_date + v_slot_end_time + interval '1 minute' <= v_local_now THEN
    RAISE EXCEPTION 'La franja horaria ya ha expirado';
  END IF;

  PERFORM pg_advisory_xact_lock(hashtext(p_booking_date::text || '-' || p_slot_id::text));

  IF EXISTS (
    SELECT 1 FROM public.bookings
    WHERE booking_date = p_booking_date
      AND slot_id = p_slot_id
      AND status = 'maintenance'
  ) THEN
    RAISE EXCEPTION 'La franja no está disponible por mantenimiento';
  END IF;

  IF EXISTS (
    SELECT 1 FROM public.bookings AS b
    JOIN public.slots AS s ON s.id = b.slot_id
    WHERE b.booking_date = p_booking_date
      AND b.slot_id = p_slot_id
      AND b.status = 'active'
      AND b.booking_date + s.end_time + interval '1 minute' > v_local_now
  ) THEN
    RAISE EXCEPTION 'La pista ya está reservada';
  END IF;

  SELECT count(*) INTO v_active_count
  FROM public.bookings AS b
  JOIN public.slots AS s ON s.id = b.slot_id
  WHERE b.user_id = v_user_id
    AND b.status = 'active'
    AND b.booking_date + s.end_time + interval '1 minute' > v_local_now;

  IF v_active_count >= 3 THEN
    RAISE EXCEPTION 'Ha alcanzado el máximo de 3 reservas activas';
  END IF;

  IF EXISTS (
    SELECT 1 FROM public.bookings AS b
    JOIN public.slots AS s ON s.id = b.slot_id
    WHERE b.user_id = v_user_id
      AND b.booking_date = p_booking_date
      AND b.status = 'active'
      AND b.booking_date + s.end_time + interval '1 minute' > v_local_now
  ) THEN
    RAISE EXCEPTION 'Ya dispone de una reserva para ese día';
  END IF;

  IF EXISTS (
    SELECT 1 FROM public.bookings AS b
    JOIN public.slots AS s ON s.id = b.slot_id
    WHERE b.user_id = v_user_id
      AND b.slot_id = p_slot_id
      AND b.status = 'active'
      AND b.booking_date + s.end_time + interval '1 minute' > v_local_now
  ) THEN
    RAISE EXCEPTION 'Ya dispone de una reserva en esa franja horaria';
  END IF;

  INSERT INTO public.bookings (user_id, booking_date, slot_id, status)
  VALUES (v_user_id, p_booking_date, p_slot_id, 'active')
  RETURNING id INTO v_booking_id;

  RETURN v_booking_id;
END;
$$;

REVOKE ALL ON FUNCTION public.create_booking(bigint, date) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.create_booking(bigint, date) FROM anon;
GRANT EXECUTE ON FUNCTION public.create_booking(bigint, date) TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_booking(bigint, date) TO service_role;
