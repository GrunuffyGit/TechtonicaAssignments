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
-- Name: photo; Type: TABLE; Schema: public; Owner: tpl1219_2
--

CREATE TABLE public.photo (
    id integer NOT NULL,
    photourl character varying(30),
    created timestamp without time zone,
    createdby integer
);


ALTER TABLE public.photo OWNER TO tpl1219_2;

--
-- Name: photo_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1219_2
--

CREATE SEQUENCE public.photo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.photo_id_seq OWNER TO tpl1219_2;

--
-- Name: photo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl1219_2
--

ALTER SEQUENCE public.photo_id_seq OWNED BY public.photo.id;


--
-- Name: photoliked; Type: TABLE; Schema: public; Owner: tpl1219_2
--

CREATE TABLE public.photoliked (
    photo_id integer NOT NULL,
    liked_by integer NOT NULL,
    photo_liked_timestamp timestamp without time zone
);


ALTER TABLE public.photoliked OWNER TO tpl1219_2;

--
-- Name: photoliked_liked_by_seq; Type: SEQUENCE; Schema: public; Owner: tpl1219_2
--

CREATE SEQUENCE public.photoliked_liked_by_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.photoliked_liked_by_seq OWNER TO tpl1219_2;

--
-- Name: photoliked_liked_by_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl1219_2
--

ALTER SEQUENCE public.photoliked_liked_by_seq OWNED BY public.photoliked.liked_by;


--
-- Name: photoliked_photo_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1219_2
--

CREATE SEQUENCE public.photoliked_photo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.photoliked_photo_id_seq OWNER TO tpl1219_2;

--
-- Name: photoliked_photo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl1219_2
--

ALTER SEQUENCE public.photoliked_photo_id_seq OWNED BY public.photoliked.photo_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: tpl1219_2
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(30),
    email character varying(30),
    created timestamp without time zone
);


ALTER TABLE public.users OWNER TO tpl1219_2;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1219_2
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO tpl1219_2;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl1219_2
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: photo id; Type: DEFAULT; Schema: public; Owner: tpl1219_2
--

ALTER TABLE ONLY public.photo ALTER COLUMN id SET DEFAULT nextval('public.photo_id_seq'::regclass);


--
-- Name: photoliked photo_id; Type: DEFAULT; Schema: public; Owner: tpl1219_2
--

ALTER TABLE ONLY public.photoliked ALTER COLUMN photo_id SET DEFAULT nextval('public.photoliked_photo_id_seq'::regclass);


--
-- Name: photoliked liked_by; Type: DEFAULT; Schema: public; Owner: tpl1219_2
--

ALTER TABLE ONLY public.photoliked ALTER COLUMN liked_by SET DEFAULT nextval('public.photoliked_liked_by_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: tpl1219_2
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: photo; Type: TABLE DATA; Schema: public; Owner: tpl1219_2
--

COPY public.photo (id, photourl, created, createdby) FROM stdin;
1	url1.com	2020-02-06 00:00:00	1
2	url2.com	2020-02-06 00:00:00	1
3	url3.com	2020-02-06 00:00:00	2
\.


--
-- Data for Name: photoliked; Type: TABLE DATA; Schema: public; Owner: tpl1219_2
--

COPY public.photoliked (photo_id, liked_by, photo_liked_timestamp) FROM stdin;
1	1	2020-02-08 00:00:00
2	1	2020-02-08 00:00:00
3	2	2020-02-08 00:00:00
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: tpl1219_2
--

COPY public.users (id, username, email, created) FROM stdin;
1	TestUser1	example1@email.com	2020-02-05 00:00:00
2	TestUser2	example1@email.com	2020-02-05 00:00:00
3	TestUser3	example1@email.com	2020-02-05 00:00:00
\.


--
-- Name: photo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1219_2
--

SELECT pg_catalog.setval('public.photo_id_seq', 3, true);


--
-- Name: photoliked_liked_by_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1219_2
--

SELECT pg_catalog.setval('public.photoliked_liked_by_seq', 1, false);


--
-- Name: photoliked_photo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1219_2
--

SELECT pg_catalog.setval('public.photoliked_photo_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1219_2
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: photo photo_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1219_2
--

ALTER TABLE ONLY public.photo
    ADD CONSTRAINT photo_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1219_2
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: tpl1219_2
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: photo photo_createdby_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl1219_2
--

ALTER TABLE ONLY public.photo
    ADD CONSTRAINT photo_createdby_fkey FOREIGN KEY (createdby) REFERENCES public.users(id);


--
-- Name: photoliked photoliked_liked_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl1219_2
--

ALTER TABLE ONLY public.photoliked
    ADD CONSTRAINT photoliked_liked_by_fkey FOREIGN KEY (liked_by) REFERENCES public.users(id);


--
-- Name: photoliked photoliked_photo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl1219_2
--

ALTER TABLE ONLY public.photoliked
    ADD CONSTRAINT photoliked_photo_id_fkey FOREIGN KEY (photo_id) REFERENCES public.photo(id);


--
-- PostgreSQL database dump complete
--

