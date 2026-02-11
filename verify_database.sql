-- ================================================
-- DATABASE VERIFICATION SCRIPT
-- ================================================
-- Run this to verify all tables and data in csm_db
-- Can run as csm_user or postgres

-- Check 1: Count all tables
SELECT 'Total Tables:' as check_name, COUNT(*) as count
FROM information_schema.tables 
WHERE table_schema = 'public' AND table_type = 'BASE TABLE';

-- Check 2: List all tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Check 3: Verify employees
SELECT 'Employee Count:' as check_name, COUNT(*) as count FROM employees;
SELECT id, code, name, phone, gender::text, service_salary, barista_salary, hire_date 
FROM employees 
ORDER BY id;

-- Check 4: Verify positions
SELECT 'Position Count:' as check_name, COUNT(*) as count FROM positions;
SELECT * FROM positions ORDER BY id;

-- Check 5: Verify shifts
SELECT 'Shift Count:' as check_name, COUNT(*) as count FROM shifts;
SELECT s.id, p.name as position_name, s.name as shift_name, s.start_time, s.end_time
FROM shifts s
JOIN positions p ON s.position_id = p.id
ORDER BY p.id, s.id;

-- Check 6: Verify violation types
SELECT 'Violation Type Count:' as check_name, COUNT(*) as count FROM violation_types;
SELECT id, description, penalty_points FROM violation_types ORDER BY id LIMIT 10;

-- Check 7: Verify admin
SELECT 'Admin Count:' as check_name, COUNT(*) as count FROM admin;
SELECT id, username, full_name FROM admin;

-- Check 8: Check gender enum values
SELECT enumlabel as gender_values
FROM pg_enum 
WHERE enumtypid = (SELECT oid FROM pg_type WHERE typname = 'gender_enum')
ORDER BY enumsortorder;

-- Check 9: Verify sequences exist
SELECT sequence_name 
FROM information_schema.sequences 
WHERE sequence_schema = 'public'
ORDER BY sequence_name;
