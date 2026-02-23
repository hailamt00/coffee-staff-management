import fs from 'fs';

const API_BASE = 'http://localhost:5136/api';

async function fetchJSON(url, options = {}) {
    const res = await fetch(`${API_BASE}${url}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options
    });
    if (!res.ok) {
        const err = await res.text();
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

    // Define schedule data
    const dates = [
        "2026-02-23", // T2
        "2026-02-24", // T3
        "2026-02-25", // T4
        "2026-02-26", // T5
        "2026-02-27", // T6
        "2026-02-28", // T7
        "2026-03-01", // CN
    ];

    const phucVuSchedule = [
        { d: 0, s: 'Ca sáng', e: ['P.Khang'] },
        { d: 0, s: 'Ca tối', e: ['Ly'] },
        { d: 1, s: 'Ca sáng', e: ['Tú'] },
        { d: 1, s: 'Ca tối', e: ['Lâm'] },
        { d: 2, s: 'Ca sáng', e: ['P.Khang'] },
        { d: 2, s: 'Ca tối', e: ['Ly'] },
        { d: 3, s: 'Ca sáng', e: ['P.Khang'] },
        { d: 3, s: 'Ca tối', e: ['P.Khang'] }, // User said P.Khang, PKhang twice? "Tối : P.Khang"
        { d: 4, s: 'Ca sáng', e: ['P.Khang'] },
        { d: 4, s: 'Ca tối', e: ['P.Khang'] },
        { d: 5, s: 'Ca sáng', e: ['Ly', 'P.Khang'] },
        { d: 5, s: 'Ca chiều', e: ['P.Khang'] },
        { d: 5, s: 'Ca tối', e: ['Ly'] },
        { d: 6, s: 'Ca sáng', e: ['Ly', 'P.Khang'] },
        { d: 6, s: 'Ca chiều', e: ['Ly'] },
        { d: 6, s: 'Ca tối', e: ['P.Khang'] },
    ];

    const phaCheSchedule = [
        { d: 0, s: 'Ca sáng', e: ['Vy'] },
        { d: 0, s: 'Ca chiều', e: ['Vy'] },
        { d: 0, s: 'Ca tối', e: ['Lâm'] },
        { d: 1, s: 'Ca sáng', e: ['Vy'] },
        { d: 1, s: 'Ca chiều', e: ['N.Khang'] },
        { d: 1, s: 'Ca tối', e: ['Vy'] },
        { d: 2, s: 'Ca sáng', e: ['Vy'] },
        { d: 2, s: 'Ca chiều', e: ['N.Khang'] },
        { d: 2, s: 'Ca tối', e: ['Lâm'] },
        { d: 3, s: 'Ca sáng', e: ['Vy'] },
        { d: 3, s: 'Ca chiều', e: ['Vy'] },
        { d: 3, s: 'Ca tối', e: ['Lâm'] },
        { d: 4, s: 'Ca sáng', e: ['Vy'] },
        { d: 4, s: 'Ca chiều', e: ['N.Khang'] },
        { d: 4, s: 'Ca tối', e: ['Lâm'] },
        { d: 5, s: 'Ca sáng', e: ['Tú'] },
        { d: 5, s: 'Ca chiều', e: ['Vy'] },
        { d: 5, s: 'Ca tối', e: ['Vy'] },
        { d: 6, s: 'Ca sáng', e: ['Tú', 'Lâm'] },
        { d: 6, s: 'Ca chiều', e: ['Vy'] },
        { d: 6, s: 'Ca tối', e: ['Vy'] },
    ];

    const allRequests = [];
    for (const req of phucVuSchedule) {
        for (const empKey of req.e) {
            allRequests.push({
                employeeId: empMap[empKey].id,
                shiftId: getShiftId(phucVuId, req.s),
                workDate: dates[req.d],
                note: "Phục vụ Sync"
            });
        }
    }
    for (const req of phaCheSchedule) {
        for (const empKey of req.e) {
            allRequests.push({
                employeeId: empMap[empKey].id,
                shiftId: getShiftId(phaCheId, req.s),
                workDate: dates[req.d],
                note: "Pha chế Sync"
            });
        }
    }

    console.log(`Submitting ${allRequests.length} schedule requests (Simulating Staff)...`);
    for (const req of allRequests) {
        await fetchJSON('/schedules/request', {
            method: 'POST',
            body: JSON.stringify(req)
        });
        process.stdout.write('.');
    }
    console.log(`\nSuccessfully submitted ${allRequests.length} requests.`);

    console.log("Fetching pending schedule requests (Simulating Admin)...");
    const adminRequestsResponse = await fetchJSON('/schedules/requests/weekly?fromDate=2026-02-23&toDate=2026-03-01');
    const pendingIds = adminRequestsResponse.filter(r => r.status === 'pending').map(r => r.requestId || r.id);

    console.log(`Found ${pendingIds.length} pending requests. Approving them...`);
    for (const id of pendingIds) {
        if (!id) continue;
        try {
            await fetchJSON('/schedules/approve', {
                method: 'POST',
                body: JSON.stringify({ requestId: id, isApproved: true, approvedBy: 1 })
            });
            process.stdout.write('+');
        } catch (e) {
            console.error(`\nFailed on id ${id}: ${e.message}`);
        }
    }
    console.log("\nAll requests approved successfully! Schedule synchronized.");
}

run().catch(console.error);
