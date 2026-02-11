-- ================================================
-- UPDATE EMPLOYEES TABLE WITH NEW STAFF DATA
-- ================================================
-- CAUTION: This will delete ALL existing data!
-- Backup before running!

-- Step 1: Delete dependent records (in correct order)

-- Delete transactions (references revenues)
DELETE FROM transactions;

-- Delete revenues (references schedules and employees)
DELETE FROM revenues;

-- Delete payroll details (references payrolls)
DELETE FROM payroll_details;

-- Delete rewards/penalties (references attendance)
DELETE FROM rewards_penalties;

-- Delete attendance (references schedules)
DELETE FROM attendance;

-- Delete schedule requests (references employees and shifts)
DELETE FROM schedule_requests;

-- Delete schedules (references employees and shifts)
DELETE FROM schedules;

-- Delete payrolls (references employees)  
DELETE FROM payrolls;

-- Step 2: Delete employees
DELETE FROM employees;

-- Step 3: Insert new employees
-- Note: gender column is OMITTED (not in original schema or has ENUM we don't know)
INSERT INTO employees
(name, phone, cid, service_salary, barista_salary, dob, hire_date)
VALUES
('Admin', '0000000000', NULL, 0, 0, NULL, '2025-05-05'),
('Thanh Tu', '0765457988', NULL, 22000, 24000, NULL, '2025-09-01'),
('Trinh Hai Lam', '0398413786', '040202000172', 24000, 26000, '2002-10-28', '2025-02-14'),
('Ngoc Han', '0942511614', NULL, 22000, 24000, NULL, NOW()),
('Pham Thi Vinh', '0919495106', NULL, 22000, 24000, NULL, NOW()),
('Phuong Ly', '0896869903', NULL, 24000, 26000, NULL, NOW()),
('Phuoc Khang', '0855224187', NULL, 22000, 0, NULL, NOW()),
('Tran Phu', '0766250207', NULL, 22000, 0, NULL, NOW()),
('Nguyen Nhat Phuong Vy', '0901823105', NULL, 0, 0, NULL, NOW()),
('Gia Han', '0915778422', NULL, 22000, 0, NULL, NOW()),
('Thach Nhat Khang', '0777751896', NULL, 0, 0, NULL, NOW());

-- Step 4: Verify the data
SELECT id, code, name, phone, service_salary, barista_salary FROM employees ORDER BY id;
