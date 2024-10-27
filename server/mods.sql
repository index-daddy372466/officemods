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

--
-- Name: delete_old_note(); Type: FUNCTION; Schema: public; Owner: officemods_user
--

CREATE FUNCTION public.delete_old_note() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
delete from notepad where timestamp < current_timestamp - interval '30 minutes';
return null;
end;
$$;


ALTER FUNCTION public.delete_old_note() OWNER TO officemods_user;

--
-- Name: delete_old_row(); Type: FUNCTION; Schema: public; Owner: officemods_user
--

CREATE FUNCTION public.delete_old_row() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
delete from users where timestamp < current_timestamp - interval '30 minutes';
return null;
end;
$$;


ALTER FUNCTION public.delete_old_row() OWNER TO officemods_user;

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
-- Name: calculator_history_id_seq; Type: SEQUENCE; Schema: public; Owner: officemods_user
--

CREATE SEQUENCE public.calculator_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.calculator_history_id_seq OWNER TO officemods_user;

--
-- Name: calculator_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: officemods_user
--

ALTER SEQUENCE public.calculator_history_id_seq OWNED BY public.calculator.id;


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
-- Name: noteusers; Type: TABLE; Schema: public; Owner: officemods_user
--

CREATE TABLE public.noteusers (
    id character varying(85) NOT NULL,
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.noteusers OWNER TO officemods_user;

--
-- Name: scores; Type: TABLE; Schema: public; Owner: officemods_user
--

CREATE TABLE public.scores (
    score_id integer NOT NULL,
    best integer NOT NULL,
    average integer NOT NULL,
    u_id integer NOT NULL,
    score integer NOT NULL,
    level integer
);


ALTER TABLE public.scores OWNER TO officemods_user;

--
-- Name: scores_score_id_seq; Type: SEQUENCE; Schema: public; Owner: officemods_user
--

CREATE SEQUENCE public.scores_score_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.scores_score_id_seq OWNER TO officemods_user;

--
-- Name: scores_score_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: officemods_user
--

ALTER SEQUENCE public.scores_score_id_seq OWNED BY public.scores.score_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: officemods_user
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    display_name character varying(60) NOT NULL,
    email character varying(60) NOT NULL,
    password character varying(60) NOT NULL
);


ALTER TABLE public.users OWNER TO officemods_user;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: officemods_user
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO officemods_user;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: officemods_user
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: calculator id; Type: DEFAULT; Schema: public; Owner: officemods_user
--

ALTER TABLE ONLY public.calculator ALTER COLUMN id SET DEFAULT nextval('public.calculator_history_id_seq'::regclass);


--
-- Name: notepad id; Type: DEFAULT; Schema: public; Owner: officemods_user
--

ALTER TABLE ONLY public.notepad ALTER COLUMN id SET DEFAULT nextval('public.notepad_id_seq'::regclass);


--
-- Name: scores score_id; Type: DEFAULT; Schema: public; Owner: officemods_user
--

ALTER TABLE ONLY public.scores ALTER COLUMN score_id SET DEFAULT nextval('public.scores_score_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: officemods_user
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


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
-- Data for Name: noteusers; Type: TABLE DATA; Schema: public; Owner: officemods_user
--

COPY public.noteusers (id, "timestamp") FROM stdin;
c0af5fa7457cc141f51e1ab575bd74ea5f39978a	2024-10-26 21:54:21.596828
66c229c040d8bf1e7c388d8b1128a3d7b05141d2	2024-10-26 22:14:37.13739
\.


--
-- Data for Name: scores; Type: TABLE DATA; Schema: public; Owner: officemods_user
--

COPY public.scores (score_id, best, average, u_id, score, level) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: officemods_user
--

COPY public.users (user_id, display_name, email, password) FROM stdin;
\.


--
-- Name: calculator_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: officemods_user
--

SELECT pg_catalog.setval('public.calculator_history_id_seq', 1, false);


--
-- Name: notepad_id_seq; Type: SEQUENCE SET; Schema: public; Owner: officemods_user
--

SELECT pg_catalog.setval('public.notepad_id_seq', 1, false);


--
-- Name: scores_score_id_seq; Type: SEQUENCE SET; Schema: public; Owner: officemods_user
--

SELECT pg_catalog.setval('public.scores_score_id_seq', 1, false);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: officemods_user
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1, false);


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
-- Name: noteusers noteusers_pkey; Type: CONSTRAINT; Schema: public; Owner: officemods_user
--

ALTER TABLE ONLY public.noteusers
    ADD CONSTRAINT noteusers_pkey PRIMARY KEY (id);


--
-- Name: scores scores_pkey; Type: CONSTRAINT; Schema: public; Owner: officemods_user
--

ALTER TABLE ONLY public.scores
    ADD CONSTRAINT scores_pkey PRIMARY KEY (score_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: officemods_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: notepad trig_delete_old_note; Type: TRIGGER; Schema: public; Owner: officemods_user
--

CREATE TRIGGER trig_delete_old_note AFTER INSERT ON public.notepad FOR EACH STATEMENT EXECUTE FUNCTION public.delete_old_note();


--
-- Name: notepad notepad_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: officemods_user
--

ALTER TABLE ONLY public.notepad
    ADD CONSTRAINT notepad_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.noteusers(id);


--
-- Name: scores scores_u_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: officemods_user
--

ALTER TABLE ONLY public.scores
    ADD CONSTRAINT scores_u_id_fkey FOREIGN KEY (u_id) REFERENCES public.users(user_id);


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

