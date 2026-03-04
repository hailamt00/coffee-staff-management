// Script to generate seed SQL for specific March data provided by the user
const fs = require('fs');

const rawData = `
1	2026-03-04	Gia Hân	0915778422	Phục vụ	06:44				
2	2026-03-04	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	06:19				
3	2026-03-03	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	18:15	22:45	4.50	[Admin added]	
4	2026-03-03	Phước Khang	0855224187	Phục vụ	18:03	22:44	4.68		
5	2026-03-03	Thạch Nhất Khang	0777751896	Pha chế(PartTime)	12:49	18:18	5.47		
6	2026-03-03	Gia Hân	0915778422	Phục vụ	06:29	11:46	5.28		
7	2026-03-03	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	06:10	12:49	6.65		
8	2026-03-02	Phương Ly	0896869903	Phục vụ	18:03	22:29	4.42		
9	2026-03-02	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	18:00	22:30	4.50	[Admin added]	
10	2026-03-02	Trần Phú	0766250207	Phục vụ	12:12	17:59	5.77		
11	2026-03-02	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	06:15	18:03	11.80		
12	2026-03-01	Phước Khang	0855224187	Phục vụ	18:01	22:45	4.73		
13	2026-03-01	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	18:00	22:45	4.75	[Admin added]	
14	2026-03-01	Thạch Nhất Khang	0777751896	Pha chế(PartTime)	13:02	18:10	5.12		
15	2026-03-01	Thanh Tú	0765457988	Pha chế(PartTime)	08:00	13:00	5.00	[Admin added]	
16	2026-03-01	Phương Ly	0896869903	Phục vụ	07:56	18:00	10.07		
17	2026-03-01	Phước Khang	0855224187	Phục vụ	06:31	12:24	5.88		
18	2026-03-01	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	06:10	13:10	7.00	[Admin added]	
`.trim();

// Map phone numbers to employee IDs (based on past seed data mapping)
// We use phone numbers as the unique identifier to look up employee IDs
const phoneToEmployeeId = {
    '0915778422': 75, // Gia Hân
    '0901823105': 71, // Nguyễn Nhật Phương Vy
    '0398413786': 73, // Trịnh Hải Lâm
    '0855224187': 74, // Phước Khang
    '0777751896': 79, // Thạch Nhất Khang
    '0896869903': 77, // Phương Ly
    '0766250207': 78, // Trần Phú
    '0765457988': 72  // Thanh Tú
};

let sql = `
-- CLEAN UP ALL MARCH 2026 DATA
DELETE FROM revenues WHERE schedule_id IN (SELECT id FROM schedules WHERE work_date >= '2026-03-01' AND work_date < '2026-04-01');
DELETE FROM payroll_details WHERE attendance_id IN (SELECT id FROM attendance WHERE check_in >= '2026-03-01' AND check_in < '2026-04-01');
DELETE FROM attendance WHERE check_in >= '2026-03-01' AND check_in < '2026-04-01';
DELETE FROM schedules WHERE work_date >= '2026-03-01' AND work_date < '2026-04-01';

-- Restore ID sequences to safely insert without collision
SELECT setval('schedules_id_seq', COALESCE((SELECT MAX(id) FROM schedules), 1));
SELECT setval('attendance_id_seq', COALESCE((SELECT MAX(id) FROM attendance), 1));

`;

const lines = rawData.split('\n');

for (const line of lines) {
    if (!line.trim() || line.startsWith('#')) continue;

    // The rows inside rawData are tab-separated natively. 
    // split by literal tab character, or multiple spaces if it got converted.
    const parts = line.split(/\t+/).map(p => p.trim());
    if (parts.length < 6) {
        console.warn('Skipping malformed line:', line);
        continue;
    }

    const date = parts[1]; // yyyy-mm-dd
    const phone = parts[3];
    const inTime = parts[5];
    const outTime = parts[6] || '';
    const diff = parts[7] || '0';
    const note = parts[8] || '';

    const empId = phoneToEmployeeId[phone];
    if (!empId) {
        console.warn('Unknown employee phone:', phone);
        continue;
    }

    const checkInStr = `${date} ${inTime}:00`;
    const checkOutStr = outTime ? `${date} ${outTime}:00` : '';

    // Fallback if missing check_out but diff is provided? Usually outTime is just null
    let outSql = 'NULL';
    let hoursSql = 'NULL';

    if (checkOutStr) {
        outSql = `'${checkOutStr}'`;
        hoursSql = parseFloat(diff) || 0;
    }

    const noteSql = note ? `'${note}'` : 'NULL';

    // To link Attendance properly, we need a corresponding Schedule record for each shift.
    // We don't have exact shifts here, so we will assign schedule_id = NULL. 
    // The recent backend changes allow Attendance records without schedules.
    // wait, the previous instruction was: "trang schedule sẽ hơi phụ thuộc vào trang attendance, như việc trang attendance có ca làm việc này thì trong schedule phải có ca làm việc đó" 
    // So I MUST create a dummy schedule entry. I will use shift_id = 62 (Ca sáng) if inTime < 12:00, or 63 (Ca trưa)/64 (Ca Tối)

    const posStr = parts[4];
    const isPhucVu = typeof posStr === 'string' && posStr.includes('Phục vụ');

    let shiftId = isPhucVu ? 61 : 64; // Default to Ca tối (18:00 - 22:30)
    const inHour = parseInt(inTime.split(':')[0]);
    if (inHour < 12) shiftId = isPhucVu ? 59 : 62; // Ca sáng
    else if (inHour < 17) shiftId = isPhucVu ? 60 : 63; // Ca trưa

    sql += `
DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (${empId}, ${shiftId}, '${date}', NOW(), 'Mapped from specific attendance data')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note, created_at)
    VALUES (new_schedule_id, ${empId}, '${checkInStr}', ${outSql}, ${hoursSql}, ${noteSql}, NOW());
END $$;
`;

}

fs.writeFileSync('seed_specific_mar_attendance.sql', sql);
console.log('Seed script generated successfully.');
