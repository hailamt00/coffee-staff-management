-- Phục vụ Shifts: Sáng (59), Chiều (60), Tối (61)
-- Pha chế Shifts: Sáng (62), Chiều (63), Tối (64)
SET client_encoding = 'UTF8';

INSERT INTO schedules (work_date, shift_id, employee_id, approved_at, note) VALUES
-- Phục vụ
-- T4 (2026-03-04)
('2026-03-04', 59, 78, NOW(), NULL), -- Gia Hân
('2026-03-04', 61, 72, NOW(), NULL), -- Phương Ly

-- T5 (2026-03-05)
('2026-03-05', 59, 78, NOW(), NULL), -- Gia Hân
('2026-03-05', 61, 75, NOW(), NULL), -- Phước Khang

-- T6 (2026-03-06)
('2026-03-06', 59, 76, NOW(), NULL), -- Trần Phú
('2026-03-06', 61, 76, NOW(), NULL), -- Trần Phú

-- T7 (2026-03-07)
('2026-03-07', 59, 75, NOW(), NULL), -- Phước Khang
('2026-03-07', 61, 72, NOW(), NULL), -- Phương Ly

-- CN (2026-03-08)
('2026-03-08', 59, 76, NOW(), '6h30'), -- Trần Phú
('2026-03-08', 59, 72, NOW(), '8h00'), -- Phương Ly
('2026-03-08', 61, 76, NOW(), NULL), -- Trần Phú

-- Pha chế
-- T4 (2026-03-04)
('2026-03-04', 62, 77, NOW(), NULL), -- Phương Vy
('2026-03-04', 63, 79, NOW(), NULL), -- Nhất Khang
('2026-03-04', 64, 71, NOW(), NULL), -- Trịnh Hải Lâm

-- T5 (2026-03-05)
('2026-03-05', 62, 77, NOW(), NULL), -- Phương Vy
('2026-03-05', 63, 77, NOW(), NULL), -- Phương Vy
('2026-03-05', 64, 71, NOW(), NULL), -- Trịnh Hải Lâm

-- T6 (2026-03-06)
('2026-03-06', 62, 77, NOW(), NULL), -- Phương Vy
('2026-03-06', 63, 79, NOW(), NULL), -- Nhất Khang
('2026-03-06', 64, 71, NOW(), NULL), -- Trịnh Hải Lâm

-- T7 (2026-03-07)
('2026-03-07', 62, 70, NOW(), NULL), -- Thanh Tú
('2026-03-07', 63, 71, NOW(), NULL), -- Trịnh Hải Lâm
('2026-03-07', 64, 79, NOW(), NULL), -- Nhất Khang

-- CN (2026-03-08)
('2026-03-08', 62, 70, NOW(), NULL), -- Thanh Tú
('2026-03-08', 62, 71, NOW(), NULL), -- Trịnh Hải Lâm
('2026-03-08', 63, 73, NOW(), NULL), -- Ngọc Hân
('2026-03-08', 64, 79, NOW(), NULL)  -- Nhất Khang

ON CONFLICT (employee_id, shift_id, work_date) DO NOTHING;
