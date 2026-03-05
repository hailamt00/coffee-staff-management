-- SQL Template for inserting into the revenues table
-- Columns: schedule_id, employee_id, opening_balance, cash, bank, income, expenses, revenue, net, deviation, note, created_at

INSERT INTO "revenues" ("schedule_id", "employee_id", "opening_balance", "cash", "bank", "income", "innote", "expenses", "exnote", "revenue", "net", "deviation", "note", "created_at") VALUES
(NULL, 72, 500000, 1000000, 2000000, 0, 100000, 3000000, 2900000, 0, 'Sample Entry 1', '2026-03-05 08:00:00+07'),
(NULL, 75, 520000, 1500000, 1200000, 50000, 0, 2750000, 2750000, 0, 'Sample Entry 2', '2026-03-06 08:00:00+07');
