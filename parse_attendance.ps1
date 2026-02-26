
$idMap = @{
    "Thanh Tú"              = 70
    "Trịnh Hải Lâm"         = 71
    "Phương Ly"             = 72
    "Ngọc Hân"              = 73
    "Phạm Thị Vinh"         = 74
    "Phước Khang"           = 75
    "Trần Phú"              = 76
    "Nguyễn Nhật Phương Vy" = 77
    "Gia Hân"               = 78
    "Thạch Nhất Khang"      = 79
}

$rawData = @"
1	2026-02-26	Thạch Nhất Khang	0777751896	Pha chế	15:01				
2	2026-02-26	Phước Khang	0855224187	Phục vụ	14:04	15:21	1.28		
3	2026-02-26	Phước Khang	0855224187	Phục vụ	06:36	10:47	4.18		
4	2026-02-26	Nguyễn Nhật Phương Vy	0901823105	Pha chế	06:09	14:09	7.98		
5	2026-02-25	Trịnh Hải Lâm	0398413786	Pha chế	18:10	22:50	4.67	[Admin added]	
6	2026-02-25	Phương Ly	0896869903	Phục vụ	17:56	22:50	4.88		
7	2026-02-25	Thạch Nhất Khang	0777751896	Pha chế	12:20	18:25	6.08		
8	2026-02-25	Phước Khang	0855224187	Phục vụ	06:37	11:02	4.40		
9	2026-02-25	Nguyễn Nhật Phương Vy	0901823105	Pha chế	06:25	12:20	5.90		
10	2026-02-24	Thạch Nhất Khang	0777751896	Pha chế	13:04				
11	2026-02-24	Nguyễn Nhật Phương Vy	0901823105	Pha chế	06:42	13:10	6.45		
12	2026-02-23	Trịnh Hải Lâm	0398413786	Pha chế	18:40	22:50	4.15	[Admin Edited]	
13	2026-02-23	Phương Ly	0896869903	Phục vụ	17:53	22:48	4.92		
14	2026-02-23	Phước Khang	0855224187	Phục vụ	06:39	11:26	4.77		
15	2026-02-23	Nguyễn Nhật Phương Vy	0901823105	Pha chế	06:31				
16	2026-02-22	Phước Khang	0855224187	Phục vụ	06:35	12:24	5.80		
17	2026-02-22	Phương Ly	0896869903	Phục vụ	06:05	13:52	7.77		
18	2026-02-22	Thanh Tú	0765457988	Pha chế	06:00	13:00	7.00	[Admin added]	
19	2026-02-21	Thạch Nhất Khang	0777751896	Pha chế	07:14	12:38	5.38		
20	2026-02-21	Phước Khang	0855224187	Phục vụ	06:47	12:37	5.83		
21	2026-02-20	Phương Ly	0896869903	Phục vụ	06:40	12:09	5.48		
22	2026-02-20	Thạch Nhất Khang	0777751896	Pha chế	06:06	12:25	6.30		
23	2026-02-19	Phương Ly	0896869903	Phục vụ	06:35	12:51	6.27		
24	2026-02-19	Thanh Tú	0765457988	Pha chế	06:00	12:00	6.00	[Admin added]	
25	2026-02-18	Phương Ly	0896869903	Phục vụ	06:38	12:28	5.82		
26	2026-02-18	Thanh Tú	0765457988	Pha chế	06:00	12:00	6.00	[Admin added]	
27	2026-02-17	Phương Ly	0896869903	Phục vụ	06:40				
28	2026-02-17	Thanh Tú	0765457988	Pha chế	06:00	12:00	6.00	[Admin added]	
29	2026-02-16	Phương Ly	0896869903	Phục vụ	18:40	21:28	2.78		
30	2026-02-16	Phước Khang	0855224187	Phục vụ	06:33	12:23	5.83		
31	2026-02-16	Thanh Tú	0765457988	Pha chế	06:00	19:00	13.00	[Admin Edited]	
32	2026-02-15	Thanh Tú	0765457988	Pha chế	19:00	22:30	3.50	[Admin added]	
33	2026-02-15	Phước Khang	0855224187	Phục vụ	18:07	22:32	4.40		
34	2026-02-15	Thạch Nhất Khang	0777751896	Pha chế	13:30	19:00	5.50	[Admin Edited]	
35	2026-02-15	Phước Khang	0855224187	Phục vụ	09:05	11:15	2.15		
36	2026-02-15	Phương Ly	0896869903	Phục vụ	06:30	18:00	11.48	[Admin Edited]	
37	2026-02-14	Phước Khang	0855224187	Phục vụ	22:36	22:53	0.28		
38	2026-02-14	Trịnh Hải Lâm	0398413786	Pha chế	18:14	22:36	4.35		
39	2026-02-14	Phương Ly	0896869903	Phục vụ	14:19	18:06	3.78		
40	2026-02-14	Thạch Nhất Khang	0777751896	Pha chế	13:05	18:26	5.35		
41	2026-02-14	Phương Ly	0896869903	Phục vụ	06:35	11:03	4.47		
42	2026-02-13	Trịnh Hải Lâm	0398413786	Pha chế	18:26	22:45	4.30		
43	2026-02-13	Phương Ly	0896869903	Pha chế	13:07	18:32	5.40		
44	2026-02-13	Phước Khang	0855224187	Phục vụ	06:39	11:00	4.33		
45	2026-02-13	Thạch Nhất Khang	0777751896	Pha chế	06:03				
46	2026-02-12	Phương Ly	0896869903	Phục vụ	18:05	22:33	4.45		
47	2026-02-12	Trịnh Hải Lâm	0398413786	Pha chế	18:01	22:35	4.55	[Admin Edited]	
48	2026-02-12	Phương Ly	0896869903	Pha chế	13:08	18:05	4.95		
49	2026-02-12	Phước Khang	0855224187	Phục vụ	06:38	11:05	4.43		
50	2026-02-12	Nguyễn Nhật Phương Vy	0901823105	Pha chế	06:16	13:11	6.90		
51	2026-02-11	Trịnh Hải Lâm	0398413786	Pha chế	18:00	20:30	2.50	[Admin added]	
52	2026-02-11	Phương Ly	0896869903	Phục vụ	06:34	10:48	4.22		
53	2026-02-11	Nguyễn Nhật Phương Vy	0901823105	Pha chế	06:21	18:00	11.63		
54	2026-02-10	Trịnh Hải Lâm	0398413786	Pha chế	18:32	22:00	3.45	[Admin Edited]	
55	2026-02-10	Thạch Nhất Khang	0777751896	Pha chế	06:31	11:10	4.63		
56	2026-02-10	Nguyễn Nhật Phương Vy	0901823105	Pha chế	06:17	18:31	12.23		
57	2026-02-09	Trịnh Hải Lâm	0398413786	Pha chế	18:00	22:06	4.10	[Admin added]	
58	2026-02-09	Phương Ly	0896869903	Phục vụ	17:54	22:06	4.18		
59	2026-02-09	Nguyễn Nhật Phương Vy	0901823105	Pha chế	12:09	18:06	5.93		
60	2026-02-09	Thạch Nhất Khang	0777751896	Pha chế	06:34	12:10	5.60		
61	2026-02-09	Phương Ly	0896869903	Phục vụ	06:28	11:53	5.40		
62	2026-02-08	Nguyễn Nhật Phương Vy	0901823105	Pha chế	18:49	21:55	3.08		
63	2026-02-08	Thạch Nhất Khang	0777751896	Phục vụ	17:53	21:55	4.02		
64	2026-02-08	Phương Ly	0896869903	Phục vụ	08:00	18:48	10.80		
65	2026-02-08	Phước Khang	0855224187	Phục vụ	06:40	12:08	5.45		
66	2026-02-08	Trịnh Hải Lâm	0398413786	Pha chế	06:20	13:30	7.17	[Admin added]	
67	2026-02-07	Phước Khang	0855224187	Phục vụ	18:07	21:42	3.57		
68	2026-02-07	Thạch Nhất Khang	0777751896	Phục vụ	13:58	17:26	3.47		
69	2026-02-07	Nguyễn Nhật Phương Vy	0901823105	Pha chế(Thử việc)	13:14	21:41	8.43		
70	2026-02-07	Phước Khang	0855224187	Phục vụ	06:37	11:04	4.45		
71	2026-02-06	Trần Phú	0766250207	Phục vụ	19:08	22:23	3.25		
72	2026-02-06	Trịnh Hải Lâm	0398413786	Pha chế	18:30	23:30	5.00	[Admin added]	
73	2026-02-06	Gia Hân	0915778422	Phục vụ	06:55	11:18	4.37		
74	2026-02-06	Ngọc Hân	0942511614	Pha chế	06:12	12:30	6.30		
75	2026-02-05	Trần Phú	0766250207	Phục vụ	19:24	23:00	3.60		
76	2026-02-05	Trịnh Hải Lâm	0398413786	Pha chế	18:00	23:00	4.98	[Admin Edited]	
77	2026-02-05	Nguyễn Nhật Phương Vy	0901823105	Pha chế	13:14	18:14	5.00		
78	2026-02-05	Phước Khang	0855224187	Phục vụ	06:38	11:01	4.37		
79	2026-02-05	Ngọc Hân	0942511614	Pha chế	06:05	13:21	7.25		
80	2026-02-04	Phương Ly	0896869903	Phục vụ	18:33	22:52	4.32		
81	2026-02-04	Gia Hân	0915778422	Phục vụ	18:03	23:21	5.28		
82	2026-02-04	Nguyễn Nhật Phương Vy	0901823105	Pha chế	13:11	18:33	5.37		
83	2026-02-04	Phạm Thị Vinh	0919495106	Phục vụ	06:27	11:00	4.53	[Admin Edited]	
84	2026-02-04	Ngọc Hân	0942511614	Pha chế	06:00	13:25	7.42		
85	2026-02-03	Trần Phú	0766250207	Phục vụ	18:56	22:47	3.85		
86	2026-02-03	Trịnh Hải Lâm	0398413786	Pha chế	18:30	22:45	4.25	[Admin added]	
87	2026-02-03	Nguyễn Nhật Phương Vy	0901823105	Pha chế	13:25	18:46	5.35		
88	2026-02-03	Phạm Thị Vinh	0919495106	Phục vụ	06:27	11:09	4.68		
89	2026-02-03	Ngọc Hân	0942511614	Pha chế	05:59	13:17	7.30		
90	2026-02-02	Trịnh Hải Lâm	0398413786	Pha chế	18:04	22:32	4.45		
91	2026-02-02	Phương Ly	0896869903	Phục vụ	17:59	22:33	4.57		
92	2026-02-02	Ngọc Hân	0942511614	Pha chế	12:03	18:05	6.02		
93	2026-02-02	Ngọc Hân	0942511614	Phục vụ	06:32	11:00	4.45		
94	2026-02-02	Nguyễn Nhật Phương Vy	0901823105	Pha chế	06:18	12:01	5.72		
95	2026-02-01	Nguyễn Nhật Phương Vy	0901823105	Pha chế	14:15	22:10	7.92		
96	2026-02-01	Phương Ly	0896869903	Phục vụ	13:37	22:16	8.63		
97	2026-02-01	Phạm Thị Vinh	0919495106	Phục vụ	06:34	11:35	5.00		
98	2026-02-01	Trịnh Hải Lâm	0398413786	Pha chế	06:20	14:00	7.67	[Admin added]	
99	2026-02-01	Thanh Tú	0765457988	Pha chế	06:20	14:00	7.67	[Admin added]	
"@

$sqlFile = "d:\GitHub\coffee-staff-management\import_attendance.sql"
$output = "-- Attendance Data Import`nBEGIN;`nTRUNCATE TABLE attendance CASCADE;`nTRUNCATE TABLE schedules CASCADE;`n"

$lines = $rawData.Split("`n")
foreach ($line in $lines) {
    if ([string]::IsNullOrWhiteSpace($line)) { continue }
    $parts = $line.Split("`t")
    if ($parts.Length -lt 6) { continue }
    
    $idx = $parts[0].Trim()
    $date = $parts[1].Trim()
    $name = $parts[2].Trim()
    $phone = $parts[3].Trim()
    $checkInTime = $parts[5].Trim()
    
    $checkOutTime = ""
    if ($parts.Length -gt 6) { $checkOutTime = $parts[6].Trim() }
    
    $diff = ""
    if ($parts.Length -gt 7) { $diff = $parts[7].Trim() }
    
    $note = ""
    if ($parts.Length -gt 8) { $note = $parts[8].Trim() }
    
    $empId = $idMap[$name]
    if (-not $empId) { continue }
    
    $isPhaChe = ($parts[4] -like "*Pha chế*")
    $checkInTimeObj = [DateTime]::Parse($checkInTime)
    $hour = $checkInTimeObj.Hour
    
    $shiftId = 0
    if ($isPhaChe) {
        if ($hour -lt 11) { $shiftId = 62 } # Sáng Pha chế
        elseif ($hour -lt 17) { $shiftId = 63 } # Chiều Pha chế
        else { $shiftId = 64 } # Tối Pha chế
    }
    else {
        if ($hour -lt 11) { $shiftId = 59 } # Sáng Phục vụ
        elseif ($hour -lt 14) { $shiftId = 60 } # Chiều Phục vụ (starting point)
        elseif ($hour -lt 17) { $shiftId = 60 } # Chiều Phục vụ
        else { $shiftId = 61 } # Tối Phục vụ
    }
    
    $checkInTs = "'$($date) $($checkInTime):00'"
    
    $checkOutTs = "NULL"
    if (-not [string]::IsNullOrWhiteSpace($checkOutTime)) {
        $checkOutTs = "'$($date) $($checkOutTime):00'"
    }
    
    $diffVal = "NULL"
    if (-not [string]::IsNullOrWhiteSpace($diff)) {
        $diffVal = $diff
    }
    
    $noteVal = "NULL"
    if (-not [string]::IsNullOrWhiteSpace($note)) {
        $noteVal = "'$($note.Replace("'", "''"))'"
    }
    
    # Use CTE to insert both schedule and attendance at once
    $output += "WITH ins_sch AS (INSERT INTO schedules (employee_id, shift_id, work_date, approved_at) VALUES ($empId, $shiftId, '$date', NOW()) RETURNING id) "
    $output += "INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, note) SELECT id, $empId, $checkInTs, $checkOutTs, $diffVal, $noteVal FROM ins_sch;`n"
}

$output += "COMMIT;"
$output | Out-File -FilePath $sqlFile -Encoding utf8
Write-Host "SUCCESS: SQL script generated at $sqlFile"
