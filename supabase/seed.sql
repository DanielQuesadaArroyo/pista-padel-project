SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict 8pRa8cImPci9IIds3PiRHchcGZbfQXB1fO6JgWGgbLzLH52lO4WcoBZ77XjDfEq

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: custom_oauth_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', 'e69b29d8-4dc2-44ea-8233-4c942cdb8b0c', 'authenticated', 'authenticated', 'prueba1@prueba1.com', '$2a$10$4BpxtTZ5wJhwfh1YWfjLfOfWrq9KhxYHwX1Txw6z3WesIhfYoGvGa', '2026-08-14 14:05:01.194669+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-08-14 14:44:06.031432+00', '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2026-08-14 14:05:01.173363+00', '2026-08-14 14:44:06.033859+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'f3036544-25b2-46a4-bd1b-3cbb6694779f', 'authenticated', 'authenticated', 'prueba2@prueba2.com', '$2a$10$rUwnWPkPN6Qz9DyWdz.oWuMJv/ny5MdLDajLNPrDRFfzrsomvTqly', '2026-08-14 14:06:25.379868+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-08-14 14:44:06.244331+00', '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2026-08-14 14:06:25.376276+00', '2026-08-14 14:44:06.246327+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'afb0c638-a0d2-4927-bb4b-d9349a4776fc', 'authenticated', 'authenticated', 'dquesadaarroyo+adminjdh@gmail.com', '$2a$10$CIYBhur7fFcGgo2n7uy8fO3Uh.sKpnlP1pF0rILdQ.9WIsTHxmBX.', '2026-08-13 14:42:50.168313+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-08-14 13:51:34.852523+00', '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2026-08-13 14:42:50.164231+00', '2026-08-14 14:50:05.853819+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '3285f182-eab3-4146-b469-d929d716d1f8', 'authenticated', 'authenticated', 'dquesadaarroyo@gmail.com', '$2a$06$p0PsOQaU79OYjVoT.YXY1eGFNAomzjvOD/qBzkNP8fMmsCG2504Uy', '2026-08-13 14:51:37.978403+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-08-14 17:26:02.822528+00', '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2026-08-13 14:51:37.946533+00', '2026-08-14 17:26:02.863536+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('afb0c638-a0d2-4927-bb4b-d9349a4776fc', 'afb0c638-a0d2-4927-bb4b-d9349a4776fc', '{"sub": "afb0c638-a0d2-4927-bb4b-d9349a4776fc", "email": "dquesadaarroyo+adminjdh@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-08-13 14:42:50.166603+00', '2026-08-13 14:42:50.166646+00', '2026-08-13 14:42:50.166646+00', '417851c1-5feb-4a26-91f8-d23ea04c095f'),
	('3285f182-eab3-4146-b469-d929d716d1f8', '3285f182-eab3-4146-b469-d929d716d1f8', '{"sub": "3285f182-eab3-4146-b469-d929d716d1f8", "email": "dquesadaarroyo@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-08-13 14:51:37.970976+00', '2026-08-13 14:51:37.971571+00', '2026-08-13 14:51:37.971571+00', 'a438a636-aa4b-457d-8267-784fa658f5a5'),
	('e69b29d8-4dc2-44ea-8233-4c942cdb8b0c', 'e69b29d8-4dc2-44ea-8233-4c942cdb8b0c', '{"sub": "e69b29d8-4dc2-44ea-8233-4c942cdb8b0c", "email": "prueba1@prueba1.com", "email_verified": false, "phone_verified": false}', 'email', '2026-08-14 14:05:01.18665+00', '2026-08-14 14:05:01.186733+00', '2026-08-14 14:05:01.186733+00', '89b05500-8c21-4eaa-9e46-ad4c5d7fc373'),
	('f3036544-25b2-46a4-bd1b-3cbb6694779f', 'f3036544-25b2-46a4-bd1b-3cbb6694779f', '{"sub": "f3036544-25b2-46a4-bd1b-3cbb6694779f", "email": "prueba2@prueba2.com", "email_verified": false, "phone_verified": false}', 'email', '2026-08-14 14:06:25.37775+00', '2026-08-14 14:06:25.377804+00', '2026-08-14 14:06:25.377804+00', '3a1d7505-f966-4e64-90ba-d1769e0892cf');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag", "oauth_client_id", "refresh_token_hmac_key", "refresh_token_counter", "scopes") VALUES
	('a3242b53-01f6-4837-8e1d-363d8e19f64f', 'e69b29d8-4dc2-44ea-8233-4c942cdb8b0c', '2026-08-14 14:31:54.606763+00', '2026-08-14 14:31:54.606763+00', NULL, 'aal1', NULL, NULL, 'node', '81.40.78.58', NULL, NULL, NULL, NULL, NULL),
	('3305991e-febf-47a9-b36f-b2755a972a4e', 'f3036544-25b2-46a4-bd1b-3cbb6694779f', '2026-08-14 14:31:54.99686+00', '2026-08-14 14:31:54.99686+00', NULL, 'aal1', NULL, NULL, 'node', '81.40.78.58', NULL, NULL, NULL, NULL, NULL),
	('6b6dddc5-44a1-4ddc-b0b0-7dd2a2ae8eee', 'e69b29d8-4dc2-44ea-8233-4c942cdb8b0c', '2026-08-14 14:32:29.39684+00', '2026-08-14 14:32:29.39684+00', NULL, 'aal1', NULL, NULL, 'node', '81.40.78.58', NULL, NULL, NULL, NULL, NULL),
	('e05984eb-529f-402d-847d-c37d7e55b513', 'f3036544-25b2-46a4-bd1b-3cbb6694779f', '2026-08-14 14:32:29.694435+00', '2026-08-14 14:32:29.694435+00', NULL, 'aal1', NULL, NULL, 'node', '81.40.78.58', NULL, NULL, NULL, NULL, NULL),
	('90c32a8f-a2f7-48a1-8f4c-904a14028190', 'e69b29d8-4dc2-44ea-8233-4c942cdb8b0c', '2026-08-14 14:33:11.228309+00', '2026-08-14 14:33:11.228309+00', NULL, 'aal1', NULL, NULL, 'node', '81.40.78.58', NULL, NULL, NULL, NULL, NULL),
	('379fc8f7-13b3-46c2-addb-624ee692b0d9', 'e69b29d8-4dc2-44ea-8233-4c942cdb8b0c', '2026-08-14 14:34:44.06885+00', '2026-08-14 14:34:44.06885+00', NULL, 'aal1', NULL, NULL, 'node', '81.40.78.58', NULL, NULL, NULL, NULL, NULL),
	('709caa78-a8e3-4b5c-89e8-32cb30dc4915', 'e69b29d8-4dc2-44ea-8233-4c942cdb8b0c', '2026-08-14 14:40:20.886705+00', '2026-08-14 14:40:20.886705+00', NULL, 'aal1', NULL, NULL, 'node', '81.40.78.58', NULL, NULL, NULL, NULL, NULL),
	('2520fd24-a7b3-44bc-8995-2eb4c09508cd', 'f3036544-25b2-46a4-bd1b-3cbb6694779f', '2026-08-14 14:40:21.245981+00', '2026-08-14 14:40:21.245981+00', NULL, 'aal1', NULL, NULL, 'node', '81.40.78.58', NULL, NULL, NULL, NULL, NULL),
	('2192b4f0-931c-430c-b82c-ea104d67e31f', 'e69b29d8-4dc2-44ea-8233-4c942cdb8b0c', '2026-08-14 14:42:04.068896+00', '2026-08-14 14:42:04.068896+00', NULL, 'aal1', NULL, NULL, 'node', '81.40.78.58', NULL, NULL, NULL, NULL, NULL),
	('b97dd6ae-92fd-42e9-9949-0ec88ef05df4', 'f3036544-25b2-46a4-bd1b-3cbb6694779f', '2026-08-14 14:42:04.394206+00', '2026-08-14 14:42:04.394206+00', NULL, 'aal1', NULL, NULL, 'node', '81.40.78.58', NULL, NULL, NULL, NULL, NULL),
	('97b63a42-fb64-455a-80ee-f8bfd2fd531c', 'e69b29d8-4dc2-44ea-8233-4c942cdb8b0c', '2026-08-14 14:42:41.432578+00', '2026-08-14 14:42:41.432578+00', NULL, 'aal1', NULL, NULL, 'node', '81.40.78.58', NULL, NULL, NULL, NULL, NULL),
	('e80ced19-904c-479e-8d48-b2d1c42d9c7f', 'f3036544-25b2-46a4-bd1b-3cbb6694779f', '2026-08-14 14:42:41.616101+00', '2026-08-14 14:42:41.616101+00', NULL, 'aal1', NULL, NULL, 'node', '81.40.78.58', NULL, NULL, NULL, NULL, NULL),
	('6e9d3c63-f923-45f8-8861-f7a52d329642', 'e69b29d8-4dc2-44ea-8233-4c942cdb8b0c', '2026-08-14 14:42:58.521355+00', '2026-08-14 14:42:58.521355+00', NULL, 'aal1', NULL, NULL, 'node', '81.40.78.58', NULL, NULL, NULL, NULL, NULL),
	('0dd53d90-36c7-4140-a199-04a1cc9fd168', 'e69b29d8-4dc2-44ea-8233-4c942cdb8b0c', '2026-08-14 14:43:22.826593+00', '2026-08-14 14:43:22.826593+00', NULL, 'aal1', NULL, NULL, 'node', '81.40.78.58', NULL, NULL, NULL, NULL, NULL),
	('4cde59ee-bc70-4606-b97b-755d0c949ac4', 'f3036544-25b2-46a4-bd1b-3cbb6694779f', '2026-08-14 14:43:23.014728+00', '2026-08-14 14:43:23.014728+00', NULL, 'aal1', NULL, NULL, 'node', '81.40.78.58', NULL, NULL, NULL, NULL, NULL),
	('9185491f-c2b9-439b-9356-dec64304a1cd', 'e69b29d8-4dc2-44ea-8233-4c942cdb8b0c', '2026-08-14 14:43:40.81505+00', '2026-08-14 14:43:40.81505+00', NULL, 'aal1', NULL, NULL, 'node', '81.40.78.58', NULL, NULL, NULL, NULL, NULL),
	('e136e79a-792a-4abd-8bc0-865d63aedb20', 'e69b29d8-4dc2-44ea-8233-4c942cdb8b0c', '2026-08-14 14:44:06.031539+00', '2026-08-14 14:44:06.031539+00', NULL, 'aal1', NULL, NULL, 'node', '81.40.78.58', NULL, NULL, NULL, NULL, NULL),
	('fc751b26-7ec0-4368-83d5-2190a3740d80', 'f3036544-25b2-46a4-bd1b-3cbb6694779f', '2026-08-14 14:44:06.244431+00', '2026-08-14 14:44:06.244431+00', NULL, 'aal1', NULL, NULL, 'node', '81.40.78.58', NULL, NULL, NULL, NULL, NULL),
	('1898b1b9-7d14-42d7-baa5-65a89cbac02d', '3285f182-eab3-4146-b469-d929d716d1f8', '2026-08-14 17:26:02.824277+00', '2026-08-14 17:26:02.824277+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', '81.40.78.58', NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('a3242b53-01f6-4837-8e1d-363d8e19f64f', '2026-08-14 14:31:54.684087+00', '2026-08-14 14:31:54.684087+00', 'password', 'c6dde2ab-6468-4d19-ab99-3967adc5efc2'),
	('3305991e-febf-47a9-b36f-b2755a972a4e', '2026-08-14 14:31:55.00005+00', '2026-08-14 14:31:55.00005+00', 'password', '326cad95-14fa-470d-9d46-bd5fc02ac8bb'),
	('6b6dddc5-44a1-4ddc-b0b0-7dd2a2ae8eee', '2026-08-14 14:32:29.401704+00', '2026-08-14 14:32:29.401704+00', 'password', 'f2c85478-2481-417a-8060-1578c514844a'),
	('e05984eb-529f-402d-847d-c37d7e55b513', '2026-08-14 14:32:29.699363+00', '2026-08-14 14:32:29.699363+00', 'password', 'b09e75be-5c54-47fb-bbaf-285a884b9a84'),
	('90c32a8f-a2f7-48a1-8f4c-904a14028190', '2026-08-14 14:33:11.245719+00', '2026-08-14 14:33:11.245719+00', 'password', '57cebef3-8bd8-4362-8019-f8ade2561b73'),
	('379fc8f7-13b3-46c2-addb-624ee692b0d9', '2026-08-14 14:34:44.074317+00', '2026-08-14 14:34:44.074317+00', 'password', '30628ebc-29bf-4274-b42c-d7c5d2174e52'),
	('709caa78-a8e3-4b5c-89e8-32cb30dc4915', '2026-08-14 14:40:20.90298+00', '2026-08-14 14:40:20.90298+00', 'password', 'aee0d1ad-3556-4cd0-be12-38205ce6249d'),
	('2520fd24-a7b3-44bc-8995-2eb4c09508cd', '2026-08-14 14:40:21.24873+00', '2026-08-14 14:40:21.24873+00', 'password', '9bcb386f-a249-4bf1-bc85-e3a828b774f6'),
	('2192b4f0-931c-430c-b82c-ea104d67e31f', '2026-08-14 14:42:04.094932+00', '2026-08-14 14:42:04.094932+00', 'password', '46a6e81d-7763-48ea-9e52-a244ec89f343'),
	('b97dd6ae-92fd-42e9-9949-0ec88ef05df4', '2026-08-14 14:42:04.396692+00', '2026-08-14 14:42:04.396692+00', 'password', 'bfc1cda5-624d-4675-a3a9-c64007c55fdd'),
	('97b63a42-fb64-455a-80ee-f8bfd2fd531c', '2026-08-14 14:42:41.436079+00', '2026-08-14 14:42:41.436079+00', 'password', '9c01e56a-d8a9-4d46-93db-5a51f9434566'),
	('e80ced19-904c-479e-8d48-b2d1c42d9c7f', '2026-08-14 14:42:41.618623+00', '2026-08-14 14:42:41.618623+00', 'password', 'fa907da4-00ab-4309-a1e0-9d4179b4d293'),
	('6e9d3c63-f923-45f8-8861-f7a52d329642', '2026-08-14 14:42:58.535723+00', '2026-08-14 14:42:58.535723+00', 'password', 'dee5f991-4624-4079-a8da-09c44c9c2ae1'),
	('0dd53d90-36c7-4140-a199-04a1cc9fd168', '2026-08-14 14:43:22.82939+00', '2026-08-14 14:43:22.82939+00', 'password', 'b8f7021d-b4af-4032-9ccc-29e3d2ff345b'),
	('4cde59ee-bc70-4606-b97b-755d0c949ac4', '2026-08-14 14:43:23.023007+00', '2026-08-14 14:43:23.023007+00', 'password', 'ba5ac56b-ba9c-4c3f-b68a-0bfd19e0ae7b'),
	('9185491f-c2b9-439b-9356-dec64304a1cd', '2026-08-14 14:43:40.817653+00', '2026-08-14 14:43:40.817653+00', 'password', '44845ee2-a754-46ac-85f9-7da5fcbfa656'),
	('e136e79a-792a-4abd-8bc0-865d63aedb20', '2026-08-14 14:44:06.034159+00', '2026-08-14 14:44:06.034159+00', 'password', '7b81019d-c191-4d5d-ba21-9edae613617e'),
	('fc751b26-7ec0-4368-83d5-2190a3740d80', '2026-08-14 14:44:06.246646+00', '2026-08-14 14:44:06.246646+00', 'password', '93a266db-11c6-4d07-bcdd-5d76d00f8289'),
	('1898b1b9-7d14-42d7-baa5-65a89cbac02d', '2026-08-14 17:26:02.867687+00', '2026-08-14 17:26:02.867687+00', 'password', '806032ae-609c-4b34-82ad-03da73d3a5f1');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 7, 'xr64yjomkqo6', 'e69b29d8-4dc2-44ea-8233-4c942cdb8b0c', false, '2026-08-14 14:31:54.653733+00', '2026-08-14 14:31:54.653733+00', NULL, 'a3242b53-01f6-4837-8e1d-363d8e19f64f'),
	('00000000-0000-0000-0000-000000000000', 8, 'cbso35rfim4s', 'f3036544-25b2-46a4-bd1b-3cbb6694779f', false, '2026-08-14 14:31:54.998702+00', '2026-08-14 14:31:54.998702+00', NULL, '3305991e-febf-47a9-b36f-b2755a972a4e'),
	('00000000-0000-0000-0000-000000000000', 9, 'jbrivbgmpnae', 'e69b29d8-4dc2-44ea-8233-4c942cdb8b0c', false, '2026-08-14 14:32:29.398878+00', '2026-08-14 14:32:29.398878+00', NULL, '6b6dddc5-44a1-4ddc-b0b0-7dd2a2ae8eee'),
	('00000000-0000-0000-0000-000000000000', 10, 'qkaim6xmm2xw', 'f3036544-25b2-46a4-bd1b-3cbb6694779f', false, '2026-08-14 14:32:29.695614+00', '2026-08-14 14:32:29.695614+00', NULL, 'e05984eb-529f-402d-847d-c37d7e55b513'),
	('00000000-0000-0000-0000-000000000000', 11, '4ag46mzjqztp', 'e69b29d8-4dc2-44ea-8233-4c942cdb8b0c', false, '2026-08-14 14:33:11.238721+00', '2026-08-14 14:33:11.238721+00', NULL, '90c32a8f-a2f7-48a1-8f4c-904a14028190'),
	('00000000-0000-0000-0000-000000000000', 12, 'atv52q4dd6ad', 'e69b29d8-4dc2-44ea-8233-4c942cdb8b0c', false, '2026-08-14 14:34:44.07177+00', '2026-08-14 14:34:44.07177+00', NULL, '379fc8f7-13b3-46c2-addb-624ee692b0d9'),
	('00000000-0000-0000-0000-000000000000', 13, 'hsigfj3pczkr', 'e69b29d8-4dc2-44ea-8233-4c942cdb8b0c', false, '2026-08-14 14:40:20.898879+00', '2026-08-14 14:40:20.898879+00', NULL, '709caa78-a8e3-4b5c-89e8-32cb30dc4915'),
	('00000000-0000-0000-0000-000000000000', 14, 'qoni7lk75ett', 'f3036544-25b2-46a4-bd1b-3cbb6694779f', false, '2026-08-14 14:40:21.247487+00', '2026-08-14 14:40:21.247487+00', NULL, '2520fd24-a7b3-44bc-8995-2eb4c09508cd'),
	('00000000-0000-0000-0000-000000000000', 15, 'kjcv23ndf4zr', 'e69b29d8-4dc2-44ea-8233-4c942cdb8b0c', false, '2026-08-14 14:42:04.087213+00', '2026-08-14 14:42:04.087213+00', NULL, '2192b4f0-931c-430c-b82c-ea104d67e31f'),
	('00000000-0000-0000-0000-000000000000', 16, 'vtrgf6exwjqh', 'f3036544-25b2-46a4-bd1b-3cbb6694779f', false, '2026-08-14 14:42:04.39542+00', '2026-08-14 14:42:04.39542+00', NULL, 'b97dd6ae-92fd-42e9-9949-0ec88ef05df4'),
	('00000000-0000-0000-0000-000000000000', 17, 'wdwoylsgtnah', 'e69b29d8-4dc2-44ea-8233-4c942cdb8b0c', false, '2026-08-14 14:42:41.434024+00', '2026-08-14 14:42:41.434024+00', NULL, '97b63a42-fb64-455a-80ee-f8bfd2fd531c'),
	('00000000-0000-0000-0000-000000000000', 18, '5sv5bycwxc5y', 'f3036544-25b2-46a4-bd1b-3cbb6694779f', false, '2026-08-14 14:42:41.617152+00', '2026-08-14 14:42:41.617152+00', NULL, 'e80ced19-904c-479e-8d48-b2d1c42d9c7f'),
	('00000000-0000-0000-0000-000000000000', 19, '7siasg22pq2z', 'e69b29d8-4dc2-44ea-8233-4c942cdb8b0c', false, '2026-08-14 14:42:58.533531+00', '2026-08-14 14:42:58.533531+00', NULL, '6e9d3c63-f923-45f8-8861-f7a52d329642'),
	('00000000-0000-0000-0000-000000000000', 20, 'btg5fgryalot', 'e69b29d8-4dc2-44ea-8233-4c942cdb8b0c', false, '2026-08-14 14:43:22.828128+00', '2026-08-14 14:43:22.828128+00', NULL, '0dd53d90-36c7-4140-a199-04a1cc9fd168'),
	('00000000-0000-0000-0000-000000000000', 21, 'k5juonfrtt3m', 'f3036544-25b2-46a4-bd1b-3cbb6694779f', false, '2026-08-14 14:43:23.021773+00', '2026-08-14 14:43:23.021773+00', NULL, '4cde59ee-bc70-4606-b97b-755d0c949ac4'),
	('00000000-0000-0000-0000-000000000000', 22, 'wfc2vsamssku', 'e69b29d8-4dc2-44ea-8233-4c942cdb8b0c', false, '2026-08-14 14:43:40.816237+00', '2026-08-14 14:43:40.816237+00', NULL, '9185491f-c2b9-439b-9356-dec64304a1cd'),
	('00000000-0000-0000-0000-000000000000', 23, '5mamwurckszg', 'e69b29d8-4dc2-44ea-8233-4c942cdb8b0c', false, '2026-08-14 14:44:06.032949+00', '2026-08-14 14:44:06.032949+00', NULL, 'e136e79a-792a-4abd-8bc0-865d63aedb20'),
	('00000000-0000-0000-0000-000000000000', 24, 'poryhq2avmbm', 'f3036544-25b2-46a4-bd1b-3cbb6694779f', false, '2026-08-14 14:44:06.245399+00', '2026-08-14 14:44:06.245399+00', NULL, 'fc751b26-7ec0-4368-83d5-2190a3740d80'),
	('00000000-0000-0000-0000-000000000000', 28, 'gbk3btkzasme', '3285f182-eab3-4146-b469-d929d716d1f8', false, '2026-08-14 17:26:02.847283+00', '2026-08-14 17:26:02.847283+00', NULL, '1898b1b9-7d14-42d7-baa5-65a89cbac02d');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: webauthn_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: webauthn_credentials; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."profiles" ("id", "alias", "staircase", "floor", "door", "active", "created_at", "updated_at") VALUES
	('afb0c638-a0d2-4927-bb4b-d9349a4776fc', 'AdminJdH', '0', '0', '0', true, '2026-08-13 14:53:36.352024+00', '2026-08-13 14:53:36.352024+00'),
	('f3036544-25b2-46a4-bd1b-3cbb6694779f', 'prueba2', '2', '1', '1', true, '2026-08-14 14:07:36.17225+00', '2026-08-14 14:07:36.17225+00'),
	('3285f182-eab3-4146-b469-d929d716d1f8', 'dqa', '1', '5', '2', true, '2026-08-13 14:52:53.349836+00', '2026-08-14 15:03:15.581948+00'),
	('e69b29d8-4dc2-44ea-8233-4c942cdb8b0c', 'prueba1', '1', '2', '3', false, '2026-08-14 14:05:50.541874+00', '2026-08-14 15:03:22.109795+00');


--
-- Data for Name: slots; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."slots" ("id", "season", "start_time", "end_time", "created_at") VALUES
	(1, 'winter', '10:00:00', '11:30:00', '2026-08-11 14:58:49.259213+00'),
	(2, 'winter', '11:30:00', '13:00:00', '2026-08-11 14:58:49.259213+00'),
	(3, 'winter', '13:00:00', '14:30:00', '2026-08-11 14:58:49.259213+00'),
	(4, 'winter', '17:00:00', '18:00:00', '2026-08-11 14:58:49.259213+00'),
	(5, 'winter', '18:00:00', '19:00:00', '2026-08-11 14:58:49.259213+00'),
	(6, 'winter', '19:00:00', '20:30:00', '2026-08-11 14:58:49.259213+00'),
	(7, 'winter', '20:30:00', '22:00:00', '2026-08-11 14:58:49.259213+00'),
	(8, 'summer', '10:00:00', '11:30:00', '2026-08-11 14:58:49.259213+00'),
	(9, 'summer', '11:30:00', '13:00:00', '2026-08-11 14:58:49.259213+00'),
	(10, 'summer', '13:00:00', '14:30:00', '2026-08-11 14:58:49.259213+00'),
	(11, 'summer', '18:00:00', '19:00:00', '2026-08-11 14:58:49.259213+00'),
	(12, 'summer', '19:00:00', '20:00:00', '2026-08-11 14:58:49.259213+00'),
	(13, 'summer', '20:00:00', '21:30:00', '2026-08-11 14:58:49.259213+00'),
	(14, 'summer', '21:30:00', '23:00:00', '2026-08-11 14:58:49.259213+00');


--
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."bookings" ("id", "user_id", "booking_date", "slot_id", "status", "cancelled_by_admin", "created_at", "updated_at") VALUES
	('4584cd4c-2664-40bc-93f5-c1515ff87068', '3285f182-eab3-4146-b469-d929d716d1f8', '2026-08-13', 8, 'cancelled_by_user', false, '2026-08-13 20:47:18.115225+00', '2026-08-13 20:47:23.281472+00'),
	('24fbf75b-6eeb-4561-a7d6-94ee17fe56cd', '3285f182-eab3-4146-b469-d929d716d1f8', '2026-08-13', 13, 'cancelled_by_user', false, '2026-08-13 20:47:25.011307+00', '2026-08-13 20:47:51.553493+00'),
	('7e31936e-347b-43cb-84fc-87d35f0cee9b', '3285f182-eab3-4146-b469-d929d716d1f8', '2026-08-15', 13, 'cancelled_by_user', false, '2026-08-13 20:47:54.100683+00', '2026-08-13 20:48:01.858671+00'),
	('08d7ad64-a408-498d-a071-0888bed69cfb', '3285f182-eab3-4146-b469-d929d716d1f8', '2026-08-14', 14, 'cancelled_by_user', false, '2026-08-13 20:47:33.194971+00', '2026-08-13 21:15:59.550369+00'),
	('cb869fb9-0094-4566-af8d-9d0c6db73e07', '3285f182-eab3-4146-b469-d929d716d1f8', '2026-08-14', 14, 'cancelled_by_user', false, '2026-08-13 21:16:25.121583+00', '2026-08-13 21:16:45.86221+00'),
	('a7893424-17ca-4207-800f-9f25a29242ca', '3285f182-eab3-4146-b469-d929d716d1f8', '2026-08-16', 12, 'cancelled_by_user', false, '2026-08-13 20:47:38.499453+00', '2026-08-13 21:17:11.482128+00'),
	('92718263-bb03-47b7-8e08-0574aac61c9c', '3285f182-eab3-4146-b469-d929d716d1f8', '2026-08-19', 13, 'cancelled_by_user', false, '2026-08-13 21:16:27.414085+00', '2026-08-13 21:17:13.854682+00'),
	('e5ecb0aa-f41f-4453-84a4-11b95b56899b', '3285f182-eab3-4146-b469-d929d716d1f8', '2026-08-14', 13, 'active', false, '2026-08-13 21:17:25.868883+00', '2026-08-13 21:17:25.868883+00'),
	('fb7b5487-6473-4326-85c5-238fd596dd0f', '3285f182-eab3-4146-b469-d929d716d1f8', '2026-08-17', 14, 'cancelled_by_user', false, '2026-08-13 21:23:50.877409+00', '2026-08-14 13:30:25.199408+00'),
	('e42cd069-b6fd-4e3c-8d85-7c2b60a75986', '3285f182-eab3-4146-b469-d929d716d1f8', '2026-08-17', 14, 'cancelled_by_user', false, '2026-08-14 13:30:29.965019+00', '2026-08-14 13:30:32.686658+00'),
	('26d0505c-c40b-4b2d-ad04-1a0ddecbfbc2', '3285f182-eab3-4146-b469-d929d716d1f8', '2026-08-18', 14, 'active', false, '2026-08-14 13:30:34.151174+00', '2026-08-14 13:30:34.151174+00'),
	('186d29ef-ec6d-43e0-9824-248ffde4d8c0', 'e69b29d8-4dc2-44ea-8233-4c942cdb8b0c', '2026-08-14', 8, 'cancelled_by_user', false, '2026-08-14 14:33:12.064129+00', '2026-08-14 14:34:44.695441+00'),
	('7824ea47-534f-4fe6-965c-66af37f8f082', 'e69b29d8-4dc2-44ea-8233-4c942cdb8b0c', '2026-08-14', 8, 'cancelled_by_user', false, '2026-08-14 14:40:21.985626+00', '2026-08-14 14:40:22.581911+00'),
	('2ee494d2-d994-469b-b2bc-be22d01667e1', 'e69b29d8-4dc2-44ea-8233-4c942cdb8b0c', '2026-08-15', 9, 'cancelled_by_user', false, '2026-08-14 14:40:22.231503+00', '2026-08-14 14:40:22.934651+00'),
	('4e596749-dede-47eb-847a-305eb66f3d2c', 'e69b29d8-4dc2-44ea-8233-4c942cdb8b0c', '2026-08-16', 10, 'cancelled_by_user', false, '2026-08-14 14:40:22.314507+00', '2026-08-14 14:40:23.002977+00'),
	('136d26cf-bea5-40e5-9252-2a67b702871b', 'f3036544-25b2-46a4-bd1b-3cbb6694779f', '2026-08-14', 8, 'cancelled_by_user', false, '2026-08-14 14:40:22.72225+00', '2026-08-14 14:40:23.076802+00'),
	('7b137afe-5241-4fee-83f4-b335358d73be', 'e69b29d8-4dc2-44ea-8233-4c942cdb8b0c', '2026-08-18', 12, 'cancelled_by_user', false, '2026-08-14 14:40:22.792159+00', '2026-08-14 14:40:23.151059+00'),
	('8d33c27b-73fd-4a5b-9b46-3eb7cafa8153', 'e69b29d8-4dc2-44ea-8233-4c942cdb8b0c', '2026-08-14', 8, 'cancelled_by_user', false, '2026-08-14 14:43:23.422206+00', '2026-08-14 14:43:41.141651+00'),
	('0c6befd9-d7ac-455a-a974-d04f488c339e', 'e69b29d8-4dc2-44ea-8233-4c942cdb8b0c', '2026-08-14', 8, 'cancelled_by_user', false, '2026-08-14 14:44:06.617373+00', '2026-08-14 14:44:06.808294+00'),
	('666c5991-8dfc-4af3-bab3-709ae35616cc', 'afb0c638-a0d2-4927-bb4b-d9349a4776fc', '2026-08-14', 11, 'cancelled_by_user', false, '2026-08-14 14:57:46.849954+00', '2026-08-14 15:02:06.664954+00'),
	('790fd956-ee81-41c4-b895-3d71014ec61a', 'afb0c638-a0d2-4927-bb4b-d9349a4776fc', '2026-08-14', 14, 'cancelled_by_user', false, '2026-08-14 15:02:15.437528+00', '2026-08-14 15:02:20.671591+00'),
	('512fe639-8a70-4a94-9a0f-af75736abf62', '3285f182-eab3-4146-b469-d929d716d1f8', '2026-08-15', 10, 'cancelled_by_user', false, '2026-08-13 21:23:47.472678+00', '2026-08-14 15:02:57.650868+00'),
	('f29279d7-85bb-4812-91c8-d1152964690e', '3285f182-eab3-4146-b469-d929d716d1f8', '2026-08-16', 12, 'cancelled_by_user', false, '2026-08-14 17:26:18.626477+00', '2026-08-14 17:26:22.21161+00'),
	('7bd6e42f-7c5c-45ec-aacb-14234ed9b4a0', '3285f182-eab3-4146-b469-d929d716d1f8', '2026-08-16', 12, 'active', false, '2026-08-14 17:26:26.396686+00', '2026-08-14 17:26:26.396686+00');


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."notifications" ("id", "message", "created_at", "event_date") VALUES
	('2ec5b8c3-5e6a-4d6b-b10b-b8d404bab125', 'dquearr ha reservado la pista el 13 de agosto de 2026 de 10:00 a 11:30.', '2026-08-13 20:47:18.248147+00', '2026-08-13'),
	('7fe31f46-1a6d-4055-a27a-8732215fb368', 'dquearr ha anulado su reserva del 13 de agosto de 2026 de 10:00 a 11:30.', '2026-08-13 20:47:23.349629+00', '2026-08-13'),
	('30d4db5b-52b3-4255-a4e1-450433a17f09', 'dquearr ha reservado la pista el 13 de agosto de 2026 de 20:00 a 21:30.', '2026-08-13 20:47:25.077642+00', '2026-08-13'),
	('c06c1452-bf71-4f64-9868-8ad540ba6d88', 'dquearr ha reservado la pista el 14 de agosto de 2026 de 21:30 a 23:00.', '2026-08-13 20:47:33.262526+00', '2026-08-14'),
	('a9c61cdf-b030-4af5-911b-33c896e4b635', 'dquearr ha reservado la pista el 16 de agosto de 2026 de 19:00 a 20:00.', '2026-08-13 20:47:38.563602+00', '2026-08-16'),
	('d88f16a0-4e8f-4947-ab5e-ce1f659dd342', 'dquearr ha anulado su reserva del 13 de agosto de 2026 de 20:00 a 21:30.', '2026-08-13 20:47:51.614917+00', '2026-08-13'),
	('f107014e-c2ce-420e-8c9a-1142328db6c3', 'dquearr ha reservado la pista el 15 de agosto de 2026 de 20:00 a 21:30.', '2026-08-13 20:47:54.167345+00', '2026-08-15'),
	('21d8d3dd-e468-4f5e-bfe7-867d93279603', 'dquearr ha anulado su reserva del 15 de agosto de 2026 de 20:00 a 21:30.', '2026-08-13 20:48:01.925106+00', '2026-08-15'),
	('aea5decb-1d94-43e9-8d92-9f8e7d1bf9ce', 'dquearr ha anulado su reserva del 14 de agosto de 2026 de 21:30 a 23:00.', '2026-08-13 21:15:59.633047+00', '2026-08-14'),
	('386a0381-90d3-41f2-b532-4db316113960', 'dquearr ha reservado la pista el 14 de agosto de 2026 de 21:30 a 23:00.', '2026-08-13 21:16:25.197+00', '2026-08-14'),
	('6dfc8ac8-5790-4fbe-974a-47623d2571e2', 'dquearr ha reservado la pista el 19 de agosto de 2026 de 20:00 a 21:30.', '2026-08-13 21:16:27.480832+00', '2026-08-19'),
	('aa8fb1e7-598f-4de7-9b93-87f97e303c2d', 'dquearr ha anulado su reserva del 14 de agosto de 2026 de 21:30 a 23:00.', '2026-08-13 21:16:45.929006+00', '2026-08-14'),
	('eee10d9f-fc2e-44b8-b166-6a427ce3daff', 'dquearr ha anulado su reserva del 16 de agosto de 2026 de 19:00 a 20:00.', '2026-08-13 21:17:11.544373+00', '2026-08-16'),
	('777510b3-510c-41db-9753-281a6e516adf', 'dquearr ha anulado su reserva del 19 de agosto de 2026 de 20:00 a 21:30.', '2026-08-13 21:17:13.924012+00', '2026-08-19'),
	('d434e016-1216-444b-93df-e9a5473d2d7b', 'dquearr ha reservado la pista el 14 de agosto de 2026 de 20:00 a 21:30.', '2026-08-13 21:17:25.939904+00', '2026-08-14'),
	('c2ac7317-ae3d-4362-b8fb-ff4e19d38311', 'dquearr ha reservado la pista el 15 de agosto de 2026 de 13:00 a 14:30.', '2026-08-13 21:23:47.544878+00', '2026-08-15'),
	('e3b6b16a-8000-4ee1-a8ae-7e3172b95237', 'dquearr ha reservado la pista el 17 de agosto de 2026 de 21:30 a 23:00.', '2026-08-13 21:23:50.949631+00', '2026-08-17'),
	('00625177-ef11-45d7-91b0-9ec7b013b00d', 'dquearr ha anulado su reserva del 17 de agosto de 2026 de 21:30 a 23:00.', '2026-08-14 13:30:25.313882+00', '2026-08-17'),
	('99bb2db0-22a8-4096-b89c-76ac4dfb981b', 'dquearr ha reservado la pista el 17 de agosto de 2026 de 21:30 a 23:00.', '2026-08-14 13:30:30.048722+00', '2026-08-17'),
	('78d08af0-cd3f-4143-90b9-d51a3366dc5a', 'dquearr ha anulado su reserva del 17 de agosto de 2026 de 21:30 a 23:00.', '2026-08-14 13:30:32.754832+00', '2026-08-17'),
	('a3d42a36-ef00-4eb3-8dd5-c03e8a41e571', 'dquearr ha reservado la pista el 18 de agosto de 2026 de 21:30 a 23:00.', '2026-08-14 13:30:34.223169+00', '2026-08-18'),
	('205530cb-0fdc-40ed-bfb3-a6f5c34c35e2', 'AdminJdH ha reservado la pista el 14 de agosto de 2026 de 21:30 a 23:00.', '2026-08-14 13:51:52.948498+00', '2026-08-14'),
	('d3e1eaef-ba48-44f5-8cce-121adf972c90', 'AdminJdH ha reservado la pista el 15 de agosto de 2026 de 10:00 a 11:30.', '2026-08-14 13:51:56.267197+00', '2026-08-15'),
	('714b72c7-21a7-4637-b3bd-a6b0e85eb8ed', 'AdminJdH ha reservado la pista el 16 de agosto de 2026 de 11:30 a 13:00.', '2026-08-14 13:51:57.839693+00', '2026-08-16'),
	('0fae2bc1-d4c3-4f88-8a6c-b31cc3b22055', 'AdminJdH ha reservado la pista el 14 de agosto de 2026 de 18:00 a 19:00.', '2026-08-14 14:57:46.981883+00', '2026-08-14'),
	('34df19e5-dcfe-46ed-ad3f-0350d4212c14', 'AdminJdH ha anulado su reserva del 14 de agosto de 2026 de 18:00 a 19:00.', '2026-08-14 15:02:06.737756+00', '2026-08-14'),
	('1e9cc3f9-eec1-43c6-9b86-861312c45a2a', 'AdminJdH ha reservado la pista el 14 de agosto de 2026 de 21:30 a 23:00.', '2026-08-14 15:02:15.552067+00', '2026-08-14'),
	('c56c1684-612b-4775-8173-fe74225148bc', 'AdminJdH ha anulado su reserva del 14 de agosto de 2026 de 21:30 a 23:00.', '2026-08-14 15:02:20.735812+00', '2026-08-14'),
	('57264413-69d1-4ac8-82f9-defe1b1274fb', 'dqa ha anulado su reserva del 15 de agosto de 2026 de 13:00 a 14:30.', '2026-08-14 15:02:57.726596+00', '2026-08-15'),
	('abe2ae64-9771-43d9-acf4-d20b894de7b5', 'dqa ha reservado la pista el 16 de agosto de 2026 de 19:00 a 20:00.', '2026-08-14 17:26:18.721484+00', '2026-08-16'),
	('32bda473-8d21-45cb-9884-50bdff1600b8', 'dqa ha anulado su reserva del 16 de agosto de 2026 de 19:00 a 20:00.', '2026-08-14 17:26:22.282134+00', '2026-08-16'),
	('c21ca84e-6ab2-4175-827b-b50500dd0bb5', 'dqa ha reservado la pista el 16 de agosto de 2026 de 19:00 a 20:00.', '2026-08-14 17:26:26.462925+00', '2026-08-16');


--
-- Data for Name: settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."settings" ("id", "summer_start", "summer_end", "created_at", "updated_at") VALUES
	(1, '2026-06-15', '2026-09-15', '2026-08-11 14:58:49.259213+00', '2026-08-11 14:58:49.259213+00');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 28, true);


--
-- Name: slots_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."slots_id_seq"', 14, true);


--
-- PostgreSQL database dump complete
--

-- \unrestrict 8pRa8cImPci9IIds3PiRHchcGZbfQXB1fO6JgWGgbLzLH52lO4WcoBZ77XjDfEq

RESET ALL;
