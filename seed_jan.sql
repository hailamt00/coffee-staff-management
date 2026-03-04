
SET client_encoding = 'UTF8';
BEGIN;
DELETE FROM transactions WHERE revenue_id IN (SELECT id FROM revenues WHERE schedule_id IN (SELECT id FROM schedules WHERE work_date >= '2026-01-01' AND work_date < '2026-02-01'));
DELETE FROM revenues WHERE schedule_id IN (SELECT id FROM schedules WHERE work_date >= '2026-01-01' AND work_date < '2026-02-01');
DELETE FROM attendance WHERE check_in >= '2026-01-01' AND check_in < '2026-02-01';
DELETE FROM schedules WHERE work_date >= '2026-01-01' AND work_date < '2026-02-01';

SELECT setval('schedules_id_seq', (SELECT COALESCE(MAX(id), 1) FROM schedules));
SELECT setval('attendance_id_seq', (SELECT COALESCE(MAX(id), 1) FROM attendance));


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 61, '2026-01-31', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-01-31T18:13:00', '2026-01-31T22:30:00', 4.27, '[Admin Edited]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 60, '2026-01-31', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-01-31T15:16:00', '2026-01-31T18:13:00', 2.93, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 63, '2026-01-31', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-01-31T14:00:00', '2026-01-31T22:30:00', 8.48, '[Admin Edited]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 59, '2026-01-31', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-01-31T08:59:00', '2026-01-31T12:00:00', 3.02, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (74, 59, '2026-01-31', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 74, '2026-01-31T06:30:00', '2026-01-31T11:01:00', 4.50, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (73, 62, '2026-01-31', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 73, '2026-01-31T06:06:00', '2026-01-31T14:06:00', 7.98, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (70, 64, '2026-01-30', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 70, '2026-01-30T18:30:00', '2026-01-30T22:30:00', 4.00, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (79, 61, '2026-01-30', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 79, '2026-01-30T18:03:00', '2026-01-30T22:30:00', 4.43, '[Admin Edited]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 63, '2026-01-30', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-01-30T12:15:00', '2026-01-30T18:24:00', 6.13, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (74, 59, '2026-01-30', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 74, '2026-01-30T07:21:00', '2026-01-30T09:26:00', 2.07, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (73, 62, '2026-01-30', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 73, '2026-01-30T06:04:00', '2026-01-30T12:21:00', 6.27, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (76, 61, '2026-01-29', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 76, '2026-01-29T18:57:00', '2026-01-29T22:21:00', 3.40, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 64, '2026-01-29', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-01-29T18:00:00', '2026-01-29T22:30:00', 4.50, '[Admin Edited]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 63, '2026-01-29', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-01-29T13:31:00', '2026-01-29T16:32:00', 3.02, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 59, '2026-01-29', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-01-29T06:32:00', '2026-01-29T11:00:00', 4.45, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (73, 62, '2026-01-29', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 73, '2026-01-29T06:05:00', '2026-01-29T13:29:00', 7.40, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (78, 61, '2026-01-28', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 78, '2026-01-28T18:00:00', '2026-01-28T22:57:00', 4.93, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 64, '2026-01-28', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-01-28T18:00:00', '2026-01-28T22:50:00', 4.83, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 63, '2026-01-28', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-01-28T13:12:00', '2026-01-28T18:18:00', 5.10, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (74, 59, '2026-01-28', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 74, '2026-01-28T06:25:00', '2026-01-28T11:33:00', 5.12, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (73, 62, '2026-01-28', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 73, '2026-01-28T06:00:00', '2026-01-28T13:12:00', 7.20, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 64, '2026-01-27', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-01-27T18:45:00', '2026-01-27T22:31:00', 3.75, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (76, 61, '2026-01-27', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 76, '2026-01-27T18:01:00', '2026-01-27T22:30:00', 4.47, '[Admin Edited]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (79, 63, '2026-01-27', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 79, '2026-01-27T13:00:00', '2026-01-27T18:00:00', 4.98, '[Admin Edited]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (74, 59, '2026-01-27', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 74, '2026-01-27T06:28:00', '2026-01-27T11:21:00', 4.87, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (73, 62, '2026-01-27', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 73, '2026-01-27T06:05:00', '2026-01-27T13:02:00', 6.95, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 64, '2026-01-26', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-01-26T18:20:00', '2026-01-26T22:37:00', 4.28, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 61, '2026-01-26', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-01-26T18:02:00', '2026-01-26T22:47:00', 4.73, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (73, 59, '2026-01-26', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 73, '2026-01-26T06:36:00', '2026-01-26T11:02:00', 4.43, '[Admin Edited]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 62, '2026-01-26', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-01-26T06:13:00', '2026-01-26T18:25:00', 12.18, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 61, '2026-01-25', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-01-25T18:04:00', '2026-01-25T22:10:00', 4.08, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (73, 64, '2026-01-25', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 73, '2026-01-25T18:00:00', '2026-01-25T22:05:00', 4.07, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 63, '2026-01-25', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-01-25T13:57:00', '2026-01-25T18:00:00', 4.03, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 59, '2026-01-25', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-01-25T08:07:00', '2026-01-25T18:08:00', 10.00, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (70, 62, '2026-01-25', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 70, '2026-01-25T08:00:00', '2026-01-25T13:00:00', 5.00, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (74, 59, '2026-01-25', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 74, '2026-01-25T06:26:00', '2026-01-25T12:08:00', 5.68, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 62, '2026-01-25', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-01-25T06:10:00', '2026-01-25T13:54:00', 7.73, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 61, '2026-01-24', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-01-24T18:16:00', '2026-01-24T22:30:00', 4.23, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 64, '2026-01-24', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-01-24T18:13:00', '2026-01-24T22:29:00', 4.25, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 60, '2026-01-24', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-01-24T14:02:00', '2026-01-24T18:16:00', 4.23, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (79, 63, '2026-01-24', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 79, '2026-01-24T12:57:00', '2026-01-24T18:00:00', 5.03, '[Admin Edited]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (78, 59, '2026-01-24', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 78, '2026-01-24T09:35:00', '2026-01-24T14:37:00', 5.02, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (74, 59, '2026-01-24', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 74, '2026-01-24T06:26:00', '2026-01-24T11:36:00', 5.17, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (73, 62, '2026-01-24', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 73, '2026-01-24T06:01:00', '2026-01-24T13:03:00', 7.03, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 61, '2026-01-23', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-01-23T18:03:00', '2026-01-23T22:28:00', 4.42, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 64, '2026-01-23', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-01-23T18:00:00', '2026-01-23T22:30:00', 4.50, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (79, 63, '2026-01-23', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 79, '2026-01-23T12:12:00', '2026-01-23T18:04:00', 5.87, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (76, 59, '2026-01-23', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 76, '2026-01-23T06:35:00', '2026-01-23T11:31:00', 4.93, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (73, 62, '2026-01-23', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 73, '2026-01-23T06:11:00', '2026-01-23T12:22:00', 6.18, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (76, 61, '2026-01-22', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 76, '2026-01-22T18:45:00', '2026-01-22T22:51:00', 4.10, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 64, '2026-01-22', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-01-22T18:06:00', '2026-01-22T22:53:00', 4.77, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 63, '2026-01-22', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-01-22T13:19:00', '2026-01-22T18:14:00', 4.90, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 59, '2026-01-22', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-01-22T06:38:00', '2026-01-22T11:32:00', 4.88, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (73, 62, '2026-01-22', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 73, '2026-01-22T06:10:00', '2026-01-22T13:17:00', 7.10, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 61, '2026-01-21', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-01-21T18:12:00', '2026-01-21T22:29:00', 4.27, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 64, '2026-01-21', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-01-21T18:12:00', '2026-01-21T22:27:00', 4.25, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 63, '2026-01-21', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-01-21T12:26:00', '2026-01-21T18:12:00', 5.75, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (74, 59, '2026-01-21', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 74, '2026-01-21T06:33:00', '2026-01-21T11:26:00', 4.88, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (73, 62, '2026-01-21', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 73, '2026-01-21T06:04:00', '2026-01-21T12:26:00', 6.35, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 64, '2026-01-20', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-01-20T18:25:00', '2026-01-20T21:45:00', 3.33, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 61, '2026-01-20', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-01-20T17:52:00', '2026-01-20T21:39:00', 3.78, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 63, '2026-01-20', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-01-20T13:16:00', '2026-01-20T18:28:00', 5.20, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (74, 59, '2026-01-20', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 74, '2026-01-20T06:52:00', '2026-01-20T11:17:00', 4.42, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (73, 62, '2026-01-20', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 73, '2026-01-20T06:05:00', '2026-01-20T13:15:00', 7.15, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (76, 61, '2026-01-19', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 76, '2026-01-19T18:00:00', '2026-01-19T22:49:00', 4.80, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 64, '2026-01-19', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-01-19T17:58:00', '2026-01-19T22:47:00', 4.82, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (73, 59, '2026-01-19', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 73, '2026-01-19T06:42:00', '2026-01-19T11:01:00', 4.32, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 62, '2026-01-19', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-01-19T06:09:00', '2026-01-19T17:57:00', 11.80, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 64, '2026-01-18', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-01-18T18:19:00', '2026-01-18T22:31:00', 4.18, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (79, 63, '2026-01-18', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 79, '2026-01-18T13:00:00', '2026-01-18T18:20:00', 5.32, '[Admin Edited]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 59, '2026-01-18', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-01-18T11:26:00', '2026-01-18T22:33:00', 11.10, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (70, 62, '2026-01-18', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 70, '2026-01-18T08:00:00', '2026-01-18T13:00:00', 5.00, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (79, 59, '2026-01-18', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 79, '2026-01-18T07:55:00', '2026-01-18T12:02:00', 4.12, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 59, '2026-01-18', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-01-18T06:35:00', '2026-01-18T11:38:00', 5.05, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 62, '2026-01-18', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-01-18T06:03:00', '2026-01-18T17:40:00', 11.60, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 64, '2026-01-17', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-01-17T18:15:00', '2026-01-17T22:23:00', 4.12, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 61, '2026-01-17', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-01-17T18:04:00', '2026-01-17T22:26:00', 4.37, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 60, '2026-01-17', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-01-17T14:00:00', '2026-01-17T18:04:00', 4.05, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (79, 63, '2026-01-17', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 79, '2026-01-17T12:08:00', '2026-01-17T18:00:00', 5.85, '[Admin Edited]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (78, 59, '2026-01-17', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 78, '2026-01-17T09:06:00', '2026-01-17T11:05:00', 1.98, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (74, 59, '2026-01-17', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 74, '2026-01-17T06:33:00', '2026-01-17T11:05:00', 4.53, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (73, 62, '2026-01-17', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 73, '2026-01-17T05:59:00', '2026-01-17T12:00:00', 6.00, '[Admin Edited]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (76, 61, '2026-01-16', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 76, '2026-01-16T19:03:00', '2026-01-16T22:30:00', 3.43, '[Admin Edited]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 64, '2026-01-16', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-01-16T18:20:00', '2026-01-16T22:30:00', 4.15, '[Admin Edited]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (79, 63, '2026-01-16', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 79, '2026-01-16T12:19:00', '2026-01-16T18:34:00', 6.23, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (78, 59, '2026-01-16', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 78, '2026-01-16T06:36:00', '2026-01-16T11:00:00', 4.38, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (73, 62, '2026-01-16', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 73, '2026-01-16T05:56:00', '2026-01-16T12:19:00', 6.37, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (76, 61, '2026-01-15', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 76, '2026-01-15T19:02:00', '2026-01-15T22:53:00', 3.83, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 64, '2026-01-15', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-01-15T18:00:00', '2026-01-15T22:53:00', 4.88, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 63, '2026-01-15', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-01-15T13:52:00', '2026-01-15T18:16:00', 4.38, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 59, '2026-01-15', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-01-15T06:31:00', '2026-01-15T10:22:00', 3.85, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (73, 62, '2026-01-15', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 73, '2026-01-15T06:06:00', '2026-01-15T13:54:00', 7.80, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 61, '2026-01-14', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-01-14T18:07:00', '2026-01-14T22:38:00', 4.50, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 64, '2026-01-14', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-01-14T18:02:00', '2026-01-14T22:39:00', 4.62, '[Admin Edited]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 63, '2026-01-14', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-01-14T12:09:00', '2026-01-14T18:27:00', 6.28, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (74, 59, '2026-01-14', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 74, '2026-01-14T06:59:00', '2026-01-14T11:14:00', 4.25, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (73, 62, '2026-01-14', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 73, '2026-01-14T05:56:00', '2026-01-14T12:06:00', 6.15, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 61, '2026-01-13', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-01-13T18:11:00', '2026-01-13T22:27:00', 4.27, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 64, '2026-01-13', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-01-13T18:10:00', '2026-01-13T22:30:00', 4.33, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 63, '2026-01-13', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-01-13T13:27:00', '2026-01-13T18:09:00', 4.68, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (74, 59, '2026-01-13', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 74, '2026-01-13T06:31:00', '2026-01-13T11:48:00', 5.27, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (73, 62, '2026-01-13', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 73, '2026-01-13T05:54:00', '2026-01-13T13:32:00', 7.62, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (76, 61, '2026-01-12', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 76, '2026-01-12T19:07:00', '2026-01-12T22:48:00', 3.68, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 64, '2026-01-12', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-01-12T18:16:00', '2026-01-12T22:37:00', 4.35, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 63, '2026-01-12', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-01-12T13:11:00', '2026-01-12T18:22:00', 5.17, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 59, '2026-01-12', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-01-12T06:27:00', '2026-01-12T11:49:00', 5.37, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (73, 62, '2026-01-12', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 73, '2026-01-12T05:56:00', '2026-01-12T13:18:00', 7.35, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 61, '2026-01-11', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-01-11T18:00:00', '2026-01-11T22:24:00', 4.40, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (79, 63, '2026-01-11', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 79, '2026-01-11T15:57:00', '2026-01-11T22:30:00', 6.55, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 59, '2026-01-11', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-01-11T08:02:00', '2026-01-11T18:00:00', 9.97, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (70, 62, '2026-01-11', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 70, '2026-01-11T08:00:00', '2026-01-11T13:00:00', 5.00, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (73, 59, '2026-01-11', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 73, '2026-01-11T06:38:00', '2026-01-11T11:52:00', 5.22, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 62, '2026-01-11', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-01-11T06:20:00', '2026-01-11T16:00:00', 9.67, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 64, '2026-01-10', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-01-10T18:14:00', '2026-01-10T22:05:00', 3.83, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 61, '2026-01-10', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-01-10T18:06:00', '2026-01-10T22:09:00', 4.03, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 63, '2026-01-10', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-01-10T13:00:00', '2026-01-10T18:10:00', 5.17, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 63, '2026-01-10', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-01-10T12:17:00', '2026-01-10T13:06:00', 0.82, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 59, '2026-01-10', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-01-10T07:53:00', '2026-01-10T18:06:00', 10.20, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (74, 59, '2026-01-10', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 74, '2026-01-10T06:27:00', '2026-01-10T11:35:00', 5.13, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (73, 62, '2026-01-10', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 73, '2026-01-10T05:59:00', '2026-01-10T12:17:00', 6.30, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 61, '2026-01-09', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-01-09T18:08:00', '2026-01-09T22:03:00', 3.90, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 64, '2026-01-09', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-01-09T18:00:00', '2026-01-09T22:00:00', 4.00, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 63, '2026-01-09', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-01-09T13:16:00', '2026-01-09T18:00:00', 4.73, '[Admin Edited]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (78, 59, '2026-01-09', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 78, '2026-01-09T06:45:00', '2026-01-09T11:00:00', 4.23, '[Admin Edited]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (73, 62, '2026-01-09', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 73, '2026-01-09T06:11:00', '2026-01-09T13:11:00', 7.00, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (78, 61, '2026-01-08', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 78, '2026-01-08T19:50:00', '2026-01-08T22:00:00', 2.15, '[Admin Edited]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 64, '2026-01-08', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-01-08T18:15:00', '2026-01-08T22:00:00', 3.75, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 61, '2026-01-08', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-01-08T18:07:00', '2026-01-08T19:19:00', 1.18, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 63, '2026-01-08', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-01-08T13:05:00', '2026-01-08T16:31:00', 3.42, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 59, '2026-01-08', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-01-08T07:52:00', '2026-01-08T11:10:00', 3.30, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (73, 62, '2026-01-08', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 73, '2026-01-08T06:00:00', '2026-01-08T13:10:00', 7.15, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 64, '2026-01-07', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-01-07T18:25:00', '2026-01-07T22:30:00', 4.07, '[Admin Edited]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 61, '2026-01-07', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-01-07T17:58:00', '2026-01-07T22:45:00', 4.78, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (79, 63, '2026-01-07', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 79, '2026-01-07T12:38:00', '2026-01-07T18:30:00', 5.87, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (74, 59, '2026-01-07', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 74, '2026-01-07T06:28:00', '2026-01-07T11:02:00', 4.55, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 62, '2026-01-07', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-01-07T06:12:00', '2026-01-07T12:38:00', 6.43, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (76, 61, '2026-01-06', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 76, '2026-01-06T19:14:00', '2026-01-06T22:46:00', 3.53, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 64, '2026-01-06', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-01-06T18:00:00', '2026-01-06T22:11:00', 4.17, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (74, 59, '2026-01-06', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 74, '2026-01-06T06:41:00', '2026-01-06T11:34:00', 4.87, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 62, '2026-01-06', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-01-06T06:09:00', '2026-01-06T18:01:00', 11.85, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 64, '2026-01-05', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-01-05T18:34:00', '2026-01-05T22:30:00', 3.92, '[Admin Edited]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 61, '2026-01-05', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-01-05T17:53:00', '2026-01-05T22:53:00', 4.98, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (73, 59, '2026-01-05', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 73, '2026-01-05T06:37:00', '2026-01-05T11:22:00', 4.73, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 62, '2026-01-05', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-01-05T06:13:00', '2026-01-05T18:32:00', 12.32, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 61, '2026-01-04', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-01-04T17:25:00', '2026-01-04T22:36:00', 5.17, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 63, '2026-01-04', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-01-04T16:09:00', '2026-01-04T22:31:00', 6.35, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (70, 62, '2026-01-04', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 70, '2026-01-04T08:00:00', '2026-01-04T13:00:00', 5.00, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 59, '2026-01-04', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-01-04T07:57:00', '2026-01-04T12:36:00', 4.65, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 59, '2026-01-04', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-01-04T06:42:00', '2026-01-04T10:20:00', 3.62, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 62, '2026-01-04', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-01-04T06:18:00', '2026-01-04T16:00:00', 9.68, '[Admin Edited]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 64, '2026-01-03', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-01-03T18:11:00', '2026-01-03T22:30:00', 4.30, '[Admin Edited]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 61, '2026-01-03', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-01-03T18:00:00', '2026-01-03T22:30:00', 4.48, '[Admin Edited]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (74, 59, '2026-01-03', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 74, '2026-01-03T07:52:00', '2026-01-03T11:35:00', 3.70, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (73, 59, '2026-01-03', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 73, '2026-01-03T06:32:00', '2026-01-03T09:08:00', 2.60, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 62, '2026-01-03', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-01-03T06:09:00', '2026-01-03T18:10:00', 12.00, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 60, '2026-01-02', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-01-02T16:26:00', '2026-01-02T22:25:00', 5.98, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 63, '2026-01-02', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-01-02T14:16:00', '2026-01-02T22:22:00', 8.10, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (74, 59, '2026-01-02', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 74, '2026-01-02T06:32:00', '2026-01-02T11:15:00', 4.70, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 62, '2026-01-02', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-01-02T06:13:00', '2026-01-02T14:15:00', 8.03, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 61, '2026-01-01', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-01-01T18:00:00', '2026-01-01T22:44:00', 4.72, '[Admin Edited]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 60, '2026-01-01', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-01-01T14:05:00', '2026-01-01T18:12:00', 4.10, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 62, '2026-01-01', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-01-01T08:10:00', '2026-01-01T17:23:00', 9.22, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (74, 59, '2026-01-01', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 74, '2026-01-01T07:51:00', '2026-01-01T12:09:00', 4.30, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 59, '2026-01-01', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-01-01T06:34:00', '2026-01-01T11:58:00', 5.40, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (73, 62, '2026-01-01', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 73, '2026-01-01T05:58:00', '2026-01-01T13:03:00', 7.08, NULL);
END $$;


COMMIT;
