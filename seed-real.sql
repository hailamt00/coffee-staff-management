-- Auto-generated seed script
TRUNCATE TABLE "Attendances" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "Schedules" RESTART IDENTITY CASCADE;

-- Insert Positions if not exists

INSERT INTO "Positions" ("Name", "Status")
SELECT 'Phục vụ', true WHERE NOT EXISTS (SELECT 1 FROM "Positions" WHERE "Name" = 'Phục vụ');

INSERT INTO "Positions" ("Name", "Status")
SELECT 'Pha chế(PartTime)', true WHERE NOT EXISTS (SELECT 1 FROM "Positions" WHERE "Name" = 'Pha chế(PartTime)');

INSERT INTO "Positions" ("Name", "Status")
SELECT 'Pha chế(Thử việc)', true WHERE NOT EXISTS (SELECT 1 FROM "Positions" WHERE "Name" = 'Pha chế(Thử việc)');

-- Insert generic shifts for each position

INSERT INTO "Shifts" ("Name", "StartTime", "EndTime", "PositionId", "IsEnabled")
SELECT 'Ca Phục vụ', '06:00', '23:00', "Id", true FROM "Positions" WHERE "Name" = 'Phục vụ'
AND NOT EXISTS (SELECT 1 FROM "Shifts" WHERE "Name" = 'Ca Phục vụ');

INSERT INTO "Shifts" ("Name", "StartTime", "EndTime", "PositionId", "IsEnabled")
SELECT 'Ca Pha chế(PartTime)', '06:00', '23:00', "Id", true FROM "Positions" WHERE "Name" = 'Pha chế(PartTime)'
AND NOT EXISTS (SELECT 1 FROM "Shifts" WHERE "Name" = 'Ca Pha chế(PartTime)');

INSERT INTO "Shifts" ("Name", "StartTime", "EndTime", "PositionId", "IsEnabled")
SELECT 'Ca Pha chế(Thử việc)', '06:00', '23:00', "Id", true FROM "Positions" WHERE "Name" = 'Pha chế(Thử việc)'
AND NOT EXISTS (SELECT 1 FROM "Shifts" WHERE "Name" = 'Ca Pha chế(Thử việc)');

-- Insert Employees

INSERT INTO "Employees" ("Code", "Name", "Phone", "Gender", "ServiceSalary", "BaristaSalary", "HireDate", "CreatedAt", "Status")
SELECT 'NV1001', 'Phước Khang', '0855224187', 'Other', 20000, 25000, '2025-01-01', NOW(), 'Active'
WHERE NOT EXISTS (SELECT 1 FROM "Employees" WHERE "Phone" = '0855224187');

INSERT INTO "Employees" ("Code", "Name", "Phone", "Gender", "ServiceSalary", "BaristaSalary", "HireDate", "CreatedAt", "Status")
SELECT 'NV1002', 'Nguyễn Nhật Phương Vy', '0901823105', 'Other', 20000, 25000, '2025-01-01', NOW(), 'Active'
WHERE NOT EXISTS (SELECT 1 FROM "Employees" WHERE "Phone" = '0901823105');

INSERT INTO "Employees" ("Code", "Name", "Phone", "Gender", "ServiceSalary", "BaristaSalary", "HireDate", "CreatedAt", "Status")
SELECT 'NV1003', 'Thạch Nhất Khang', '0777751896', 'Other', 20000, 25000, '2025-01-01', NOW(), 'Active'
WHERE NOT EXISTS (SELECT 1 FROM "Employees" WHERE "Phone" = '0777751896');

INSERT INTO "Employees" ("Code", "Name", "Phone", "Gender", "ServiceSalary", "BaristaSalary", "HireDate", "CreatedAt", "Status")
SELECT 'NV1004', 'Trịnh Hải Lâm', '0398413786', 'Other', 20000, 25000, '2025-01-01', NOW(), 'Active'
WHERE NOT EXISTS (SELECT 1 FROM "Employees" WHERE "Phone" = '0398413786');

INSERT INTO "Employees" ("Code", "Name", "Phone", "Gender", "ServiceSalary", "BaristaSalary", "HireDate", "CreatedAt", "Status")
SELECT 'NV1005', 'Phương Ly', '0896869903', 'Other', 20000, 25000, '2025-01-01', NOW(), 'Active'
WHERE NOT EXISTS (SELECT 1 FROM "Employees" WHERE "Phone" = '0896869903');

INSERT INTO "Employees" ("Code", "Name", "Phone", "Gender", "ServiceSalary", "BaristaSalary", "HireDate", "CreatedAt", "Status")
SELECT 'NV1006', 'Thanh Tú', '0765457988', 'Other', 20000, 25000, '2025-01-01', NOW(), 'Active'
WHERE NOT EXISTS (SELECT 1 FROM "Employees" WHERE "Phone" = '0765457988');

INSERT INTO "Employees" ("Code", "Name", "Phone", "Gender", "ServiceSalary", "BaristaSalary", "HireDate", "CreatedAt", "Status")
SELECT 'NV1007', 'Trần Phú', '0766250207', 'Other', 20000, 25000, '2025-01-01', NOW(), 'Active'
WHERE NOT EXISTS (SELECT 1 FROM "Employees" WHERE "Phone" = '0766250207');

INSERT INTO "Employees" ("Code", "Name", "Phone", "Gender", "ServiceSalary", "BaristaSalary", "HireDate", "CreatedAt", "Status")
SELECT 'NV1008', 'Gia Hân', '0915778422', 'Other', 20000, 25000, '2025-01-01', NOW(), 'Active'
WHERE NOT EXISTS (SELECT 1 FROM "Employees" WHERE "Phone" = '0915778422');

INSERT INTO "Employees" ("Code", "Name", "Phone", "Gender", "ServiceSalary", "BaristaSalary", "HireDate", "CreatedAt", "Status")
SELECT 'NV1009', 'Ngọc Hân', '0942511614', 'Other', 20000, 25000, '2025-01-01', NOW(), 'Active'
WHERE NOT EXISTS (SELECT 1 FROM "Employees" WHERE "Phone" = '0942511614');

INSERT INTO "Employees" ("Code", "Name", "Phone", "Gender", "ServiceSalary", "BaristaSalary", "HireDate", "CreatedAt", "Status")
SELECT 'NV1010', 'Phạm Thị Vinh', '0919495106', 'Other', 20000, 25000, '2025-01-01', NOW(), 'Active'
WHERE NOT EXISTS (SELECT 1 FROM "Employees" WHERE "Phone" = '0919495106');

-- Insert Schedules and Attendances

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-25', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0855224187'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-25 06:37:00', 
    NULL, 
    NULL, 
    NULL, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-25', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0901823105'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-25 06:25:00', 
    NULL, 
    NULL, 
    NULL, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-24', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0777751896'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-24 13:04:00', 
    NULL, 
    NULL, 
    NULL, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-24', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0901823105'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-24 06:42:00', 
    '2026-02-24 13:10:00', 
    NULL, 
    6.45, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-23', '[Admin Edited]', NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0398413786'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-23 18:40:00', 
    '2026-02-23 22:50:00', 
    '[Admin Edited]', 
    4.15, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-23', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0896869903'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-23 17:53:00', 
    '2026-02-23 22:48:00', 
    NULL, 
    4.92, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-23', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0855224187'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-23 06:39:00', 
    '2026-02-23 11:26:00', 
    NULL, 
    4.77, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-23', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0901823105'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-23 06:31:00', 
    NULL, 
    NULL, 
    NULL, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-22', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0855224187'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-22 06:35:00', 
    '2026-02-22 12:24:00', 
    NULL, 
    5.80, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-22', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0896869903'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-22 06:05:00', 
    '2026-02-22 13:52:00', 
    NULL, 
    7.77, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-21', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0777751896'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-21 07:14:00', 
    '2026-02-21 12:38:00', 
    NULL, 
    5.38, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-21', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0855224187'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-21 06:47:00', 
    '2026-02-21 12:37:00', 
    NULL, 
    5.83, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-20', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0896869903'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-20 06:40:00', 
    '2026-02-20 12:09:00', 
    NULL, 
    5.48, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-20', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0777751896'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-20 06:06:00', 
    '2026-02-20 12:25:00', 
    NULL, 
    6.30, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-19', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0896869903'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-19 06:35:00', 
    '2026-02-19 12:51:00', 
    NULL, 
    6.27, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-18', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0896869903'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-18 06:38:00', 
    '2026-02-18 12:28:00', 
    NULL, 
    5.82, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-17', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0896869903'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-17 06:40:00', 
    NULL, 
    NULL, 
    NULL, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-16', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0896869903'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-16 18:40:00', 
    '2026-02-16 21:28:00', 
    NULL, 
    2.78, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-16', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0855224187'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-16 06:33:00', 
    '2026-02-16 12:23:00', 
    NULL, 
    5.83, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-16', '[Admin Edited]', NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0765457988'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-16 06:00:00', 
    '2026-02-16 19:00:00', 
    '[Admin Edited]', 
    13.00, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-15', '[Admin added]', NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0765457988'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-15 19:00:00', 
    '2026-02-15 22:30:00', 
    '[Admin added]', 
    3.50, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-15', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0855224187'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-15 18:07:00', 
    '2026-02-15 22:32:00', 
    NULL, 
    4.40, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-15', '[Admin Edited]', NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0777751896'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-15 13:30:00', 
    '2026-02-15 19:00:00', 
    '[Admin Edited]', 
    5.50, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-15', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0855224187'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-15 09:05:00', 
    '2026-02-15 11:15:00', 
    NULL, 
    2.15, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-15', '[Admin Edited]', NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0896869903'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-15 06:30:00', 
    '2026-02-15 18:00:00', 
    '[Admin Edited]', 
    11.48, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-14', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0855224187'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-14 22:36:00', 
    '2026-02-14 22:53:00', 
    NULL, 
    0.28, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-14', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0398413786'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-14 18:14:00', 
    '2026-02-14 22:36:00', 
    NULL, 
    4.35, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-14', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0896869903'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-14 14:19:00', 
    '2026-02-14 18:06:00', 
    NULL, 
    3.78, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-14', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0777751896'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-14 13:05:00', 
    '2026-02-14 18:26:00', 
    NULL, 
    5.35, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-14', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0896869903'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-14 06:35:00', 
    '2026-02-14 11:03:00', 
    NULL, 
    4.47, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-13', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0398413786'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-13 18:26:00', 
    '2026-02-13 22:45:00', 
    NULL, 
    4.30, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-13', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0896869903'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-13 13:07:00', 
    '2026-02-13 18:32:00', 
    NULL, 
    5.40, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-13', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0855224187'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-13 06:39:00', 
    '2026-02-13 11:00:00', 
    NULL, 
    4.33, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-13', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0777751896'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-13 06:03:00', 
    NULL, 
    NULL, 
    NULL, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-12', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0896869903'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-12 18:05:00', 
    '2026-02-12 22:33:00', 
    NULL, 
    4.45, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-12', '[Admin Edited]', NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0398413786'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-12 18:01:00', 
    '2026-02-12 22:35:00', 
    '[Admin Edited]', 
    4.55, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-12', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0896869903'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-12 13:08:00', 
    '2026-02-12 18:05:00', 
    NULL, 
    4.95, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-12', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0855224187'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-12 06:38:00', 
    '2026-02-12 11:05:00', 
    NULL, 
    4.43, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-12', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0901823105'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-12 06:16:00', 
    '2026-02-12 13:11:00', 
    NULL, 
    6.90, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-11', '[Admin added]', NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0398413786'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-11 18:00:00', 
    '2026-02-11 20:30:00', 
    '[Admin added]', 
    2.50, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-11', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0896869903'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-11 06:34:00', 
    '2026-02-11 10:48:00', 
    NULL, 
    4.22, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-11', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0901823105'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-11 06:21:00', 
    '2026-02-11 18:00:00', 
    NULL, 
    11.63, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-10', '[Admin Edited]', NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0398413786'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-10 18:32:00', 
    '2026-02-10 22:00:00', 
    '[Admin Edited]', 
    3.45, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-10', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0777751896'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-10 06:31:00', 
    '2026-02-10 11:10:00', 
    NULL, 
    4.63, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-10', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0901823105'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-10 06:17:00', 
    '2026-02-10 18:31:00', 
    NULL, 
    12.23, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-09', '[Admin added]', NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0398413786'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-09 18:00:00', 
    '2026-02-09 22:06:00', 
    '[Admin added]', 
    4.10, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-09', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0896869903'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-09 17:54:00', 
    '2026-02-09 22:06:00', 
    NULL, 
    4.18, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-09', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0901823105'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-09 12:09:00', 
    '2026-02-09 18:06:00', 
    NULL, 
    5.93, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-09', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0777751896'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-09 06:34:00', 
    '2026-02-09 12:10:00', 
    NULL, 
    5.60, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-09', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0896869903'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-09 06:28:00', 
    '2026-02-09 11:53:00', 
    NULL, 
    5.40, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-08', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0901823105'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-08 18:49:00', 
    '2026-02-08 21:55:00', 
    NULL, 
    3.08, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-08', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0777751896'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-08 17:53:00', 
    '2026-02-08 21:55:00', 
    NULL, 
    4.02, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-08', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0896869903'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-08 08:00:00', 
    '2026-02-08 18:48:00', 
    NULL, 
    10.80, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-08', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0855224187'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-08 06:40:00', 
    '2026-02-08 12:08:00', 
    NULL, 
    5.45, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-08', '[Admin added]', NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0398413786'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-08 06:20:00', 
    '2026-02-08 13:30:00', 
    '[Admin added]', 
    7.17, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-07', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0855224187'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-07 18:07:00', 
    '2026-02-07 21:42:00', 
    NULL, 
    3.57, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-07', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0777751896'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-07 13:58:00', 
    '2026-02-07 17:26:00', 
    NULL, 
    3.47, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-07', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(Thử việc)'
    WHERE e."Phone" = '0901823105'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-07 13:14:00', 
    '2026-02-07 21:41:00', 
    NULL, 
    8.43, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-07', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0855224187'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-07 06:37:00', 
    '2026-02-07 11:04:00', 
    NULL, 
    4.45, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-06', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0766250207'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-06 19:08:00', 
    '2026-02-06 22:23:00', 
    NULL, 
    3.25, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-06', '[Admin added]', NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0398413786'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-06 18:30:00', 
    '2026-02-06 23:30:00', 
    '[Admin added]', 
    5.00, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-06', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0915778422'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-06 06:55:00', 
    '2026-02-06 11:18:00', 
    NULL, 
    4.37, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-06', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0942511614'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-06 06:12:00', 
    '2026-02-06 12:30:00', 
    NULL, 
    6.30, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-05', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0766250207'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-05 19:24:00', 
    '2026-02-05 23:00:00', 
    NULL, 
    3.60, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-05', '[Admin Edited]', NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0398413786'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-05 18:00:00', 
    '2026-02-05 23:00:00', 
    '[Admin Edited]', 
    4.98, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-05', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0901823105'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-05 13:14:00', 
    '2026-02-05 18:14:00', 
    NULL, 
    5.00, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-05', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0855224187'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-05 06:38:00', 
    '2026-02-05 11:01:00', 
    NULL, 
    4.37, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-05', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0942511614'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-05 06:05:00', 
    '2026-02-05 13:21:00', 
    NULL, 
    7.25, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-04', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0896869903'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-04 18:33:00', 
    '2026-02-04 22:52:00', 
    NULL, 
    4.32, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-04', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0915778422'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-04 18:03:00', 
    '2026-02-04 23:21:00', 
    NULL, 
    5.28, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-04', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0901823105'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-04 13:11:00', 
    '2026-02-04 18:33:00', 
    NULL, 
    5.37, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-04', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0919495106'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-04 06:27:00', 
    NULL, 
    NULL, 
    NULL, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-04', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0942511614'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-04 06:00:00', 
    '2026-02-04 13:25:00', 
    NULL, 
    7.42, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-03', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0766250207'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-03 18:56:00', 
    '2026-02-03 22:47:00', 
    NULL, 
    3.85, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-03', '[Admin added]', NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0398413786'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-03 18:30:00', 
    '2026-02-03 22:45:00', 
    '[Admin added]', 
    4.25, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-03', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0901823105'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-03 13:25:00', 
    '2026-02-03 18:46:00', 
    NULL, 
    5.35, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-03', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0919495106'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-03 06:27:00', 
    '2026-02-03 11:09:00', 
    NULL, 
    4.68, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-03', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0942511614'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-03 05:59:00', 
    '2026-02-03 13:17:00', 
    NULL, 
    7.30, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-02', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0398413786'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-02 18:04:00', 
    '2026-02-02 22:32:00', 
    NULL, 
    4.45, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-02', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0896869903'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-02 17:59:00', 
    '2026-02-02 22:33:00', 
    NULL, 
    4.57, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-02', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0942511614'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-02 12:03:00', 
    '2026-02-02 18:05:00', 
    NULL, 
    6.02, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-02', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0942511614'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-02 06:32:00', 
    '2026-02-02 11:00:00', 
    NULL, 
    4.45, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-02', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0901823105'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-02 06:18:00', 
    '2026-02-02 12:01:00', 
    NULL, 
    5.72, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-01', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0901823105'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-01 14:15:00', 
    '2026-02-01 22:10:00', 
    NULL, 
    7.92, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-01', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0896869903'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-01 13:37:00', 
    '2026-02-01 22:16:00', 
    NULL, 
    8.63, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-01', NULL, NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Phục vụ'
    WHERE e."Phone" = '0919495106'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-01 06:34:00', 
    '2026-02-01 11:35:00', 
    NULL, 
    5.00, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-01', '[Admin added]', NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0765457988'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-01 06:20:00', 
    '2026-02-01 14:00:00', 
    '[Admin added]', 
    7.67, 
    NOW()
FROM inserted_sched;

WITH inserted_sched AS (
    INSERT INTO "Schedules" ("EmployeeId", "ShiftId", "WorkDate", "Note", "CreatedAt")
    SELECT e."Id", s."Id", '2026-02-01', '[Admin added]', NOW()
    FROM "Employees" e JOIN "Shifts" s ON s."Name" = 'Ca Pha chế(PartTime)'
    WHERE e."Phone" = '0398413786'
    RETURNING "Id", "EmployeeId"
)
INSERT INTO "Attendances" ("EmployeeId", "ScheduleId", "CheckIn", "CheckOut", "Note", "TotalHours", "CreatedAt")
SELECT "EmployeeId", "Id",
    '2026-02-01 06:20:00', 
    '2026-02-01 14:00:00', 
    '[Admin added]', 
    7.67, 
    NOW()
FROM inserted_sched;
