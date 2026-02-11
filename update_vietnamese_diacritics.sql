-- ================================================
-- UPDATE VIETNAMESE DIACRITICS
-- ================================================
-- This script updates all Vietnamese text to include proper diacritics
-- Run this in pgAdmin or with postgres user

-- ================================================
-- STEP 1: UPDATE EMPLOYEE NAMES WITH DIACRITICS
-- ================================================

UPDATE employees SET name = 'Phương Ly' WHERE phone = '0896869903';
UPDATE employees SET name = 'Trịnh Hải Lâm' WHERE phone = '0398413786';
UPDATE employees SET name = 'Ngọc Hân' WHERE phone = '0942511614';
UPDATE employees SET name = 'Phạm Thị Vinh' WHERE phone = '0919495106';
UPDATE employees SET name = 'Thanh Tú' WHERE phone = '0765457988';
UPDATE employees SET name = 'Phước Khang' WHERE phone = '0855224187';
UPDATE employees SET name = 'Trần Phú' WHERE phone = '0766250207';
UPDATE employees SET name = 'Nguyễn Nhật Phương Vy' WHERE phone = '0901823105';
UPDATE employees SET name = 'Gia Hân' WHERE phone = '0915778422';
UPDATE employees SET name = 'Thạch Nhất Khang' WHERE phone = '0777751896';

-- ================================================
-- STEP 2: UPDATE DOB (Date of Birth)
-- ================================================
-- Only Trinh Hai Lam has known DOB: 2002-10-28
-- Others can be updated later when information is available

UPDATE employees SET dob = '2002-10-28' WHERE phone = '0398413786';

-- ================================================
-- STEP 3: UPDATE VIOLATION TYPES WITH DIACRITICS
-- ================================================

UPDATE violation_types SET description = 'Đi làm muộn' WHERE id = 1;
UPDATE violation_types SET description = 'Thiếu đồng phục' WHERE id = 2;
UPDATE violation_types SET description = 'Vệ sinh khu vực làm việc không tốt' WHERE id = 3;
UPDATE violation_types SET description = 'Order nhầm' WHERE id = 4;
UPDATE violation_types SET description = 'Pha chế nhầm' WHERE id = 5;
UPDATE violation_types SET description = 'Phục vụ không in phiếu/giao/nhận phiếu' WHERE id = 6;
UPDATE violation_types SET description = 'Phục vụ không in bill thanh toán' WHERE id = 7;
UPDATE violation_types SET description = 'Pha chế không Nhận/Trả phiếu' WHERE id = 8;
UPDATE violation_types SET description = 'Phục vụ sai quy trình' WHERE id = 9;
UPDATE violation_types SET description = 'Thái độ phục vụ không tốt' WHERE id = 10;
UPDATE violation_types SET description = 'Chốt ca không đúng quy trình' WHERE id = 11;
UPDATE violation_types SET description = 'Pha chế không kiểm kê NVL cuối ngày' WHERE id = 12;
UPDATE violation_types SET description = 'Bàn ghế không đúng vị trí, sắp xếp không ngay ngắn' WHERE id = 13;
UPDATE violation_types SET description = 'Quên tắt điện, khóa nước' WHERE id = 14;
UPDATE violation_types SET description = 'Quên checkIn/checkOut' WHERE id = 15;
UPDATE violation_types SET description = 'Nghỉ đột xuất' WHERE id = 16;
UPDATE violation_types SET description = 'Bị khách hàng phản ánh chất lượng phục vụ hoặc thái độ không tốt' WHERE id = 17;
UPDATE violation_types SET description = 'Pha chế sai công thức' WHERE id = 18;

-- ================================================
-- STEP 4: VERIFY UPDATES
-- ================================================

SELECT '=== EMPLOYEES WITH DIACRITICS ===' as section;
SELECT id, code, name, phone, gender::text, dob, hire_date
FROM employees
ORDER BY id;

SELECT '=== VIOLATION TYPES WITH DIACRITICS ===' as section;
SELECT id, description, penalty_points
FROM violation_types
ORDER BY id;
