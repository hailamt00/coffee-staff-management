-- ================================================
-- INSERT PRODUCTION DATA - ATTENDANCE, PAYROLL, REVENUE
-- ================================================
-- This script inserts all production data from February 2026
-- Run this in pgAdmin after the database rebuild

-- ================================================
-- STEP 1: INSERT ATTENDANCE DATA (48 records)
-- ================================================

-- Note: We need to create schedules first, then attendance
-- For simplicity, we'll insert attendance directly without schedules for now
-- In real production, attendance should link to schedules

-- February 1, 2026
INSERT INTO attendance (employee_id, check_in, check_out, total_hours, note)
VALUES
((SELECT id FROM employees WHERE phone = '0901823105'), '2026-02-01 14:15', '2026-02-01 22:10', 7.92, NULL),
((SELECT id FROM employees WHERE phone = '0919495106'), '2026-02-01 06:34', '2026-02-01 11:35', 5.00, NULL),
((SELECT id FROM employees WHERE phone = '0896869903'), '2026-02-01 13:37', '2026-02-01 22:16', 8.63, NULL),
((SELECT id FROM employees WHERE phone = '0765457988'), '2026-02-01 06:20', '2026-02-01 14:00', 7.67, '[Admin added]'),
((SELECT id FROM employees WHERE phone = '0398413786'), '2026-02-01 06:20', '2026-02-01 14:00', 7.67, '[Admin added]');

-- February 2, 2026
INSERT INTO attendance (employee_id, check_in, check_out, total_hours, note)
VALUES
((SELECT id FROM employees WHERE phone = '0942511614'), '2026-02-02 12:03', '2026-02-02 18:05', 6.02, NULL),
((SELECT id FROM employees WHERE phone = '0942511614'), '2026-02-02 06:32', '2026-02-02 11:00', 4.45, NULL),
((SELECT id FROM employees WHERE phone = '0901823105'), '2026-02-02 06:18', '2026-02-02 12:01', 5.72, NULL),
((SELECT id FROM employees WHERE phone = '0896869903'), '2026-02-02 17:59', '2026-02-02 22:33', 4.57, NULL),
((SELECT id FROM employees WHERE phone = '0398413786'), '2026-02-02 18:04', '2026-02-02 22:32', 4.45, NULL);

-- February 3, 2026
INSERT INTO attendance (employee_id, check_in, check_out, total_hours, note)
VALUES
((SELECT id FROM employees WHERE phone = '0942511614'), '2026-02-03 05:59', '2026-02-03 13:17', 7.30, NULL),
((SELECT id FROM employees WHERE phone = '0901823105'), '2026-02-03 13:25', '2026-02-03 18:46', 5.35, NULL),
((SELECT id FROM employees WHERE phone = '0919495106'), '2026-02-03 06:27', '2026-02-03 11:09', 4.68, NULL),
((SELECT id FROM employees WHERE phone = '0766250207'), '2026-02-03 18:56', '2026-02-03 22:47', 3.85, NULL),
((SELECT id FROM employees WHERE phone = '0398413786'), '2026-02-03 18:30', '2026-02-03 22:45', 4.25, '[Admin added]');

-- February 4, 2026
INSERT INTO attendance (employee_id, check_in, check_out, total_hours, note)
VALUES
((SELECT id FROM employees WHERE phone = '0915778422'), '2026-02-04 18:03', '2026-02-04 23:21', 5.28, NULL),
((SELECT id FROM employees WHERE phone = '0942511614'), '2026-02-04 06:00', '2026-02-04 13:25', 7.42, NULL),
((SELECT id FROM employees WHERE phone = '0901823105'), '2026-02-04 13:11', '2026-02-04 18:33', 5.37, NULL),
((SELECT id FROM employees WHERE phone = '0919495106'), '2026-02-04 06:27', NULL, NULL, 'Forgot checkout'),
((SELECT id FROM employees WHERE phone = '0896869903'), '2026-02-04 18:33', '2026-02-04 22:52', 4.32, NULL);

-- February 5, 2026
INSERT INTO attendance (employee_id, check_in, check_out, total_hours, note)
VALUES
((SELECT id FROM employees WHERE phone = '0942511614'), '2026-02-05 06:05', '2026-02-05 13:21', 7.25, NULL),
((SELECT id FROM employees WHERE phone = '0901823105'), '2026-02-05 13:14', '2026-02-05 18:14', 5.00, NULL),
((SELECT id FROM employees WHERE phone = '0855224187'), '2026-02-05 06:38', '2026-02-05 11:01', 4.37, NULL),
((SELECT id FROM employees WHERE phone = '0766250207'), '2026-02-05 19:24', '2026-02-05 23:00', 3.60, NULL),
((SELECT id FROM employees WHERE phone = '0398413786'), '2026-02-05 18:00', '2026-02-05 23:00', 4.98, '[Admin Edited]');

-- February 6, 2026
INSERT INTO attendance (employee_id, check_in, check_out, total_hours, note)
VALUES
((SELECT id FROM employees WHERE phone = '0915778422'), '2026-02-06 06:55', '2026-02-06 11:18', 4.37, NULL),
((SELECT id FROM employees WHERE phone = '0942511614'), '2026-02-06 06:12', '2026-02-06 12:30', 6.30, NULL),
((SELECT id FROM employees WHERE phone = '0766250207'), '2026-02-06 19:08', '2026-02-06 22:23', 3.25, NULL),
((SELECT id FROM employees WHERE phone = '0398413786'), '2026-02-06 18:30', '2026-02-06 23:30', 5.00, '[Admin added]');

-- February 7, 2026
INSERT INTO attendance (employee_id, check_in, check_out, total_hours, note)
VALUES
((SELECT id FROM employees WHERE phone = '0901823105'), '2026-02-07 13:14', '2026-02-07 21:41', 8.43, NULL),
((SELECT id FROM employees WHERE phone = '0855224187'), '2026-02-07 06:37', '2026-02-07 11:04', 4.45, NULL),
((SELECT id FROM employees WHERE phone = '0855224187'), '2026-02-07 18:07', '2026-02-07 21:42', 3.57, NULL),
((SELECT id FROM employees WHERE phone = '0777751896'), '2026-02-07 13:58', '2026-02-07 17:26', 3.47, NULL);

-- February 8, 2026
INSERT INTO attendance (employee_id, check_in, check_out, total_hours, note)
VALUES
((SELECT id FROM employees WHERE phone = '0901823105'), '2026-02-08 18:49', '2026-02-08 21:55', 3.08, NULL),
((SELECT id FROM employees WHERE phone = '0855224187'), '2026-02-08 06:40', '2026-02-08 12:08', 5.45, NULL),
((SELECT id FROM employees WHERE phone = '0896869903'), '2026-02-08 08:00', '2026-02-08 18:48', 10.80, NULL),
((SELECT id FROM employees WHERE phone = '0777751896'), '2026-02-08 17:53', '2026-02-08 21:55', 4.02, NULL),
((SELECT id FROM employees WHERE phone = '0398413786'), '2026-02-08 06:20', '2026-02-08 13:30', 7.17, '[Admin added]');

-- February 9, 2026
INSERT INTO attendance (employee_id, check_in, check_out, total_hours, note)
VALUES
((SELECT id FROM employees WHERE phone = '0901823105'), '2026-02-09 12:09', '2026-02-09 18:06', 5.93, NULL),
((SELECT id FROM employees WHERE phone = '0896869903'), '2026-02-09 17:54', '2026-02-09 22:06', 4.18, NULL),
((SELECT id FROM employees WHERE phone = '0896869903'), '2026-02-09 06:28', '2026-02-09 11:53', 5.40, NULL),
((SELECT id FROM employees WHERE phone = '0777751896'), '2026-02-09 06:34', '2026-02-09 12:10', 5.60, NULL),
((SELECT id FROM employees WHERE phone = '0398413786'), '2026-02-09 18:00', '2026-02-09 22:06', 4.10, '[Admin added]');

-- February 10, 2026
INSERT INTO attendance (employee_id, check_in, check_out, total_hours, note)
VALUES
((SELECT id FROM employees WHERE phone = '0901823105'), '2026-02-10 06:17', '2026-02-10 18:31', 12.23, NULL),
((SELECT id FROM employees WHERE phone = '0777751896'), '2026-02-10 06:31', '2026-02-10 11:10', 4.63, NULL),
((SELECT id FROM employees WHERE phone = '0398413786'), '2026-02-10 18:32', NULL, NULL, 'Forgot checkout');

-- February 11, 2026
INSERT INTO attendance (employee_id, check_in, check_out, total_hours, note)
VALUES
((SELECT id FROM employees WHERE phone = '0901823105'), '2026-02-11 06:21', NULL, NULL, 'Forgot checkout'),
((SELECT id FROM employees WHERE phone = '0896869903'), '2026-02-11 06:34', '2026-02-11 10:48', 4.22, NULL);

-- ================================================
-- STEP 2: INSERT REVENUE DATA (11 daily entries for Feb 2026)
-- ================================================

INSERT INTO revenues (employee_id, work_date, opening_balance, cash, bank, net, revenue, deviation, note, created_at)
VALUES
((SELECT id FROM employees WHERE phone = '0896869903'), '2026-02-01', 500000, 2388000, 1634000, 4448000, 4389000, -59000, 'bấm dư bill 59k - plyyyy', '2026-02-01 21:57:44'),
((SELECT id FROM employees WHERE phone = '0896869903'), '2026-02-02', 388000, 863000, 875000, 1928000, 1854000, -74000, '76k cô Thi - plyyyy', '2026-02-02 22:33:32'),
((SELECT id FROM employees WHERE phone = '0766250207'), '2026-02-03', 363000, 1052000, 1348000, 2029000, 2037000, 8000, 'Khách bo - TP', '2026-02-03 22:27:37'),
((SELECT id FROM employees WHERE phone = '0777751896'), '2026-02-04', 452000, 716000, 789000, 1585200, 1544000, -41200, 'zhan', '2026-02-04 22:47:53'),
((SELECT id FROM employees WHERE phone = '0766250207'), '2026-02-05', 416000, 831000, 1500000, 2114000, 2115000, 1000, 'TP', '2026-02-05 23:00:23'),
((SELECT id FROM employees WHERE phone = '0766250207'), '2026-02-06', 331000, 917000, 816000, 1471000, 1472000, 1000, 'TP', '2026-02-06 22:02:54'),
((SELECT id FROM employees WHERE phone = '0855224187'), '2026-02-07', 417000, 1447000, 659000, 1749000, 1749000, 0, 'pkhang', '2026-02-07 21:31:39'),
((SELECT id FROM employees WHERE phone = '0777751896'), '2026-02-08', 447000, 2098000, 1732000, 3382000, 3383000, 1000, 'Dư 1k - N.khang', '2026-02-08 21:48:39'),
((SELECT id FROM employees WHERE phone = '0896869903'), '2026-02-09', 497000, 1153000, 544000, 1676000, 1676000, 0, 'plyyyy', '2026-02-09 21:57:25'),
((SELECT id FROM employees WHERE phone = '0398413786'), '2026-02-10', 497000, 2207000, 1263000, 3584000, 3584000, 0, 'Trịnh Hải Lâm', '2026-02-10 23:28:22'),
((SELECT id FROM employees WHERE phone = '0896869903'), '2026-02-11', 407000, 638000, 211000, 442000, 442000, 0, 'plyyyy', '2026-02-11 10:19:33');

-- ================================================
-- STEP 3: INSERT TRANSACTIONS (Expenses from revenue data)
-- ================================================

-- Feb 1: CHI 867,000
INSERT INTO transactions (revenue_id, type, amount, reason)
VALUES
((SELECT id FROM revenues WHERE work_date = '2026-02-01'), 'expense', 867000, '150 dừa, 46 trái cây, 35 rác, 27 oreo, 80 sữa tươi');

-- Feb 2: CHI 504,000
INSERT INTO transactions (revenue_id, type, amount, reason)
VALUES
((SELECT id FROM revenues WHERE work_date = '2026-02-02'), 'expense', 504000, 'tiền đá 308k, tiền sữa tươi và sữa đặc 196k');

-- Feb 4: CHI 491,000
INSERT INTO transactions (revenue_id, type, amount, reason)
VALUES
((SELECT id FROM revenues WHERE work_date = '2026-02-04'), 'expense', 491000, '150 dừa, 341 tiền hàng');

-- Feb 5: CHI 200,000
INSERT INTO transactions (revenue_id, type, amount, reason)
VALUES
((SELECT id FROM revenues WHERE work_date = '2026-02-05'), 'expense', 200000, 'Đác');

-- Feb 6: CHI 70,000
INSERT INTO transactions (revenue_id, type, amount, reason)
VALUES
((SELECT id FROM revenues WHERE work_date = '2026-02-06'), 'expense', 70000, 'Nước giặt khăn');

-- Feb 7: CHI 60,000
INSERT INTO transactions (revenue_id, type, amount, reason)
VALUES
((SELECT id FROM revenues WHERE work_date = '2026-02-07'), 'expense', 60000, '35k túi rác và 25k tem dán');

-- Feb 9: CHI 476,000
INSERT INTO transactions (revenue_id, type, amount, reason)
VALUES
((SELECT id FROM revenues WHERE work_date = '2026-02-09'), 'expense', 476000, 'tiền đá 286k; tiền dừa 150k; tiền ống hút 40k');

-- Feb 10: CHI 611,000
INSERT INTO transactions (revenue_id, type, amount, reason)
VALUES
((SELECT id FROM revenues WHERE work_date = '2026-02-10'), 'expense', 611000, 'Tiền chi hôm qua + Tiền hàng hôm nay');

-- ================================================
-- STEP 4: INSERT VIOLATION RECORDS (2 violations)
-- ================================================

-- Thạch Nhất Khang - 1 violation (1 điểm)
INSERT INTO violations (employee_id, violation_type_id, penalty_amount, note)
VALUES
((SELECT id FROM employees WHERE phone = '0777751896'), 1, 10000, 'Phạt tháng 2/2026');

-- Nguyễn Nhật Phương Vy - 1 warning (nhắc nhở)
INSERT INTO violations (employee_id, violation_type_id, penalty_amount, note)
VALUES
((SELECT id FROM employees WHERE phone = '0901823105'), 1, 0, 'Nhắc nhở - chưa đủ 3 lần');

-- ================================================  
-- STEP 5: VERIFY DATA
-- ================================================

SELECT '=== ATTENDANCE RECORDS ===' as section;
SELECT COUNT(*) as total_attendance FROM attendance;

SELECT '=== REVENUE RECORDS ===' as section;
SELECT COUNT(*) as total_revenues FROM revenues;

SELECT '=== TRANSACTION RECORDS ===' as section;
SELECT COUNT(*) as total_transactions FROM transactions;

SELECT '=== VIOLATION RECORDS ===' as section;
SELECT COUNT(*) as total_violations FROM violations;

-- Show sample attendance
SELECT '=== SAMPLE ATTENDANCE (First 10) ===' as section;
SELECT a.id, e.name, a.check_in::date as date, a.check_in::time as start, 
       a.check_out::time as end, a.total_hours, a.note
FROM attendance a
JOIN employees e ON a.employee_id = e.id
ORDER BY a.check_in
LIMIT 10;

-- Show all revenues
SELECT '=== ALL REVENUES ===' as section;
SELECT r.work_date, e.name as employee, r.opening_balance, r.cash, r.bank, 
       r.revenue, r.deviation, r.note
FROM revenues r
JOIN employees e ON r.employee_id = e.id
ORDER BY r.work_date;
