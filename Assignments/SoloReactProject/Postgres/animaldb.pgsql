--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

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
-- Name: individuals; Type: TABLE; Schema: public; Owner: dbuser
--

CREATE TABLE public.individuals (
    id integer NOT NULL,
    nickname character varying(30),
    species integer,
    created date
);


ALTER TABLE public.individuals OWNER TO dbuser;

--
-- Name: individuals_id_seq; Type: SEQUENCE; Schema: public; Owner: dbuser
--

CREATE SEQUENCE public.individuals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.individuals_id_seq OWNER TO dbuser;

--
-- Name: individuals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dbuser
--

ALTER SEQUENCE public.individuals_id_seq OWNED BY public.individuals.id;


--
-- Name: sightings; Type: TABLE; Schema: public; Owner: dbuser
--

CREATE TABLE public.sightings (
    id integer NOT NULL,
    individual integer,
    location character varying(50),
    health character varying(50),
    poc character varying(30),
    date_spotted date
);


ALTER TABLE public.sightings OWNER TO dbuser;

--
-- Name: sightings_id_seq; Type: SEQUENCE; Schema: public; Owner: dbuser
--

CREATE SEQUENCE public.sightings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sightings_id_seq OWNER TO dbuser;

--
-- Name: sightings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dbuser
--

ALTER SEQUENCE public.sightings_id_seq OWNED BY public.sightings.id;


--
-- Name: species; Type: TABLE; Schema: public; Owner: dbuser
--

CREATE TABLE public.species (
    id integer NOT NULL,
    common_name character varying(50),
    scientific_name character varying(50),
    population integer,
    status_code character varying(2),
    created date
);


ALTER TABLE public.species OWNER TO dbuser;

--
-- Name: species_id_seq; Type: SEQUENCE; Schema: public; Owner: dbuser
--

CREATE SEQUENCE public.species_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.species_id_seq OWNER TO dbuser;

--
-- Name: species_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dbuser
--

ALTER SEQUENCE public.species_id_seq OWNED BY public.species.id;


--
-- Name: individuals id; Type: DEFAULT; Schema: public; Owner: dbuser
--

ALTER TABLE ONLY public.individuals ALTER COLUMN id SET DEFAULT nextval('public.individuals_id_seq'::regclass);


--
-- Name: sightings id; Type: DEFAULT; Schema: public; Owner: dbuser
--

ALTER TABLE ONLY public.sightings ALTER COLUMN id SET DEFAULT nextval('public.sightings_id_seq'::regclass);


--
-- Name: species id; Type: DEFAULT; Schema: public; Owner: dbuser
--

ALTER TABLE ONLY public.species ALTER COLUMN id SET DEFAULT nextval('public.species_id_seq'::regclass);


--
-- Data for Name: individuals; Type: TABLE DATA; Schema: public; Owner: dbuser
--

COPY public.individuals (id, nickname, species, created) FROM stdin;
9	LEMON	3	2020-03-12
10	LIME	3	2020-03-12
11	LUN	3	2020-03-12
12	LUK	3	2020-03-12
13	LEMONS	3	2020-03-12
14	LIMES	3	2020-03-12
16	KANE	3	2020-03-12
17	MEOW	4	2020-03-12
18	MEOWTH	4	2020-03-12
19	LEO	4	2020-03-12
20	PIKAKA	6	2020-03-12
\.


--
-- Data for Name: sightings; Type: TABLE DATA; Schema: public; Owner: dbuser
--

COPY public.sightings (id, individual, location, health, poc, date_spotted) FROM stdin;
7	9	SF	okay	example@example.com	2020-03-12
13	9	SF	okay	example@example.com	2020-03-18
14	9	SF	okay	example@example.com	2020-03-18
15	9	SF	okay	example@example.com	2020-03-18
16	9	SF	okay	example@example.com	2020-03-18
17	9	SF	okay	example@example.com	2020-03-18
18	9	SF	okay	example@example.com	2020-03-18
19	9	SF	okay	example@example.com	2020-03-18
20	9	SF	okay	example@example.com	2020-03-18
21	9	SF	okay	example@example.com	2020-03-18
22	9	SF	okay	example@example.com	2020-03-12
23	20	SF	okay	example@example.com	2020-03-12
\.


--
-- Data for Name: species; Type: TABLE DATA; Schema: public; Owner: dbuser
--

COPY public.species (id, common_name, scientific_name, population, status_code, created) FROM stdin;
3	dog	canis familiaris	20	LC	2020-03-11
4	cat	felis catus	20	LC	2020-03-11
6	PIKACHU	PIKA	100	LC	2020-03-12
7	PEW	PEW	100	LC	2020-03-12
\.


--
-- Name: individuals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dbuser
--

SELECT pg_catalog.setval('public.individuals_id_seq', 20, true);


--
-- Name: sightings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dbuser
--

SELECT pg_catalog.setval('public.sightings_id_seq', 23, true);


--
-- Name: species_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dbuser
--

SELECT pg_catalog.setval('public.species_id_seq', 7, true);


--
-- Name: individuals individuals_pkey; Type: CONSTRAINT; Schema: public; Owner: dbuser
--

ALTER TABLE ONLY public.individuals
    ADD CONSTRAINT individuals_pkey PRIMARY KEY (id);


--
-- Name: sightings sightings_pkey; Type: CONSTRAINT; Schema: public; Owner: dbuser
--

ALTER TABLE ONLY public.sightings
    ADD CONSTRAINT sightings_pkey PRIMARY KEY (id);


--
-- Name: species species_pkey; Type: CONSTRAINT; Schema: public; Owner: dbuser
--

ALTER TABLE ONLY public.species
    ADD CONSTRAINT species_pkey PRIMARY KEY (id);


--
-- Name: individuals individuals_species_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dbuser
--

ALTER TABLE ONLY public.individuals
    ADD CONSTRAINT individuals_species_fkey FOREIGN KEY (species) REFERENCES public.species(id) ON DELETE CASCADE;


--
-- Name: sightings sightings_individual_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dbuser
--

ALTER TABLE ONLY public.sightings
    ADD CONSTRAINT sightings_individual_fkey FOREIGN KEY (individual) REFERENCES public.individuals(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

