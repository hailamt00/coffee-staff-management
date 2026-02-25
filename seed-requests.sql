-- Create some dummy schedule requests matching the layout
-- We will use existing Employees (from ID 1 to 5) and existing Shifts (from ID 1 to 9).
-- WorkDate will be within this week
TRUNCATE TABLE "ScheduleRequests" RESTART IDENTITY CASCADE;

INSERT INTO "ScheduleRequests" ("EmployeeId", "ShiftId", "WorkDate", "Status", "Note", "CreatedAt") VALUES
-- Employee 1 (Nguyen Van A)
(1, 1, '2026-02-23', 0, 'Xin đăng ký ca sáng t2', NOW()), -- pending
(1, 4, '2026-02-24', 1, '', NOW()), -- approved
(1, 7, '2026-02-25', 2, 'Trùng lịch học', NOW()), -- rejected
(1, 2, '2026-02-26', 1, '', NOW()), -- approved
(1, 5, '2026-02-27', 0, '', NOW()), -- pending

-- Employee 2 (Tran Thi B)
(2, 2, '2026-02-23', 1, '', NOW()), -- approved
(2, 5, '2026-02-24', 2, 'Đủ nv rồi', NOW()), -- rejected
(2, 8, '2026-02-25', 1, '', NOW()), -- approved
(2, 3, '2026-02-26', 0, 'Nhà có việc đổi ca', NOW()), -- pending
(2, 6, '2026-02-27', 1, '', NOW()), -- approved

-- Employee 3 (Le Van C)
(3, 3, '2026-02-23', 2, 'Xin nghỉ ốm', NOW()), -- rejected
(3, 6, '2026-02-24', 1, '', NOW()), -- approved
(3, 9, '2026-02-25', 0, '', NOW()), -- pending
(3, 1, '2026-02-26', 1, '', NOW()), -- approved
(3, 4, '2026-02-27', 1, '', NOW()), -- approved

-- Employee 4 (Pham Thi D)
(4, 4, '2026-02-23', 1, '', NOW()), -- approved
(4, 7, '2026-02-24', 0, '', NOW()), -- pending
(4, 1, '2026-02-25', 1, 'Làm bù hôm trc', NOW()), -- approved
(4, 5, '2026-02-26', 2, '', NOW()), -- rejected
(4, 8, '2026-02-27', 1, '', NOW()), -- approved

-- Employee 5 (Hoang Van E)
(5, 5, '2026-02-23', 0, '', NOW()), -- pending
(5, 8, '2026-02-24', 1, '', NOW()), -- approved
(5, 2, '2026-02-25', 2, 'Sai ca', NOW()), -- rejected
(5, 6, '2026-02-26', 1, '', NOW()), -- approved
(5, 9, '2026-02-27', 0, '', NOW()), -- pending

-- Spread out some more generic ones for density
(1, 3, '2026-02-28', 1, '', NOW()),
(2, 1, '2026-02-28', 0, '', NOW()),
(3, 5, '2026-02-28', 1, '', NOW()),
(4, 9, '2026-02-28', 2, '', NOW()),
(5, 4, '2026-02-28', 1, '', NOW());
