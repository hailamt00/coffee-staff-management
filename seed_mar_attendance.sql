
-- MAR 2026 DATA SEED
-- Clean up existing March data just in case
DELETE FROM revenues WHERE schedule_id IN (SELECT id FROM schedules WHERE work_date >= '2026-03-01' AND work_date < '2026-04-01');
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
    VALUES (70, 61, '2026-03-01', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 70, '2026-03-01 18:05:00', '2026-03-01 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (72, 62, '2026-03-01', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 72, '2026-03-01 06:05:00', '2026-03-01 13:05:00', 7, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (73, 62, '2026-03-01', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 73, '2026-03-01 06:45:00', '2026-03-01 13:15:00', 7, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (78, 63, '2026-03-01', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 78, '2026-03-01 13:05:00', '2026-03-01 18:05:00', 5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (76, 63, '2026-03-01', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 76, '2026-03-01 13:45:00', '2026-03-01 18:15:00', 5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (70, 63, '2026-03-02', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 70, '2026-03-02 13:05:00', '2026-03-02 18:05:00', 5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (77, 59, '2026-03-02', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 77, '2026-03-02 07:05:00', '2026-03-02 11:05:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (71, 62, '2026-03-02', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 71, '2026-03-02 06:05:00', '2026-03-02 13:05:00', 7, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (73, 63, '2026-03-02', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 73, '2026-03-02 13:05:00', '2026-03-02 18:05:00', 5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (74, 60, '2026-03-02', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 74, '2026-03-02 14:05:00', '2026-03-02 18:05:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (74, 59, '2026-03-03', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 74, '2026-03-03 07:45:00', '2026-03-03 11:15:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (72, 62, '2026-03-03', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 72, '2026-03-03 06:05:00', '2026-03-03 13:05:00', 7, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (70, 61, '2026-03-03', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 70, '2026-03-03 18:05:00', '2026-03-03 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (73, 62, '2026-03-03', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 73, '2026-03-03 06:05:00', '2026-03-03 13:05:00', 7, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (78, 61, '2026-03-03', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 78, '2026-03-03 18:05:00', '2026-03-03 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (74, 63, '2026-03-04', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 74, '2026-03-04 13:05:00', '2026-03-04 18:05:00', 5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (75, 59, '2026-03-04', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 75, '2026-03-04 07:05:00', '2026-03-04 11:05:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (70, 63, '2026-03-04', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 70, '2026-03-04 13:05:00', '2026-03-04 18:05:00', 5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (76, 60, '2026-03-04', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 76, '2026-03-04 14:45:00', '2026-03-04 18:15:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (78, 61, '2026-03-04', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 78, '2026-03-04 18:45:00', '2026-03-04 22:45:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (74, 63, '2026-03-05', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 74, '2026-03-05 13:05:00', '2026-03-05 18:05:00', 5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (75, 63, '2026-03-05', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 75, '2026-03-05 13:45:00', '2026-03-05 18:15:00', 5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (76, 61, '2026-03-05', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 76, '2026-03-05 18:05:00', '2026-03-05 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (73, 62, '2026-03-05', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 73, '2026-03-05 06:45:00', '2026-03-05 13:15:00', 7, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (78, 63, '2026-03-05', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 78, '2026-03-05 13:05:00', '2026-03-05 18:05:00', 5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (75, 59, '2026-03-06', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 75, '2026-03-06 07:05:00', '2026-03-06 11:05:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (71, 64, '2026-03-06', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 71, '2026-03-06 18:05:00', '2026-03-06 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (70, 62, '2026-03-06', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 70, '2026-03-06 06:05:00', '2026-03-06 13:05:00', 7, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (79, 63, '2026-03-06', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 79, '2026-03-06 13:05:00', '2026-03-06 18:05:00', 5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (73, 62, '2026-03-06', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 73, '2026-03-06 06:05:00', '2026-03-06 13:05:00', 7, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (70, 64, '2026-03-07', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 70, '2026-03-07 18:45:00', '2026-03-07 22:45:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (75, 59, '2026-03-07', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 75, '2026-03-07 07:05:00', '2026-03-07 11:05:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (76, 59, '2026-03-07', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 76, '2026-03-07 07:05:00', '2026-03-07 11:05:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (74, 64, '2026-03-07', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 74, '2026-03-07 18:45:00', '2026-03-07 22:45:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (78, 64, '2026-03-07', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 78, '2026-03-07 18:05:00', '2026-03-07 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (77, 62, '2026-03-08', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 77, '2026-03-08 06:05:00', '2026-03-08 13:05:00', 7, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (73, 60, '2026-03-08', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 73, '2026-03-08 14:45:00', '2026-03-08 18:15:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (72, 63, '2026-03-08', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 72, '2026-03-08 13:05:00', '2026-03-08 18:05:00', 5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (75, 60, '2026-03-08', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 75, '2026-03-08 14:05:00', '2026-03-08 18:05:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (74, 59, '2026-03-08', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 74, '2026-03-08 07:05:00', '2026-03-08 11:05:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (71, 63, '2026-03-09', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 71, '2026-03-09 13:45:00', '2026-03-09 18:15:00', 5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (75, 62, '2026-03-09', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 75, '2026-03-09 06:05:00', '2026-03-09 13:05:00', 7, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (73, 60, '2026-03-09', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 73, '2026-03-09 14:05:00', '2026-03-09 18:05:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (70, 63, '2026-03-09', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 70, '2026-03-09 13:05:00', '2026-03-09 18:05:00', 5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (77, 60, '2026-03-09', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 77, '2026-03-09 14:05:00', '2026-03-09 18:05:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (70, 61, '2026-03-10', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 70, '2026-03-10 18:05:00', '2026-03-10 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (71, 62, '2026-03-10', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 71, '2026-03-10 06:05:00', '2026-03-10 13:05:00', 7, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (78, 62, '2026-03-10', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 78, '2026-03-10 06:05:00', '2026-03-10 13:05:00', 7, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (76, 62, '2026-03-10', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 76, '2026-03-10 06:05:00', '2026-03-10 13:05:00', 7, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (77, 63, '2026-03-10', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 77, '2026-03-10 13:45:00', '2026-03-10 18:15:00', 5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (75, 62, '2026-03-11', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 75, '2026-03-11 06:05:00', '2026-03-11 13:05:00', 7, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (71, 62, '2026-03-11', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 71, '2026-03-11 06:05:00', '2026-03-11 13:05:00', 7, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (70, 59, '2026-03-11', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 70, '2026-03-11 07:05:00', '2026-03-11 11:05:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (77, 60, '2026-03-11', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 77, '2026-03-11 14:05:00', '2026-03-11 18:05:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (76, 64, '2026-03-11', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 76, '2026-03-11 18:05:00', '2026-03-11 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (75, 63, '2026-03-12', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 75, '2026-03-12 13:05:00', '2026-03-12 18:05:00', 5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (79, 59, '2026-03-12', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 79, '2026-03-12 07:05:00', '2026-03-12 11:05:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (70, 61, '2026-03-12', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 70, '2026-03-12 18:05:00', '2026-03-12 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (77, 63, '2026-03-12', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 77, '2026-03-12 13:05:00', '2026-03-12 18:05:00', 5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (71, 61, '2026-03-12', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 71, '2026-03-12 18:05:00', '2026-03-12 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (71, 61, '2026-03-13', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 71, '2026-03-13 18:05:00', '2026-03-13 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (77, 59, '2026-03-13', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 77, '2026-03-13 07:05:00', '2026-03-13 11:05:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (76, 61, '2026-03-13', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 76, '2026-03-13 18:05:00', '2026-03-13 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (70, 59, '2026-03-13', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 70, '2026-03-13 07:05:00', '2026-03-13 11:05:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (78, 61, '2026-03-13', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 78, '2026-03-13 18:45:00', '2026-03-13 22:45:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (72, 60, '2026-03-14', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 72, '2026-03-14 14:05:00', '2026-03-14 18:05:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (75, 62, '2026-03-14', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 75, '2026-03-14 06:45:00', '2026-03-14 13:15:00', 7, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (79, 59, '2026-03-14', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 79, '2026-03-14 07:05:00', '2026-03-14 11:05:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (76, 60, '2026-03-14', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 76, '2026-03-14 14:05:00', '2026-03-14 18:05:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (77, 60, '2026-03-14', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 77, '2026-03-14 14:05:00', '2026-03-14 18:05:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (71, 63, '2026-03-15', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 71, '2026-03-15 13:05:00', '2026-03-15 18:05:00', 5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (73, 61, '2026-03-15', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 73, '2026-03-15 18:05:00', '2026-03-15 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (74, 63, '2026-03-15', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 74, '2026-03-15 13:45:00', '2026-03-15 18:15:00', 5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (79, 60, '2026-03-15', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 79, '2026-03-15 14:05:00', '2026-03-15 18:05:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (70, 64, '2026-03-15', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 70, '2026-03-15 18:05:00', '2026-03-15 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (77, 62, '2026-03-16', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 77, '2026-03-16 06:05:00', '2026-03-16 13:05:00', 7, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (72, 59, '2026-03-16', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 72, '2026-03-16 07:45:00', '2026-03-16 11:15:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (71, 60, '2026-03-16', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 71, '2026-03-16 14:05:00', '2026-03-16 18:05:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (75, 59, '2026-03-16', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 75, '2026-03-16 07:05:00', '2026-03-16 11:05:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (78, 61, '2026-03-16', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 78, '2026-03-16 18:05:00', '2026-03-16 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (77, 62, '2026-03-17', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 77, '2026-03-17 06:45:00', '2026-03-17 13:15:00', 7, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (70, 63, '2026-03-17', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 70, '2026-03-17 13:45:00', '2026-03-17 18:15:00', 5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (71, 61, '2026-03-17', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 71, '2026-03-17 18:05:00', '2026-03-17 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (78, 61, '2026-03-17', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 78, '2026-03-17 18:05:00', '2026-03-17 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (75, 59, '2026-03-17', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 75, '2026-03-17 07:05:00', '2026-03-17 11:05:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (75, 59, '2026-03-18', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 75, '2026-03-18 07:45:00', '2026-03-18 11:15:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (78, 59, '2026-03-18', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 78, '2026-03-18 07:45:00', '2026-03-18 11:15:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (77, 61, '2026-03-18', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 77, '2026-03-18 18:05:00', '2026-03-18 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (74, 59, '2026-03-18', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 74, '2026-03-18 07:05:00', '2026-03-18 11:05:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (70, 59, '2026-03-18', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 70, '2026-03-18 07:05:00', '2026-03-18 11:05:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (72, 64, '2026-03-19', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 72, '2026-03-19 18:05:00', '2026-03-19 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (73, 59, '2026-03-19', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 73, '2026-03-19 07:45:00', '2026-03-19 11:15:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (79, 61, '2026-03-19', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 79, '2026-03-19 18:45:00', '2026-03-19 22:45:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (78, 61, '2026-03-19', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 78, '2026-03-19 18:05:00', '2026-03-19 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (77, 61, '2026-03-19', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 77, '2026-03-19 18:05:00', '2026-03-19 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (72, 62, '2026-03-20', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 72, '2026-03-20 06:45:00', '2026-03-20 13:15:00', 7, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (71, 63, '2026-03-20', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 71, '2026-03-20 13:05:00', '2026-03-20 18:05:00', 5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (76, 63, '2026-03-20', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 76, '2026-03-20 13:05:00', '2026-03-20 18:05:00', 5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (75, 60, '2026-03-20', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 75, '2026-03-20 14:05:00', '2026-03-20 18:05:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (77, 64, '2026-03-20', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 77, '2026-03-20 18:05:00', '2026-03-20 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (73, 62, '2026-03-21', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 73, '2026-03-21 06:05:00', '2026-03-21 13:05:00', 7, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (77, 63, '2026-03-21', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 77, '2026-03-21 13:05:00', '2026-03-21 18:05:00', 5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (72, 61, '2026-03-21', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 72, '2026-03-21 18:05:00', '2026-03-21 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (74, 60, '2026-03-21', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 74, '2026-03-21 14:05:00', '2026-03-21 18:05:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (75, 63, '2026-03-21', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 75, '2026-03-21 13:05:00', '2026-03-21 18:05:00', 5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (71, 64, '2026-03-22', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 71, '2026-03-22 18:05:00', '2026-03-22 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (70, 60, '2026-03-22', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 70, '2026-03-22 14:45:00', '2026-03-22 18:15:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (72, 61, '2026-03-22', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 72, '2026-03-22 18:05:00', '2026-03-22 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (73, 64, '2026-03-22', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 73, '2026-03-22 18:05:00', '2026-03-22 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (79, 63, '2026-03-22', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 79, '2026-03-22 13:05:00', '2026-03-22 18:05:00', 5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (77, 64, '2026-03-23', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 77, '2026-03-23 18:45:00', '2026-03-23 22:45:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (74, 63, '2026-03-23', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 74, '2026-03-23 13:05:00', '2026-03-23 18:05:00', 5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (73, 64, '2026-03-23', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 73, '2026-03-23 18:05:00', '2026-03-23 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (72, 62, '2026-03-23', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 72, '2026-03-23 06:05:00', '2026-03-23 13:05:00', 7, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (75, 60, '2026-03-23', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 75, '2026-03-23 14:45:00', '2026-03-23 18:15:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (70, 61, '2026-03-24', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 70, '2026-03-24 18:05:00', '2026-03-24 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (78, 60, '2026-03-24', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 78, '2026-03-24 14:05:00', '2026-03-24 18:05:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (76, 59, '2026-03-24', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 76, '2026-03-24 07:05:00', '2026-03-24 11:05:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (79, 59, '2026-03-24', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 79, '2026-03-24 07:05:00', '2026-03-24 11:05:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (71, 59, '2026-03-24', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 71, '2026-03-24 07:05:00', '2026-03-24 11:05:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (71, 63, '2026-03-25', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 71, '2026-03-25 13:05:00', '2026-03-25 18:05:00', 5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (70, 63, '2026-03-25', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 70, '2026-03-25 13:05:00', '2026-03-25 18:05:00', 5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (78, 62, '2026-03-25', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 78, '2026-03-25 06:45:00', '2026-03-25 13:15:00', 7, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (77, 61, '2026-03-25', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 77, '2026-03-25 18:05:00', '2026-03-25 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (75, 64, '2026-03-25', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 75, '2026-03-25 18:05:00', '2026-03-25 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (75, 60, '2026-03-26', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 75, '2026-03-26 14:05:00', '2026-03-26 18:05:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (74, 64, '2026-03-26', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 74, '2026-03-26 18:05:00', '2026-03-26 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (78, 61, '2026-03-26', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 78, '2026-03-26 18:05:00', '2026-03-26 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (76, 62, '2026-03-26', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 76, '2026-03-26 06:05:00', '2026-03-26 13:05:00', 7, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (73, 59, '2026-03-26', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 73, '2026-03-26 07:05:00', '2026-03-26 11:05:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (73, 61, '2026-03-27', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 73, '2026-03-27 18:05:00', '2026-03-27 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (70, 64, '2026-03-27', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 70, '2026-03-27 18:05:00', '2026-03-27 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (71, 62, '2026-03-27', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 71, '2026-03-27 06:45:00', '2026-03-27 13:15:00', 7, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (72, 64, '2026-03-27', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 72, '2026-03-27 18:05:00', '2026-03-27 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (74, 64, '2026-03-27', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 74, '2026-03-27 18:05:00', '2026-03-27 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (72, 59, '2026-03-28', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 72, '2026-03-28 07:05:00', '2026-03-28 11:05:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (78, 59, '2026-03-28', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 78, '2026-03-28 07:05:00', '2026-03-28 11:05:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (77, 63, '2026-03-28', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 77, '2026-03-28 13:05:00', '2026-03-28 18:05:00', 5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (74, 61, '2026-03-28', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 74, '2026-03-28 18:05:00', '2026-03-28 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (70, 61, '2026-03-28', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 70, '2026-03-28 18:05:00', '2026-03-28 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (78, 63, '2026-03-29', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 78, '2026-03-29 13:05:00', '2026-03-29 18:05:00', 5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (70, 62, '2026-03-29', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 70, '2026-03-29 06:05:00', '2026-03-29 13:05:00', 7, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (75, 59, '2026-03-29', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 75, '2026-03-29 07:05:00', '2026-03-29 11:05:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (71, 63, '2026-03-29', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 71, '2026-03-29 13:05:00', '2026-03-29 18:05:00', 5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (79, 61, '2026-03-29', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 79, '2026-03-29 18:05:00', '2026-03-29 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (70, 60, '2026-03-30', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 70, '2026-03-30 14:05:00', '2026-03-30 18:05:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (74, 59, '2026-03-30', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 74, '2026-03-30 07:05:00', '2026-03-30 11:05:00', 4, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (75, 62, '2026-03-30', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 75, '2026-03-30 06:45:00', '2026-03-30 13:15:00', 7, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (71, 63, '2026-03-30', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 71, '2026-03-30 13:45:00', '2026-03-30 18:15:00', 5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (72, 61, '2026-03-30', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 72, '2026-03-30 18:05:00', '2026-03-30 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (76, 64, '2026-03-31', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 76, '2026-03-31 18:05:00', '2026-03-31 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (77, 62, '2026-03-31', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 77, '2026-03-31 06:05:00', '2026-03-31 13:05:00', 7, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (74, 63, '2026-03-31', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 74, '2026-03-31 13:05:00', '2026-03-31 18:05:00', 5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (78, 61, '2026-03-31', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 78, '2026-03-31 18:05:00', '2026-03-31 22:35:00', 4.5, NOW());
END $$;

DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (70, 60, '2026-03-31', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, 70, '2026-03-31 14:05:00', '2026-03-31 18:05:00', 4, NOW());
END $$;
