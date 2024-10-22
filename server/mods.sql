--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3 (Debian 16.3-1.pgdg120+1)
-- Dumped by pg_dump version 17rc1

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: officemods_user
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO officemods_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: calculator; Type: TABLE; Schema: public; Owner: officemods_user
--

CREATE TABLE public.calculator (
    id integer NOT NULL,
    result character varying(30) NOT NULL,
    equation character varying(30) NOT NULL
);


ALTER TABLE public.calculator OWNER TO officemods_user;

--
-- Name: calculator_history_is_seq; Type: SEQUENCE; Schema: public; Owner: officemods_user
--

CREATE SEQUENCE public.calculator_history_is_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.calculator_history_is_seq OWNER TO officemods_user;

--
-- Name: calculator_history_is_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: officemods_user
--

ALTER SEQUENCE public.calculator_history_is_seq OWNED BY public.calculator.id;


--
-- Name: notepad; Type: TABLE; Schema: public; Owner: officemods_user
--

CREATE TABLE public.notepad (
    id integer NOT NULL,
    notes json NOT NULL,
    user_id character varying(60),
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.notepad OWNER TO officemods_user;

--
-- Name: notepad_id_seq; Type: SEQUENCE; Schema: public; Owner: officemods_user
--

CREATE SEQUENCE public.notepad_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notepad_id_seq OWNER TO officemods_user;

--
-- Name: notepad_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: officemods_user
--

ALTER SEQUENCE public.notepad_id_seq OWNED BY public.notepad.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: officemods_user
--

CREATE TABLE public.users (
    id character varying(60) NOT NULL,
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO officemods_user;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: officemods_user
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO officemods_user;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: officemods_user
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: calculator id; Type: DEFAULT; Schema: public; Owner: officemods_user
--

ALTER TABLE ONLY public.calculator ALTER COLUMN id SET DEFAULT nextval('public.calculator_history_is_seq'::regclass);


--
-- Name: notepad id; Type: DEFAULT; Schema: public; Owner: officemods_user
--

ALTER TABLE ONLY public.notepad ALTER COLUMN id SET DEFAULT nextval('public.notepad_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: officemods_user
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: calculator; Type: TABLE DATA; Schema: public; Owner: officemods_user
--

COPY public.calculator (id, result, equation) FROM stdin;
\.


--
-- Data for Name: notepad; Type: TABLE DATA; Schema: public; Owner: officemods_user
--

COPY public.notepad (id, notes, user_id, "timestamp") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: officemods_user
--

COPY public.users (id, "timestamp") FROM stdin;
\.


--
-- Name: calculator_history_is_seq; Type: SEQUENCE SET; Schema: public; Owner: officemods_user
--

SELECT pg_catalog.setval('public.calculator_history_is_seq', 1, false);


--
-- Name: notepad_id_seq; Type: SEQUENCE SET; Schema: public; Owner: officemods_user
--

SELECT pg_catalog.setval('public.notepad_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: officemods_user
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: calculator calculator_pkey; Type: CONSTRAINT; Schema: public; Owner: officemods_user
--

ALTER TABLE ONLY public.calculator
    ADD CONSTRAINT calculator_pkey PRIMARY KEY (id);


--
-- Name: notepad notepad_pkey; Type: CONSTRAINT; Schema: public; Owner: officemods_user
--

ALTER TABLE ONLY public.notepad
    ADD CONSTRAINT notepad_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: officemods_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: notepad userfk; Type: FK CONSTRAINT; Schema: public; Owner: officemods_user
--

ALTER TABLE ONLY public.notepad
    ADD CONSTRAINT userfk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON SEQUENCES TO officemods_user;


--
-- Name: DEFAULT PRIVILEGES FOR TYPES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TYPES TO officemods_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON FUNCTIONS TO officemods_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO officemods_user;


--
-- PostgreSQL database dump complete
--

