const fs = require('fs');

const rawData = `1	2026-01-31	Phương Ly	0896869903	Phục vụ	18:13	22:30	4.27	[Admin Edited]	
2	2026-01-31	Phước Khang	0855224187	Phục vụ	15:16	18:13	2.93		
3	2026-01-31	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	14:00	22:30	8.48	[Admin Edited]	
4	2026-01-31	Phước Khang	0855224187	Phục vụ	08:59	12:00	3.02		
5	2026-01-31	Phạm Thị Vinh	0919495106	Phục vụ	06:30	11:01	4.50		
6	2026-01-31	Ngọc Hân	0942511614	Pha chế(PartTime)	06:06	14:06	7.98		
7	2026-01-30	Thanh Tú	0765457988	Pha chế(PartTime)	18:30	22:30	4.00	[Admin added]	
8	2026-01-30	Thạch Nhất Khang	0777751896	Phục vụ	18:03	22:30	4.43	[Admin Edited]	
9	2026-01-30	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	12:15	18:24	6.13		
10	2026-01-30	Phạm Thị Vinh	0919495106	Phục vụ	07:21	09:26	2.07		
11	2026-01-30	Ngọc Hân	0942511614	Pha chế(PartTime)	06:04	12:21	6.27		
12	2026-01-29	Trần Phú	0766250207	Phục vụ	18:57	22:21	3.40		
13	2026-01-29	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	18:00	22:30	4.50	[Admin Edited]	
14	2026-01-29	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	13:31	16:32	3.02		
15	2026-01-29	Phước Khang	0855224187	Phục vụ	06:32	11:00	4.45		
16	2026-01-29	Ngọc Hân	0942511614	Pha chế(PartTime)	06:05	13:29	7.40		
17	2026-01-28	Gia Hân	0915778422	Phục vụ	18:00	22:57	4.93		
18	2026-01-28	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	18:00	22:50	4.83		
19	2026-01-28	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	13:12	18:18	5.10		
20	2026-01-28	Phạm Thị Vinh	0919495106	Phục vụ	06:25	11:33	5.12		
21	2026-01-28	Ngọc Hân	0942511614	Pha chế(PartTime)	06:00	13:12	7.20		
22	2026-01-27	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	18:45	22:31	3.75		
23	2026-01-27	Trần Phú	0766250207	Phục vụ	18:01	22:30	4.47	[Admin Edited]	
24	2026-01-27	Thạch Nhất Khang	0777751896	Pha chế(PartTime)	13:00	18:00	4.98	[Admin Edited]	
25	2026-01-27	Phạm Thị Vinh	0919495106	Phục vụ	06:28	11:21	4.87		
26	2026-01-27	Ngọc Hân	0942511614	Pha chế(PartTime)	06:05	13:02	6.95		
27	2026-01-26	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	18:20	22:37	4.28	[Admin added]	
28	2026-01-26	Phước Khang	0855224187	Phục vụ	18:02	22:47	4.73		
29	2026-01-26	Ngọc Hân	0942511614	Phục vụ	06:36	11:02	4.43	[Admin Edited]	
30	2026-01-26	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	06:13	18:25	12.18		
31	2026-01-25	Phước Khang	0855224187	Phục vụ	18:04	22:10	4.08		
32	2026-01-25	Ngọc Hân	0942511614	Pha chế(PartTime)	18:00	22:05	4.07		
33	2026-01-25	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	13:57	18:00	4.03		
34	2026-01-25	Phương Ly	0896869903	Phục vụ	08:07	18:08	10.00		
35	2026-01-25	Thanh Tú	0765457988	Pha chế(PartTime)	08:00	13:00	5.00	[Admin added]	
36	2026-01-25	Phạm Thị Vinh	0919495106	Phục vụ	06:26	12:08	5.68		
37	2026-01-25	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	06:10	13:54	7.73	[Admin added]	
38	2026-01-24	Phương Ly	0896869903	Phục vụ	18:16	22:30	4.23		
39	2026-01-24	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	18:13	22:29	4.25		
40	2026-01-24	Phước Khang	0855224187	Phục vụ	14:02	18:16	4.23		
41	2026-01-24	Thạch Nhất Khang	0777751896	Pha chế(PartTime)	12:57	18:00	5.03	[Admin Edited]	
42	2026-01-24	Gia Hân	0915778422	Phục vụ	09:35	14:37	5.02		
43	2026-01-24	Phạm Thị Vinh	0919495106	Phục vụ	06:26	11:36	5.17		
44	2026-01-24	Ngọc Hân	0942511614	Pha chế(PartTime)	06:01	13:03	7.03		
45	2026-01-23	Phước Khang	0855224187	Phục vụ	18:03	22:28	4.42		
46	2026-01-23	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	18:00	22:30	4.50	[Admin added]	
47	2026-01-23	Thạch Nhất Khang	0777751896	Pha chế(PartTime)	12:12	18:04	5.87		
48	2026-01-23	Trần Phú	0766250207	Phục vụ	06:35	11:31	4.93		
49	2026-01-23	Ngọc Hân	0942511614	Pha chế(PartTime)	06:11	12:22	6.18		
50	2026-01-22	Trần Phú	0766250207	Phục vụ	18:45	22:51	4.10		
51	2026-01-22	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	18:06	22:53	4.77		
52	2026-01-22	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	13:19	18:14	4.90		
53	2026-01-22	Phước Khang	0855224187	Phục vụ	06:38	11:32	4.88		
54	2026-01-22	Ngọc Hân	0942511614	Pha chế(PartTime)	06:10	13:17	7.10		
55	2026-01-21	Phương Ly	0896869903	Phục vụ	18:12	22:29	4.27		
56	2026-01-21	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	18:12	22:27	4.25		
57	2026-01-21	Phương Ly	0896869903	Pha chế(PartTime)	12:26	18:12	5.75		
58	2026-01-21	Phạm Thị Vinh	0919495106	Phục vụ	06:33	11:26	4.88		
59	2026-01-21	Ngọc Hân	0942511614	Pha chế(PartTime)	06:04	12:26	6.35		
60	2026-01-20	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	18:25	21:45	3.33		
61	2026-01-20	Phước Khang	0855224187	Phục vụ	17:52	21:39	3.78		
62	2026-01-20	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	13:16	18:28	5.20		
63	2026-01-20	Phạm Thị Vinh	0919495106	Phục vụ	06:52	11:17	4.42		
64	2026-01-20	Ngọc Hân	0942511614	Pha chế(PartTime)	06:05	13:15	7.15		
65	2026-01-19	Trần Phú	0766250207	Phục vụ	18:00	22:49	4.80		
66	2026-01-19	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	17:58	22:47	4.82		
67	2026-01-19	Ngọc Hân	0942511614	Phục vụ	06:42	11:01	4.32		
68	2026-01-19	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	06:09	17:57	11.80		
69	2026-01-18	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	18:19	22:31	4.18		
70	2026-01-18	Thạch Nhất Khang	0777751896	Pha chế(PartTime)	13:00	18:20	5.32	[Admin Edited]	
71	2026-01-18	Phương Ly	0896869903	Phục vụ	11:26	22:33	11.10		
72	2026-01-18	Thanh Tú	0765457988	Pha chế(PartTime)	08:00	13:00	5.00	[Admin added]	
73	2026-01-18	Thạch Nhất Khang	0777751896	Phục vụ	07:55	12:02	4.12		
74	2026-01-18	Phước Khang	0855224187	Phục vụ	06:35	11:38	5.05		
75	2026-01-18	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	06:03	17:40	11.60		
76	2026-01-17	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	18:15	22:23	4.12		
77	2026-01-17	Phước Khang	0855224187	Phục vụ	18:04	22:26	4.37		
78	2026-01-17	Phương Ly	0896869903	Phục vụ	14:00	18:04	4.05		
79	2026-01-17	Thạch Nhất Khang	0777751896	Pha chế(PartTime)	12:08	18:00	5.85	[Admin Edited]	
80	2026-01-17	Gia Hân	0915778422	Phục vụ	09:06	11:05	1.98		
81	2026-01-17	Phạm Thị Vinh	0919495106	Phục vụ	06:33	11:05	4.53		
82	2026-01-17	Ngọc Hân	0942511614	Pha chế(PartTime)	05:59	12:00	6.00	[Admin Edited]	
83	2026-01-16	Trần Phú	0766250207	Phục vụ	19:03	22:30	3.43	[Admin Edited]	
84	2026-01-16	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	18:20	22:30	4.15	[Admin Edited]	
85	2026-01-16	Thạch Nhất Khang	0777751896	Pha chế(PartTime)	12:19	18:34	6.23		
86	2026-01-16	Gia Hân	0915778422	Phục vụ	06:36	11:00	4.38		
87	2026-01-16	Ngọc Hân	0942511614	Pha chế(PartTime)	05:56	12:19	6.37		
88	2026-01-15	Trần Phú	0766250207	Phục vụ	19:02	22:53	3.83		
89	2026-01-15	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	18:00	22:53	4.88	[Admin added]	
90	2026-01-15	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	13:52	18:16	4.38		
91	2026-01-15	Phương Ly	0896869903	Phục vụ	06:31	10:22	3.85		
92	2026-01-15	Ngọc Hân	0942511614	Pha chế(PartTime)	06:06	13:54	7.80		
93	2026-01-14	Phước Khang	0855224187	Phục vụ	18:07	22:38	4.50		
94	2026-01-14	Phương Ly	0896869903	Pha chế(PartTime)	18:02	22:39	4.62	[Admin Edited]	
95	2026-01-14	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	12:09	18:27	6.28		
96	2026-01-14	Phạm Thị Vinh	0919495106	Phục vụ	06:59	11:14	4.25		
97	2026-01-14	Ngọc Hân	0942511614	Pha chế(PartTime)	05:56	12:06	6.15		
98	2026-01-13	Phước Khang	0855224187	Phục vụ	18:11	22:27	4.27		
99	2026-01-13	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	18:10	22:30	4.33	[Admin added]	
100	2026-01-13	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	13:27	18:09	4.68		
101	2026-01-13	Phạm Thị Vinh	0919495106	Phục vụ	06:31	11:48	5.27		
102	2026-01-13	Ngọc Hân	0942511614	Pha chế(PartTime)	05:54	13:32	7.62		
103	2026-01-12	Trần Phú	0766250207	Phục vụ	19:07	22:48	3.68		
104	2026-01-12	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	18:16	22:37	4.35		
105	2026-01-12	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	13:11	18:22	5.17		
106	2026-01-12	Phương Ly	0896869903	Phục vụ	06:27	11:49	5.37		
107	2026-01-12	Ngọc Hân	0942511614	Pha chế(PartTime)	05:56	13:18	7.35		
108	2026-01-11	Phước Khang	0855224187	Phục vụ	18:00	22:24	4.40		
109	2026-01-11	Thạch Nhất Khang	0777751896	Pha chế(PartTime)	15:57	22:30	6.55		
110	2026-01-11	Phương Ly	0896869903	Phục vụ	08:02	18:00	9.97		
111	2026-01-11	Thanh Tú	0765457988	Pha chế(PartTime)	08:00	13:00	5.00	[Admin added]	
112	2026-01-11	Ngọc Hân	0942511614	Phục vụ	06:38	11:52	5.22		
113	2026-01-11	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	06:20	16:00	9.67	[Admin added]	
114	2026-01-10	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	18:14	22:05	3.83		
115	2026-01-10	Phước Khang	0855224187	Phục vụ	18:06	22:09	4.03		
116	2026-01-10	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	13:00	18:10	5.17	[Admin added]	
117	2026-01-10	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	12:17	13:06	0.82		
118	2026-01-10	Phương Ly	0896869903	Phục vụ	07:53	18:06	10.20		
119	2026-01-10	Phạm Thị Vinh	0919495106	Phục vụ	06:27	11:35	5.13		
120	2026-01-10	Ngọc Hân	0942511614	Pha chế(PartTime)	05:59	12:17	6.30		
121	2026-01-09	Phước Khang	0855224187	Phục vụ	18:08	22:03	3.90		
122	2026-01-09	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	18:00	22:00	4.00	[Admin added]	
123	2026-01-09	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	13:16	18:00	4.73	[Admin Edited]	
124	2026-01-09	Gia Hân	0915778422	Phục vụ	06:45	11:00	4.23	[Admin Edited]	
125	2026-01-09	Ngọc Hân	0942511614	Pha chế(PartTime)	06:11	13:11	7.00		
126	2026-01-08	Gia Hân	0915778422	Phục vụ	19:50	22:00	2.15	[Admin Edited]	
127	2026-01-08	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	18:15	22:00	3.75	[Admin added]	
128	2026-01-08	Phương Ly	0896869903	Phục vụ	18:07	19:19	1.18		
129	2026-01-08	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	13:05	16:31	3.42		
130	2026-01-08	Phước Khang	0855224187	Phục vụ	07:52	11:10	3.30		
131	2026-01-08	Ngọc Hân	0942511614	Pha chế(PartTime)	06:00	13:10	7.15		
132	2026-01-07	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	18:25	22:30	4.07	[Admin Edited]	
133	2026-01-07	Phương Ly	0896869903	Phục vụ	17:58	22:45	4.78		
134	2026-01-07	Thạch Nhất Khang	0777751896	Pha chế(PartTime)	12:38	18:30	5.87		
135	2026-01-07	Phạm Thị Vinh	0919495106	Phục vụ	06:28	11:02	4.55		
136	2026-01-07	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	06:12	12:38	6.43		
137	2026-01-06	Trần Phú	0766250207	Phục vụ	19:14	22:46	3.53		
138	2026-01-06	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	18:00	22:11	4.17		
139	2026-01-06	Phạm Thị Vinh	0919495106	Phục vụ	06:41	11:34	4.87		
140	2026-01-06	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	06:09	18:01	11.85		
141	2026-01-05	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	18:34	22:30	3.92	[Admin Edited]	
142	2026-01-05	Phương Ly	0896869903	Phục vụ	17:53	22:53	4.98		
143	2026-01-05	Ngọc Hân	0942511614	Phục vụ	06:37	11:22	4.73		
144	2026-01-05	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	06:13	18:32	12.32		
145	2026-01-04	Phước Khang	0855224187	Phục vụ	17:25	22:36	5.17		
146	2026-01-04	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	16:09	22:31	6.35		
147	2026-01-04	Thanh Tú	0765457988	Pha chế(PartTime)	08:00	13:00	5.00	[Admin added]	
148	2026-01-04	Phước Khang	0855224187	Phục vụ	07:57	12:36	4.65		
149	2026-01-04	Phương Ly	0896869903	Phục vụ	06:42	10:20	3.62		
150	2026-01-04	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	06:18	16:00	9.68	[Admin Edited]	
151	2026-01-03	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	18:11	22:30	4.30	[Admin Edited]	
152	2026-01-03	Phước Khang	0855224187	Phục vụ	18:00	22:30	4.48	[Admin Edited]	
153	2026-01-03	Phạm Thị Vinh	0919495106	Phục vụ	07:52	11:35	3.70		
154	2026-01-03	Ngọc Hân	0942511614	Phục vụ	06:32	09:08	2.60		
155	2026-01-03	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	06:09	18:10	12.00		
156	2026-01-02	Phương Ly	0896869903	Phục vụ	16:26	22:25	5.98		
157	2026-01-02	Nguyễn Nhật Phương Vy	0901823105	Pha chế(PartTime)	14:16	22:22	8.10		
158	2026-01-02	Phạm Thị Vinh	0919495106	Phục vụ	06:32	11:15	4.70		
159	2026-01-02	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	06:13	14:15	8.03		
160	2026-01-01	Phương Ly	0896869903	Phục vụ	18:00	22:44	4.72	[Admin Edited]	
161	2026-01-01	Phước Khang	0855224187	Phục vụ	14:05	18:12	4.10		
162	2026-01-01	Trịnh Hải Lâm	0398413786	Pha chế(PartTime)	08:10	17:23	9.22	[Admin added]	
163	2026-01-01	Phạm Thị Vinh	0919495106	Phục vụ	07:51	12:09	4.30		
164	2026-01-01	Phương Ly	0896869903	Phục vụ	06:34	11:58	5.40		
165	2026-01-01	Ngọc Hân	0942511614	Pha chế(PartTime)	05:58	13:03	7.08		`.trim();

const employeesMap = {
    '0915778422': 78,
    '0901823105': 77,
    '0398413786': 71,
    '0855224187': 75,
    '0777751896': 79,
    '0896869903': 72,
    '0766250207': 76,
    '0765457988': 70,
    '0942511614': 73,
    '0919495106': 74,
};

function getShiftId(time, posStr) {
    let isPhucVu = typeof posStr === 'string' && posStr.includes('Phục vụ');
    if (!time) return isPhucVu ? 59 : 62;
    const h = parseInt(time.split(':')[0], 10);
    if (h >= 5 && h <= 11) return isPhucVu ? 59 : 62;
    if (h >= 12 && h <= 16) return isPhucVu ? 60 : 63;
    if (h >= 17 && h <= 23) return isPhucVu ? 61 : 64;
    return isPhucVu ? 59 : 62;
}

const lines = rawData.trim().split('\n').filter(l => l.trim() && !l.includes('#'));

const scheduleVals = [];

lines.forEach((line) => {
    const parts = line.split(/\t+/);
    if (parts.length < 5) return;

    let date = parts[1];
    let phone = parts[3];
    let posStr = parts[4];

    if (posStr.includes('Pha chế')) posStr = 'Pha chế';

    let inTimeObj = parts[5] && parts[5].trim() !== '' ? parts[5].trim() : null;
    let outTimeObj = parts[6] && parts[6].trim() !== '' ? parts[6].trim() : null;
    let diffObj = parts[7] && parts[7].trim() !== '' ? parts[7].trim() : null;
    let noteObj = parts[8] && parts[8].trim() !== '' ? parts[8].trim() : null;

    if (!noteObj && parts.length > 8 && parts[8]) noteObj = parts[8].trim();

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
DELETE FROM transactions WHERE revenue_id IN (SELECT id FROM revenues WHERE schedule_id IN (SELECT id FROM schedules WHERE work_date >= '2026-01-01' AND work_date < '2026-02-01'));
DELETE FROM revenues WHERE schedule_id IN (SELECT id FROM schedules WHERE work_date >= '2026-01-01' AND work_date < '2026-02-01');
DELETE FROM attendance WHERE check_in >= '2026-01-01' AND check_in < '2026-02-01';
DELETE FROM schedules WHERE work_date >= '2026-01-01' AND work_date < '2026-02-01';

SELECT setval('schedules_id_seq', (SELECT COALESCE(MAX(id), 1) FROM schedules));
SELECT setval('attendance_id_seq', (SELECT COALESCE(MAX(id), 1) FROM attendance));

${scheduleVals.join('\n')}

COMMIT;
`;

fs.writeFileSync('seed_jan.sql', finalQuery);
console.log('Done generating seed_jan.sql for', scheduleVals.length, 'records');
