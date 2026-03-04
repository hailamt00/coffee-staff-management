
-- CLEAN UP ALL MARCH 2026 DATA
DELETE FROM revenues WHERE schedule_id IN (SELECT id FROM schedules WHERE work_date >= '2026-03-01' AND work_date < '2026-04-01');
DELETE FROM payroll_details WHERE attendance_id IN (SELECT id FROM attendance WHERE check_in >= '2026-03-01' AND check_in < '2026-04-01');
DELETE FROM attendance WHERE check_in >= '2026-03-01' AND check_in < '2026-04-01';
DELETE FROM schedules WHERE work_date >= '2026-03-01' AND work_date < '2026-04-01';

-- Restore ID sequences to safely insert without collision
SELECT setval('schedules_id_seq', COALESCE((SELECT MAX(id) FROM schedules), 1));
SELECT setval('attendance_id_seq', COALESCE((SELECT MAX(id) FROM attendance), 1));


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (75, 62, '2026-03-04', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note, created_at)
    VALUES (new_schedule_id, 75, '2026-03-04 06:44:00', NULL, NULL, NULL, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (71, 62, '2026-03-04', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note, created_at)
    VALUES (new_schedule_id, 71, '2026-03-04 06:19:00', NULL, NULL, NULL, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (73, 64, '2026-03-03', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note, created_at)
    VALUES (new_schedule_id, 73, '2026-03-03 18:15:00', '2026-03-03 22:45:00', 4.5, '[Admin added]', NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (74, 64, '2026-03-03', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note, created_at)
    VALUES (new_schedule_id, 74, '2026-03-03 18:03:00', '2026-03-03 22:44:00', 4.68, NULL, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (79, 63, '2026-03-03', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note, created_at)
    VALUES (new_schedule_id, 79, '2026-03-03 12:49:00', '2026-03-03 18:18:00', 5.47, NULL, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (75, 62, '2026-03-03', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note, created_at)
    VALUES (new_schedule_id, 75, '2026-03-03 06:29:00', '2026-03-03 11:46:00', 5.28, NULL, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (71, 62, '2026-03-03', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note, created_at)
    VALUES (new_schedule_id, 71, '2026-03-03 06:10:00', '2026-03-03 12:49:00', 6.65, NULL, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (77, 64, '2026-03-02', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note, created_at)
    VALUES (new_schedule_id, 77, '2026-03-02 18:03:00', '2026-03-02 22:29:00', 4.42, NULL, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (73, 64, '2026-03-02', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note, created_at)
    VALUES (new_schedule_id, 73, '2026-03-02 18:00:00', '2026-03-02 22:30:00', 4.5, '[Admin added]', NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (78, 63, '2026-03-02', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note, created_at)
    VALUES (new_schedule_id, 78, '2026-03-02 12:12:00', '2026-03-02 17:59:00', 5.77, NULL, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (71, 62, '2026-03-02', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note, created_at)
    VALUES (new_schedule_id, 71, '2026-03-02 06:15:00', '2026-03-02 18:03:00', 11.8, NULL, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (74, 64, '2026-03-01', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note, created_at)
    VALUES (new_schedule_id, 74, '2026-03-01 18:01:00', '2026-03-01 22:45:00', 4.73, NULL, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (73, 64, '2026-03-01', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note, created_at)
    VALUES (new_schedule_id, 73, '2026-03-01 18:00:00', '2026-03-01 22:45:00', 4.75, '[Admin added]', NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (79, 63, '2026-03-01', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note, created_at)
    VALUES (new_schedule_id, 79, '2026-03-01 13:02:00', '2026-03-01 18:10:00', 5.12, NULL, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (72, 62, '2026-03-01', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note, created_at)
    VALUES (new_schedule_id, 72, '2026-03-01 08:00:00', '2026-03-01 13:00:00', 5, '[Admin added]', NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (77, 62, '2026-03-01', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note, created_at)
    VALUES (new_schedule_id, 77, '2026-03-01 07:56:00', '2026-03-01 18:00:00', 10.07, NULL, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (74, 62, '2026-03-01', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note, created_at)
    VALUES (new_schedule_id, 74, '2026-03-01 06:31:00', '2026-03-01 12:24:00', 5.88, NULL, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (73, 62, '2026-03-01', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note, created_at)
    VALUES (new_schedule_id, 73, '2026-03-01 06:10:00', '2026-03-01 13:10:00', 7, '[Admin added]', NOW());
END $$;
