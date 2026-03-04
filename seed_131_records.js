const fs = require('fs');

const rawData = `1	2026-03-04	Gia Hân	0915778422	Phục vụ	06:44				
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
19	2026-02-28	Phương Ly	0896869903	Phục vụ	17:52	22:30	4.62	[Admin Edited]	
20	2026-02-28	Phước Khang	0855224187	Phục vụ	15:55	18:17	2.35		
21	2026-02-28	Thạch Nhất Khang	0777751896	Pha chế(PartTime)	14:15	22:30	8.25	[Admin Edited]	
22	2026-02-28	Thanh Tú	0765457988	Pha chế(PartTime)	09:00	14:00	5.00	[Admin added]	
23	2026-02-28	Phước Khang	0855224187	Phục vụ	06:41	12:06	5.40		
24	2026-02-28	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	06:18	09:05	2.78		
25	2026-02-27	Phước Khang	0855224187	Phục vụ	18:05	22:13	4.12		
26	2026-02-27	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	18:00	22:15	4.25	[Admin added]	
27	2026-02-27	Thạch Nhất Khang	0777751896	Pha chế(PartTime)	13:00	18:21	5.33		
28	2026-02-27	Phước Khang	0855224187	Phục vụ	06:40	11:02	4.35		
29	2026-02-27	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	06:26	13:02	6.60		
30	2026-02-26	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	18:15	20:00	1.75	[Admin added]	
31	2026-02-26	Phước Khang	0855224187	Phục vụ	18:00	22:34	4.55		
32	2026-02-26	Thạch Nhất Khang	0777751896	Pha chế(PartTime)	14:10	18:30	4.33	[Admin added]	
33	2026-02-26	Phước Khang	0855224187	Phục vụ	14:04	15:21	1.28		
34	2026-02-26	Phước Khang	0855224187	Phục vụ	06:36	10:47	4.18		
35	2026-02-26	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	06:09	14:09	7.98		
36	2026-02-25	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	18:10	22:50	4.67	[Admin added]	
37	2026-02-25	Phương Ly	0896869903	Phục vụ	17:56	22:50	4.88		
38	2026-02-25	Thạch Nhất Khang	0777751896	Pha chế(PartTime)	12:20	18:25	6.08		
39	2026-02-25	Phước Khang	0855224187	Phục vụ	06:37	11:02	4.40		
40	2026-02-25	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	06:25	12:20	5.90		
41	2026-02-24	Thạch Nhất Khang	0777751896	Pha chế(PartTime)	13:00	22:30	9.50	[Admin added]	
42	2026-02-24	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	06:42	13:10	6.45		
43	2026-02-23	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	18:40	22:50	4.15	[Admin Edited]	
44	2026-02-23	Phương Ly	0896869903	Phục vụ	17:53	22:48	4.92		
45	2026-02-23	Phước Khang	0855224187	Phục vụ	06:39	11:26	4.77		
46	2026-02-23	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	06:31	18:30	11.97	[Admin Edited]	
47	2026-02-22	Phước Khang	0855224187	Phục vụ	06:35	12:24	5.80		
48	2026-02-22	Phương Ly	0896869903	Phục vụ	06:05	13:52	7.77		
49	2026-02-22	Thanh Tú	0765457988	Pha chế(PartTime)	06:00	13:00	7.00	[Admin added]	
50	2026-02-21	Thạch Nhất Khang	0777751896	Pha chế(PartTime)	07:14	12:38	5.38		
51	2026-02-21	Phước Khang	0855224187	Phục vụ	06:47	12:37	5.83		
52	2026-02-20	Phương Ly	0896869903	Phục vụ	06:40	12:09	5.48		
53	2026-02-20	Thạch Nhất Khang	0777751896	Pha chế(PartTime)	06:06	12:25	6.30		
54	2026-02-19	Phương Ly	0896869903	Phục vụ	06:35	12:51	6.27		
55	2026-02-19	Thanh Tú	0765457988	Pha chế(PartTime)	06:00	12:00	6.00	[Admin added]	
56	2026-02-18	Phương Ly	0896869903	Phục vụ	06:38	12:28	5.82		
57	2026-02-18	Thanh Tú	0765457988	Pha chế(PartTime)	06:00	12:00	6.00	[Admin added]	
58	2026-02-17	Phương Ly	0896869903	Phục vụ	06:40	12:00	5.32	[Admin Edited]	
59	2026-02-17	Thanh Tú	0765457988	Pha chế(PartTime)	06:00	12:00	6.00	[Admin added]	
60	2026-02-16	Phương Ly	0896869903	Phục vụ	18:40	21:28	2.78		
61	2026-02-16	Phước Khang	0855224187	Phục vụ	06:33	12:23	5.83		
62	2026-02-16	Thanh Tú	0765457988	Pha chế(PartTime)	06:00	19:00	13.00	[Admin Edited]	
63	2026-02-15	Thanh Tú	0765457988	Pha chế(PartTime)	19:00	22:30	3.50	[Admin added]	
64	2026-02-15	Phước Khang	0855224187	Phục vụ	18:07	22:32	4.40		
65	2026-02-15	Thạch Nhất Khang	0777751896	Pha chế(PartTime)	13:30	19:00	5.50	[Admin Edited]	
66	2026-02-15	Phước Khang	0855224187	Phục vụ	09:05	11:15	2.15		
67	2026-02-15	Phương Ly	0896869903	Phục vụ	06:30	18:00	11.48	[Admin Edited]	
68	2026-02-14	Phước Khang	0855224187	Phục vụ	22:36	22:53	0.28		
69	2026-02-14	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	18:14	22:36	4.35		
70	2026-02-14	Phương Ly	0896869903	Phục vụ	14:19	18:06	3.78		
71	2026-02-14	Thạch Nhất Khang	0777751896	Pha chế(PartTime)	13:05	18:26	5.35		
72	2026-02-14	Phương Ly	0896869903	Phục vụ	06:35	11:03	4.47		
73	2026-02-13	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	18:26	22:45	4.30		
74	2026-02-13	Phương Ly	0896869903	Pha chế(PartTime)	13:07	18:32	5.40		
75	2026-02-13	Phước Khang	0855224187	Phục vụ	06:39	11:00	4.33		
76	2026-02-13	Thạch Nhất Khang	0777751896	Pha chế(PartTime)	06:00	13:00	7.00	[Admin added]	
77	2026-02-12	Phương Ly	0896869903	Phục vụ	18:05	22:33	4.45		
78	2026-02-12	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	18:01	22:35	4.55	[Admin Edited]	
79	2026-02-12	Phương Ly	0896869903	Pha chế(PartTime)	13:08	18:05	4.95		
80	2026-02-12	Phước Khang	0855224187	Phục vụ	06:38	11:05	4.43		
81	2026-02-12	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	06:16	13:11	6.90		
82	2026-02-11	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	18:00	20:30	2.50	[Admin added]	
83	2026-02-11	Phương Ly	0896869903	Phục vụ	06:34	10:48	4.22		
84	2026-02-11	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	06:21	18:00	11.63		
85	2026-02-10	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	18:32	22:00	3.45	[Admin Edited]	
86	2026-02-10	Thạch Nhất Khang	0777751896	Pha chế(PartTime)	06:31	11:10	4.63		
87	2026-02-10	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	06:17	18:31	12.23		
88	2026-02-09	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	18:00	22:06	4.10	[Admin added]	
89	2026-02-09	Phương Ly	0896869903	Phục vụ	17:54	22:06	4.18		
90	2026-02-09	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	12:09	18:06	5.93		
91	2026-02-09	Phương Ly	0896869903	Phục vụ	06:28	11:53	5.40		
92	2026-02-09	Thạch Nhất Khang	0777751896	Pha chế(PartTime)	06:00	12:00	6.00	[Admin added]	
93	2026-02-08	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	18:49	21:55	3.08		
94	2026-02-08	Thạch Nhất Khang	0777751896	Pha chế(PartTime)	13:30	18:30	5.00	[Admin added]	
95	2026-02-08	Phương Ly	0896869903	Phục vụ	08:00	18:48	10.80		
96	2026-02-08	Phước Khang	0855224187	Phục vụ	06:40	12:08	5.45		
97	2026-02-08	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	06:20	13:30	7.17	[Admin added]	
98	2026-02-07	Phước Khang	0855224187	Phục vụ	18:07	21:42	3.57		
99	2026-02-07	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	13:14	21:41	8.43	[Admin Edited]	
100	2026-02-07	Thạch Nhất Khang	0777751896	Phục vụ	13:00	18:00	5.00	[Admin added]	
101	2026-02-07	Phước Khang	0855224187	Phục vụ	06:37	11:04	4.45		
102	2026-02-06	Trần Phú	0766250207	Phục vụ	19:08	22:23	3.25		
103	2026-02-06	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	18:30	23:30	5.00	[Admin added]	
104	2026-02-06	Thạch Nhất Khang	0777751896	Pha chế(PartTime)	12:00	18:00	6.00	[Admin added]	
105	2026-02-06	Gia Hân	0915778422	Phục vụ	06:55	11:18	4.37		
106	2026-02-06	Ngọc Hân	0942511614	Pha chế(PartTime)	06:12	12:30	6.30		
107	2026-02-05	Trần Phú	0766250207	Phục vụ	19:24	23:00	3.60		
108	2026-02-05	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	18:00	23:00	4.98	[Admin Edited]	
109	2026-02-05	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	13:14	18:14	5.00		
110	2026-02-05	Phước Khang	0855224187	Phục vụ	06:38	11:01	4.37		
111	2026-02-05	Ngọc Hân	0942511614	Pha chế(PartTime)	06:05	13:21	7.25		
112	2026-02-04	Phương Ly	0896869903	Pha chế(PartTime)	18:33	22:52	4.32	[Admin Edited]	
113	2026-02-04	Gia Hân	0915778422	Phục vụ	18:03	23:21	5.28		
114	2026-02-04	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	13:11	18:33	5.37		
115	2026-02-04	Phạm Thị Vinh	0919495106	Phục vụ	06:27	11:00	4.53	[Admin Edited]	
116	2026-02-04	Ngọc Hân	0942511614	Pha chế(PartTime)	06:00	13:25	7.42		
117	2026-02-03	Trần Phú	0766250207	Phục vụ	18:56	22:47	3.85		
118	2026-02-03	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	18:30	22:45	4.25	[Admin added]	
119	2026-02-03	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	13:25	18:46	5.35		
120	2026-02-03	Phạm Thị Vinh	0919495106	Phục vụ	06:27	11:09	4.68		
121	2026-02-03	Ngọc Hân	0942511614	Pha chế(PartTime)	05:59	13:17	7.30		
122	2026-02-02	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	18:04	22:32	4.45		
123	2026-02-02	Phương Ly	0896869903	Phục vụ	17:59	22:33	4.57		
124	2026-02-02	Ngọc Hân	0942511614	Pha chế(PartTime)	12:03	18:05	6.02		
125	2026-02-02	Ngọc Hân	0942511614	Phục vụ	06:32	11:00	4.45		
126	2026-02-02	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	06:18	12:01	5.72		
127	2026-02-01	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	14:15	22:10	7.92		
128	2026-02-01	Phương Ly	0896869903	Phục vụ	13:37	22:16	8.63		
129	2026-02-01	Phạm Thị Vinh	0919495106	Phục vụ	06:34	11:35	5.00		
130	2026-02-01	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	06:20	14:00	7.67	[Admin added]	
131	2026-02-01	Thanh Tú	0765457988	Pha chế(PartTime)	06:20	14:00	7.67	[Admin added]	`;

// DB lookups emulation
const employeesMap = {
    '0915778422': 78, // Gia Hân
    '0901823105': 77, // Phương Vy
    '0398413786': 71, // Hải Lâm
    '0855224187': 75, // Phước Khang
    '0777751896': 79, // Nhất Khang
    '0896869903': 72, // Phương Ly
    '0766250207': 76, // Trần Phú
    '0765457988': 70, // Thanh Tú
    '0942511614': 73, // Ngọc Hân
    '0919495106': 74, // Phạm Thị Vinh
};

// Map based on start time roughly
function getShiftId(time, posStr) {
    let isPhucVu = typeof posStr === 'string' && posStr.includes('Phục vụ');
    if (!time) return isPhucVu ? 59 : 62; // fallback
    const h = parseInt(time.split(':')[0], 10);
    if (h >= 5 && h <= 11) return isPhucVu ? 59 : 62; // Morning 06:00-13:00
    if (h >= 12 && h <= 16) return isPhucVu ? 60 : 63; // Afternoon 13:00-18:00
    if (h >= 17 && h <= 23) return isPhucVu ? 61 : 64; // Evening 18:00-22:30
    return isPhucVu ? 59 : 62;
}

let schedulesSql = 'INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES\n';
let attendanceSql = 'INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES\n';

const lines = rawData.trim().split('\n').filter(l => l.trim() && !l.includes('#'));
let scheduleIdSeq = 1;

const scheduleVals = [];
const attendanceVals = [];

lines.forEach((line) => {
    const parts = line.split(/\t+/);
    if (parts.length < 5) return;

    // Parse
    let date = parts[1];
    let phone = parts[3];
    let posStr = parts[4];

    // Convert "Pha chế(PartTime)" -> "Pha chế" handled implicitly actually as we assign DB based on phone. But let's log.
    if (posStr.includes('Pha chế')) posStr = 'Pha chế';

    let inTimeObj = parts[5] && parts[5].trim() !== '' ? parts[5].trim() : null;
    let outTimeObj = parts[6] && parts[6].trim() !== '' ? parts[6].trim() : null;
    let diffObj = parts[7] && parts[7].trim() !== '' ? parts[7].trim() : null;
    let noteObj = parts[8] && parts[8].trim() !== '' ? parts[8].trim() : null;

    if (!noteObj && parts.length > 8 && parts[8]) noteObj = parts[8].trim(); // catch all

    const empId = employeesMap[phone];
    if (!empId) {
        console.warn('Missing emp for phone ' + phone + ' on line: ' + line);
        return;
    }

    const shiftId = getShiftId(inTimeObj || '06:00', posStr);

    let scheduleStr = `INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) VALUES (${empId}, ${shiftId}, '${date}', NOW(), 'Mapped from specific attendance data')`;

    let inStr = inTimeObj ? `'${date}T${inTimeObj}:00'` : 'NULL';
    let outStr = outTimeObj ? `'${date}T${outTimeObj}:00'` : 'NULL';
    let diffStr = diffObj ? diffObj : 'NULL';
    let nStr = noteObj ? `'${noteObj.replace(/'/g, "''")}'` : 'NULL';

    let attStr = `INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) VALUES (new_schedule_id, ${empId}, ${inStr}, ${outStr}, ${diffStr}, ${nStr})`;

    scheduleVals.push(`
DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    ${scheduleStr}
    RETURNING id INTO new_schedule_id;

    ${attStr};
END $$;
`);
});

const finalQuery = `
SET client_encoding = 'UTF8';
BEGIN;
DELETE FROM transactions WHERE revenue_id IN (SELECT id FROM revenues WHERE schedule_id IN (SELECT id FROM schedules WHERE work_date >= '2026-02-01' AND work_date < '2026-04-01'));
DELETE FROM revenues WHERE schedule_id IN (SELECT id FROM schedules WHERE work_date >= '2026-02-01' AND work_date < '2026-04-01');
DELETE FROM attendance WHERE check_in >= '2026-02-01' OR check_out >= '2026-02-01' OR note ILIKE '%Admin added%' OR note ILIKE '%Admin Edited%';
DELETE FROM schedules WHERE work_date >= '2026-02-01' AND work_date < '2026-04-01';

SELECT setval('schedules_id_seq', (SELECT COALESCE(MAX(id), 1) FROM schedules));
SELECT setval('attendance_id_seq', (SELECT COALESCE(MAX(id), 1) FROM attendance));

${scheduleVals.join('\n')}

COMMIT;
`;

fs.writeFileSync('seed_131.sql', finalQuery);
console.log('Done generating seed_131.sql for', scheduleVals.length, 'records');
