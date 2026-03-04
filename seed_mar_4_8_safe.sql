SET client_encoding = 'UTF8';
DO $$
BEGIN

    IF NOT EXISTS (SELECT 1 FROM schedules WHERE employee_id = 78 AND shift_id = 59 AND work_date = '2026-03-04') THEN
        INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) 
        VALUES (78, 59, '2026-03-04', NOW(), NULL);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM schedules WHERE employee_id = 72 AND shift_id = 61 AND work_date = '2026-03-04') THEN
        INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) 
        VALUES (72, 61, '2026-03-04', NOW(), NULL);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM schedules WHERE employee_id = 78 AND shift_id = 59 AND work_date = '2026-03-05') THEN
        INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) 
        VALUES (78, 59, '2026-03-05', NOW(), NULL);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM schedules WHERE employee_id = 75 AND shift_id = 61 AND work_date = '2026-03-05') THEN
        INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) 
        VALUES (75, 61, '2026-03-05', NOW(), NULL);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM schedules WHERE employee_id = 76 AND shift_id = 59 AND work_date = '2026-03-06') THEN
        INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) 
        VALUES (76, 59, '2026-03-06', NOW(), NULL);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM schedules WHERE employee_id = 76 AND shift_id = 61 AND work_date = '2026-03-06') THEN
        INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) 
        VALUES (76, 61, '2026-03-06', NOW(), NULL);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM schedules WHERE employee_id = 75 AND shift_id = 59 AND work_date = '2026-03-07') THEN
        INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) 
        VALUES (75, 59, '2026-03-07', NOW(), NULL);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM schedules WHERE employee_id = 72 AND shift_id = 61 AND work_date = '2026-03-07') THEN
        INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) 
        VALUES (72, 61, '2026-03-07', NOW(), NULL);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM schedules WHERE employee_id = 76 AND shift_id = 59 AND work_date = '2026-03-08') THEN
        INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) 
        VALUES (76, 59, '2026-03-08', NOW(), '6h30');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM schedules WHERE employee_id = 72 AND shift_id = 59 AND work_date = '2026-03-08') THEN
        INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) 
        VALUES (72, 59, '2026-03-08', NOW(), '8h00');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM schedules WHERE employee_id = 76 AND shift_id = 61 AND work_date = '2026-03-08') THEN
        INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) 
        VALUES (76, 61, '2026-03-08', NOW(), NULL);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM schedules WHERE employee_id = 77 AND shift_id = 62 AND work_date = '2026-03-04') THEN
        INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) 
        VALUES (77, 62, '2026-03-04', NOW(), NULL);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM schedules WHERE employee_id = 79 AND shift_id = 63 AND work_date = '2026-03-04') THEN
        INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) 
        VALUES (79, 63, '2026-03-04', NOW(), NULL);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM schedules WHERE employee_id = 71 AND shift_id = 64 AND work_date = '2026-03-04') THEN
        INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) 
        VALUES (71, 64, '2026-03-04', NOW(), NULL);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM schedules WHERE employee_id = 77 AND shift_id = 62 AND work_date = '2026-03-05') THEN
        INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) 
        VALUES (77, 62, '2026-03-05', NOW(), NULL);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM schedules WHERE employee_id = 77 AND shift_id = 63 AND work_date = '2026-03-05') THEN
        INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) 
        VALUES (77, 63, '2026-03-05', NOW(), NULL);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM schedules WHERE employee_id = 71 AND shift_id = 64 AND work_date = '2026-03-05') THEN
        INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) 
        VALUES (71, 64, '2026-03-05', NOW(), NULL);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM schedules WHERE employee_id = 77 AND shift_id = 62 AND work_date = '2026-03-06') THEN
        INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) 
        VALUES (77, 62, '2026-03-06', NOW(), NULL);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM schedules WHERE employee_id = 79 AND shift_id = 63 AND work_date = '2026-03-06') THEN
        INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) 
        VALUES (79, 63, '2026-03-06', NOW(), NULL);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM schedules WHERE employee_id = 71 AND shift_id = 64 AND work_date = '2026-03-06') THEN
        INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) 
        VALUES (71, 64, '2026-03-06', NOW(), NULL);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM schedules WHERE employee_id = 70 AND shift_id = 62 AND work_date = '2026-03-07') THEN
        INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) 
        VALUES (70, 62, '2026-03-07', NOW(), NULL);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM schedules WHERE employee_id = 71 AND shift_id = 63 AND work_date = '2026-03-07') THEN
        INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) 
        VALUES (71, 63, '2026-03-07', NOW(), NULL);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM schedules WHERE employee_id = 79 AND shift_id = 64 AND work_date = '2026-03-07') THEN
        INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) 
        VALUES (79, 64, '2026-03-07', NOW(), NULL);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM schedules WHERE employee_id = 70 AND shift_id = 62 AND work_date = '2026-03-08') THEN
        INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) 
        VALUES (70, 62, '2026-03-08', NOW(), NULL);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM schedules WHERE employee_id = 71 AND shift_id = 62 AND work_date = '2026-03-08') THEN
        INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) 
        VALUES (71, 62, '2026-03-08', NOW(), NULL);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM schedules WHERE employee_id = 73 AND shift_id = 63 AND work_date = '2026-03-08') THEN
        INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) 
        VALUES (73, 63, '2026-03-08', NOW(), NULL);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM schedules WHERE employee_id = 79 AND shift_id = 64 AND work_date = '2026-03-08') THEN
        INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) 
        VALUES (79, 64, '2026-03-08', NOW(), NULL);
    END IF;
END $$;
