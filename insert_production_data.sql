       -- ================================================
       -- INSERT PRODUCTION DATA - ATTENDANCE, REVENUE, TRANSACTIONS
       -- ================================================
       -- This script contains the full transactional history for February 2026.
       -- Run this AFTER running csm_db_rebuild.sql
       -- ================================================

       -- ================================================
       -- STEP 1: INSERT ATTENDANCE DATA
       -- ================================================
       -- Note: Using subqueries to find employee_id by Phone Number to ensure correctness.

       INSERT INTO attendance (employee_id, check_in, check_out, total_hours, note)
       VALUES
       -- Feb 1
       ((SELECT id FROM employees WHERE phone = '0901823105'), '2026-02-01 14:15', '2026-02-01 22:10', 7.92, NULL),
       ((SELECT id FROM employees WHERE phone = '0919495106'), '2026-02-01 06:34', '2026-02-01 11:35', 5.00, NULL),
       ((SELECT id FROM employees WHERE phone = '0896869903'), '2026-02-01 13:37', '2026-02-01 22:16', 8.63, NULL),
       ((SELECT id FROM employees WHERE phone = '0765457988'), '2026-02-01 06:20', '2026-02-01 14:00', 7.67, '[Admin added]'),
       ((SELECT id FROM employees WHERE phone = '0398413786'), '2026-02-01 06:20', '2026-02-01 14:00', 7.67, '[Admin added]'),

       -- Feb 2
       ((SELECT id FROM employees WHERE phone = '0942511614'), '2026-02-02 12:03', '2026-02-02 18:05', 6.02, NULL),
       ((SELECT id FROM employees WHERE phone = '0942511614'), '2026-02-02 06:32', '2026-02-02 11:00', 4.45, NULL),
       ((SELECT id FROM employees WHERE phone = '0901823105'), '2026-02-02 06:18', '2026-02-02 12:01', 5.72, NULL),
       ((SELECT id FROM employees WHERE phone = '0896869903'), '2026-02-02 17:59', '2026-02-02 22:33', 4.57, NULL),
       ((SELECT id FROM employees WHERE phone = '0398413786'), '2026-02-02 18:04', '2026-02-02 22:32', 4.45, NULL),

       -- Feb 3
       ((SELECT id FROM employees WHERE phone = '0942511614'), '2026-02-03 05:59', '2026-02-03 13:17', 7.30, NULL),
       ((SELECT id FROM employees WHERE phone = '0901823105'), '2026-02-03 13:25', '2026-02-03 18:46', 5.35, NULL),
       ((SELECT id FROM employees WHERE phone = '0919495106'), '2026-02-03 06:27', '2026-02-03 11:09', 4.68, NULL),
       ((SELECT id FROM employees WHERE phone = '0766250207'), '2026-02-03 18:56', '2026-02-03 22:47', 3.85, NULL),
       ((SELECT id FROM employees WHERE phone = '0398413786'), '2026-02-03 18:30', '2026-02-03 22:45', 4.25, '[Admin added]'),

       -- Feb 4
       ((SELECT id FROM employees WHERE phone = '0915778422'), '2026-02-04 18:03', '2026-02-04 23:21', 5.28, NULL),
       ((SELECT id FROM employees WHERE phone = '0942511614'), '2026-02-04 06:00', '2026-02-04 13:25', 7.42, NULL),
       ((SELECT id FROM employees WHERE phone = '0901823105'), '2026-02-04 13:11', '2026-02-04 18:33', 5.37, NULL),
       ((SELECT id FROM employees WHERE phone = '0919495106'), '2026-02-04 06:27', NULL, NULL, 'Forgot checkout'),
       ((SELECT id FROM employees WHERE phone = '0896869903'), '2026-02-04 18:33', '2026-02-04 22:52', 4.32, NULL),

       -- Feb 5
       ((SELECT id FROM employees WHERE phone = '0942511614'), '2026-02-05 06:05', '2026-02-05 13:21', 7.25, NULL),
       ((SELECT id FROM employees WHERE phone = '0901823105'), '2026-02-05 13:14', '2026-02-05 18:14', 5.00, NULL),
       ((SELECT id FROM employees WHERE phone = '0855224187'), '2026-02-05 06:38', '2026-02-05 11:01', 4.37, NULL),
       ((SELECT id FROM employees WHERE phone = '0766250207'), '2026-02-05 19:24', '2026-02-05 23:00', 3.60, NULL),
       ((SELECT id FROM employees WHERE phone = '0398413786'), '2026-02-05 18:00', '2026-02-05 23:00', 4.98, '[Admin Edited]'),

       -- Feb 6
       ((SELECT id FROM employees WHERE phone = '0915778422'), '2026-02-06 06:55', '2026-02-06 11:18', 4.37, NULL),
       ((SELECT id FROM employees WHERE phone = '0942511614'), '2026-02-06 06:12', '2026-02-06 12:30', 6.30, NULL),
       ((SELECT id FROM employees WHERE phone = '0766250207'), '2026-02-06 19:08', '2026-02-06 22:23', 3.25, NULL),
       ((SELECT id FROM employees WHERE phone = '0398413786'), '2026-02-06 18:30', '2026-02-06 23:30', 5.00, '[Admin added]'),

       -- Feb 7
       ((SELECT id FROM employees WHERE phone = '0901823105'), '2026-02-07 13:14', '2026-02-07 21:41', 8.43, NULL),
       ((SELECT id FROM employees WHERE phone = '0855224187'), '2026-02-07 06:37', '2026-02-07 11:04', 4.45, NULL),
       ((SELECT id FROM employees WHERE phone = '0855224187'), '2026-02-07 18:07', '2026-02-07 21:42', 3.57, NULL),
       ((SELECT id FROM employees WHERE phone = '0777751896'), '2026-02-07 13:58', '2026-02-07 17:26', 3.47, NULL),

       -- Feb 8
       ((SELECT id FROM employees WHERE phone = '0901823105'), '2026-02-08 18:49', '2026-02-08 21:55', 3.08, NULL),
       ((SELECT id FROM employees WHERE phone = '0855224187'), '2026-02-08 06:40', '2026-02-08 12:08', 5.45, NULL),
       ((SELECT id FROM employees WHERE phone = '0896869903'), '2026-02-08 08:00', '2026-02-08 18:48', 10.80, NULL),
       ((SELECT id FROM employees WHERE phone = '0777751896'), '2026-02-08 17:53', '2026-02-08 21:55', 4.02, NULL),
       ((SELECT id FROM employees WHERE phone = '0398413786'), '2026-02-08 06:20', '2026-02-08 13:30', 7.17, '[Admin added]'),

       -- Feb 9
       ((SELECT id FROM employees WHERE phone = '0901823105'), '2026-02-09 12:09', '2026-02-09 18:06', 5.93, NULL),
       ((SELECT id FROM employees WHERE phone = '0896869903'), '2026-02-09 17:54', '2026-02-09 22:06', 4.18, NULL),
       ((SELECT id FROM employees WHERE phone = '0896869903'), '2026-02-09 06:28', '2026-02-09 11:53', 5.40, NULL),
       ((SELECT id FROM employees WHERE phone = '0777751896'), '2026-02-09 06:34', '2026-02-09 12:10', 5.60, NULL),
       ((SELECT id FROM employees WHERE phone = '0398413786'), '2026-02-09 18:00', '2026-02-09 22:06', 4.10, '[Admin added]'),

       -- Feb 10
       ((SELECT id FROM employees WHERE phone = '0901823105'), '2026-02-10 06:17', '2026-02-10 18:31', 12.23, NULL),
       ((SELECT id FROM employees WHERE phone = '0777751896'), '2026-02-10 06:31', '2026-02-10 11:10', 4.63, NULL),
       ((SELECT id FROM employees WHERE phone = '0398413786'), '2026-02-10 18:32', NULL, NULL, 'Forgot checkout'),

       -- Feb 11
       ((SELECT id FROM employees WHERE phone = '0901823105'), '2026-02-11 06:21', NULL, NULL, 'Forgot checkout'),
       ((SELECT id FROM employees WHERE phone = '0896869903'), '2026-02-11 06:34', '2026-02-11 10:48', 4.22, NULL);


       -- ================================================
       -- STEP 2: INSERT REVENUE DATA
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

       INSERT INTO transactions (revenue_id, type, amount, description)
       VALUES
       -- Feb 1
       ((SELECT id FROM revenues WHERE work_date = '2026-02-01'), 'Expense', 867000, '150 dừa, 46 trái cây, 35 rác, 27 oreo, 80 sữa tươi'),
       -- Feb 2
       ((SELECT id FROM revenues WHERE work_date = '2026-02-02'), 'Expense', 504000, 'tiền đá 308k, tiền sữa tươi và sữa đặc 196k'),
       -- Feb 4
       ((SELECT id FROM revenues WHERE work_date = '2026-02-04'), 'Expense', 491000, '150 dừa, 341 tiền hàng'),
       -- Feb 5
       ((SELECT id FROM revenues WHERE work_date = '2026-02-05'), 'Expense', 200000, 'Đác'),
       -- Feb 6
       ((SELECT id FROM revenues WHERE work_date = '2026-02-06'), 'Expense', 70000, 'Nước giặt khăn'),
       -- Feb 7
       ((SELECT id FROM revenues WHERE work_date = '2026-02-07'), 'Expense', 60000, '35k túi rác và 25k tem dán'),
       -- Feb 9
       ((SELECT id FROM revenues WHERE work_date = '2026-02-09'), 'Expense', 476000, 'tiền đá 286k; tiền dừa 150k; tiền ống hút 40k'),
       -- Feb 10
       ((SELECT id FROM revenues WHERE work_date = '2026-02-10'), 'Expense', 611000, 'Tiền chi hôm qua + Tiền hàng hôm nay');


       -- ================================================
       -- STEP 4: INSERT PENALTIES (MIGRATED FROM VIOLATIONS)
       -- ================================================
       -- Thạch Nhất Khang - 1 violation (1 điểm - 10k)
       INSERT INTO rewards_penalties (employee_id, type_id, amount, created_at)
       VALUES
       ((SELECT id FROM employees WHERE phone = '0777751896'), 
       (SELECT id FROM reward_penalty_types WHERE name = 'Đi làm muộn' LIMIT 1), 
       10000, NOW());

       -- Nguyễn Nhật Phương Vy - 1 warning (Nhắc nhở - 0k) (Assuming 'Thái độ phục vụ không tốt' or similar, mapping to 'Nhắc nhở' isn't standard, defaulting to 0 amount entry using 'Đi làm muộn' or custom if needed. 
       -- Wait, schema allowed 0 amount. Creating a generic 'Error' or mapping to 'Vi phạm nội quy' if exists. 
       -- In csm_db_rebuild we added: 'Đi làm muộn', 'Thiếu đồng phục', etc. 
       -- Let's use 'Vi phạm nội quy' if we had it, or just use 'Đi làm muộn' with 0 amount and a note? 
       -- The table doesn't have 'note'. It has 'amount'.
       -- The Type 'Penalty' is what matters.
       -- I'll map it to 'Đi làm muộn' (generic penalty) with 0 amount for now, as it was 'Nhắc nhở'.
       INSERT INTO rewards_penalties (employee_id, type_id, amount, created_at)
       VALUES
       ((SELECT id FROM employees WHERE phone = '0901823105'), 
       (SELECT id FROM reward_penalty_types WHERE name = 'Đi làm muộn' LIMIT 1), 
       0, NOW());
