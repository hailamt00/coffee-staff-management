import fs from 'fs';

const API_BASE = 'http://localhost:5136/api';

async function fetchJSON(url, options = {}) {
    const res = await fetch(`${API_BASE}${url}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options
    });
    if (!res.ok) {
        let err;
        try { err = await res.text(); } catch { err = res.statusText; }
        throw new Error(`Failed ${url}: ${err}`);
    }
    const text = await res.text();
    try { return JSON.parse(text); } catch { return text; }
}

async function run() {
    console.log("Fetching employees...");
    const employees = await fetchJSON('/employees');

    console.log("Fetching positions and shifts...");
    const positions = await fetchJSON('/positions');

    const empMap = {
        'Tú': employees.find(e => e.name.includes('Tú')),
        'Lâm': employees.find(e => e.name.includes('Lâm')),
        'Ly': employees.find(e => e.name.includes('Ly')),
        'P.Khang': employees.find(e => e.name.includes('Phước Khang')),
        'Vy': employees.find(e => e.name.includes('Vy')),
        'N.Khang': employees.find(e => e.name.includes('Nhất Khang')),
    };

    const phucVuId = positions.find(p => p.name === 'Phục vụ')?.id;
    const phaCheId = positions.find(p => p.name === 'Pha chế')?.id;

    if (!phucVuId || !phaCheId) throw new Error("Could not find positions");

    const getShiftId = (posId, name) => {
        const pos = positions.find(p => p.id === posId);
        return pos.shifts.find(s => s.name === name)?.id;
    };

    // We will just test Monday, Feb 23 to demonstrate attendance functionality
    const targetDate = "2026-02-23";

    const mondaySchedule = [
        // Phục vụ
        { s: 'Ca sáng', posId: phucVuId, e: ['P.Khang'] },
        { s: 'Ca tối', posId: phucVuId, e: ['Ly'] },
        // Pha chế
        { s: 'Ca sáng', posId: phaCheId, e: ['Vy'] },
        { s: 'Ca chiều', posId: phaCheId, e: ['Vy'] },
        { s: 'Ca tối', posId: phaCheId, e: ['Lâm'] }
    ];

    const todayShifts = [];
    for (const req of mondaySchedule) {
        for (const empKey of req.e) {
            todayShifts.push({
                employeeId: empMap[empKey].id,
                shiftId: getShiftId(req.posId, req.s),
                workDate: targetDate
            });
        }
    }

    console.log(`\nSimulating CHECK-IN for ${todayShifts.length} assigned shifts on ${targetDate}...`);
    for (const shift of todayShifts) {
        try {
            await fetchJSON('/attendance/check-in', {
                method: 'POST',
                body: JSON.stringify(shift)
            });
            process.stdout.write('+');
        } catch (e) {
            console.error(`\nCheck-In Failed for Emp ${shift.employeeId} Shift ${shift.shiftId}: ${e.message}`);
        }
    }

    console.log(`\n\nSimulating CHECK-OUT for ${todayShifts.length} assigned shifts on ${targetDate}...`);
    for (const shift of todayShifts) {
        try {
            await fetchJSON('/attendance/check-out', {
                method: 'POST',
                body: JSON.stringify(shift)
            });
            process.stdout.write('+');
        } catch (e) {
            console.error(`\nCheck-Out Failed for Emp ${shift.employeeId} Shift ${shift.shiftId}: ${e.message}`);
        }
    }

    console.log("\n\nFetching final attendance records for Admin Validation...");
    const records = await fetchJSON(`/attendance?date=${targetDate}`);
    console.log(`Retrieved ${records.length} attendance records for ${targetDate}.`);
    if (records.length > 0) {
        console.log("Sample Record:", records[0].employeeName, records[0].status, `Hours: ${records[0].totalHours}`);
    }
}

run().catch(console.error);
