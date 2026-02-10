CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE SEQUENCE employee_code_seq START 1;

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL DEFAULT LPAD(nextval('employee_code_seq')::TEXT,3,'0'),
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) UNIQUE NOT NULL,
    cid VARCHAR(20),
    dob DATE,
    hire_date DATE,
    service_salary NUMERIC(12,2),
    barista_salary NUMERIC(12,2),
    status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE positions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    status BOOLEAN DEFAULT TRUE
);

CREATE TABLE shifts (
    id SERIAL PRIMARY KEY,
    position_id INT REFERENCES positions(id),
    name VARCHAR(50),
    start_time TIME,
    end_time TIME,
    status BOOLEAN DEFAULT TRUE
);

CREATE TABLE schedule_requests (
    id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES employees(id),
    shift_id INT REFERENCES shifts(id),
    work_date DATE,
    note TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE schedules (
    id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES employees(id),
    shift_id INT REFERENCES shifts(id),
    work_date DATE,
    approved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    schedule_id INT REFERENCES schedules(id),
    employee_id INT REFERENCES employees(id),
    check_in TIMESTAMP,
    check_out TIMESTAMP,
    total_hours NUMERIC(5,2),
    note TEXT
);

CREATE TABLE reward_penalty_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    type VARCHAR(10) CHECK (type IN ('reward','penalty'))
);

CREATE TABLE rewards_penalties (
    id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES employees(id),
    attendance_id INT REFERENCES attendance(id),
    type_id INT REFERENCES reward_penalty_types(id),
    amount NUMERIC(12,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payrolls (
    id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES employees(id),
    month INT,
    year INT,
    total_salary NUMERIC(12,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payroll_details (
    id SERIAL PRIMARY KEY,
    payroll_id INT REFERENCES payrolls(id),
    attendance_id INT REFERENCES attendance(id),
    hours NUMERIC(5,2),
    rate NUMERIC(12,2),
    amount NUMERIC(12,2)
);

CREATE TABLE revenues (
    id SERIAL PRIMARY KEY,
    schedule_id INT REFERENCES schedules(id),
    employee_id INT REFERENCES employees(id),
    opening_balance NUMERIC(12,2),
    cash NUMERIC(12,2),
    bank NUMERIC(12,2),
    net NUMERIC(12,2),
    revenue NUMERIC(12,2),
    deviation NUMERIC(12,2),
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    revenue_id INT REFERENCES revenues(id),
    type VARCHAR(10) CHECK (type IN ('income','expense')),
    amount NUMERIC(12,2),
    reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE activities (
    id SERIAL PRIMARY KEY,
    action TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO admin (username, password_hash, full_name)
VALUES
('admin', '123456', 'System Administrator');

INSERT INTO employees (name, phone, cid, dob, hire_date, service_salary, barista_salary)
VALUES
('Nguyễn Văn A', '0901000001', '012345678901', '1998-05-10', '2024-01-05', 25000, 30000),
('Trần Thị B', '0901000002', '012345678902', '1999-07-21', '2024-01-10', 25000, 32000),
('Lê Văn C', '0901000003', '012345678903', '2000-03-18', '2024-02-01', 26000, 33000),
('Phạm Thị D', '0901000004', '012345678904', '1997-11-09', '2024-02-15', 27000, 35000),
('Hoàng Văn E', '0901000005', '012345678905', '1996-01-25', '2024-03-01', 26000, 34000),
('Võ Thị F', '0901000006', '012345678906', '2001-06-30', '2024-03-10', 24000, 31000),
('Đặng Văn G', '0901000007', '012345678907', '1998-12-12', '2024-03-20', 25000, 32000),
('Bùi Thị H', '0901000008', '012345678908', '1999-09-05', '2024-04-01', 26000, 33000),
('Ngô Văn I', '0901000009', '012345678909', '1997-04-17', '2024-04-10', 27000, 34000),
('Phan Thị K', '0901000010', '012345678910', '2000-08-22', '2024-04-20', 25000, 32000);

INSERT INTO positions (name)
VALUES
('Phục vụ'),
('Pha chế'),
('Thu ngân');

INSERT INTO shifts (position_id, name, start_time, end_time)
VALUES
-- Phục vụ
(1, 'Sáng', '07:00', '11:00'),
(1, 'Chiều', '11:00', '17:00'),
(1, 'Tối', '17:00', '22:00'),

-- Pha chế
(2, 'Sáng', '07:00', '15:00'),
(2, 'Tối', '15:00', '23:00'),

-- Thu ngân
(3, 'Hành chính', '08:00', '18:00');

INSERT INTO schedule_requests (employee_id, shift_id, work_date, note, status)
VALUES
(1, 1, '2026-02-10', 'Rảnh buổi sáng', 'approved'),
(2, 4, '2026-02-10', '', 'approved'),
(3, 2, '2026-02-10', '', 'approved'),
(4, 5, '2026-02-10', 'Chỉ làm ca tối', 'approved'),
(5, 6, '2026-02-10', '', 'approved'),

(6, 1, '2026-02-11', '', 'approved'),
(7, 3, '2026-02-11', '', 'approved'),
(8, 4, '2026-02-11', '', 'approved'),
(9, 2, '2026-02-11', '', 'approved'),
(10, 6, '2026-02-11', '', 'approved');

INSERT INTO schedules (employee_id, shift_id, work_date)
VALUES
(1, 1, '2026-02-10'),
(2, 4, '2026-02-10'),
(3, 2, '2026-02-10'),
(4, 5, '2026-02-10'),
(5, 6, '2026-02-10'),

(6, 1, '2026-02-11'),
(7, 3, '2026-02-11'),
(8, 4, '2026-02-11'),
(9, 2, '2026-02-11'),
(10, 6, '2026-02-11');

INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note)
VALUES
(1, 1, '2026-02-10 07:00', '2026-02-10 11:05', 4.08, ''),
(2, 2, '2026-02-10 07:05', '2026-02-10 15:00', 7.92, 'Đi trễ 5 phút'),
(3, 3, '2026-02-10 11:00', '2026-02-10 17:00', 6.00, ''),
(4, 4, '2026-02-10 15:00', '2026-02-10 23:10', 8.17, ''),
(5, 5, '2026-02-10 08:00', '2026-02-10 18:00', 10.00, 'Admin Edited'),

(6, 6, '2026-02-11 07:00', '2026-02-11 11:00', 4.00, ''),
(7, 7, '2026-02-11 17:00', '2026-02-11 22:00', 5.00, 'Admin Edited'),
(8, 8, '2026-02-11 07:00', '2026-02-11 15:00', 8.00, 'Admin Edited'),
(9, 9, '2026-02-11 11:00', '2026-02-11 17:00', 6.00, ''),
(10,10,'2026-02-11 08:00', '2026-02-11 18:00',10.00,'');

INSERT INTO reward_penalty_types (name, type)
VALUES
('Đi trễ', 'penalty'),
('Nghỉ không phép', 'penalty'),
('Làm tốt', 'reward'),
('Hỗ trợ ca gấp', 'reward');

INSERT INTO rewards_penalties (employee_id, attendance_id, type_id, amount)
VALUES
(2, 2, 1, -20000),
(4, 4, 4, 50000),
(7, 7, 3, 30000);

INSERT INTO payrolls (employee_id, month, year, total_salary)
VALUES
(1, 2, 2026, 1200000),
(2, 2, 2026, 2200000),
(3, 2, 2026, 1600000),
(4, 2, 2026, 2800000),
(5, 2, 2026, 3000000);

INSERT INTO payroll_details (payroll_id, attendance_id, hours, rate, amount)
VALUES
(1, 1, 4.08, 25000, 102000),
(2, 2, 7.92, 32000, 253440),
(3, 3, 6.00, 26000, 156000),
(4, 4, 8.17, 35000, 285950),
(5, 5,10.00, 27000, 270000);

INSERT INTO revenues
(schedule_id, employee_id, opening_balance, cash, bank, net, revenue, deviation, note)
VALUES
(4, 4, 2000000, 3500000, 1500000, 4200000, 5000000, 800000, 'Ca tối đông khách'),
(8, 8, 1800000, 3000000, 1200000, 3800000, 4200000, 400000, 'Ngày thường');

INSERT INTO transactions (revenue_id, type, amount, reason)
VALUES
(1, 'expense', 300000, 'Mua sữa + cà phê'),
(1, 'expense', 150000, 'Đá + ly nhựa'),
(1, 'income', 200000, 'Khách đặt bánh'),

(2, 'expense', 250000, 'Nguyên liệu'),
(2, 'income', 100000, 'Tip khách');

INSERT INTO activities (action)
VALUES
('Admin đăng nhập'),
('Duyệt lịch làm'),
('Nhân viên check-in'),
('Nhân viên chốt doanh thu'),
('Admin xem báo cáo tháng');

CREATE TABLE refresh_tokens (
    id SERIAL PRIMARY KEY,
    admin_id INT REFERENCES admin(id),
    token TEXT NOT NULL,
    expires_at TIMESTAMP NOT NULL,
	is_revoked BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
DROP TABLE refresh_tokens;