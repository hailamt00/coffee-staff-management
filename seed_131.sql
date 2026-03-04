
SET client_encoding = 'UTF8';
BEGIN;
DELETE FROM transactions WHERE revenue_id IN (SELECT id FROM revenues WHERE schedule_id IN (SELECT id FROM schedules WHERE work_date >= '2026-02-01' AND work_date < '2026-04-01'));
DELETE FROM revenues WHERE schedule_id IN (SELECT id FROM schedules WHERE work_date >= '2026-02-01' AND work_date < '2026-04-01');
DELETE FROM attendance WHERE check_in >= '2026-02-01' OR check_out >= '2026-02-01' OR note ILIKE '%Admin added%' OR note ILIKE '%Admin Edited%';
DELETE FROM schedules WHERE work_date >= '2026-02-01' AND work_date < '2026-04-01';

SELECT setval('schedules_id_seq', (SELECT COALESCE(MAX(id), 1) FROM schedules));
SELECT setval('attendance_id_seq', (SELECT COALESCE(MAX(id), 1) FROM attendance));


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (78, 59, '2026-03-04', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 78, '2026-03-04T06:44:00', NULL, NULL, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 62, '2026-03-04', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-03-04T06:19:00', NULL, NULL, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 64, '2026-03-03', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-03-03T18:15:00', '2026-03-03T22:45:00', 4.50, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 61, '2026-03-03', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-03-03T18:03:00', '2026-03-03T22:44:00', 4.68, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (79, 63, '2026-03-03', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 79, '2026-03-03T12:49:00', '2026-03-03T18:18:00', 5.47, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (78, 59, '2026-03-03', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 78, '2026-03-03T06:29:00', '2026-03-03T11:46:00', 5.28, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 62, '2026-03-03', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-03-03T06:10:00', '2026-03-03T12:49:00', 6.65, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 61, '2026-03-02', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-03-02T18:03:00', '2026-03-02T22:29:00', 4.42, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 64, '2026-03-02', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-03-02T18:00:00', '2026-03-02T22:30:00', 4.50, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (76, 60, '2026-03-02', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 76, '2026-03-02T12:12:00', '2026-03-02T17:59:00', 5.77, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 62, '2026-03-02', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-03-02T06:15:00', '2026-03-02T18:03:00', 11.80, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 61, '2026-03-01', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-03-01T18:01:00', '2026-03-01T22:45:00', 4.73, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 64, '2026-03-01', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-03-01T18:00:00', '2026-03-01T22:45:00', 4.75, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (79, 63, '2026-03-01', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 79, '2026-03-01T13:02:00', '2026-03-01T18:10:00', 5.12, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (70, 62, '2026-03-01', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 70, '2026-03-01T08:00:00', '2026-03-01T13:00:00', 5.00, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 59, '2026-03-01', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-03-01T07:56:00', '2026-03-01T18:00:00', 10.07, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 59, '2026-03-01', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-03-01T06:31:00', '2026-03-01T12:24:00', 5.88, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 62, '2026-03-01', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-03-01T06:10:00', '2026-03-01T13:10:00', 7.00, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 61, '2026-02-28', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-02-28T17:52:00', '2026-02-28T22:30:00', 4.62, '[Admin Edited]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 60, '2026-02-28', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-02-28T15:55:00', '2026-02-28T18:17:00', 2.35, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (79, 63, '2026-02-28', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 79, '2026-02-28T14:15:00', '2026-02-28T22:30:00', 8.25, '[Admin Edited]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (70, 62, '2026-02-28', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 70, '2026-02-28T09:00:00', '2026-02-28T14:00:00', 5.00, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 59, '2026-02-28', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-02-28T06:41:00', '2026-02-28T12:06:00', 5.40, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 62, '2026-02-28', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-02-28T06:18:00', '2026-02-28T09:05:00', 2.78, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 61, '2026-02-27', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-02-27T18:05:00', '2026-02-27T22:13:00', 4.12, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 64, '2026-02-27', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-02-27T18:00:00', '2026-02-27T22:15:00', 4.25, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (79, 63, '2026-02-27', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 79, '2026-02-27T13:00:00', '2026-02-27T18:21:00', 5.33, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 59, '2026-02-27', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-02-27T06:40:00', '2026-02-27T11:02:00', 4.35, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 62, '2026-02-27', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-02-27T06:26:00', '2026-02-27T13:02:00', 6.60, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 64, '2026-02-26', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-02-26T18:15:00', '2026-02-26T20:00:00', 1.75, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 61, '2026-02-26', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-02-26T18:00:00', '2026-02-26T22:34:00', 4.55, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (79, 63, '2026-02-26', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 79, '2026-02-26T14:10:00', '2026-02-26T18:30:00', 4.33, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 60, '2026-02-26', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-02-26T14:04:00', '2026-02-26T15:21:00', 1.28, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 59, '2026-02-26', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-02-26T06:36:00', '2026-02-26T10:47:00', 4.18, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 62, '2026-02-26', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-02-26T06:09:00', '2026-02-26T14:09:00', 7.98, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 64, '2026-02-25', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-02-25T18:10:00', '2026-02-25T22:50:00', 4.67, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 61, '2026-02-25', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-02-25T17:56:00', '2026-02-25T22:50:00', 4.88, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (79, 63, '2026-02-25', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 79, '2026-02-25T12:20:00', '2026-02-25T18:25:00', 6.08, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 59, '2026-02-25', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-02-25T06:37:00', '2026-02-25T11:02:00', 4.40, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 62, '2026-02-25', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-02-25T06:25:00', '2026-02-25T12:20:00', 5.90, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (79, 63, '2026-02-24', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 79, '2026-02-24T13:00:00', '2026-02-24T22:30:00', 9.50, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 62, '2026-02-24', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-02-24T06:42:00', '2026-02-24T13:10:00', 6.45, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 64, '2026-02-23', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-02-23T18:40:00', '2026-02-23T22:50:00', 4.15, '[Admin Edited]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 61, '2026-02-23', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-02-23T17:53:00', '2026-02-23T22:48:00', 4.92, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 59, '2026-02-23', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-02-23T06:39:00', '2026-02-23T11:26:00', 4.77, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 62, '2026-02-23', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-02-23T06:31:00', '2026-02-23T18:30:00', 11.97, '[Admin Edited]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 59, '2026-02-22', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-02-22T06:35:00', '2026-02-22T12:24:00', 5.80, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 59, '2026-02-22', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-02-22T06:05:00', '2026-02-22T13:52:00', 7.77, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (70, 62, '2026-02-22', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 70, '2026-02-22T06:00:00', '2026-02-22T13:00:00', 7.00, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (79, 62, '2026-02-21', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 79, '2026-02-21T07:14:00', '2026-02-21T12:38:00', 5.38, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 59, '2026-02-21', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-02-21T06:47:00', '2026-02-21T12:37:00', 5.83, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 59, '2026-02-20', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-02-20T06:40:00', '2026-02-20T12:09:00', 5.48, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (79, 62, '2026-02-20', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 79, '2026-02-20T06:06:00', '2026-02-20T12:25:00', 6.30, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 59, '2026-02-19', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-02-19T06:35:00', '2026-02-19T12:51:00', 6.27, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (70, 62, '2026-02-19', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 70, '2026-02-19T06:00:00', '2026-02-19T12:00:00', 6.00, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 59, '2026-02-18', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-02-18T06:38:00', '2026-02-18T12:28:00', 5.82, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (70, 62, '2026-02-18', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 70, '2026-02-18T06:00:00', '2026-02-18T12:00:00', 6.00, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 59, '2026-02-17', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-02-17T06:40:00', '2026-02-17T12:00:00', 5.32, '[Admin Edited]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (70, 62, '2026-02-17', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 70, '2026-02-17T06:00:00', '2026-02-17T12:00:00', 6.00, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 61, '2026-02-16', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-02-16T18:40:00', '2026-02-16T21:28:00', 2.78, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 59, '2026-02-16', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-02-16T06:33:00', '2026-02-16T12:23:00', 5.83, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (70, 62, '2026-02-16', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 70, '2026-02-16T06:00:00', '2026-02-16T19:00:00', 13.00, '[Admin Edited]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (70, 64, '2026-02-15', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 70, '2026-02-15T19:00:00', '2026-02-15T22:30:00', 3.50, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 61, '2026-02-15', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-02-15T18:07:00', '2026-02-15T22:32:00', 4.40, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (79, 63, '2026-02-15', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 79, '2026-02-15T13:30:00', '2026-02-15T19:00:00', 5.50, '[Admin Edited]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 59, '2026-02-15', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-02-15T09:05:00', '2026-02-15T11:15:00', 2.15, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 59, '2026-02-15', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-02-15T06:30:00', '2026-02-15T18:00:00', 11.48, '[Admin Edited]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 61, '2026-02-14', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-02-14T22:36:00', '2026-02-14T22:53:00', 0.28, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 64, '2026-02-14', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-02-14T18:14:00', '2026-02-14T22:36:00', 4.35, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 60, '2026-02-14', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-02-14T14:19:00', '2026-02-14T18:06:00', 3.78, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (79, 63, '2026-02-14', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 79, '2026-02-14T13:05:00', '2026-02-14T18:26:00', 5.35, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 59, '2026-02-14', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-02-14T06:35:00', '2026-02-14T11:03:00', 4.47, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 64, '2026-02-13', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-02-13T18:26:00', '2026-02-13T22:45:00', 4.30, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 63, '2026-02-13', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-02-13T13:07:00', '2026-02-13T18:32:00', 5.40, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 59, '2026-02-13', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-02-13T06:39:00', '2026-02-13T11:00:00', 4.33, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (79, 62, '2026-02-13', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 79, '2026-02-13T06:00:00', '2026-02-13T13:00:00', 7.00, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 61, '2026-02-12', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-02-12T18:05:00', '2026-02-12T22:33:00', 4.45, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 64, '2026-02-12', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-02-12T18:01:00', '2026-02-12T22:35:00', 4.55, '[Admin Edited]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 63, '2026-02-12', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-02-12T13:08:00', '2026-02-12T18:05:00', 4.95, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 59, '2026-02-12', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-02-12T06:38:00', '2026-02-12T11:05:00', 4.43, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 62, '2026-02-12', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-02-12T06:16:00', '2026-02-12T13:11:00', 6.90, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 64, '2026-02-11', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-02-11T18:00:00', '2026-02-11T20:30:00', 2.50, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 59, '2026-02-11', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-02-11T06:34:00', '2026-02-11T10:48:00', 4.22, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 62, '2026-02-11', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-02-11T06:21:00', '2026-02-11T18:00:00', 11.63, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 64, '2026-02-10', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-02-10T18:32:00', '2026-02-10T22:00:00', 3.45, '[Admin Edited]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (79, 62, '2026-02-10', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 79, '2026-02-10T06:31:00', '2026-02-10T11:10:00', 4.63, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 62, '2026-02-10', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-02-10T06:17:00', '2026-02-10T18:31:00', 12.23, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 64, '2026-02-09', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-02-09T18:00:00', '2026-02-09T22:06:00', 4.10, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 61, '2026-02-09', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-02-09T17:54:00', '2026-02-09T22:06:00', 4.18, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 63, '2026-02-09', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-02-09T12:09:00', '2026-02-09T18:06:00', 5.93, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 59, '2026-02-09', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-02-09T06:28:00', '2026-02-09T11:53:00', 5.40, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (79, 62, '2026-02-09', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 79, '2026-02-09T06:00:00', '2026-02-09T12:00:00', 6.00, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 64, '2026-02-08', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-02-08T18:49:00', '2026-02-08T21:55:00', 3.08, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (79, 63, '2026-02-08', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 79, '2026-02-08T13:30:00', '2026-02-08T18:30:00', 5.00, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 59, '2026-02-08', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-02-08T08:00:00', '2026-02-08T18:48:00', 10.80, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 59, '2026-02-08', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-02-08T06:40:00', '2026-02-08T12:08:00', 5.45, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 62, '2026-02-08', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-02-08T06:20:00', '2026-02-08T13:30:00', 7.17, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 61, '2026-02-07', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-02-07T18:07:00', '2026-02-07T21:42:00', 3.57, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 63, '2026-02-07', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-02-07T13:14:00', '2026-02-07T21:41:00', 8.43, '[Admin Edited]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (79, 60, '2026-02-07', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 79, '2026-02-07T13:00:00', '2026-02-07T18:00:00', 5.00, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 59, '2026-02-07', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-02-07T06:37:00', '2026-02-07T11:04:00', 4.45, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (76, 61, '2026-02-06', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 76, '2026-02-06T19:08:00', '2026-02-06T22:23:00', 3.25, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 64, '2026-02-06', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-02-06T18:30:00', '2026-02-06T23:30:00', 5.00, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (79, 63, '2026-02-06', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 79, '2026-02-06T12:00:00', '2026-02-06T18:00:00', 6.00, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (78, 59, '2026-02-06', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 78, '2026-02-06T06:55:00', '2026-02-06T11:18:00', 4.37, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (73, 62, '2026-02-06', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 73, '2026-02-06T06:12:00', '2026-02-06T12:30:00', 6.30, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (76, 61, '2026-02-05', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 76, '2026-02-05T19:24:00', '2026-02-05T23:00:00', 3.60, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 64, '2026-02-05', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-02-05T18:00:00', '2026-02-05T23:00:00', 4.98, '[Admin Edited]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 63, '2026-02-05', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-02-05T13:14:00', '2026-02-05T18:14:00', 5.00, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (75, 59, '2026-02-05', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 75, '2026-02-05T06:38:00', '2026-02-05T11:01:00', 4.37, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (73, 62, '2026-02-05', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 73, '2026-02-05T06:05:00', '2026-02-05T13:21:00', 7.25, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 64, '2026-02-04', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-02-04T18:33:00', '2026-02-04T22:52:00', 4.32, '[Admin Edited]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (78, 61, '2026-02-04', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 78, '2026-02-04T18:03:00', '2026-02-04T23:21:00', 5.28, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 63, '2026-02-04', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-02-04T13:11:00', '2026-02-04T18:33:00', 5.37, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (74, 59, '2026-02-04', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 74, '2026-02-04T06:27:00', '2026-02-04T11:00:00', 4.53, '[Admin Edited]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (73, 62, '2026-02-04', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 73, '2026-02-04T06:00:00', '2026-02-04T13:25:00', 7.42, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (76, 61, '2026-02-03', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 76, '2026-02-03T18:56:00', '2026-02-03T22:47:00', 3.85, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 64, '2026-02-03', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-02-03T18:30:00', '2026-02-03T22:45:00', 4.25, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 63, '2026-02-03', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-02-03T13:25:00', '2026-02-03T18:46:00', 5.35, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (74, 59, '2026-02-03', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 74, '2026-02-03T06:27:00', '2026-02-03T11:09:00', 4.68, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (73, 62, '2026-02-03', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 73, '2026-02-03T05:59:00', '2026-02-03T13:17:00', 7.30, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 64, '2026-02-02', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-02-02T18:04:00', '2026-02-02T22:32:00', 4.45, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 61, '2026-02-02', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-02-02T17:59:00', '2026-02-02T22:33:00', 4.57, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (73, 63, '2026-02-02', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 73, '2026-02-02T12:03:00', '2026-02-02T18:05:00', 6.02, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (73, 59, '2026-02-02', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 73, '2026-02-02T06:32:00', '2026-02-02T11:00:00', 4.45, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 62, '2026-02-02', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-02-02T06:18:00', '2026-02-02T12:01:00', 5.72, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (77, 63, '2026-02-01', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 77, '2026-02-01T14:15:00', '2026-02-01T22:10:00', 7.92, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (72, 60, '2026-02-01', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 72, '2026-02-01T13:37:00', '2026-02-01T22:16:00', 8.63, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (74, 59, '2026-02-01', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 74, '2026-02-01T06:34:00', '2026-02-01T11:35:00', 5.00, NULL);
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (71, 62, '2026-02-01', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 71, '2026-02-01T06:20:00', '2026-02-01T14:00:00', 7.67, '[Admin added]');
END $$;


DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (70, 62, '2026-02-01', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, 70, '2026-02-01T06:20:00', '2026-02-01T14:00:00', 7.67, '[Admin added]');
END $$;


COMMIT;
