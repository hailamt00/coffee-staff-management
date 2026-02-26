BEGIN;

-- TRUNCATE TABLE employees CASCADE to clear all current employees and dependent table data
TRUNCATE TABLE employees CASCADE;

-- Insert the 10 specified employees with their new codes
INSERT INTO employees (code, name, phone, cid, gender, service_salary, barista_salary, dob, hire_date, created_at) VALUES
('001', E'Thanh Tú', '0765457988', NULL, 'Female', 22000, 24000, NULL, '2025-09-01', NOW()),
('002', E'Trịnh Hải Lâm', '0398413786', '040202000172', 'Male', 24000, 26000, '2002-01-28', '2025-02-14', NOW()),
('003', E'Phương Ly', '0896869903', NULL, 'Female', 24000, 26000, NULL, NULL, NOW()),
('004', E'Ngọc Hân', '0942511614', NULL, 'Female', 22000, 24000, NULL, NULL, NOW()),
('005', E'Phạm Thị Vinh', '0919495106', NULL, 'Female', 22000, 24000, NULL, NULL, NOW()),
('006', E'Phước Khang', '0855224187', NULL, 'Male', 22000, 0, NULL, NULL, NOW()),
('007', E'Trần Phú', '0766250207', NULL, 'Male', 22000, 0, NULL, NULL, NOW()),
('008', E'Nguyễn Nhật Phương Vy', '0901823105', NULL, 'Female', 30000, 30000, NULL, NULL, NOW()),
('009', E'Gia Hân', '0915778422', NULL, 'Female', 22000, 0, NULL, NULL, NOW()),
('010', E'Thạch Nhất Khang', '0777751896', NULL, 'Male', 20000, 22000, NULL, NULL, NOW());

COMMIT;
