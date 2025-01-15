--
-- PostgreSQL database dump
--

-- Dumped from database version 13.14 (Debian 13.14-0+deb11u1)
-- Dumped by pg_dump version 13.14 (Debian 13.14-0+deb11u1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: calculator; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.calculator (
    id integer NOT NULL,
    result character varying(30) NOT NULL,
    equation character varying(30) NOT NULL
);


ALTER TABLE public.calculator OWNER TO postgres;

--
-- Name: calculator_history_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.calculator_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.calculator_history_id_seq OWNER TO postgres;

--
-- Name: calculator_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.calculator_history_id_seq OWNED BY public.calculator.id;


--
-- Name: calculator id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.calculator ALTER COLUMN id SET DEFAULT nextval('public.calculator_history_id_seq'::regclass);


--
-- Data for Name: calculator; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.calculator (id, result, equation) FROM stdin;
\.


--
-- Name: calculator_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.calculator_history_id_seq', 1, false);


--
-- Name: calculator calculator_equation_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.calculator
    ADD CONSTRAINT calculator_equation_key UNIQUE (equation);


--
-- Name: calculator calculator_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.calculator
    ADD CONSTRAINT calculator_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--