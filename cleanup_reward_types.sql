BEGIN;

-- TRUNCATE TABLE reward_penalty_types to clear existing types
TRUNCATE TABLE reward_penalty_types CASCADE;

-- Insert a cleaned, standardized list of reward and penalty types
INSERT INTO reward_penalty_types (name, type, amount, created_at) VALUES
('Đi trễ', 'Penalty', 20000, NOW()),
('Nghỉ không phép', 'Penalty', 100000, NOW()),
('Làm tốt/Xuất sắc', 'Reward', 50000, NOW()),
('Chuyên cần', 'Reward', 100000, NOW()),
('Làm hỏng đồ/Thiết bị', 'Penalty', 50000, NOW()),
('Thiếu đồng phục', 'Penalty', 10000, NOW()),
('Thái độ chưa tốt', 'Penalty', 20000, NOW()),
('Quên tắt điện/nước', 'Penalty', 50000, NOW()),
('Order nhầm', 'Penalty', 10000, NOW()),
('Pha chế sai công thức', 'Penalty', 20000, NOW()),
('Hỗ trợ ca gấp', 'Reward', 30000, NOW());

COMMIT;
