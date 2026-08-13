-- Ajustes de la Fase 1 sobre el esquema existente.
-- No crea ni elimina ninguna tabla ni datos de negocio.

begin;

-- Evita aplicar restricciones nuevas si los datos actuales no las cumplen.
do $$
begin
  if exists (
    select 1
    from public.profiles
    where alias::text <> btrim(alias::text)
      or char_length(btrim(alias::text)) not between 3 and 20
      or lower(btrim(alias::text)) in ('admin', 'administrador', 'presidente', 'system', 'sistema')
  ) then
    raise exception 'Hay alias existentes que no cumplen las reglas; corríjalos antes de aplicar la migración.';
  end if;

  if (select count(*) from public.settings) > 1 then
    raise exception 'settings contiene más de un registro; conserve solo uno antes de aplicar la migración.';
  end if;

  if exists (
    select 1
    from public.slots
    where start_time >= end_time
  ) then
    raise exception 'Hay slots con start_time >= end_time; corríjalos antes de aplicar la migración.';
  end if;

  if exists (
    select 1
    from public.slots
    group by season, start_time, end_time
    having count(*) > 1
  ) then
    raise exception 'Hay slots repetidos en la misma temporada; corríjalos antes de aplicar la migración.';
  end if;
end;
$$;

create or replace function public.normalize_profile_alias()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
  new.alias := btrim(new.alias::text)::citext;
  return new;
end;
$$;

drop trigger if exists normalize_profile_alias on public.profiles;
create trigger normalize_profile_alias
before insert or update of alias on public.profiles
for each row execute function public.normalize_profile_alias();

alter table public.profiles
  add constraint profiles_alias_format_check
  check (
    char_length(alias::text) between 3 and 20
    and lower(alias::text) not in ('admin', 'administrador', 'presidente', 'system', 'sistema')
  );

alter table public.slots
  add constraint slots_time_range_check check (start_time < end_time);

create unique index slots_season_time_range_key
  on public.slots (season, start_time, end_time);

create unique index settings_singleton_key
  on public.settings ((true));

-- Los clientes autenticados solo pueden leer los datos necesarios y cambiar su alias.
revoke all privileges on table public.profiles, public.settings, public.slots, public.bookings, public.notifications from anon, authenticated;

grant select on table public.profiles, public.settings, public.slots, public.bookings, public.notifications to authenticated;
grant insert on table public.notifications to authenticated;
grant update (alias) on table public.profiles to authenticated;

drop policy if exists "Permitir lectura de perfiles a autenticados" on public.profiles;
create policy "Permitir lectura del perfil propio"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "Permitir a cada usuario actualizar solo su propio perfil" on public.profiles;
create policy "Permitir actualizar el alias propio"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create or replace function public.create_booking(
  p_slot_id bigint,
  p_booking_date date
)
returns uuid
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_booking_id uuid;
  v_user_id uuid := auth.uid();
  v_local_now timestamp := now() at time zone 'Europe/Madrid';
  v_current_date date;
  v_first_booking_date date;
  v_summer_start date;
  v_summer_end date;
  v_current_season varchar(20);
  v_requested_season varchar(20);
  v_rollover_time time;
  v_active_count integer;
begin
  if v_user_id is null then
    raise exception 'Usuario no autenticado';
  end if;

  if not exists (
    select 1
    from public.profiles
    where id = v_user_id
      and active = true
  ) then
    raise exception 'Usuario desactivado';
  end if;

  select summer_start, summer_end
    into v_summer_start, v_summer_end
  from public.settings;

  if not found then
    raise exception 'No existe configuración de temporadas';
  end if;

  v_current_date := v_local_now::date;
  v_current_season := case
    when v_current_date between v_summer_start and v_summer_end then 'summer'
    else 'winter'
  end;
  v_rollover_time := case when v_current_season = 'summer' then time '23:01' else time '22:01' end;
  v_first_booking_date := v_current_date + case when v_local_now::time >= v_rollover_time then 1 else 0 end;

  if p_booking_date not between v_first_booking_date and v_first_booking_date + 6 then
    raise exception 'La fecha no está dentro de la ventana de reserva';
  end if;

  v_requested_season := case
    when p_booking_date between v_summer_start and v_summer_end then 'summer'
    else 'winter'
  end;

  if not exists (
    select 1
    from public.slots
    where id = p_slot_id
      and season = v_requested_season
  ) then
    raise exception 'La franja no corresponde a la temporada de la fecha seleccionada';
  end if;

  perform pg_advisory_xact_lock(hashtext(p_booking_date::text || '-' || p_slot_id::text));

  if exists (
    select 1
    from public.bookings
    where booking_date = p_booking_date
      and slot_id = p_slot_id
      and status = 'maintenance'
  ) then
    raise exception 'La franja no está disponible por mantenimiento';
  end if;

  if exists (
    select 1
    from public.bookings
    where booking_date = p_booking_date
      and slot_id = p_slot_id
      and status = 'active'
  ) then
    raise exception 'La pista ya está reservada';
  end if;

  select count(*) into v_active_count
  from public.bookings
  where user_id = v_user_id
    and status = 'active';

  if v_active_count >= 3 then
    raise exception 'Ha alcanzado el máximo de 3 reservas activas';
  end if;

  if exists (
    select 1
    from public.bookings
    where user_id = v_user_id
      and booking_date = p_booking_date
      and status = 'active'
  ) then
    raise exception 'Ya dispone de una reserva para ese día';
  end if;

  if exists (
    select 1
    from public.bookings
    where user_id = v_user_id
      and slot_id = p_slot_id
      and status = 'active'
  ) then
    raise exception 'Ya dispone de una reserva en esa franja horaria';
  end if;

  insert into public.bookings (user_id, booking_date, slot_id, status)
  values (v_user_id, p_booking_date, p_slot_id, 'active')
  returning id into v_booking_id;

  return v_booking_id;
end;
$$;

create or replace function public.cancel_booking(p_booking_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if auth.uid() is null then
    raise exception 'Usuario no autenticado';
  end if;

  update public.bookings
  set status = 'cancelled_by_user'
  where id = p_booking_id
    and user_id = auth.uid()
    and status = 'active';

  if not found then
    raise exception 'Reserva no encontrada o no cancelable';
  end if;

  return true;
end;
$$;

revoke all on function public.create_booking(bigint, date) from public;
revoke all on function public.cancel_booking(uuid) from public;
grant execute on function public.create_booking(bigint, date) to authenticated;
grant execute on function public.cancel_booking(uuid) to authenticated;

commit;
