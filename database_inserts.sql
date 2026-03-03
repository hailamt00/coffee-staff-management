--
-- PostgreSQL database dump
--

\restrict mkB7cTbvhOPhMYA6agB717tGZFyOKpNlUPnFCpzc9HATgRpnoBy9luE4qVH8DyB

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: __EFMigrationsHistory; Type: TABLE; Schema: public; Owner: csm_user
--

CREATE TABLE public."__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL
);


ALTER TABLE public."__EFMigrationsHistory" OWNER TO csm_user;

--
-- Name: activities; Type: TABLE; Schema: public; Owner: csm_user
--

CREATE TABLE public.activities (
    id integer NOT NULL,
    action text,
    ip_address character varying(50),
    user_agent text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.activities OWNER TO csm_user;

--
-- Name: activities_id_seq; Type: SEQUENCE; Schema: public; Owner: csm_user
--

CREATE SEQUENCE public.activities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.activities_id_seq OWNER TO csm_user;

--
-- Name: activities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: csm_user
--

ALTER SEQUENCE public.activities_id_seq OWNED BY public.activities.id;


--
-- Name: admin; Type: TABLE; Schema: public; Owner: csm_user
--

CREATE TABLE public.admin (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password_hash text NOT NULL,
    full_name character varying(100),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.admin OWNER TO csm_user;

--
-- Name: admin_id_seq; Type: SEQUENCE; Schema: public; Owner: csm_user
--

CREATE SEQUENCE public.admin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admin_id_seq OWNER TO csm_user;

--
-- Name: admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: csm_user
--

ALTER SEQUENCE public.admin_id_seq OWNED BY public.admin.id;


--
-- Name: attendance; Type: TABLE; Schema: public; Owner: csm_user
--

CREATE TABLE public.attendance (
    id integer NOT NULL,
    schedule_id integer,
    employee_id integer,
    check_in timestamp without time zone,
    check_out timestamp without time zone,
    total_hours numeric(5,2),
    note text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.attendance OWNER TO csm_user;

--
-- Name: attendance_id_seq; Type: SEQUENCE; Schema: public; Owner: csm_user
--

CREATE SEQUENCE public.attendance_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.attendance_id_seq OWNER TO csm_user;

--
-- Name: attendance_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: csm_user
--

ALTER SEQUENCE public.attendance_id_seq OWNED BY public.attendance.id;


--
-- Name: employee_code_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employee_code_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.employee_code_seq OWNER TO postgres;

--
-- Name: employees; Type: TABLE; Schema: public; Owner: csm_user
--

CREATE TABLE public.employees (
    id integer NOT NULL,
    code character varying(10) DEFAULT lpad((nextval('public.employee_code_seq'::regclass))::text, 3, '0'::text) NOT NULL,
    name character varying(150) NOT NULL,
    phone character varying(20) NOT NULL,
    cid character varying(20),
    gender character varying(10),
    dob date,
    hire_date date,
    service_salary numeric(12,2) DEFAULT 0,
    barista_salary numeric(12,2) DEFAULT 0,
    status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.employees OWNER TO csm_user;

--
-- Name: employees_id_seq; Type: SEQUENCE; Schema: public; Owner: csm_user
--

CREATE SEQUENCE public.employees_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.employees_id_seq OWNER TO csm_user;

--
-- Name: employees_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: csm_user
--

ALTER SEQUENCE public.employees_id_seq OWNED BY public.employees.id;


--
-- Name: payroll_details; Type: TABLE; Schema: public; Owner: csm_user
--

CREATE TABLE public.payroll_details (
    id integer NOT NULL,
    payroll_id integer,
    attendance_id integer,
    hours numeric(5,2),
    rate numeric(12,2),
    amount numeric(12,2),
    type character varying(50)
);


ALTER TABLE public.payroll_details OWNER TO csm_user;

--
-- Name: payroll_details_id_seq; Type: SEQUENCE; Schema: public; Owner: csm_user
--

CREATE SEQUENCE public.payroll_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payroll_details_id_seq OWNER TO csm_user;

--
-- Name: payroll_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: csm_user
--

ALTER SEQUENCE public.payroll_details_id_seq OWNED BY public.payroll_details.id;


--
-- Name: payrolls; Type: TABLE; Schema: public; Owner: csm_user
--

CREATE TABLE public.payrolls (
    id integer NOT NULL,
    employee_id integer,
    month integer,
    year integer,
    total_salary numeric(12,2),
    status character varying(20) DEFAULT 'Draft'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.payrolls OWNER TO csm_user;

--
-- Name: payrolls_id_seq; Type: SEQUENCE; Schema: public; Owner: csm_user
--

CREATE SEQUENCE public.payrolls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payrolls_id_seq OWNER TO csm_user;

--
-- Name: payrolls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: csm_user
--

ALTER SEQUENCE public.payrolls_id_seq OWNED BY public.payrolls.id;


--
-- Name: positions; Type: TABLE; Schema: public; Owner: csm_user
--

CREATE TABLE public.positions (
    id integer NOT NULL,
    name character varying(150) NOT NULL,
    status boolean DEFAULT true
);


ALTER TABLE public.positions OWNER TO csm_user;

--
-- Name: positions_id_seq; Type: SEQUENCE; Schema: public; Owner: csm_user
--

CREATE SEQUENCE public.positions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.positions_id_seq OWNER TO csm_user;

--
-- Name: positions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: csm_user
--

ALTER SEQUENCE public.positions_id_seq OWNED BY public.positions.id;


--
-- Name: refresh_tokens; Type: TABLE; Schema: public; Owner: csm_user
--

CREATE TABLE public.refresh_tokens (
    id integer NOT NULL,
    admin_id integer,
    token text NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    is_revoked boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.refresh_tokens OWNER TO csm_user;

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: csm_user
--

CREATE SEQUENCE public.refresh_tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.refresh_tokens_id_seq OWNER TO csm_user;

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: csm_user
--

ALTER SEQUENCE public.refresh_tokens_id_seq OWNED BY public.refresh_tokens.id;


--
-- Name: revenues; Type: TABLE; Schema: public; Owner: csm_user
--

CREATE TABLE public.revenues (
    id integer NOT NULL,
    schedule_id integer,
    employee_id integer,
    work_date date,
    opening_balance numeric(12,2),
    cash numeric(12,2),
    bank numeric(12,2),
    net numeric(12,2),
    revenue numeric(12,2),
    deviation numeric(12,2),
    note text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.revenues OWNER TO csm_user;

--
-- Name: revenues_id_seq; Type: SEQUENCE; Schema: public; Owner: csm_user
--

CREATE SEQUENCE public.revenues_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.revenues_id_seq OWNER TO csm_user;

--
-- Name: revenues_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: csm_user
--

ALTER SEQUENCE public.revenues_id_seq OWNED BY public.revenues.id;


--
-- Name: revenues_v2; Type: TABLE; Schema: public; Owner: csm_user
--

CREATE TABLE public.revenues_v2 (
    id integer,
    schedule_id integer,
    employee_id integer,
    work_date date,
    opening_balance numeric(12,2),
    cash numeric(12,2),
    bank numeric(12,2),
    net numeric(12,2),
    revenue numeric(12,2),
    deviation numeric(12,2),
    note text,
    created_at timestamp without time zone,
    "Expenses" numeric DEFAULT 0.0 NOT NULL,
    "Income" numeric DEFAULT 0.0 NOT NULL
);


ALTER TABLE public.revenues_v2 OWNER TO csm_user;

--
-- Name: reward_penalty_types; Type: TABLE; Schema: public; Owner: csm_user
--

CREATE TABLE public.reward_penalty_types (
    id integer NOT NULL,
    name character varying(100),
    type character varying(20),
    amount numeric(12,2) DEFAULT 0,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT reward_penalty_types_type_check CHECK (((type)::text = ANY ((ARRAY['Reward'::character varying, 'Penalty'::character varying])::text[])))
);


ALTER TABLE public.reward_penalty_types OWNER TO csm_user;

--
-- Name: reward_penalty_types_id_seq; Type: SEQUENCE; Schema: public; Owner: csm_user
--

CREATE SEQUENCE public.reward_penalty_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reward_penalty_types_id_seq OWNER TO csm_user;

--
-- Name: reward_penalty_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: csm_user
--

ALTER SEQUENCE public.reward_penalty_types_id_seq OWNED BY public.reward_penalty_types.id;


--
-- Name: rewards_penalties_v2; Type: TABLE; Schema: public; Owner: csm_user
--

CREATE TABLE public.rewards_penalties_v2 (
    id integer NOT NULL,
    employee_id integer,
    attendance_id integer,
    type_id integer,
    amount numeric(12,2),
    reason text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.rewards_penalties_v2 OWNER TO csm_user;

--
-- Name: rewards_penalties_v2_id_seq; Type: SEQUENCE; Schema: public; Owner: csm_user
--

CREATE SEQUENCE public.rewards_penalties_v2_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rewards_penalties_v2_id_seq OWNER TO csm_user;

--
-- Name: rewards_penalties_v2_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: csm_user
--

ALTER SEQUENCE public.rewards_penalties_v2_id_seq OWNED BY public.rewards_penalties_v2.id;


--
-- Name: schedule_requests; Type: TABLE; Schema: public; Owner: csm_user
--

CREATE TABLE public.schedule_requests (
    id integer NOT NULL,
    employee_id integer,
    shift_id integer,
    work_date date,
    note text,
    status character varying(20) DEFAULT 'pending'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.schedule_requests OWNER TO csm_user;

--
-- Name: schedule_requests_id_seq; Type: SEQUENCE; Schema: public; Owner: csm_user
--

CREATE SEQUENCE public.schedule_requests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.schedule_requests_id_seq OWNER TO csm_user;

--
-- Name: schedule_requests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: csm_user
--

ALTER SEQUENCE public.schedule_requests_id_seq OWNED BY public.schedule_requests.id;


--
-- Name: schedules; Type: TABLE; Schema: public; Owner: csm_user
--

CREATE TABLE public.schedules (
    id integer NOT NULL,
    employee_id integer,
    shift_id integer,
    work_date date,
    approved_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    note text
);


ALTER TABLE public.schedules OWNER TO csm_user;

--
-- Name: schedules_id_seq; Type: SEQUENCE; Schema: public; Owner: csm_user
--

CREATE SEQUENCE public.schedules_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.schedules_id_seq OWNER TO csm_user;

--
-- Name: schedules_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: csm_user
--

ALTER SEQUENCE public.schedules_id_seq OWNED BY public.schedules.id;


--
-- Name: shifts; Type: TABLE; Schema: public; Owner: csm_user
--

CREATE TABLE public.shifts (
    id integer NOT NULL,
    position_id integer,
    name character varying(50) NOT NULL,
    start_time time without time zone,
    end_time time without time zone,
    status boolean DEFAULT true,
    is_enabled boolean DEFAULT true NOT NULL
);


ALTER TABLE public.shifts OWNER TO csm_user;

--
-- Name: shifts_id_seq; Type: SEQUENCE; Schema: public; Owner: csm_user
--

CREATE SEQUENCE public.shifts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.shifts_id_seq OWNER TO csm_user;

--
-- Name: shifts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: csm_user
--

ALTER SEQUENCE public.shifts_id_seq OWNED BY public.shifts.id;


--
-- Name: transactions; Type: TABLE; Schema: public; Owner: csm_user
--

CREATE TABLE public.transactions (
    id integer NOT NULL,
    revenue_id integer,
    type character varying(10),
    amount numeric(12,2),
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT transactions_type_check CHECK (((type)::text = ANY ((ARRAY['Income'::character varying, 'Expense'::character varying])::text[])))
);


ALTER TABLE public.transactions OWNER TO csm_user;

--
-- Name: transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: csm_user
--

CREATE SEQUENCE public.transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.transactions_id_seq OWNER TO csm_user;

--
-- Name: transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: csm_user
--

ALTER SEQUENCE public.transactions_id_seq OWNED BY public.transactions.id;


--
-- Name: activities id; Type: DEFAULT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.activities ALTER COLUMN id SET DEFAULT nextval('public.activities_id_seq'::regclass);


--
-- Name: admin id; Type: DEFAULT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.admin ALTER COLUMN id SET DEFAULT nextval('public.admin_id_seq'::regclass);


--
-- Name: attendance id; Type: DEFAULT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.attendance ALTER COLUMN id SET DEFAULT nextval('public.attendance_id_seq'::regclass);


--
-- Name: employees id; Type: DEFAULT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.employees ALTER COLUMN id SET DEFAULT nextval('public.employees_id_seq'::regclass);


--
-- Name: payroll_details id; Type: DEFAULT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.payroll_details ALTER COLUMN id SET DEFAULT nextval('public.payroll_details_id_seq'::regclass);


--
-- Name: payrolls id; Type: DEFAULT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.payrolls ALTER COLUMN id SET DEFAULT nextval('public.payrolls_id_seq'::regclass);


--
-- Name: positions id; Type: DEFAULT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.positions ALTER COLUMN id SET DEFAULT nextval('public.positions_id_seq'::regclass);


--
-- Name: refresh_tokens id; Type: DEFAULT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('public.refresh_tokens_id_seq'::regclass);


--
-- Name: revenues id; Type: DEFAULT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.revenues ALTER COLUMN id SET DEFAULT nextval('public.revenues_id_seq'::regclass);


--
-- Name: reward_penalty_types id; Type: DEFAULT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.reward_penalty_types ALTER COLUMN id SET DEFAULT nextval('public.reward_penalty_types_id_seq'::regclass);


--
-- Name: rewards_penalties_v2 id; Type: DEFAULT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.rewards_penalties_v2 ALTER COLUMN id SET DEFAULT nextval('public.rewards_penalties_v2_id_seq'::regclass);


--
-- Name: schedule_requests id; Type: DEFAULT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.schedule_requests ALTER COLUMN id SET DEFAULT nextval('public.schedule_requests_id_seq'::regclass);


--
-- Name: schedules id; Type: DEFAULT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.schedules ALTER COLUMN id SET DEFAULT nextval('public.schedules_id_seq'::regclass);


--
-- Name: shifts id; Type: DEFAULT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.shifts ALTER COLUMN id SET DEFAULT nextval('public.shifts_id_seq'::regclass);


--
-- Name: transactions id; Type: DEFAULT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);


--
-- Data for Name: __EFMigrationsHistory; Type: TABLE DATA; Schema: public; Owner: csm_user
--

INSERT INTO public."__EFMigrationsHistory" VALUES ('20260210021421_SyncWithSchema', '10.0.0');
INSERT INTO public."__EFMigrationsHistory" VALUES ('20260210030541_UpdateRewardPenaltySchema', '10.0.0');
INSERT INTO public."__EFMigrationsHistory" VALUES ('20260226031119_AddReasonToRewardPenaltyV2', '10.0.0');
INSERT INTO public."__EFMigrationsHistory" VALUES ('20260224052015_AddRevenueIncomeExpense', '10.0.0');
INSERT INTO public."__EFMigrationsHistory" VALUES ('20260302021919_SyncPendingChanges_v2', '10.0.0');


--
-- Data for Name: activities; Type: TABLE DATA; Schema: public; Owner: csm_user
--

INSERT INTO public.activities VALUES (16, 'Create Employee: Test Employee 1771907204299 (032) (ID: 32) - user: 5', NULL, NULL, '2026-02-24 11:26:44.750699');
INSERT INTO public.activities VALUES (17, 'Update Employee: Test Employee 1771907204299 (032) (ID: 32) - user: 5', NULL, NULL, '2026-02-24 11:26:45.106792');
INSERT INTO public.activities VALUES (18, 'Delete Employee: Test Employee 1771907204299 (032) (ID: 32) - user: 5', NULL, NULL, '2026-02-24 11:26:45.29674');
INSERT INTO public.activities VALUES (19, 'Create Employee: Test Employee 1771913823073 (033) (ID: 33) - user: 5', NULL, NULL, '2026-02-24 13:17:03.317017');
INSERT INTO public.activities VALUES (20, 'Update Employee: Test Employee 1771913823073 (033) (ID: 33) - user: 5', NULL, NULL, '2026-02-24 13:17:03.55742');
INSERT INTO public.activities VALUES (21, 'Delete Employee: Test Employee 1771913823073 (033) (ID: 33) - user: 5', NULL, NULL, '2026-02-24 13:17:03.62711');
INSERT INTO public.activities VALUES (22, 'Create Employee: Test Employee 1771977826716 (034) (ID: 34) - user: 5', NULL, NULL, '2026-02-25 07:03:47.141581');
INSERT INTO public.activities VALUES (23, 'Create Employee: Test Employee 1771978024792 (035) (ID: 35) - user: 5', NULL, NULL, '2026-02-25 07:07:04.803722');
INSERT INTO public.activities VALUES (24, 'Update Employee: Test Employee 1771978024792 (035) (ID: 35) - user: 5', NULL, NULL, '2026-02-25 07:07:05.053837');
INSERT INTO public.activities VALUES (25, 'Delete Employee: Test Employee 1771978024792 (035) (ID: 35) - user: 5', NULL, NULL, '2026-02-25 07:07:05.128159');
INSERT INTO public.activities VALUES (26, 'Apply RewardPenalty: Làm tốt for Trịnh Hải Lâm: 500,000 VND - user: 5', NULL, NULL, '2026-02-25 07:13:36.765996');
INSERT INTO public.activities VALUES (27, 'Apply RewardPenalty: Đi trễ for Thanh Tú: 150,000 VND - user: 5', NULL, NULL, '2026-02-25 07:13:36.783063');
INSERT INTO public.activities VALUES (28, 'Apply RewardPenalty: Đi trễ for Trịnh Hải Lâm: 100,000 VND - user: 5', NULL, NULL, '2026-02-26 09:33:14.312468');
INSERT INTO public.activities VALUES (29, 'Apply RewardPenalty: Nghỉ không phép for Trịnh Hải Lâm: 100,000 VND - user: 5', NULL, NULL, '2026-02-26 09:33:56.241318');
INSERT INTO public.activities VALUES (30, 'Apply RewardPenalty: Thiếu đồng phục for Trịnh Hải Lâm: 100,000 VND - user: 5', NULL, NULL, '2026-02-26 09:34:11.118158');
INSERT INTO public.activities VALUES (31, 'Apply RewardPenalty: Làm tốt for Thanh Tú: 50,000 VND - user: 5', NULL, NULL, '2026-02-26 09:46:47.750874');
INSERT INTO public.activities VALUES (32, 'Apply RewardPenalty: Làm tốt for Trịnh Hải Lâm: 50,000 VND - user: 5', NULL, NULL, '2026-02-26 11:35:24.22998');
INSERT INTO public.activities VALUES (33, 'Apply RewardPenalty: Đi trễ for Trịnh Hải Lâm: 20,000 VND - user: 5', NULL, NULL, '2026-02-26 11:41:09.308421');
INSERT INTO public.activities VALUES (34, 'Apply RewardPenalty: Làm tốt for Thanh Tú: 50,000 VND - user: 5', NULL, NULL, '2026-02-26 11:41:26.821454');
INSERT INTO public.activities VALUES (35, 'Apply RewardPenalty: Làm tốt for Phương Ly: 50,000 VND - user: 5', NULL, NULL, '2026-02-26 11:47:55.583457');
INSERT INTO public.activities VALUES (36, 'Apply RewardPenalty: Hỗ trợ ca gấp for Phương Ly: 30,000 VND - user: 5', NULL, NULL, '2026-02-26 11:47:59.616643');
INSERT INTO public.activities VALUES (37, 'Apply RewardPenalty: Đi trễ for Phạm Thị Vinh: 20,000 VND - user: 5', NULL, NULL, '2026-02-26 11:48:09.980003');
INSERT INTO public.activities VALUES (38, 'Apply RewardPenalty: Nghỉ không phép for Trần Phú: 0 VND - user: 5', NULL, NULL, '2026-02-26 11:48:15.963512');
INSERT INTO public.activities VALUES (39, 'Update Employee: Trịnh Hải Lâm (078) (ID: 50) - user: ', NULL, NULL, '2026-02-26 15:27:17.958931');
INSERT INTO public.activities VALUES (40, 'Update Employee: Trịnh Hải Lâm (078) (ID: 50) - user: ', NULL, NULL, '2026-02-26 15:27:44.620868');
INSERT INTO public.activities VALUES (41, 'Update Employee: Trịnh Hải Lâm (002) (ID: 71) - user: 5', NULL, NULL, '2026-02-26 15:57:53.575913');
INSERT INTO public.activities VALUES (42, 'Apply RewardPenalty: Làm tốt/Xuất sắc for Trịnh Hải Lâm: 50,000 VND - user: 5', NULL, NULL, '2026-02-27 08:38:11.480086');
INSERT INTO public.activities VALUES (43, 'Apply RewardPenalty: Chuyên cần for Trịnh Hải Lâm: 100,000 VND - user: 5', NULL, NULL, '2026-02-27 08:38:17.585462');
INSERT INTO public.activities VALUES (44, 'Apply RewardPenalty: Đi trễ for Nguyễn Nhật Phương Vy: 20,000 VND - user: 5', NULL, NULL, '2026-02-27 08:38:25.752779');
INSERT INTO public.activities VALUES (45, 'Apply RewardPenalty: Đi trễ for Thạch Nhất Khang: 20,000 VND - user: 5', NULL, NULL, '2026-02-27 08:38:31.665128');
INSERT INTO public.activities VALUES (46, 'Apply RewardPenalty: Hỗ trợ ca gấp for Ngọc Hân: 30,000 VND - user: 5', NULL, NULL, '2026-02-27 08:45:38.622298');
INSERT INTO public.activities VALUES (47, 'Create Employee: Test Emp (036) (ID: 80) - user: ', NULL, NULL, '2026-03-03 09:03:01.90762');
INSERT INTO public.activities VALUES (48, 'Update Employee: Test Emp Edited (036) (ID: 80) - user: ', NULL, NULL, '2026-03-03 09:04:50.204836');
INSERT INTO public.activities VALUES (49, 'Delete Employee: Test Emp Edited (036) (ID: 80) - user: ', NULL, NULL, '2026-03-03 09:05:49.304615');
INSERT INTO public.activities VALUES (50, 'Create Employee: Hải Lâm (037) (ID: 81) - user: 5', NULL, NULL, '2026-03-03 09:12:06.221161');
INSERT INTO public.activities VALUES (51, 'Update Employee: Hải Lâm (037) (ID: 81) - user: 5', NULL, NULL, '2026-03-03 09:12:32.409031');
INSERT INTO public.activities VALUES (52, 'Delete Employee: Hải Lâm (037) (ID: 81) - user: 5', NULL, NULL, '2026-03-03 09:12:46.317486');
INSERT INTO public.activities VALUES (53, 'Update Employee: Thanh Tu Edit (001) (ID: 70) - user: ', NULL, NULL, '2026-03-03 09:48:23.549816');


--
-- Data for Name: admin; Type: TABLE DATA; Schema: public; Owner: csm_user
--

INSERT INTO public.admin VALUES (5, 'admin', '$2a$11$Z8XH4logPfLWDf3gikLqRu9VW3aV1VGLlviI5PoVSMy.etJa8ooIW', 'System Administrator', '2026-02-23 13:33:40.548775');


--
-- Data for Name: attendance; Type: TABLE DATA; Schema: public; Owner: csm_user
--

INSERT INTO public.attendance VALUES (1291, NULL, 79, '2026-03-13 00:00:00', '2026-03-13 00:00:00', 7.00, '[Admin added]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1292, NULL, 77, '2026-03-02 00:00:00', NULL, NULL, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1293, NULL, 75, '2026-03-01 00:00:00', '2026-03-01 00:00:00', 4.73, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1294, NULL, 71, '2026-03-01 00:00:00', '2026-03-01 00:00:00', 4.75, '[Admin added]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1295, NULL, 79, '2026-03-01 00:00:00', '2026-03-01 00:00:00', 5.12, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1296, NULL, 70, '2026-03-01 00:00:00', '2026-03-01 00:00:00', 5.00, '[Admin added]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1297, NULL, 72, '2026-03-01 00:00:00', '2026-03-01 00:00:00', 10.07, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1298, NULL, 75, '2026-03-01 00:00:00', '2026-03-01 00:00:00', 5.88, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1299, NULL, 71, '2026-03-01 00:00:00', '2026-03-01 00:00:00', 7.00, '[Admin added]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1300, NULL, 72, '2026-02-28 00:00:00', '2026-02-28 00:00:00', 4.62, '[Admin Edited]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1301, NULL, 75, '2026-02-28 00:00:00', '2026-02-28 00:00:00', 2.35, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1302, NULL, 79, '2026-02-28 00:00:00', '2026-02-28 00:00:00', 8.25, '[Admin Edited]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1303, NULL, 70, '2026-02-28 00:00:00', '2026-02-28 00:00:00', 5.00, '[Admin added]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1304, NULL, 75, '2026-02-28 00:00:00', '2026-02-28 00:00:00', 5.40, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1305, NULL, 77, '2026-02-28 00:00:00', '2026-02-28 00:00:00', 2.78, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1306, NULL, 75, '2026-02-27 00:00:00', '2026-02-27 00:00:00', 4.12, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1307, NULL, 71, '2026-02-27 00:00:00', '2026-02-27 00:00:00', 4.25, '[Admin added]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1308, NULL, 79, '2026-02-27 00:00:00', '2026-02-27 00:00:00', 5.33, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1309, NULL, 75, '2026-02-27 00:00:00', '2026-02-27 00:00:00', 4.35, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1310, NULL, 77, '2026-02-27 00:00:00', '2026-02-27 00:00:00', 6.60, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1311, NULL, 71, '2026-02-26 00:00:00', '2026-02-26 00:00:00', 1.75, '[Admin added]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1312, NULL, 75, '2026-02-26 00:00:00', '2026-02-26 00:00:00', 4.55, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1313, NULL, 79, '2026-02-26 00:00:00', '2026-02-26 00:00:00', 4.33, '[Admin added]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1314, NULL, 75, '2026-02-26 00:00:00', '2026-02-26 00:00:00', 1.28, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1315, NULL, 75, '2026-02-26 00:00:00', '2026-02-26 00:00:00', 4.18, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1316, NULL, 77, '2026-02-26 00:00:00', '2026-02-26 00:00:00', 7.98, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1317, NULL, 71, '2026-02-25 00:00:00', '2026-02-25 00:00:00', 4.67, '[Admin added]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1318, NULL, 72, '2026-02-25 00:00:00', '2026-02-25 00:00:00', 4.88, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1319, NULL, 79, '2026-02-25 00:00:00', '2026-02-25 00:00:00', 6.08, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1320, NULL, 75, '2026-02-25 00:00:00', '2026-02-25 00:00:00', 4.40, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1321, NULL, 77, '2026-02-25 00:00:00', '2026-02-25 00:00:00', 5.90, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1322, NULL, 79, '2026-02-24 00:00:00', '2026-02-24 00:00:00', 9.50, '[Admin added]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1323, NULL, 77, '2026-02-24 00:00:00', '2026-02-24 00:00:00', 6.45, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1324, NULL, 71, '2026-02-23 00:00:00', '2026-02-23 00:00:00', 4.15, '[Admin Edited]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1325, NULL, 72, '2026-02-23 00:00:00', '2026-02-23 00:00:00', 4.92, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1326, NULL, 75, '2026-02-23 00:00:00', '2026-02-23 00:00:00', 4.77, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1327, NULL, 77, '2026-02-23 00:00:00', '2026-02-23 00:00:00', 11.97, '[Admin Edited]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1328, NULL, 75, '2026-02-22 00:00:00', '2026-02-22 00:00:00', 5.80, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1329, NULL, 72, '2026-02-22 00:00:00', '2026-02-22 00:00:00', 7.77, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1330, NULL, 70, '2026-02-22 00:00:00', '2026-02-22 00:00:00', 7.00, '[Admin added]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1331, NULL, 79, '2026-02-21 00:00:00', '2026-02-21 00:00:00', 5.38, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1332, NULL, 75, '2026-02-21 00:00:00', '2026-02-21 00:00:00', 5.83, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1333, NULL, 72, '2026-02-20 00:00:00', '2026-02-20 00:00:00', 5.48, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1334, NULL, 79, '2026-02-20 00:00:00', '2026-02-20 00:00:00', 6.30, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1335, NULL, 72, '2026-02-19 00:00:00', '2026-02-19 00:00:00', 6.27, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1336, NULL, 70, '2026-02-19 00:00:00', '2026-02-19 00:00:00', 6.00, '[Admin added]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1337, NULL, 72, '2026-02-18 00:00:00', '2026-02-18 00:00:00', 5.82, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1338, NULL, 70, '2026-02-18 00:00:00', '2026-02-18 00:00:00', 6.00, '[Admin added]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1339, NULL, 72, '2026-02-17 00:00:00', '2026-02-17 00:00:00', 5.32, '[Admin Edited]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1340, NULL, 70, '2026-02-17 00:00:00', '2026-02-17 00:00:00', 6.00, '[Admin added]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1341, NULL, 72, '2026-02-16 00:00:00', '2026-02-16 00:00:00', 2.78, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1342, NULL, 75, '2026-02-16 00:00:00', '2026-02-16 00:00:00', 5.83, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1343, NULL, 70, '2026-02-16 00:00:00', '2026-02-16 00:00:00', 13.00, '[Admin Edited]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1344, NULL, 70, '2026-02-15 00:00:00', '2026-02-15 00:00:00', 3.50, '[Admin added]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1345, NULL, 75, '2026-02-15 00:00:00', '2026-02-15 00:00:00', 4.40, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1346, NULL, 79, '2026-02-15 00:00:00', '2026-02-15 00:00:00', 5.50, '[Admin Edited]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1347, NULL, 75, '2026-02-15 00:00:00', '2026-02-15 00:00:00', 2.15, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1348, NULL, 72, '2026-02-15 00:00:00', '2026-02-15 00:00:00', 11.48, '[Admin Edited]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1349, NULL, 75, '2026-02-14 00:00:00', '2026-02-14 00:00:00', 0.28, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1350, NULL, 71, '2026-02-14 00:00:00', '2026-02-14 00:00:00', 4.35, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1351, NULL, 72, '2026-02-14 00:00:00', '2026-02-14 00:00:00', 3.78, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1352, NULL, 79, '2026-02-14 00:00:00', '2026-02-14 00:00:00', 5.35, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1353, NULL, 72, '2026-02-14 00:00:00', '2026-02-14 00:00:00', 4.47, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1354, NULL, 71, '2026-02-13 00:00:00', '2026-02-13 00:00:00', 4.30, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1355, NULL, 72, '2026-02-13 00:00:00', '2026-02-13 00:00:00', 5.40, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1356, NULL, 75, '2026-02-13 00:00:00', '2026-02-13 00:00:00', 4.33, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1357, NULL, 79, '2026-02-13 00:00:00', '2026-02-13 00:00:00', 7.00, '[Admin added]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1358, NULL, 72, '2026-02-12 00:00:00', '2026-02-12 00:00:00', 4.45, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1359, NULL, 71, '2026-02-12 00:00:00', '2026-02-12 00:00:00', 4.55, '[Admin Edited]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1360, NULL, 72, '2026-02-12 00:00:00', '2026-02-12 00:00:00', 4.95, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1361, NULL, 75, '2026-02-12 00:00:00', '2026-02-12 00:00:00', 4.43, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1362, NULL, 77, '2026-02-12 00:00:00', '2026-02-12 00:00:00', 6.90, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1363, NULL, 71, '2026-02-11 00:00:00', '2026-02-11 00:00:00', 2.50, '[Admin added]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1364, NULL, 72, '2026-02-11 00:00:00', '2026-02-11 00:00:00', 4.22, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1365, NULL, 77, '2026-02-11 00:00:00', '2026-02-11 00:00:00', 11.63, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1366, NULL, 71, '2026-02-10 00:00:00', '2026-02-10 00:00:00', 3.45, '[Admin Edited]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1367, NULL, 79, '2026-02-10 00:00:00', '2026-02-10 00:00:00', 4.63, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1368, NULL, 77, '2026-02-10 00:00:00', '2026-02-10 00:00:00', 12.23, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1369, NULL, 71, '2026-02-09 00:00:00', '2026-02-09 00:00:00', 4.10, '[Admin added]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1370, NULL, 72, '2026-02-09 00:00:00', '2026-02-09 00:00:00', 4.18, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1371, NULL, 77, '2026-02-09 00:00:00', '2026-02-09 00:00:00', 5.93, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1372, NULL, 72, '2026-02-09 00:00:00', '2026-02-09 00:00:00', 5.40, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1373, NULL, 79, '2026-02-09 00:00:00', '2026-02-09 00:00:00', 6.00, '[Admin added]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1374, NULL, 77, '2026-02-08 00:00:00', '2026-02-08 00:00:00', 3.08, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1375, NULL, 79, '2026-02-08 00:00:00', '2026-02-08 00:00:00', 5.00, '[Admin added]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1376, NULL, 72, '2026-02-08 00:00:00', '2026-02-08 00:00:00', 10.80, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1377, NULL, 75, '2026-02-08 00:00:00', '2026-02-08 00:00:00', 5.45, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1378, NULL, 71, '2026-02-08 00:00:00', '2026-02-08 00:00:00', 7.17, '[Admin added]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1379, NULL, 75, '2026-02-07 00:00:00', '2026-02-07 00:00:00', 3.57, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1380, NULL, 77, '2026-02-07 00:00:00', '2026-02-07 00:00:00', 8.43, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1381, NULL, 79, '2026-02-07 00:00:00', '2026-02-07 00:00:00', 5.00, '[Admin added]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1382, NULL, 75, '2026-02-07 00:00:00', '2026-02-07 00:00:00', 4.45, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1383, NULL, 76, '2026-02-06 00:00:00', '2026-02-06 00:00:00', 3.25, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1384, NULL, 71, '2026-02-06 00:00:00', '2026-02-06 00:00:00', 5.00, '[Admin added]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1385, NULL, 79, '2026-02-06 00:00:00', '2026-02-06 00:00:00', 6.00, '[Admin added]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1386, NULL, 78, '2026-02-06 00:00:00', '2026-02-06 00:00:00', 4.37, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1387, NULL, 73, '2026-02-06 00:00:00', '2026-02-06 00:00:00', 6.30, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1388, NULL, 76, '2026-02-05 00:00:00', '2026-02-05 00:00:00', 3.60, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1389, NULL, 71, '2026-02-05 00:00:00', '2026-02-05 00:00:00', 4.98, '[Admin Edited]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1390, NULL, 77, '2026-02-05 00:00:00', '2026-02-05 00:00:00', 5.00, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1391, NULL, 75, '2026-02-05 00:00:00', '2026-02-05 00:00:00', 4.37, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1392, NULL, 73, '2026-02-05 00:00:00', '2026-02-05 00:00:00', 7.25, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1393, NULL, 72, '2026-02-04 00:00:00', '2026-02-04 00:00:00', 4.32, '[Admin Edited]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1394, NULL, 78, '2026-02-04 00:00:00', '2026-02-04 00:00:00', 5.28, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1395, NULL, 77, '2026-02-04 00:00:00', '2026-02-04 00:00:00', 5.37, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1396, NULL, 74, '2026-02-04 00:00:00', '2026-02-04 00:00:00', 4.53, '[Admin Edited]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1397, NULL, 73, '2026-02-04 00:00:00', '2026-02-04 00:00:00', 7.42, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1398, NULL, 76, '2026-02-03 00:00:00', '2026-02-03 00:00:00', 3.85, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1399, NULL, 71, '2026-02-03 00:00:00', '2026-02-03 00:00:00', 4.25, '[Admin added]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1400, NULL, 77, '2026-02-03 00:00:00', '2026-02-03 00:00:00', 5.35, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1401, NULL, 74, '2026-02-03 00:00:00', '2026-02-03 00:00:00', 4.68, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1402, NULL, 73, '2026-02-03 00:00:00', '2026-02-03 00:00:00', 7.30, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1403, NULL, 71, '2026-02-02 00:00:00', '2026-02-02 00:00:00', 4.45, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1404, NULL, 72, '2026-02-02 00:00:00', '2026-02-02 00:00:00', 4.57, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1405, NULL, 73, '2026-02-02 00:00:00', '2026-02-02 00:00:00', 6.02, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1406, NULL, 73, '2026-02-02 00:00:00', '2026-02-02 00:00:00', 4.45, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1407, NULL, 77, '2026-02-02 00:00:00', '2026-02-02 00:00:00', 5.72, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1408, NULL, 77, '2026-02-01 00:00:00', '2026-02-01 00:00:00', 7.92, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1409, NULL, 72, '2026-02-01 00:00:00', '2026-02-01 00:00:00', 8.63, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1410, NULL, 74, '2026-02-01 00:00:00', '2026-02-01 00:00:00', 5.00, NULL, '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1411, NULL, 71, '2026-02-01 00:00:00', '2026-02-01 00:00:00', 7.67, '[Admin added]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1412, NULL, 70, '2026-02-01 00:00:00', '2026-02-01 00:00:00', 7.67, '[Admin added]', '2026-03-02 11:15:08.145637');
INSERT INTO public.attendance VALUES (1413, 1032, 79, '2026-03-02 08:00:00', '2026-03-02 17:00:00', 9.00, 'Seeded data', '2026-03-03 08:21:56.299867');
INSERT INTO public.attendance VALUES (1414, 1033, 75, '2026-03-02 08:00:00', '2026-03-02 17:00:00', 9.00, 'Seeded data', '2026-03-03 08:21:56.299867');
INSERT INTO public.attendance VALUES (1415, 1034, 75, '2026-03-02 08:00:00', '2026-03-02 17:00:00', 9.00, 'Seeded data', '2026-03-03 08:21:56.299867');
INSERT INTO public.attendance VALUES (1416, 1035, 77, '2026-03-02 08:00:00', '2026-03-02 17:00:00', 9.00, 'Seeded data', '2026-03-03 08:21:56.299867');
INSERT INTO public.attendance VALUES (1417, 1036, 71, '2026-03-02 08:00:00', '2026-03-02 17:00:00', 9.00, 'Seeded data', '2026-03-03 08:21:56.299867');
INSERT INTO public.attendance VALUES (1418, 1037, 75, '2026-03-02 08:00:00', '2026-03-02 17:00:00', 9.00, 'Seeded data', '2026-03-03 08:21:56.299867');


--
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: csm_user
--

INSERT INTO public.employees VALUES (72, '003', 'Phương Ly', '0896869903', NULL, 'Female', NULL, NULL, 24000.00, 26000.00, true, '2026-02-26 15:51:20.87778');
INSERT INTO public.employees VALUES (73, '004', 'Ngọc Hân', '0942511614', NULL, 'Female', NULL, NULL, 22000.00, 24000.00, true, '2026-02-26 15:51:20.87778');
INSERT INTO public.employees VALUES (74, '005', 'Phạm Thị Vinh', '0919495106', NULL, 'Female', NULL, NULL, 22000.00, 24000.00, true, '2026-02-26 15:51:20.87778');
INSERT INTO public.employees VALUES (75, '006', 'Phước Khang', '0855224187', NULL, 'Male', NULL, NULL, 22000.00, 0.00, true, '2026-02-26 15:51:20.87778');
INSERT INTO public.employees VALUES (76, '007', 'Trần Phú', '0766250207', NULL, 'Male', NULL, NULL, 22000.00, 0.00, true, '2026-02-26 15:51:20.87778');
INSERT INTO public.employees VALUES (77, '008', 'Nguyễn Nhật Phương Vy', '0901823105', NULL, 'Female', NULL, NULL, 30000.00, 30000.00, true, '2026-02-26 15:51:20.87778');
INSERT INTO public.employees VALUES (78, '009', 'Gia Hân', '0915778422', NULL, 'Female', NULL, NULL, 22000.00, 0.00, true, '2026-02-26 15:51:20.87778');
INSERT INTO public.employees VALUES (79, '010', 'Thạch Nhất Khang', '0777751896', NULL, 'Male', NULL, NULL, 20000.00, 22000.00, true, '2026-02-26 15:51:20.87778');
INSERT INTO public.employees VALUES (71, '002', 'Trịnh Hải Lâm', '0398413786', '040202000172', 'Male', '2002-01-28', '2025-02-14', 24000.00, 26000.00, true, '2026-02-26 15:51:20.87778');
INSERT INTO public.employees VALUES (70, '001', 'Thanh Tu Edit', '0765457988', NULL, 'Female', NULL, '2025-09-01', 22000.00, 24000.00, true, '2026-02-26 15:51:20.87778');


--
-- Data for Name: payroll_details; Type: TABLE DATA; Schema: public; Owner: csm_user
--



--
-- Data for Name: payrolls; Type: TABLE DATA; Schema: public; Owner: csm_user
--

INSERT INTO public.payrolls VALUES (94, 70, 2, 2026, 1180080.00, 'Draft', '2026-02-27 01:54:01.323744');
INSERT INTO public.payrolls VALUES (95, 72, 2, 2026, 2770380.00, 'Draft', '2026-02-27 01:54:01.587583');
INSERT INTO public.payrolls VALUES (96, 73, 2, 2026, 950860.00, 'Draft', '2026-02-27 01:54:01.785286');
INSERT INTO public.payrolls VALUES (97, 74, 2, 2026, 312620.00, 'Draft', '2026-02-27 01:54:01.817835');
INSERT INTO public.payrolls VALUES (98, 75, 2, 2026, 1541540.00, 'Draft', '2026-02-27 01:54:01.884422');
INSERT INTO public.payrolls VALUES (99, 76, 2, 2026, 235400.00, 'Draft', '2026-02-27 01:54:01.936388');
INSERT INTO public.payrolls VALUES (100, 77, 2, 2026, 2916700.00, 'Draft', '2026-02-27 01:54:02.000173');
INSERT INTO public.payrolls VALUES (101, 78, 2, 2026, 212300.00, 'Draft', '2026-02-27 01:54:02.101761');
INSERT INTO public.payrolls VALUES (102, 79, 2, 2026, 984280.00, 'Draft', '2026-02-27 01:54:02.137091');
INSERT INTO public.payrolls VALUES (103, 71, 2, 2026, 1855340.00, 'Draft', '2026-02-27 01:54:02.175684');


--
-- Data for Name: positions; Type: TABLE DATA; Schema: public; Owner: csm_user
--

INSERT INTO public.positions VALUES (18, 'Phục vụ', true);
INSERT INTO public.positions VALUES (19, 'Pha chế', true);


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: public; Owner: csm_user
--



--
-- Data for Name: revenues; Type: TABLE DATA; Schema: public; Owner: csm_user
--

INSERT INTO public.revenues VALUES (131, 915, 79, '2026-02-26', 472000.00, 1489000.00, 207000.00, 1597000.00, 1597000.00, 0.00, NULL, '2026-02-26 15:05:57');
INSERT INTO public.revenues VALUES (132, 1022, 76, '2026-02-25', 334000.00, 1672000.00, 897000.00, 2384000.00, 2385000.00, 1000.00, NULL, '2026-02-25 15:29:06');
INSERT INTO public.revenues VALUES (133, 924, 79, '2026-02-24', 440000.00, 1334000.00, 478000.00, 2710000.00, 2672000.00, -38000.00, 'Bam du 29k, am 9k', '2026-02-24 15:07:43');
INSERT INTO public.revenues VALUES (134, 1021, 76, '2026-02-23', 377000.00, 1640000.00, 85000.00, 1651000.00, 1652000.00, 1000.00, NULL, '2026-02-23 15:06:28');
INSERT INTO public.revenues VALUES (135, 1020, 76, '2026-02-22', 369000.00, 1877000.00, 206000.00, 1844000.00, 1844000.00, 0.00, NULL, '2026-02-22 06:24:31');
INSERT INTO public.revenues VALUES (136, 933, 79, '2026-02-21', 444000.00, 1869000.00, 257000.00, 1682000.00, 1682000.00, 0.00, NULL, '2026-02-21 05:22:45');
INSERT INTO public.revenues VALUES (137, 1019, 76, '2026-02-20', 400000.00, 1745000.00, 333000.00, 1678000.00, 1678000.00, 0.00, NULL, '2026-02-20 05:00:53');
INSERT INTO public.revenues VALUES (138, 1018, 76, '2026-02-19', 412000.00, 1610000.00, 216000.00, 1413000.00, 1414000.00, 1000.00, NULL, '2026-02-19 05:40:07');
INSERT INTO public.revenues VALUES (139, 1031, 76, '2026-02-18', 444000.00, 1512000.00, 435000.00, 1503000.00, 1503000.00, 0.00, NULL, '2026-02-18 05:06:28');
INSERT INTO public.revenues VALUES (140, 1030, 76, '2026-02-17', 253000.00, 1544000.00, 132000.00, 1423000.00, 1423000.00, 0.00, NULL, '2026-02-17 05:03:44');
INSERT INTO public.revenues VALUES (141, 1029, 79, '2026-02-16', 372000.00, 1353000.00, 284000.00, 1529000.00, 1529000.00, 0.00, NULL, '2026-02-16 04:49:23');
INSERT INTO public.revenues VALUES (142, 948, 79, '2026-02-15', 422000.00, 972000.00, 484000.00, 2496000.00, 2496000.00, 0.00, NULL, '2026-02-15 15:10:24');
INSERT INTO public.revenues VALUES (143, 1028, 77, '2026-02-14', 487000.00, 2422000.00, 621000.00, 2553000.00, 2556000.00, 3000.00, NULL, '2026-02-14 15:29:05');
INSERT INTO public.revenues VALUES (144, 1027, 77, '2026-02-13', 495000.00, 1887000.00, 432000.00, 1959000.00, 1964000.00, 5000.00, NULL, '2026-02-13 15:25:22');
INSERT INTO public.revenues VALUES (145, 1026, 76, '2026-02-12', 385000.00, 1165000.00, 717000.00, 1577000.00, 1577000.00, 0.00, NULL, '2026-02-12 15:09:54');
INSERT INTO public.revenues VALUES (146, 967, 77, '2026-02-11', 407000.00, 1185000.00, 333000.00, 1111100.00, 1111000.00, -100.00, NULL, '2026-02-11 13:17:53');
INSERT INTO public.revenues VALUES (147, 970, 77, '2026-02-10', 497000.00, 2207000.00, 1263000.00, 3584000.00, 3584000.00, 0.00, NULL, '2026-02-10 16:28:22');
INSERT INTO public.revenues VALUES (148, 1025, 76, '2026-02-09', 497000.00, 1153000.00, 544000.00, 1676000.00, 1676000.00, 0.00, NULL, '2026-02-09 14:57:25');
INSERT INTO public.revenues VALUES (149, 977, 79, '2026-02-08', 447000.00, 2098000.00, 1732000.00, 3382000.00, 3383000.00, 1000.00, 'Du 1k', '2026-02-08 14:48:39');
INSERT INTO public.revenues VALUES (150, 982, 79, '2026-02-07', 417000.00, 1447000.00, 659000.00, 1749000.00, 1749000.00, 0.00, NULL, '2026-02-07 14:31:39');
INSERT INTO public.revenues VALUES (151, 986, 71, '2026-02-06', 331000.00, 917000.00, 816000.00, 1471000.00, 1472000.00, 1000.00, NULL, '2026-02-06 15:02:54');
INSERT INTO public.revenues VALUES (152, 990, 71, '2026-02-05', 416000.00, 831000.00, 1500000.00, 2114000.00, 2115000.00, 1000.00, NULL, '2026-02-05 16:00:23');
INSERT INTO public.revenues VALUES (153, 995, 78, '2026-02-04', 452000.00, 716000.00, 789000.00, 1585200.00, 1544000.00, -41200.00, NULL, '2026-02-04 15:47:53');
INSERT INTO public.revenues VALUES (154, 1000, 71, '2026-02-03', 363000.00, 1052000.00, 1348000.00, 2029000.00, 2037000.00, 8000.00, 'Khach bo', '2026-02-03 15:27:37');
INSERT INTO public.revenues VALUES (155, 1024, 76, '2026-02-02', 388000.00, 863000.00, 875000.00, 1928000.00, 1854000.00, -74000.00, '76k co Thi', '2026-02-02 15:33:32');
INSERT INTO public.revenues VALUES (156, 1023, 76, '2026-02-01', 500000.00, 2388000.00, 1634000.00, 4448000.00, 4389000.00, -59000.00, 'bam du bill 59k', '2026-02-01 14:57:44');
INSERT INTO public.revenues VALUES (159, 1016, 71, NULL, 416000.00, 598000.00, 321000.00, 701000.00, 919000.00, 2000.00, 'Test', '2026-02-27 07:39:28.131');
INSERT INTO public.revenues VALUES (160, 1032, 79, '2026-03-02', 472000.00, 1489000.00, 207000.00, 1597000.00, 1597000.00, 0.00, 'Seeded data', '2026-03-03 08:19:35.702735');


--
-- Data for Name: revenues_v2; Type: TABLE DATA; Schema: public; Owner: csm_user
--

INSERT INTO public.revenues_v2 VALUES (131, 915, 79, '2026-02-26', 472000.00, 1489000.00, 207000.00, 1597000.00, 1597000.00, 0.00, NULL, '2026-02-26 15:05:57', 0.0, 0.0);
INSERT INTO public.revenues_v2 VALUES (132, 1022, 76, '2026-02-25', 334000.00, 1672000.00, 897000.00, 2384000.00, 2385000.00, 1000.00, NULL, '2026-02-25 15:29:06', 0.0, 0.0);
INSERT INTO public.revenues_v2 VALUES (133, 924, 79, '2026-02-24', 440000.00, 1334000.00, 478000.00, 2710000.00, 2672000.00, -38000.00, 'Bam du 29k, am 9k', '2026-02-24 15:07:43', 0.0, 0.0);
INSERT INTO public.revenues_v2 VALUES (134, 1021, 76, '2026-02-23', 377000.00, 1640000.00, 85000.00, 1651000.00, 1652000.00, 1000.00, NULL, '2026-02-23 15:06:28', 0.0, 0.0);
INSERT INTO public.revenues_v2 VALUES (135, 1020, 76, '2026-02-22', 369000.00, 1877000.00, 206000.00, 1844000.00, 1844000.00, 0.00, NULL, '2026-02-22 06:24:31', 0.0, 0.0);
INSERT INTO public.revenues_v2 VALUES (136, 933, 79, '2026-02-21', 444000.00, 1869000.00, 257000.00, 1682000.00, 1682000.00, 0.00, NULL, '2026-02-21 05:22:45', 0.0, 0.0);
INSERT INTO public.revenues_v2 VALUES (137, 1019, 76, '2026-02-20', 400000.00, 1745000.00, 333000.00, 1678000.00, 1678000.00, 0.00, NULL, '2026-02-20 05:00:53', 0.0, 0.0);
INSERT INTO public.revenues_v2 VALUES (138, 1018, 76, '2026-02-19', 412000.00, 1610000.00, 216000.00, 1413000.00, 1414000.00, 1000.00, NULL, '2026-02-19 05:40:07', 0.0, 0.0);
INSERT INTO public.revenues_v2 VALUES (139, 1031, 76, '2026-02-18', 444000.00, 1512000.00, 435000.00, 1503000.00, 1503000.00, 0.00, NULL, '2026-02-18 05:06:28', 0.0, 0.0);
INSERT INTO public.revenues_v2 VALUES (140, 1030, 76, '2026-02-17', 253000.00, 1544000.00, 132000.00, 1423000.00, 1423000.00, 0.00, NULL, '2026-02-17 05:03:44', 0.0, 0.0);
INSERT INTO public.revenues_v2 VALUES (141, 1029, 79, '2026-02-16', 372000.00, 1353000.00, 284000.00, 1529000.00, 1529000.00, 0.00, NULL, '2026-02-16 04:49:23', 0.0, 0.0);
INSERT INTO public.revenues_v2 VALUES (142, 948, 79, '2026-02-15', 422000.00, 972000.00, 484000.00, 2496000.00, 2496000.00, 0.00, NULL, '2026-02-15 15:10:24', 0.0, 0.0);
INSERT INTO public.revenues_v2 VALUES (143, 1028, 77, '2026-02-14', 487000.00, 2422000.00, 621000.00, 2553000.00, 2556000.00, 3000.00, NULL, '2026-02-14 15:29:05', 0.0, 0.0);
INSERT INTO public.revenues_v2 VALUES (144, 1027, 77, '2026-02-13', 495000.00, 1887000.00, 432000.00, 1959000.00, 1964000.00, 5000.00, NULL, '2026-02-13 15:25:22', 0.0, 0.0);
INSERT INTO public.revenues_v2 VALUES (145, 1026, 76, '2026-02-12', 385000.00, 1165000.00, 717000.00, 1577000.00, 1577000.00, 0.00, NULL, '2026-02-12 15:09:54', 0.0, 0.0);
INSERT INTO public.revenues_v2 VALUES (146, 967, 77, '2026-02-11', 407000.00, 1185000.00, 333000.00, 1111100.00, 1111000.00, -100.00, NULL, '2026-02-11 13:17:53', 0.0, 0.0);
INSERT INTO public.revenues_v2 VALUES (147, 970, 77, '2026-02-10', 497000.00, 2207000.00, 1263000.00, 3584000.00, 3584000.00, 0.00, NULL, '2026-02-10 16:28:22', 0.0, 0.0);
INSERT INTO public.revenues_v2 VALUES (148, 1025, 76, '2026-02-09', 497000.00, 1153000.00, 544000.00, 1676000.00, 1676000.00, 0.00, NULL, '2026-02-09 14:57:25', 0.0, 0.0);
INSERT INTO public.revenues_v2 VALUES (149, 977, 79, '2026-02-08', 447000.00, 2098000.00, 1732000.00, 3382000.00, 3383000.00, 1000.00, 'Du 1k', '2026-02-08 14:48:39', 0.0, 0.0);
INSERT INTO public.revenues_v2 VALUES (150, 982, 79, '2026-02-07', 417000.00, 1447000.00, 659000.00, 1749000.00, 1749000.00, 0.00, NULL, '2026-02-07 14:31:39', 0.0, 0.0);
INSERT INTO public.revenues_v2 VALUES (151, 986, 71, '2026-02-06', 331000.00, 917000.00, 816000.00, 1471000.00, 1472000.00, 1000.00, NULL, '2026-02-06 15:02:54', 0.0, 0.0);
INSERT INTO public.revenues_v2 VALUES (152, 990, 71, '2026-02-05', 416000.00, 831000.00, 1500000.00, 2114000.00, 2115000.00, 1000.00, NULL, '2026-02-05 16:00:23', 0.0, 0.0);
INSERT INTO public.revenues_v2 VALUES (153, 995, 78, '2026-02-04', 452000.00, 716000.00, 789000.00, 1585200.00, 1544000.00, -41200.00, NULL, '2026-02-04 15:47:53', 0.0, 0.0);
INSERT INTO public.revenues_v2 VALUES (154, 1000, 71, '2026-02-03', 363000.00, 1052000.00, 1348000.00, 2029000.00, 2037000.00, 8000.00, 'Khach bo', '2026-02-03 15:27:37', 0.0, 0.0);
INSERT INTO public.revenues_v2 VALUES (155, 1024, 76, '2026-02-02', 388000.00, 863000.00, 875000.00, 1928000.00, 1854000.00, -74000.00, '76k co Thi', '2026-02-02 15:33:32', 0.0, 0.0);
INSERT INTO public.revenues_v2 VALUES (156, 1023, 76, '2026-02-01', 500000.00, 2388000.00, 1634000.00, 4448000.00, 4389000.00, -59000.00, 'bam du bill 59k', '2026-02-01 14:57:44', 0.0, 0.0);
INSERT INTO public.revenues_v2 VALUES (159, 1016, 71, NULL, 416000.00, 598000.00, 321000.00, 701000.00, 919000.00, 2000.00, 'Test', '2026-02-27 07:39:28.131', 0.0, 0.0);


--
-- Data for Name: reward_penalty_types; Type: TABLE DATA; Schema: public; Owner: csm_user
--

INSERT INTO public.reward_penalty_types VALUES (35, 'Đi trễ', 'Penalty', 20000.00, '2026-02-26 16:19:15.127918');
INSERT INTO public.reward_penalty_types VALUES (36, 'Nghỉ không phép', 'Penalty', 100000.00, '2026-02-26 16:19:15.127918');
INSERT INTO public.reward_penalty_types VALUES (37, 'Làm tốt/Xuất sắc', 'Reward', 50000.00, '2026-02-26 16:19:15.127918');
INSERT INTO public.reward_penalty_types VALUES (38, 'Chuyên cần', 'Reward', 100000.00, '2026-02-26 16:19:15.127918');
INSERT INTO public.reward_penalty_types VALUES (39, 'Làm hỏng đồ/Thiết bị', 'Penalty', 50000.00, '2026-02-26 16:19:15.127918');
INSERT INTO public.reward_penalty_types VALUES (40, 'Thiếu đồng phục', 'Penalty', 10000.00, '2026-02-26 16:19:15.127918');
INSERT INTO public.reward_penalty_types VALUES (41, 'Thái độ chưa tốt', 'Penalty', 20000.00, '2026-02-26 16:19:15.127918');
INSERT INTO public.reward_penalty_types VALUES (42, 'Quên tắt điện/nước', 'Penalty', 50000.00, '2026-02-26 16:19:15.127918');
INSERT INTO public.reward_penalty_types VALUES (43, 'Order nhầm', 'Penalty', 10000.00, '2026-02-26 16:19:15.127918');
INSERT INTO public.reward_penalty_types VALUES (44, 'Pha chế sai công thức', 'Penalty', 20000.00, '2026-02-26 16:19:15.127918');
INSERT INTO public.reward_penalty_types VALUES (45, 'Hỗ trợ ca gấp', 'Reward', 30000.00, '2026-02-26 16:19:15.127918');


--
-- Data for Name: rewards_penalties_v2; Type: TABLE DATA; Schema: public; Owner: csm_user
--

INSERT INTO public.rewards_penalties_v2 VALUES (16, 31, NULL, 28, 10000.00, NULL, '2026-02-23 13:33:40.733711');
INSERT INTO public.rewards_penalties_v2 VALUES (17, 29, NULL, 28, 0.00, NULL, '2026-02-23 13:33:40.741257');
INSERT INTO public.rewards_penalties_v2 VALUES (18, 23, NULL, 26, 500000.00, NULL, '2026-02-25 07:13:36.748329');
INSERT INTO public.rewards_penalties_v2 VALUES (19, 22, NULL, 24, 150000.00, NULL, '2026-02-25 07:13:36.780638');
INSERT INTO public.rewards_penalties_v2 VALUES (20, 23, NULL, 24, 100000.00, NULL, '2026-02-26 09:33:14.312468');
INSERT INTO public.rewards_penalties_v2 VALUES (21, 23, NULL, 25, 100000.00, NULL, '2026-02-26 09:33:56.241318');
INSERT INTO public.rewards_penalties_v2 VALUES (22, 23, NULL, 29, 100000.00, NULL, '2026-02-26 09:34:11.118158');
INSERT INTO public.rewards_penalties_v2 VALUES (23, 22, NULL, 26, 50000.00, NULL, '2026-02-26 09:46:47.750874');
INSERT INTO public.rewards_penalties_v2 VALUES (24, 23, NULL, 26, 50000.00, 'ádas', '2026-02-26 11:35:24.22998');
INSERT INTO public.rewards_penalties_v2 VALUES (25, 23, NULL, 24, 20000.00, 'f', '2026-02-26 11:41:09.308421');
INSERT INTO public.rewards_penalties_v2 VALUES (26, 22, NULL, 26, 50000.00, 'd', '2026-02-26 11:41:26.821454');
INSERT INTO public.rewards_penalties_v2 VALUES (27, 24, NULL, 26, 50000.00, 'd', '2026-02-26 11:47:55.508785');
INSERT INTO public.rewards_penalties_v2 VALUES (28, 24, NULL, 27, 30000.00, 'a', '2026-02-26 11:47:59.611962');
INSERT INTO public.rewards_penalties_v2 VALUES (29, 26, NULL, 24, 20000.00, 'd', '2026-02-26 11:48:09.976784');
INSERT INTO public.rewards_penalties_v2 VALUES (30, 28, NULL, 25, 0.00, 'v', '2026-02-26 11:48:15.960063');
INSERT INTO public.rewards_penalties_v2 VALUES (31, 71, NULL, 37, 50000.00, NULL, '2026-02-27 08:38:11.426578');
INSERT INTO public.rewards_penalties_v2 VALUES (32, 71, NULL, 38, 100000.00, 'c', '2026-02-27 08:38:17.579733');
INSERT INTO public.rewards_penalties_v2 VALUES (33, 77, NULL, 35, 20000.00, NULL, '2026-02-27 08:38:25.747799');
INSERT INTO public.rewards_penalties_v2 VALUES (34, 79, NULL, 35, 20000.00, 'a', '2026-02-27 08:38:31.661941');
INSERT INTO public.rewards_penalties_v2 VALUES (35, 73, NULL, 45, 30000.00, NULL, '2026-02-27 08:45:38.61689');


--
-- Data for Name: schedule_requests; Type: TABLE DATA; Schema: public; Owner: csm_user
--



--
-- Data for Name: schedules; Type: TABLE DATA; Schema: public; Owner: csm_user
--

INSERT INTO public.schedules VALUES (915, 79, 63, '2026-02-26', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (916, 75, 60, '2026-02-26', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (917, 75, 59, '2026-02-26', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (918, 77, 62, '2026-02-26', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (919, 71, 64, '2026-02-25', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (920, 72, 61, '2026-02-25', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (921, 79, 63, '2026-02-25', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (922, 75, 59, '2026-02-25', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (923, 77, 62, '2026-02-25', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (924, 79, 63, '2026-02-24', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (925, 77, 62, '2026-02-24', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (926, 71, 64, '2026-02-23', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (927, 72, 61, '2026-02-23', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (928, 75, 59, '2026-02-23', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (929, 77, 62, '2026-02-23', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (930, 75, 59, '2026-02-22', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (931, 72, 59, '2026-02-22', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (932, 70, 62, '2026-02-22', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (933, 79, 62, '2026-02-21', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (934, 75, 59, '2026-02-21', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (935, 72, 59, '2026-02-20', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (936, 79, 62, '2026-02-20', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (937, 72, 59, '2026-02-19', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (938, 70, 62, '2026-02-19', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (939, 72, 59, '2026-02-18', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (940, 70, 62, '2026-02-18', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (941, 72, 59, '2026-02-17', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (942, 70, 62, '2026-02-17', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (943, 72, 61, '2026-02-16', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (944, 75, 59, '2026-02-16', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (945, 70, 62, '2026-02-16', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (946, 70, 64, '2026-02-15', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (947, 75, 61, '2026-02-15', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (948, 79, 63, '2026-02-15', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (949, 75, 59, '2026-02-15', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (950, 72, 59, '2026-02-15', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (951, 75, 61, '2026-02-14', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (952, 71, 64, '2026-02-14', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (953, 72, 60, '2026-02-14', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (954, 79, 63, '2026-02-14', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (955, 72, 59, '2026-02-14', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (956, 71, 64, '2026-02-13', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (957, 72, 63, '2026-02-13', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (958, 75, 59, '2026-02-13', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (959, 79, 62, '2026-02-13', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (960, 72, 61, '2026-02-12', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (961, 71, 64, '2026-02-12', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (962, 72, 63, '2026-02-12', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (963, 75, 59, '2026-02-12', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (964, 77, 62, '2026-02-12', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (965, 71, 64, '2026-02-11', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (966, 72, 59, '2026-02-11', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (967, 77, 62, '2026-02-11', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (968, 71, 64, '2026-02-10', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (969, 79, 62, '2026-02-10', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (970, 77, 62, '2026-02-10', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (971, 71, 64, '2026-02-09', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (972, 72, 61, '2026-02-09', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (973, 77, 63, '2026-02-09', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (974, 79, 62, '2026-02-09', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (975, 72, 59, '2026-02-09', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (976, 77, 64, '2026-02-08', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (977, 79, 61, '2026-02-08', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (978, 72, 59, '2026-02-08', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (979, 75, 59, '2026-02-08', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (980, 71, 62, '2026-02-08', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (981, 75, 61, '2026-02-07', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (982, 79, 60, '2026-02-07', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (983, 77, 63, '2026-02-07', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (984, 75, 59, '2026-02-07', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (985, 76, 61, '2026-02-06', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (986, 71, 64, '2026-02-06', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (987, 78, 59, '2026-02-06', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (988, 73, 62, '2026-02-06', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (989, 76, 61, '2026-02-05', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (990, 71, 64, '2026-02-05', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (991, 77, 63, '2026-02-05', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (992, 75, 59, '2026-02-05', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (993, 73, 62, '2026-02-05', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (994, 72, 61, '2026-02-04', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (995, 78, 61, '2026-02-04', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (996, 77, 63, '2026-02-04', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (997, 74, 59, '2026-02-04', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (998, 73, 62, '2026-02-04', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (999, 76, 61, '2026-02-03', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (1000, 71, 64, '2026-02-03', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (1001, 77, 63, '2026-02-03', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (1002, 74, 59, '2026-02-03', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (1003, 73, 62, '2026-02-03', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (1004, 71, 64, '2026-02-02', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (1005, 72, 61, '2026-02-02', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (1006, 73, 63, '2026-02-02', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (1007, 73, 59, '2026-02-02', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (1008, 77, 62, '2026-02-02', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (1009, 77, 63, '2026-02-01', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (1010, 72, 60, '2026-02-01', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (1011, 74, 59, '2026-02-01', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (1012, 71, 62, '2026-02-01', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (1013, 70, 62, '2026-02-01', '2026-02-26 16:56:40.717985', NULL);
INSERT INTO public.schedules VALUES (1014, 71, 64, '2026-02-26', '2026-02-26 09:58:52.919765', '');
INSERT INTO public.schedules VALUES (1015, 75, 59, '2026-02-27', '2026-02-27 08:31:02.518945', NULL);
INSERT INTO public.schedules VALUES (1016, 77, 62, '2026-02-27', '2026-02-27 08:31:02.518945', NULL);
INSERT INTO public.schedules VALUES (1017, 75, 61, '2026-02-26', '2026-02-27 08:31:02.518945', NULL);
INSERT INTO public.schedules VALUES (1018, 76, 60, '2026-02-19', '2026-02-27 10:21:33.377893', NULL);
INSERT INTO public.schedules VALUES (1019, 76, 60, '2026-02-20', '2026-02-27 10:21:33.377893', NULL);
INSERT INTO public.schedules VALUES (1020, 76, 60, '2026-02-22', '2026-02-27 10:21:33.377893', NULL);
INSERT INTO public.schedules VALUES (1021, 76, 60, '2026-02-23', '2026-02-27 10:21:33.377893', NULL);
INSERT INTO public.schedules VALUES (1022, 76, 60, '2026-02-25', '2026-02-27 10:21:33.377893', NULL);
INSERT INTO public.schedules VALUES (1023, 76, 60, '2026-02-01', '2026-02-27 10:46:53.188033', NULL);
INSERT INTO public.schedules VALUES (1024, 76, 60, '2026-02-02', '2026-02-27 10:46:53.188033', NULL);
INSERT INTO public.schedules VALUES (1025, 76, 60, '2026-02-09', '2026-02-27 10:46:53.188033', NULL);
INSERT INTO public.schedules VALUES (1026, 76, 60, '2026-02-12', '2026-02-27 10:46:53.188033', NULL);
INSERT INTO public.schedules VALUES (1027, 77, 60, '2026-02-13', '2026-02-27 10:46:53.188033', NULL);
INSERT INTO public.schedules VALUES (1028, 77, 60, '2026-02-14', '2026-02-27 10:46:53.188033', NULL);
INSERT INTO public.schedules VALUES (1029, 79, 60, '2026-02-16', '2026-02-27 10:46:53.188033', NULL);
INSERT INTO public.schedules VALUES (1030, 76, 60, '2026-02-17', '2026-02-27 10:46:53.188033', NULL);
INSERT INTO public.schedules VALUES (1031, 76, 60, '2026-02-18', '2026-02-27 10:46:53.188033', NULL);
INSERT INTO public.schedules VALUES (1032, 79, 63, '2026-03-02', '2026-03-03 08:16:19.823968', 'Seeded data');
INSERT INTO public.schedules VALUES (1033, 75, 60, '2026-03-02', '2026-03-03 08:16:19.823968', 'Seeded data');
INSERT INTO public.schedules VALUES (1034, 75, 59, '2026-03-02', '2026-03-03 08:16:19.823968', 'Seeded data');
INSERT INTO public.schedules VALUES (1035, 77, 62, '2026-03-02', '2026-03-03 08:16:19.823968', 'Seeded data');
INSERT INTO public.schedules VALUES (1036, 71, 64, '2026-03-02', '2026-03-03 08:16:19.823968', 'Seeded data');
INSERT INTO public.schedules VALUES (1037, 75, 61, '2026-03-02', '2026-03-03 08:16:19.823968', 'Seeded data');


--
-- Data for Name: shifts; Type: TABLE DATA; Schema: public; Owner: csm_user
--

INSERT INTO public.shifts VALUES (59, 18, 'Ca Sáng', '07:00:00', '11:00:00', false, true);
INSERT INTO public.shifts VALUES (60, 18, 'Ca Chiều', '14:00:00', '18:00:00', false, true);
INSERT INTO public.shifts VALUES (61, 18, 'Ca Tối', '18:00:00', '22:30:00', false, true);
INSERT INTO public.shifts VALUES (62, 19, 'Ca Sáng', '06:00:00', '13:00:00', false, true);
INSERT INTO public.shifts VALUES (63, 19, 'Ca Chiều', '13:00:00', '18:00:00', false, true);
INSERT INTO public.shifts VALUES (64, 19, 'Ca Tối', '18:00:00', '22:30:00', false, true);


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: csm_user
--

INSERT INTO public.transactions VALUES (22, 131, 'Expense', 373000.00, '136k tien hang, 122 hat viet quat, 100 yaua, 15k da', '2026-02-26 15:05:57');
INSERT INTO public.transactions VALUES (23, 132, 'Expense', 150000.00, 'tien hang', '2026-02-25 15:29:06');
INSERT INTO public.transactions VALUES (24, 133, 'Expense', 1300000.00, '300k tien hang, chi Tu lay 1tr', '2026-02-24 15:07:43');
INSERT INTO public.transactions VALUES (25, 134, 'Expense', 304000.00, '54k tien hang; 250k tien da', '2026-02-23 15:06:28');
INSERT INTO public.transactions VALUES (26, 135, 'Expense', 130000.00, 'sua dac', '2026-02-22 06:24:31');
INSERT INTO public.transactions VALUES (27, 141, 'Expense', 264000.00, 'tien da', '2026-02-16 04:49:23');
INSERT INTO public.transactions VALUES (28, 142, 'Expense', 1462000.00, '500k bao ke, 430k tien sua tuoi, 300k tien dua, 207k tien nguyen lieu pha che, 25k nc rua chen', '2026-02-15 15:10:24');
INSERT INTO public.transactions VALUES (29, 144, 'Expense', 140000.00, 'Tien cf', '2026-02-13 15:25:22');
INSERT INTO public.transactions VALUES (30, 145, 'Expense', 80000.00, '2 hop sua ko duong', '2026-02-12 15:09:54');
INSERT INTO public.transactions VALUES (31, 147, 'Expense', 611000.00, 'Tien chi hom qua + Tien hang hom nay', '2026-02-10 16:28:22');
INSERT INTO public.transactions VALUES (32, 148, 'Expense', 476000.00, 'tien da 286k; tien dua 150k; tien ong hut 40k', '2026-02-09 14:57:25');
INSERT INTO public.transactions VALUES (33, 150, 'Expense', 60000.00, '35k tui rac va 25k tem dan', '2026-02-07 14:31:39');
INSERT INTO public.transactions VALUES (34, 151, 'Expense', 70000.00, 'Nuoc giat khan', '2026-02-06 15:02:54');
INSERT INTO public.transactions VALUES (35, 152, 'Expense', 200000.00, 'Dac', '2026-02-05 16:00:23');
INSERT INTO public.transactions VALUES (36, 153, 'Expense', 491000.00, '150 dua, 341 tien hang', '2026-02-04 15:47:53');
INSERT INTO public.transactions VALUES (37, 155, 'Expense', 504000.00, 'tien da 308k, tien sua tuoi va sua dac 196k', '2026-02-02 15:33:32');
INSERT INTO public.transactions VALUES (38, 156, 'Expense', 867000.00, '150 dua, 46 trai cay, 35 rac, 27 oreo, 80 sua tuoi', '2026-02-01 14:57:44');
INSERT INTO public.transactions VALUES (44, 159, 'Expense', 300000.00, 'Tiền đưa', '2026-02-27 07:39:28.736251');
INSERT INTO public.transactions VALUES (45, 159, 'Income', 100000.00, 'Tiền trao', '2026-02-27 07:39:28.838926');


--
-- Name: activities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: csm_user
--

SELECT pg_catalog.setval('public.activities_id_seq', 53, true);


--
-- Name: admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: csm_user
--

SELECT pg_catalog.setval('public.admin_id_seq', 5, true);


--
-- Name: attendance_id_seq; Type: SEQUENCE SET; Schema: public; Owner: csm_user
--

SELECT pg_catalog.setval('public.attendance_id_seq', 1418, true);


--
-- Name: employee_code_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employee_code_seq', 37, true);


--
-- Name: employees_id_seq; Type: SEQUENCE SET; Schema: public; Owner: csm_user
--

SELECT pg_catalog.setval('public.employees_id_seq', 81, true);


--
-- Name: payroll_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: csm_user
--

SELECT pg_catalog.setval('public.payroll_details_id_seq', 524, true);


--
-- Name: payrolls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: csm_user
--

SELECT pg_catalog.setval('public.payrolls_id_seq', 103, true);


--
-- Name: positions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: csm_user
--

SELECT pg_catalog.setval('public.positions_id_seq', 21, true);


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: csm_user
--

SELECT pg_catalog.setval('public.refresh_tokens_id_seq', 1, false);


--
-- Name: revenues_id_seq; Type: SEQUENCE SET; Schema: public; Owner: csm_user
--

SELECT pg_catalog.setval('public.revenues_id_seq', 160, true);


--
-- Name: reward_penalty_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: csm_user
--

SELECT pg_catalog.setval('public.reward_penalty_types_id_seq', 45, true);


--
-- Name: rewards_penalties_v2_id_seq; Type: SEQUENCE SET; Schema: public; Owner: csm_user
--

SELECT pg_catalog.setval('public.rewards_penalties_v2_id_seq', 35, true);


--
-- Name: schedule_requests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: csm_user
--

SELECT pg_catalog.setval('public.schedule_requests_id_seq', 446, true);


--
-- Name: schedules_id_seq; Type: SEQUENCE SET; Schema: public; Owner: csm_user
--

SELECT pg_catalog.setval('public.schedules_id_seq', 1037, true);


--
-- Name: shifts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: csm_user
--

SELECT pg_catalog.setval('public.shifts_id_seq', 66, true);


--
-- Name: transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: csm_user
--

SELECT pg_catalog.setval('public.transactions_id_seq', 45, true);


--
-- Name: __EFMigrationsHistory PK___EFMigrationsHistory; Type: CONSTRAINT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public."__EFMigrationsHistory"
    ADD CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId");


--
-- Name: rewards_penalties_v2 PK_rewards_penalties_v2; Type: CONSTRAINT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.rewards_penalties_v2
    ADD CONSTRAINT "PK_rewards_penalties_v2" PRIMARY KEY (id);


--
-- Name: activities activities_pkey; Type: CONSTRAINT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activities_pkey PRIMARY KEY (id);


--
-- Name: admin admin_pkey; Type: CONSTRAINT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id);


--
-- Name: admin admin_username_key; Type: CONSTRAINT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_username_key UNIQUE (username);


--
-- Name: attendance attendance_pkey; Type: CONSTRAINT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_pkey PRIMARY KEY (id);


--
-- Name: employees employees_code_key; Type: CONSTRAINT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_code_key UNIQUE (code);


--
-- Name: employees employees_phone_key; Type: CONSTRAINT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_phone_key UNIQUE (phone);


--
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (id);


--
-- Name: payroll_details payroll_details_pkey; Type: CONSTRAINT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.payroll_details
    ADD CONSTRAINT payroll_details_pkey PRIMARY KEY (id);


--
-- Name: payrolls payrolls_pkey; Type: CONSTRAINT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.payrolls
    ADD CONSTRAINT payrolls_pkey PRIMARY KEY (id);


--
-- Name: positions positions_pkey; Type: CONSTRAINT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.positions
    ADD CONSTRAINT positions_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: revenues revenues_pkey; Type: CONSTRAINT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.revenues
    ADD CONSTRAINT revenues_pkey PRIMARY KEY (id);


--
-- Name: reward_penalty_types reward_penalty_types_pkey; Type: CONSTRAINT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.reward_penalty_types
    ADD CONSTRAINT reward_penalty_types_pkey PRIMARY KEY (id);


--
-- Name: schedule_requests schedule_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.schedule_requests
    ADD CONSTRAINT schedule_requests_pkey PRIMARY KEY (id);


--
-- Name: schedules schedules_pkey; Type: CONSTRAINT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.schedules
    ADD CONSTRAINT schedules_pkey PRIMARY KEY (id);


--
-- Name: shifts shifts_pkey; Type: CONSTRAINT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.shifts
    ADD CONSTRAINT shifts_pkey PRIMARY KEY (id);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- Name: IX_rewards_penalties_v2_attendance_id; Type: INDEX; Schema: public; Owner: csm_user
--

CREATE INDEX "IX_rewards_penalties_v2_attendance_id" ON public.rewards_penalties_v2 USING btree (attendance_id);


--
-- Name: IX_rewards_penalties_v2_employee_id; Type: INDEX; Schema: public; Owner: csm_user
--

CREATE INDEX "IX_rewards_penalties_v2_employee_id" ON public.rewards_penalties_v2 USING btree (employee_id);


--
-- Name: IX_rewards_penalties_v2_type_id; Type: INDEX; Schema: public; Owner: csm_user
--

CREATE INDEX "IX_rewards_penalties_v2_type_id" ON public.rewards_penalties_v2 USING btree (type_id);


--
-- Name: attendance attendance_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.employees(id);


--
-- Name: attendance attendance_schedule_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_schedule_id_fkey FOREIGN KEY (schedule_id) REFERENCES public.schedules(id);


--
-- Name: payroll_details payroll_details_attendance_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.payroll_details
    ADD CONSTRAINT payroll_details_attendance_id_fkey FOREIGN KEY (attendance_id) REFERENCES public.attendance(id);


--
-- Name: payroll_details payroll_details_payroll_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.payroll_details
    ADD CONSTRAINT payroll_details_payroll_id_fkey FOREIGN KEY (payroll_id) REFERENCES public.payrolls(id);


--
-- Name: payrolls payrolls_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.payrolls
    ADD CONSTRAINT payrolls_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.employees(id);


--
-- Name: refresh_tokens refresh_tokens_admin_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_admin_id_fkey FOREIGN KEY (admin_id) REFERENCES public.admin(id);


--
-- Name: revenues revenues_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.revenues
    ADD CONSTRAINT revenues_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.employees(id);


--
-- Name: revenues revenues_schedule_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.revenues
    ADD CONSTRAINT revenues_schedule_id_fkey FOREIGN KEY (schedule_id) REFERENCES public.schedules(id);


--
-- Name: schedule_requests schedule_requests_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.schedule_requests
    ADD CONSTRAINT schedule_requests_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.employees(id);


--
-- Name: schedule_requests schedule_requests_shift_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.schedule_requests
    ADD CONSTRAINT schedule_requests_shift_id_fkey FOREIGN KEY (shift_id) REFERENCES public.shifts(id);


--
-- Name: schedules schedules_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.schedules
    ADD CONSTRAINT schedules_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.employees(id);


--
-- Name: schedules schedules_shift_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.schedules
    ADD CONSTRAINT schedules_shift_id_fkey FOREIGN KEY (shift_id) REFERENCES public.shifts(id);


--
-- Name: shifts shifts_position_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.shifts
    ADD CONSTRAINT shifts_position_id_fkey FOREIGN KEY (position_id) REFERENCES public.positions(id);


--
-- Name: transactions transactions_revenue_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: csm_user
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_revenue_id_fkey FOREIGN KEY (revenue_id) REFERENCES public.revenues(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO csm_user;


--
-- Name: SEQUENCE employee_code_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,USAGE ON SEQUENCE public.employee_code_seq TO csm_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO csm_user;


--
-- PostgreSQL database dump complete
--

\unrestrict mkB7cTbvhOPhMYA6agB717tGZFyOKpNlUPnFCpzc9HATgRpnoBy9luE4qVH8DyB

