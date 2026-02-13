-- ================================================
-- CONSOLIDATE BARISTA POSITIONS (ROBUST MIGRATION)
-- ================================================
-- 1. Ensure "Pha chế" position exists
INSERT INTO positions (name, status)
SELECT 'Pha chế', TRUE
WHERE NOT EXISTS (SELECT 1 FROM positions WHERE name = 'Pha chế');

-- 2. Create Shifts for "Pha chế" if they don't exist
INSERT INTO shifts (position_id, name, start_time, end_time, is_enabled)
SELECT p.id, s.name, s.start_time::time, s.end_time::time, TRUE
FROM positions p
CROSS JOIN (
    VALUES 
        ('Ca sáng', '06:00:00', '13:00:00'),
        ('Ca chiều', '13:00:00', '18:00:00'),
        ('Ca tối', '18:00:00', '22:30:00')
) AS s(name, start_time, end_time)
WHERE p.name = 'Pha chế'
AND NOT EXISTS (
    SELECT 1 FROM shifts 
    WHERE position_id = p.id AND name = s.name
);

-- 3. Migrate Schedules
WITH NewShifts AS (
    SELECT s.id, s.name
    FROM shifts s
    JOIN positions p ON s.position_id = p.id
    WHERE p.name = 'Pha chế'
),
OldShifts AS (
    SELECT s.id, s.name
    FROM shifts s
    JOIN positions p ON s.position_id = p.id
    WHERE p.name IN ('Pha chế (PartTime)', 'Pha chế (Thử việc)')
)
UPDATE schedules sch
SET shift_id = ns.id
FROM OldShifts os
JOIN NewShifts ns ON os.name = ns.name
WHERE sch.shift_id = os.id;

-- 4. Migrate ScheduleRequests (NEW)
-- Same logic: map old shifts to new shifts for requests
WITH NewShifts AS (
    SELECT s.id, s.name
    FROM shifts s
    JOIN positions p ON s.position_id = p.id
    WHERE p.name = 'Pha chế'
),
OldShifts AS (
    SELECT s.id, s.name
    FROM shifts s
    JOIN positions p ON s.position_id = p.id
    WHERE p.name IN ('Pha chế (PartTime)', 'Pha chế (Thử việc)')
)
UPDATE schedule_requests sr
SET shift_id = ns.id
FROM OldShifts os
JOIN NewShifts ns ON os.name = ns.name
WHERE sr.shift_id = os.id;

-- 5. Delete Old Shifts (Safely)
-- Only delete if NO schedules OR schedule_requests reference them
DELETE FROM shifts 
WHERE position_id IN (
    SELECT id FROM positions WHERE name IN ('Pha chế (PartTime)', 'Pha chế (Thử việc)')
)
AND id NOT IN (SELECT shift_id FROM schedules)
AND id NOT IN (SELECT shift_id FROM schedule_requests);

-- 6. Delete Old Positions (Safely)
-- Only delete if NO shifts reference them
DELETE FROM positions 
WHERE name IN ('Pha chế (PartTime)', 'Pha chế (Thử việc)')
AND NOT EXISTS (
    SELECT 1 FROM shifts WHERE position_id = positions.id
);

-- 6. Verification
SELECT 'Migration Status' as check_name;
SELECT p.name, COUNT(s.id) as shift_count, 
       (SELECT COUNT(*) FROM schedules sch WHERE sch.shift_id = s.id) as schedule_count
FROM positions p
LEFT JOIN shifts s ON p.id = s.position_id
WHERE p.name LIKE 'Pha chế%'
GROUP BY p.name, s.id;
