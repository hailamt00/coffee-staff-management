-- ================================================
-- COFFEE STAFF MANAGEMENT - DATABASE REBUILD
-- ================================================
-- Database: csm_db
-- User: csm_user
-- This script completely rebuilds the database with production data
-- Run this as postgres superuser

-- ================================================
-- STEP 1: DROP EXISTING TABLES
-- ================================================

DROP TABLE IF EXISTS violations CASCADE;
DROP TABLE IF EXISTS violation_types CASCADE;
DROP TABLE IF EXISTS activities CASCADE;
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
DROP TABLE IF EXISTS refresh_tokens CASCADE;

DROP SEQUENCE IF EXISTS employee_code_seq CASCADE;
DROP TYPE IF EXISTS gender_enum CASCADE;

-- ================================================
-- STEP 2: CREATE ENUM TYPES
-- ================================================

CREATE TYPE gender_enum AS ENUM ('Male', 'Female');

-- ================================================
-- STEP 3: CREATE SEQUENCES
-- ================================================

CREATE SEQUENCE employee_code_seq START 1;

-- ================================================
-- STEP 4: CREATE TABLES
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
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) UNIQUE NOT NULL,
    cid VARCHAR(20),
    gender gender_enum,
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
    name VARCHAR(50) NOT NULL,
    status BOOLEAN DEFAULT TRUE
);

-- Shifts table
CREATE TABLE shifts (
    id SERIAL PRIMARY KEY,
    position_id INT REFERENCES positions(id),
    name VARCHAR(50),
    start_time TIME,
    end_time TIME,
    status BOOLEAN DEFAULT TRUE
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
    approved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Attendance table
CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    schedule_id INT REFERENCES schedules(id),
    employee_id INT REFERENCES employees(id),
    check_in TIMESTAMP,
    check_out TIMESTAMP,
    total_hours NUMERIC(5,2),
    note TEXT
);

-- Reward/Penalty types table
CREATE TABLE reward_penalty_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    type VARCHAR(10) CHECK (type IN ('reward','penalty'))
);

-- Rewards and penalties table
CREATE TABLE rewards_penalties (
    id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES employees(id),
    attendance_id INT REFERENCES attendance(id),
    type_id INT REFERENCES reward_penalty_types(id),
    amount NUMERIC(12,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls table
CREATE TABLE payrolls (
    id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES employees(id),
    month INT,
    year INT,
    total_salary NUMERIC(12,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll details table
CREATE TABLE payroll_details (
    id SERIAL PRIMARY KEY,
    payroll_id INT REFERENCES payrolls(id),
    attendance_id INT REFERENCES attendance(id),
    hours NUMERIC(5,2),
    rate NUMERIC(12,2),
    amount NUMERIC(12,2)
);

-- Revenues table
CREATE TABLE revenues (
    id SERIAL PRIMARY KEY,
    schedule_id INT REFERENCES schedules(id),
    employee_id INT REFERENCES employees(id),
    work_date DATE,
    opening_balance NUMERIC(12,2),
    cash NUMERIC(12,2),
    bank NUMERIC(12,2),
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
    type VARCHAR(10) CHECK (type IN ('income','expense')),
    amount NUMERIC(12,2),
    reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Violation types table
CREATE TABLE violation_types (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    penalty_points INT DEFAULT 1
);

-- Violations table
CREATE TABLE violations (
    id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES employees(id),
    violation_type_id INT REFERENCES violation_types(id),
    penalty_amount NUMERIC(12,2),
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Activities table
CREATE TABLE activities (
    id SERIAL PRIMARY KEY,
    action TEXT,
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
-- STEP 5: INSERT DATA
-- ================================================

-- Insert admin
INSERT INTO admin (username, password_hash, full_name)
VALUES ('admin', '123456', 'System Administrator');

-- Insert employees (11 employees)
INSERT INTO employees (name, phone, cid, gender, service_salary, barista_salary, dob, hire_date)
VALUES
('Admin', '0000000000', NULL, NULL, 0, 0, NULL, '2025-05-05'),
('Phuong Ly', '0896869903', NULL, 'Female', 24000, 26000, NULL, NOW()),
('Trinh Hai Lam', '0398413786', '040202000172', 'Male', 24000, 26000, '2002-10-28', '2025-02-14'),
('Ngoc Han', '0942511614', NULL, 'Female', 22000, 24000, NULL, NOW()),
('Pham Thi Vinh', '0919495106', NULL, 'Female', 22000, 24000, NULL, NOW()),
('Thanh Tu', '0765457988', NULL, 'Female', 22000, 24000, NULL, '2025-09-01'),
('Phuoc Khang', '0855224187', NULL, 'Male', 22000, 0, NULL, NOW()),
('Tran Phu', '0766250207', NULL, 'Male', 22000, 0, NULL, NOW()),
('Nguyen Nhat Phuong Vy', '0901823105', NULL, 'Female', 30000, 30000, NULL, NOW()),
('Gia Han', '0915778422', NULL, 'Female', 22000, 0, NULL, NOW()),
('Thach Nhat Khang', '0777751896', NULL, 'Male', 20000, 22000, NULL, NOW());

-- Insert positions
INSERT INTO positions (name)
VALUES
('Phuc vu'),
('Pha che(PartTime)'),
('Pha che(Thu viec)');

-- Insert shifts (sample shifts for each position)
INSERT INTO shifts (position_id, name, start_time, end_time)
VALUES
-- Phuc vu shifts
(1, 'Sang', '07:00', '11:00'),
(1, 'Chieu', '11:00', '17:00'),
(1, 'Toi', '17:00', '22:00'),

-- Pha che PartTime shifts
(2, 'Sang', '07:00', '15:00'),
(2, 'Toi', '15:00', '23:00'),

-- Pha che Thu viec shifts
(3, 'Hanh chinh', '08:00', '18:00');

-- Insert violation types (18 types from production data)
INSERT INTO violation_types (description, penalty_points)
VALUES
('Di lam muon', 1),
('Thieu dong phuc', 1),
('Ve sinh khu vuc lam viec ko tot', 1),
('Order nham', 1),
('Pha che nham', 1),
('Phuc vu khong in phieu/giao/nhan phieu', 1),
('Phuc vu khong in bill thanh toan', 1),
('Pha che khong Nhan/Tra phieu', 1),
('Phuc vu sai quy trinh', 1),
('Thai do phuc vu khong tot', 2),
('Chot ca khong dung quy trinh', 1),
('Pha che khong kiem ke NVL cuoi ngay', 1),
('Ban ghe khong dung vi tri, sap xep ko ngay ngan', 1),
('Quen tat dien, khoa nuoc', 5),
('Quen checkIn/checkOut', 1),
('Nghi dot xuat', 2),
('Bi khach hang phan anh chat luong phuc vu hoac thai do khong tot', 5),
('Pha che sai cong thuc', 2);

-- ================================================
-- STEP 6: GRANT PERMISSIONS
-- ================================================

-- Grant sequence permissions
GRANT USAGE, SELECT ON SEQUENCE employee_code_seq TO csm_user;
GRANT USAGE, SELECT ON SEQUENCE employees_id_seq TO csm_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO csm_user;

-- Grant table permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO csm_user;

-- ================================================
-- STEP 7: VERIFY DATA
-- ================================================

SELECT 'Admin count:', COUNT(*) FROM admin;
SELECT 'Employee count:', COUNT(*) FROM employees;
SELECT 'Position count:', COUNT(*) FROM positions;
SELECT 'Shift count:', COUNT(*) FROM shifts;
SELECT 'Violation type count:', COUNT(*) FROM violation_types;

-- Display employees
SELECT id, code, name, phone, gender, service_salary, barista_salary 
FROM employees 
ORDER BY id;
