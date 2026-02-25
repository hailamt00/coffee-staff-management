const fs = require('fs');
const { Client } = require('pg');

const raw = fs.readFileSync('raw_attendance.txt', 'utf8');
const lines = raw.split('\n').filter(l => l.trim().length > 0);

const employees = {}; // key: phone
const attendances = [];

lines.forEach(line => {
    const parts = line.split('\t');
    if (parts.length < 6) return;

    const date = parts[1].trim();
    const name = parts[2].trim();
    const phone = parts[3].trim();
    const rawPosition = parts[4].trim();
    const start = parts[5] ? parts[5].trim() : null;
    let end = parts.length > 6 && parts[6] ? parts[6].trim() : null;
    let diff = parts.length > 7 && parts[7] ? parts[7].trim() : null;
    let note = parts.length > 8 && parts[8] ? parts[8].trim() : null;

    if (end === '') end = null;
    if (diff === '') diff = null;
    if (note === '') note = null;

    let position = 'Phục vụ';
    if (rawPosition.toLowerCase().includes('pha chế')) {
        position = 'Pha chế';
    } else if (rawPosition.toLowerCase().includes('phục vụ')) {
        position = 'Phục vụ';
    }

    let shiftName = 'Ca Sáng';
    if (start) {
        const hour = parseInt(start.split(':')[0], 10);
        if (hour >= 6 && hour <= 12) {
            shiftName = 'Ca Sáng';
        } else if (hour > 12 && hour <= 17) {
            shiftName = 'Ca Chiều';
        } else if (hour > 17) {
            shiftName = 'Ca Tối';
        }
    } else {
        if (rawPosition.toLowerCase().includes('sáng')) shiftName = 'Ca Sáng';
        else if (rawPosition.toLowerCase().includes('chiều')) shiftName = 'Ca Chiều';
        else if (rawPosition.toLowerCase().includes('tối')) shiftName = 'Ca Tối';
    }

    if (!employees[phone]) employees[phone] = { name, phone };
    attendances.push({ date, name, phone, position, shiftName, start, end, diff, note });
});

async function seed() {
    const client = new Client({
        connectionString: 'postgresql://csm_user:123456@localhost:5432/csm_db'
    });
    await client.connect();

    try {
        await client.query(`DELETE FROM transactions`);
        await client.query(`DELETE FROM revenues`);
        await client.query(`DELETE FROM payroll_details`);
        await client.query(`DELETE FROM payrolls`);
        await client.query(`DELETE FROM attendance`);
        await client.query(`DELETE FROM schedule_requests`);
        await client.query(`DELETE FROM schedules`);
        await client.query(`DELETE FROM shifts`);
        await client.query(`DELETE FROM positions`);

        const positionNames = ['Phục vụ', 'Pha chế'];
        const shiftData = [
            { name: 'Ca Sáng', start: '06:00', end: '12:00' },
            { name: 'Ca Chiều', start: '12:00', end: '18:00' },
            { name: 'Ca Tối', start: '18:00', end: '23:00' }
        ];

        for (const p of positionNames) {
            await client.query(`
                INSERT INTO positions (name, status)
                SELECT $1::varchar, true WHERE NOT EXISTS (SELECT 1 FROM positions WHERE name = $1::varchar)
            `, [p]);

            for (const s of shiftData) {
                await client.query(`
                    INSERT INTO shifts (name, start_time, end_time, position_id, is_enabled)
                    SELECT $1::varchar, $2::time, $3::time, id, true FROM positions WHERE name = $4::varchar
                    AND NOT EXISTS (SELECT 1 FROM shifts WHERE name = $1::varchar AND position_id = positions.id)
                `, [s.name, s.start, s.end, p]);
            }
        }

        let empCode = 1000;
        for (const e of Object.values(employees)) {
            empCode++;
            await client.query(`
                INSERT INTO employees (code, name, phone, gender, service_salary, barista_salary, hire_date, created_at, status)
                SELECT $1::varchar, $2::varchar, $3::varchar, 'Other', 20000, 25000, '2025-01-01', NOW(), true
                WHERE NOT EXISTS (SELECT 1 FROM employees WHERE phone = $3::varchar)
            `, [`NV${empCode}`, e.name, e.phone]);
        }

        for (const a of attendances) {
            const schedRes = await client.query(`
                WITH inserted_sched AS (
                    INSERT INTO schedules (employee_id, shift_id, work_date, note)
                    SELECT e.id, s.id, $1::date, $2::varchar
                    FROM employees e 
                    JOIN shifts s ON s.name = $3::varchar 
                    JOIN positions p ON p.id = s.position_id AND p.name = $4::varchar
                    WHERE e.phone = $5::varchar
                    RETURNING id, employee_id
                )
                SELECT id, employee_id FROM inserted_sched;
            `, [a.date, a.note || null, a.shiftName, a.position, a.phone]);

            if (schedRes.rows.length > 0) {
                const schedId = schedRes.rows[0].id;
                const empId = schedRes.rows[0].employee_id;

                let checkIn = a.start ? `${a.date} ${a.start}:00` : null;
                let checkOut = a.end ? `${a.date} ${a.end}:00` : null;

                await client.query(`
                    INSERT INTO attendance (employee_id, schedule_id, check_in, check_out, note, total_hours, created_at)
                    VALUES ($1, $2, $3, $4, $5, $6, NOW())
                `, [empId, schedId, checkIn, checkOut, a.note || null, a.diff || null]);
            }
        }

        console.log('Seed completed successfully via pg driver!');
    } catch (err) {
        console.error('Error during seeding:', err);
    } finally {
        await client.end();
    }
}

seed();
