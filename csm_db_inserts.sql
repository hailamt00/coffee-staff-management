
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
