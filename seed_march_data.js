const fs = require('fs');

const employees = [70, 71, 72, 73, 74, 75, 76, 77, 78, 79];
const shifts = [
    { id: 59, pos: 18, start: '07:00:00', end: '11:00:00', hours: 4 },
    { id: 60, pos: 18, start: '14:00:00', end: '18:00:00', hours: 4 },
    { id: 61, pos: 18, start: '18:00:00', end: '22:30:00', hours: 4.5 },
    { id: 62, pos: 19, start: '06:00:00', end: '13:00:00', hours: 7 },
    { id: 63, pos: 19, start: '13:00:00', end: '18:00:00', hours: 5 },
    { id: 64, pos: 19, start: '18:00:00', end: '22:30:00', hours: 4.5 },
];

function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function formatDate(day) {
    return `2026-03-${day.toString().padStart(2, '0')}`;
}

const statusOptions = ['present', 'present', 'present', 'late', 'present'];

let sql = `
-- MAR 2026 DATA SEED
-- Clean up existing March data just in case
DELETE FROM revenues WHERE schedule_id IN (SELECT id FROM schedules WHERE work_date >= '2026-03-01' AND work_date < '2026-04-01');
DELETE FROM attendance WHERE check_in >= '2026-03-01' AND check_in < '2026-04-01';
DELETE FROM schedules WHERE work_date >= '2026-03-01' AND work_date < '2026-04-01';

-- Restore ID sequences to safely insert without collision
SELECT setval('schedules_id_seq', COALESCE((SELECT MAX(id) FROM schedules), 1));
SELECT setval('attendance_id_seq', COALESCE((SELECT MAX(id) FROM attendance), 1));

`;

for (let day = 1; day <= 31; day++) {
    const workDate = formatDate(day);
    // 5 random shifts per day
    const dayEmployees = [...employees].sort(() => 0.5 - Math.random()).slice(0, 5);

    for (const emp of dayEmployees) {
        const shift = randomItem(shifts);
        const stHours = parseInt(shift.start.split(':')[0]);
        const enHours = parseInt(shift.end.split(':')[0]) + (parseInt(shift.end.split(':')[1]) / 60);

        const status = randomItem(statusOptions);

        let inTime = ``;
        let outTime = ``;

        if (status === 'present') {
            inTime = `${workDate} ${stHours.toString().padStart(2, '0')}:05:00`;
            const outH = Math.floor(enHours);
            const outM = Math.floor((enHours - outH) * 60) + 5;
            outTime = `${workDate} ${outH.toString().padStart(2, '0')}:${outM.toString().padStart(2, '0')}:00`;
        } else if (status === 'late') {
            inTime = `${workDate} ${stHours.toString().padStart(2, '0')}:45:00`;
            const outH = Math.floor(enHours);
            const outM = Math.floor((enHours - outH) * 60) + 15;
            outTime = `${workDate} ${outH.toString().padStart(2, '0')}:${outM.toString().padStart(2, '0')}:00`;
        }

        sql += `
DO $$
DECLARE
    new_schedule_id integer;
BEGIN
    INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note)
    VALUES (${emp}, ${shift.id}, '${workDate}', NOW(), 'Seeded')
    RETURNING id INTO new_schedule_id;

    INSERT INTO attendance (schedule_id, employee_id, check_in, check_out, total_hours, created_at)
    VALUES (new_schedule_id, ${emp}, '${inTime}', '${outTime}', ${shift.hours}, NOW());
END $$;
`;
    }
}

fs.writeFileSync('seed_mar_attendance.sql', sql);
console.log('Seed script generated for March!');
