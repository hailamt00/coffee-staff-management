-- ================================================
-- UPDATE POSITIONS AND SHIFTS
-- ================================================
-- This script updates positions and shifts to match csm_positions.sql and csm_shifts.sql
-- Run this in pgAdmin or with postgres user

-- Step 1: Delete existing shifts (cascade will handle foreign keys if any)
DELETE FROM shifts;

-- Step 2: Delete existing positions
DELETE FROM positions;

-- Step 3: Reset position sequence
ALTER SEQUENCE positions_id_seq RESTART WITH 1;

-- Step 4: Reset shift sequence
ALTER SEQUENCE shifts_id_seq RESTART WITH 1;

-- Step 5: Insert positions with Vietnamese diacritics
INSERT INTO positions (name, status)
VALUES
  ('Phục vụ', TRUE),
  ('Pha chế (PartTime)', TRUE),
  ('Pha chế (Thử việc)', TRUE);

-- Step 6: Add is_enabled column to shifts if it doesn't exist
ALTER TABLE shifts 
ADD COLUMN IF NOT EXISTS is_enabled BOOLEAN NOT NULL DEFAULT TRUE;

-- Step 7: Insert all 9 shifts (3 per position)
INSERT INTO shifts (position_id, name, start_time, end_time, is_enabled)
VALUES
-- Phục vụ shifts
(
    (SELECT id FROM positions WHERE name = 'Phục vụ'),
    'Ca sáng',
    '06:30',
    '11:00',
    TRUE
),
(
    (SELECT id FROM positions WHERE name = 'Phục vụ'),
    'Ca chiều',
    '14:00',
    '18:00',
    TRUE
),
(
    (SELECT id FROM positions WHERE name = 'Phục vụ'),
    'Ca tối',
    '18:00',
    '22:30',
    TRUE
),

-- Pha chế (PartTime) shifts
(
    (SELECT id FROM positions WHERE name = 'Pha chế (PartTime)'),
    'Ca sáng',
    '06:00',
    '13:00',
    TRUE
),
(
    (SELECT id FROM positions WHERE name = 'Pha chế (PartTime)'),
    'Ca chiều',
    '13:00',
    '18:00',
    TRUE
),
(
    (SELECT id FROM positions WHERE name = 'Pha chế (PartTime)'),
    'Ca tối',
    '18:00',
    '22:30',
    TRUE
),

-- Pha chế (Thử việc) shifts
(
    (SELECT id FROM positions WHERE name = 'Pha chế (Thử việc)'),
    'Ca sáng',
    '06:00',
    '13:00',
    TRUE
),
(
    (SELECT id FROM positions WHERE name = 'Pha chế (Thử việc)'),
    'Ca chiều',
    '13:00',
    '18:00',
    TRUE
),
(
    (SELECT id FROM positions WHERE name = 'Pha chế (Thử việc)'),
    'Ca tối',
    '18:00',
    '22:30',
    TRUE
);

-- Step 8: Verify results
SELECT 'Position Count:' as check_name, COUNT(*) as count FROM positions;
SELECT id, name, status FROM positions ORDER BY id;

SELECT 'Shift Count:' as check_name, COUNT(*) as count FROM shifts;
SELECT s.id, p.name as position_name, s.name as shift_name, s.start_time, s.end_time, s.is_enabled
FROM shifts s
JOIN positions p ON s.position_id = p.id
ORDER BY p.id, s.id;
