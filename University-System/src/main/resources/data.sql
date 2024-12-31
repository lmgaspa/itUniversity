--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2024-12-31 19:10:46

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
-- TOC entry 2 (class 3079 OID 32937)
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- TOC entry 4977 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- TOC entry 3 (class 3079 OID 32979)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 4978 (class 0 OID 0)
-- Dependencies: 3
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 32840)
-- Name: courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.courses (
    name character varying(255) NOT NULL,
    description text,
    created_at date DEFAULT now(),
    updated_at date DEFAULT now(),
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    image_url character varying(255) NOT NULL,
    "position" integer
);


ALTER TABLE public.courses OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 32867)
-- Name: enrollments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.enrollments (
    id bigint NOT NULL,
    user_id uuid NOT NULL,
    enrolled_at timestamp without time zone DEFAULT now(),
    course_id uuid
);


ALTER TABLE public.enrollments OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 32866)
-- Name: enrollments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.enrollments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.enrollments_id_seq OWNER TO postgres;

--
-- TOC entry 4979 (class 0 OID 0)
-- Dependencies: 221
-- Name: enrollments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.enrollments_id_seq OWNED BY public.enrollments.id;


--
-- TOC entry 224 (class 1259 OID 32928)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 32927)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_seq OWNER TO postgres;

--
-- TOC entry 4980 (class 0 OID 0)
-- Dependencies: 223
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- TOC entry 219 (class 1259 OID 32824)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    email character varying(255),
    name character varying(255),
    password character varying(255),
    role character varying(255) DEFAULT 'ROLE_USER'::character varying NOT NULL,
    CONSTRAINT users_role_check CHECK (((role)::text = ANY ((ARRAY['ROLE_ADMIN'::character varying, 'ROLE_USER'::character varying])::text[])))
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 4807 (class 2604 OID 32914)
-- Name: enrollments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollments ALTER COLUMN id SET DEFAULT nextval('public.enrollments_id_seq'::regclass);


--
-- TOC entry 4809 (class 2604 OID 32931)
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- TOC entry 4967 (class 0 OID 32840)
-- Dependencies: 220
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.courses (name, description, created_at, updated_at, id, image_url, "position") FROM stdin;
Angular Full Course	Master Angular from scratch and learn how to build production-ready applications	2024-12-30	2024-12-30	a1efb77e-e386-4c5c-84b8-c94a076d2e3d	https://openfeature.dev/assets/images/angular-e44fde5f13b7a1133f850e29d4ff0304.png	1
Vue.js	Learn the fundamentals of Vue.js	2024-12-30	2024-12-30	854da82d-b4fd-439c-871c-ad887c3bdaaf	https://runcode-app-public.s3.amazonaws.com/images/vuejs-online-editor-compiler.original.png	2
Node.js	Learn the fundamentals of Node.js and build scalable backend applications	2024-12-30	2024-12-30	ea6984c9-9d4b-4fdb-9016-e1a4397ad3f6	https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg	4
Java	Learn the fundamentals of Java programming and object-oriented concepts	2024-12-30	2024-12-30	d096575f-ce61-45fa-a0c0-6c60a7e4319d	https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg	5
Python	Discover Python programming and its use in data science and web development	2024-12-30	2024-12-30	5ddc1196-4949-4b6b-aeb8-f74069a2b1c6	https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg	6
MySQL	Learn how to manage relational databases using MySQL	2024-12-30	2024-12-30	7db692f6-c781-41d9-97f8-989ad9bce9c0	https://upload.wikimedia.org/wikipedia/commons/0/0a/MySQL_textlogo.svg	7
PostgreSQL	Understand and use PostgreSQL for advanced database management	2024-12-30	2024-12-30	fc24ef5e-242d-44f7-aad4-131d8d967fba	https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg	8
Docker	Master containerization with Docker to build scalable applications	2024-12-30	2024-12-30	8e0d7de9-c2b5-406a-b42a-1c642dbb382e	https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png	9
React JS	Learn the fundamentals of React.js	2024-12-30	2024-12-30	0de39780-b98b-465f-ad96-000a92146182	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ5xTmR1y7vS0lXIk7dhqrIBzDJQGq1XN9nQ&s	\N
Kubernetes	Learn Kubernetes for orchestration of containerized applications	2024-12-30	2024-12-30	7d318c01-e666-42ee-91a9-e8e00721a20f	https://kubernetes.io/images/kubernetes-horizontal-color.png	10
Spring	Master Spring Framework to build enterprise-level Java applications	2024-12-30	2024-12-30	08b74d13-d1b7-4c83-a652-736bb668537a	https://miro.medium.com/v2/resize:fit:490/1*aRUnth2T7XPMwCpMHrjfyQ.png	11
MongoDB	Learn NoSQL database management with MongoDB	2024-12-30	2024-12-30	bf9fb93e-d7fc-4a6a-a545-bec565a25cda	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuhkQN39A5Ldg6DFiEz8HZ0MrUTiM8nG8DGg&s	12
\.


--
-- TOC entry 4969 (class 0 OID 32867)
-- Dependencies: 222
-- Data for Name: enrollments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.enrollments (id, user_id, enrolled_at, course_id) FROM stdin;
1	2bde38dd-54c7-425c-b84d-40982cb8591c	2024-12-31 10:20:27.991571	a1efb77e-e386-4c5c-84b8-c94a076d2e3d
2	2bde38dd-54c7-425c-b84d-40982cb8591c	2024-12-31 10:23:22.524609	854da82d-b4fd-439c-871c-ad887c3bdaaf
3	9d61f56f-679c-4786-9453-5ec7420a76e0	2024-12-31 16:18:33.544167	854da82d-b4fd-439c-871c-ad887c3bdaaf
4	9d61f56f-679c-4786-9453-5ec7420a76e0	2024-12-31 16:19:04.517706	d096575f-ce61-45fa-a0c0-6c60a7e4319d
5	9d61f56f-679c-4786-9453-5ec7420a76e0	2024-12-31 16:25:38.244713	fc24ef5e-242d-44f7-aad4-131d8d967fba
6	94f66b67-9c40-4898-b28b-b4a6386a4a40	2024-12-31 16:36:13.556394	ea6984c9-9d4b-4fdb-9016-e1a4397ad3f6
7	94f66b67-9c40-4898-b28b-b4a6386a4a40	2024-12-31 16:36:17.846433	d096575f-ce61-45fa-a0c0-6c60a7e4319d
8	94f66b67-9c40-4898-b28b-b4a6386a4a40	2024-12-31 16:36:21.410301	a1efb77e-e386-4c5c-84b8-c94a076d2e3d
9	4f4a3913-49ae-4809-b9ce-fe80b0b7ea0e	2024-12-31 16:36:34.191652	a1efb77e-e386-4c5c-84b8-c94a076d2e3d
10	35fcbe1f-29b4-4e50-8377-f83896d4c7ce	2024-12-31 16:45:22.282159	7d318c01-e666-42ee-91a9-e8e00721a20f
11	35fcbe1f-29b4-4e50-8377-f83896d4c7ce	2024-12-31 16:45:28.214966	08b74d13-d1b7-4c83-a652-736bb668537a
12	35fcbe1f-29b4-4e50-8377-f83896d4c7ce	2024-12-31 16:45:33.039991	d096575f-ce61-45fa-a0c0-6c60a7e4319d
13	35fcbe1f-29b4-4e50-8377-f83896d4c7ce	2024-12-31 16:45:37.253756	ea6984c9-9d4b-4fdb-9016-e1a4397ad3f6
14	35fcbe1f-29b4-4e50-8377-f83896d4c7ce	2024-12-31 16:45:41.427105	854da82d-b4fd-439c-871c-ad887c3bdaaf
15	35fcbe1f-29b4-4e50-8377-f83896d4c7ce	2024-12-31 16:45:55.39403	a1efb77e-e386-4c5c-84b8-c94a076d2e3d
16	9d61f56f-679c-4786-9453-5ec7420a76e0	2024-12-31 17:32:43.348278	7db692f6-c781-41d9-97f8-989ad9bce9c0
17	9d61f56f-679c-4786-9453-5ec7420a76e0	2024-12-31 17:32:51.251491	ea6984c9-9d4b-4fdb-9016-e1a4397ad3f6
18	9d61f56f-679c-4786-9453-5ec7420a76e0	2024-12-31 17:35:30.383359	a1efb77e-e386-4c5c-84b8-c94a076d2e3d
19	9d61f56f-679c-4786-9453-5ec7420a76e0	2024-12-31 17:35:36.183461	0de39780-b98b-465f-ad96-000a92146182
20	1f3888e3-9c1d-44b2-9b26-9607b0f223c0	2024-12-31 17:38:21.847031	8e0d7de9-c2b5-406a-b42a-1c642dbb382e
21	1f3888e3-9c1d-44b2-9b26-9607b0f223c0	2024-12-31 17:38:28.501063	854da82d-b4fd-439c-871c-ad887c3bdaaf
22	1f3888e3-9c1d-44b2-9b26-9607b0f223c0	2024-12-31 17:38:33.659063	a1efb77e-e386-4c5c-84b8-c94a076d2e3d
23	1f3888e3-9c1d-44b2-9b26-9607b0f223c0	2024-12-31 17:38:38.314882	ea6984c9-9d4b-4fdb-9016-e1a4397ad3f6
24	c396eeb0-f81f-44da-8c97-2c10a969058f	2024-12-31 17:41:46.236137	a1efb77e-e386-4c5c-84b8-c94a076d2e3d
25	c396eeb0-f81f-44da-8c97-2c10a969058f	2024-12-31 17:41:54.207702	854da82d-b4fd-439c-871c-ad887c3bdaaf
26	cdc7a68e-34d8-46e6-ac1a-266bd9c54386	2024-12-31 18:14:02.547315	a1efb77e-e386-4c5c-84b8-c94a076d2e3d
27	cdc7a68e-34d8-46e6-ac1a-266bd9c54386	2024-12-31 18:20:52.95884	ea6984c9-9d4b-4fdb-9016-e1a4397ad3f6
28	cdc7a68e-34d8-46e6-ac1a-266bd9c54386	2024-12-31 18:20:57.878928	854da82d-b4fd-439c-871c-ad887c3bdaaf
\.


--
-- TOC entry 4971 (class 0 OID 32928)
-- Dependencies: 224
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, name) FROM stdin;
1	ROLE_ADMIN
2	ROLE_USER
\.


--
-- TOC entry 4966 (class 0 OID 32824)
-- Dependencies: 219
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, name, password, role) FROM stdin;
2bde38dd-54c7-425c-b84d-40982cb8591c	luh@gmail.com	Luiz	$2a$10$4aX4j0Sk7ROXeH6pMWqHH.hcFoTCBRJqwYX3ipsYg34DOeCwoTv4y	ROLE_USER
9d61f56f-679c-4786-9453-5ec7420a76e0	jp@gmail.com	jpp	$2a$10$/iUSWVk/Jhi2yZkjQlISNuy4hBYdZC3DduLZV8cqWkmZfvj.g92xS	ROLE_USER
5526c86f-716e-4ecf-b33c-14eac103cf13	jp12@gmail.com	jp12	$2a$10$N3f/1d9gVYMNyppKDaGVGu45UtuW7dtZZbUCIEPIsDSAUZI70DIie	ROLE_USER
07ab38b1-0d3e-4790-b26d-503b556201e0	luhx@gmail.com	LuizX	$2a$10$CgoVKjaIU87OjZWKKb0nEOFauACB03ip1dx1LFyAviefhp.tr881W	ROLE_USER
08a2dd11-2fa3-41ce-baf2-8bf11ca1b6b6	admin@example.com	admin	$2a$10$CPISKINDnNWeBLCgb06cSeaQxNkjhla3W0l1NFLMZUrOoUiYHXucu	ROLE_ADMIN
dea0bb18-65bb-4de0-9952-fc03f9a536dd	luhxxx@gmail.com	Luizxxx	$2a$10$GUbXyrMuF/fqMbOjfD23A.Z7lxmOP5Qoh8Yt/W7rM8UM7QZaY3YX2	ROLE_USER
0c339822-9aba-4587-b638-9c3a130d5f85	johndoe@gmail.com	John Doe	$2a$10$gxk4wcj/KwRNlEs5OEHr..ZJAw2wL4NWPl1P4R.g/nE2EOAGgrADu	ROLE_USER
b2edce4b-b95c-417a-bc16-d0a604c1fdfc	adminv@gmail.com	AdminV	$2a$10$UlLiUK4KUurQ4XTGCLRlUOp77n14HnH7XJZXxBCvSKu.t6lr3baKi	ROLE_USER
4f4a3913-49ae-4809-b9ce-fe80b0b7ea0e	xdd@gmail.com	XDD	$2a$10$NvFBCGlyPnO6rqIeQRPLs.EQhudaKc5QSAKp7jANmSTALDFJmCa86	ROLE_USER
94f66b67-9c40-4898-b28b-b4a6386a4a40	teste@gmail.com	Teste	$2a$10$rC/pCmCtgFot8LGMfacOk.GQMRWBP3Mj0HsmMZAXZ7/j5rzwYRd1u	ROLE_USER
35fcbe1f-29b4-4e50-8377-f83896d4c7ce	james@gmail.com	James	$2a$10$M46dZIYJbYlYo1DUeUq7G.oRdf74qrBvsSWDz/STZl5Rh/plCjn3C	ROLE_USER
1f3888e3-9c1d-44b2-9b26-9607b0f223c0	gui@gmail.com	gui	$2a$10$00TpSDJPI.3EOCjbPvYbMeKAWzlSFWXyHA5s5viwDwZ07LmrCYSEe	ROLE_USER
c396eeb0-f81f-44da-8c97-2c10a969058f	dog@gmail.com	dog	$2a$10$LKO3AsK0WLkARQoG/gyTbu8M4NuokZ8qcl4.S0HTfvSQ5mMeYRlHC	ROLE_USER
cdc7a68e-34d8-46e6-ac1a-266bd9c54386	number@gmail.com	123456	$2a$10$r/47uCWkNBeWpy00jOMfq.EpUJI95kl0BcTEjA8WGEOiNs7pKYhgu	ROLE_USER
\.


--
-- TOC entry 4981 (class 0 OID 0)
-- Dependencies: 221
-- Name: enrollments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.enrollments_id_seq', 28, true);


--
-- TOC entry 4982 (class 0 OID 0)
-- Dependencies: 223
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 1, false);


--
-- TOC entry 4814 (class 2606 OID 32936)
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- TOC entry 4816 (class 2606 OID 32916)
-- Name: enrollments enrollments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_pkey PRIMARY KEY (id);


--
-- TOC entry 4818 (class 2606 OID 32933)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 4812 (class 2606 OID 32832)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4819 (class 2606 OID 32974)
-- Name: enrollments enrollments_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id);


--
-- TOC entry 4820 (class 2606 OID 32876)
-- Name: enrollments enrollments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


-- Completed on 2024-12-31 19:10:46

--
-- PostgreSQL database dump complete
--

