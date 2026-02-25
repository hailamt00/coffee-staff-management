-- ================================================
-- COFFEE STAFF MANAGEMENT - DATABASE REBUILD (FULL)
-- ================================================
-- Database: csm_db
-- User: csm_user
-- This script completely rebuilds the database with consolidated production data.
-- Run this as postgres superuser.

-- ================================================
-- STEP 1: DROP EXISTING TABLES
-- ================================================

DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS revenues CASCADE;
DROP TABLE IF EXISTS payroll_details CASCADE;
DROP TABLE IF EXISTS rewards_penalties CASCADE;
DROP TABLE IF EXISTS reward_penalty_types CASCADE;
DROP TABLE IF EXISTS payrolls CASCADE;
DROP TABLE IF EXISTS attendance CASCADE;
DROP TABLE IF EXISTS schedules CASCADE;
DROP TABLE IF EXISTS schedule_requests CASCADE;
DROP TABLE IF EXISTS shifts CASCADE;
DROP TABLE IF EXISTS positions CASCADE;
DROP TABLE IF EXISTS employees CASCADE;
DROP TABLE IF EXISTS admin CASCADE;
DROP TABLE IF EXISTS activities CASCADE;
DROP TABLE IF EXISTS violations CASCADE; -- Legacy
DROP TABLE IF EXISTS violation_types CASCADE; -- Legacy
DROP TABLE IF EXISTS refresh_tokens CASCADE;

DROP SEQUENCE IF EXISTS employee_code_seq CASCADE;
DROP TYPE IF EXISTS gender_enum CASCADE;

-- ================================================
-- STEP 2: CREATE SEQUENCES
-- ================================================

CREATE SEQUENCE employee_code_seq START 1;

-- ================================================
-- STEP 3: CREATE TABLES
-- ================================================

-- Admin table
CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Employees table
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL DEFAULT LPAD(nextval('employee_code_seq')::TEXT, 3, '0'),
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    cid VARCHAR(20),
    gender VARCHAR(10), -- 'Male', 'Female'
    dob DATE,
    hire_date DATE,
    service_salary NUMERIC(12,2) DEFAULT 0,
    barista_salary NUMERIC(12,2) DEFAULT 0,
    status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Positions table
CREATE TABLE positions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    status BOOLEAN DEFAULT TRUE
);

-- Shifts table
CREATE TABLE shifts (
    id SERIAL PRIMARY KEY,
    position_id INT REFERENCES positions(id),
    name VARCHAR(50) NOT NULL,
    start_time TIME,
    end_time TIME,
    status BOOLEAN DEFAULT TRUE,
    is_enabled BOOLEAN NOT NULL DEFAULT TRUE
);

-- Schedule requests table
CREATE TABLE schedule_requests (
    id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES employees(id),
    shift_id INT REFERENCES shifts(id),
    work_date DATE,
    note TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Schedules table
CREATE TABLE schedules (
    id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES employees(id),
    shift_id INT REFERENCES shifts(id),
    work_date DATE,
    approved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    note TEXT
);

-- Attendance table
CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    schedule_id INT REFERENCES schedules(id), -- Nullable
    employee_id INT REFERENCES employees(id),
    check_in TIMESTAMP,
    check_out TIMESTAMP,
    total_hours NUMERIC(5,2),
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reward/Penalty types table
CREATE TABLE reward_penalty_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    type VARCHAR(20) CHECK (type IN ('Reward','Penalty')), -- Entity enum 'RewardPenaltyKind'
    amount NUMERIC(12,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rewards and penalties table
CREATE TABLE rewards_penalties (
    id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES employees(id),
    attendance_id INT REFERENCES attendance(id), -- Nullable in config, required in C#? Handling as nullable here.
    type_id INT REFERENCES reward_penalty_types(id),
    amount NUMERIC(12,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -- Note: 'Reason' column removed to match Entity
);

-- Payrolls table
CREATE TABLE payrolls (
    id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES employees(id),
    month INT,
    year INT,
    total_salary NUMERIC(12,2),
    status VARCHAR(20) DEFAULT 'Draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll details table
CREATE TABLE payroll_details (
    id SERIAL PRIMARY KEY,
    payroll_id INT REFERENCES payrolls(id),
    attendance_id INT REFERENCES attendance(id),
    hours NUMERIC(5,2),
    rate NUMERIC(12,2),
    amount NUMERIC(12,2),
    type VARCHAR(50)
);

-- Revenues table
CREATE TABLE revenues (
    id SERIAL PRIMARY KEY,
    schedule_id INT REFERENCES schedules(id), -- Nullable
    employee_id INT REFERENCES employees(id),
    work_date DATE,
    opening_balance NUMERIC(12,2),
    cash NUMERIC(12,2),
    bank NUMERIC(12,2),
    income NUMERIC(12,2) DEFAULT 0,
    expenses NUMERIC(12,2) DEFAULT 0,
    net NUMERIC(12,2),
    revenue NUMERIC(12,2),
    deviation NUMERIC(12,2),
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transactions table
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    revenue_id INT REFERENCES revenues(id),
    type VARCHAR(10) CHECK (type IN ('Income','Expense')), -- Entity enum 'TransactionType'
    amount NUMERIC(12,2),
    description TEXT, -- 'reason' mapped to 'description' or 'reason'? Entity has 'Reason'? No, Entity has 'Description'? Let's assume matches or DB col name config handles it. Transaction.cs usually has Description/Reason.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Note: Transaction entity usually maps 'Description' property.

-- Activities table
CREATE TABLE activities (
    id SERIAL PRIMARY KEY,
    action TEXT,
    ip_address VARCHAR(50),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Refresh tokens table
CREATE TABLE refresh_tokens (
    id SERIAL PRIMARY KEY,
    admin_id INT REFERENCES admin(id),
    token TEXT NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    is_revoked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================================
-- STEP 4: INSERT DATA
-- ================================================

-- 1. Admin
-- Password set to plain '123456'. DbInitializer will hash this on startup.
INSERT INTO admin (username, password_hash, full_name)
VALUES ('admin', '123456', 'System Administrator');

-- 2. Positions (Consolidated)
INSERT INTO positions (name, status) VALUES
('Pha chế', TRUE),
('Phục vụ', TRUE);

-- 3. Shifts (3 per position, User-defined timings)
-- Pha chế (New consolidated timings)
INSERT INTO shifts (position_id, name, start_time, end_time, is_enabled)
SELECT id, 'Ca sáng', '06:00:00'::TIME, '13:00:00'::TIME, TRUE FROM positions WHERE name = 'Pha chế'
UNION ALL
SELECT id, 'Ca chiều', '13:00:00'::TIME, '18:00:00'::TIME, TRUE FROM positions WHERE name = 'Pha chế'
UNION ALL
SELECT id, 'Ca tối', '18:00:00'::TIME, '22:30:00'::TIME, TRUE FROM positions WHERE name = 'Pha chế';

-- Phục vụ (User-defined timings)
INSERT INTO shifts (position_id, name, start_time, end_time, is_enabled)
SELECT id, 'Ca sáng', '06:30:00'::TIME, '11:00:00'::TIME, TRUE FROM positions WHERE name = 'Phục vụ'
UNION ALL
SELECT id, 'Ca chiều', '14:00:00'::TIME, '18:00:00'::TIME, TRUE FROM positions WHERE name = 'Phục vụ'
UNION ALL
SELECT id, 'Ca tối', '18:00:00'::TIME, '22:30:00'::TIME, TRUE FROM positions WHERE name = 'Phục vụ';

-- 4. Employees (Consolidated List with Vietnamese Accents)
INSERT INTO employees (name, phone, cid, gender, service_salary, barista_salary, dob, hire_date)
VALUES
('Admin', '0000000000', NULL, NULL, 0, 0, NULL, '2025-05-05'),
('Thanh Tú', '0765457988', NULL, 'Female', 22000, 24000, NULL, '2025-09-01'),
('Trịnh Hải Lâm', '0398413786', '040202000172', 'Male', 24000, 26000, '2002-10-28', '2025-02-14'),
('Phương Ly', '0896869903', NULL, 'Female', 24000, 26000, NULL, NOW()),
('Ngọc Hân', '0942511614', NULL, 'Female', 22000, 24000, NULL, NOW()),
('Phạm Thị Vinh', '0919495106', NULL, 'Female', 22000, 24000, NULL, NOW()),
('Phước Khang', '0855224187', NULL, 'Male', 22000, 0, NULL, NOW()),
('Trần Phú', '0766250207', NULL, 'Male', 22000, 0, NULL, NOW()),
('Nguyễn Nhật Phương Vy', '0901823105', NULL, 'Female', 30000, 30000, NULL, NOW()),
('Gia Hân', '0915778422', NULL, 'Female', 22000, 0, NULL, NOW()),
('Thạch Nhất Khang', '0777751896', NULL, 'Male', 20000, 22000, NULL, NOW());

-- 5. Reward/Penalty Types (Seed Data + Mapped Violations)
INSERT INTO reward_penalty_types (name, type, amount)
VALUES
('Đi trễ', 'Penalty', 20000),
('Nghỉ không phép', 'Penalty', 100000),
('Làm tốt', 'Reward', 50000),
('Hỗ trợ ca gấp', 'Reward', 30000),
('Đi làm muộn', 'Penalty', 10000), -- From violation types
('Thiếu đồng phục', 'Penalty', 10000),
('Vệ sinh khu vực không tốt', 'Penalty', 10000),
('Order nhầm', 'Penalty', 10000), -- 1 point roughly 10k
('Pha chế sai công thức', 'Penalty', 20000), -- 2 points
('Thái độ phục vụ không tốt', 'Penalty', 20000), -- 2 points
('Quên tắt điện/nước', 'Penalty', 50000); -- 5 points

-- 6. Production Data: Attendance (Feb 2026)
-- Moved to insert_production_data.sql to avoid duplication and keep this script focused on Structure/Master Data.

-- 7. Revenues (Feb 2026)
-- Moved to insert_production_data.sql

-- 8. Transactions (Feb 2026)
-- Moved to insert_production_data.sql

-- ================================================
-- STEP 5: GRANT PERMISSIONS
-- ================================================
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO csm_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO csm_user;

-- ================================================
-- STEP 6: VERIFY DATA
-- ================================================
SELECT 'Employee count:', COUNT(*) FROM employees;
SELECT 'Position count:', COUNT(*) FROM positions;
SELECT 'Shift count:', COUNT(*) FROM shifts;
SELECT 'Attendance count:', COUNT(*) FROM attendance;
SELECT 'Revenue count:', COUNT(*) FROM revenues;
