import fs from 'fs';

const API_BASE = 'http://localhost:5136/api';

async function fetchJSON(url, options = {}) {
    const res = await fetch(`${API_BASE}${url}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
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
    console.log("Fetching schedules for Monday, Feb 23...");
    const targetDate = "2026-02-23";
    const schedules = await fetchJSON(`/schedules?date=${targetDate}`);

    // Pick the first one (e.g., Vy in Pha chế or P.Khang in Phục vụ)
    if (schedules.length === 0) throw new Error("No schedules found for " + targetDate);

    // Pick one staff
    const targetSchedule = schedules[0];
    const scheduleId = targetSchedule.id;
    const staffName = targetSchedule.employeeName;
    const shiftName = targetSchedule.shiftName;

    console.log(`Selected Shift for Revenue Report: ${staffName} - ${shiftName} (ID: ${scheduleId})`);

    const revenuePayload = {
        scheduleId: scheduleId,
        openingBalance: 1500000,   // Assuming start with 1.5M VND
        cash: 3200000,             // Received 3.2M in cash
        bank: 5400000,             // Received 5.4M via transfer
        note: `End of shift report for ${staffName} simulated via script`
    };

    console.log(`\nSubmitting Revenue Report for Schedule ID ${scheduleId}...`);
    try {
        const response = await fetchJSON('/revenues', {
            method: 'POST',
            body: JSON.stringify(revenuePayload)
        });
        console.log("SUCCESS! Revenue reported:");
        console.log(`- Cash: ${response.cash}`);
        console.log(`- Bank: ${response.bank}`);
        console.log(`- Total: ${response.totalRevenue}`);
        console.log(`- Deviation: ${response.deviation}`);
    } catch (e) {
        console.error("Failed to submit revenue report:", e.message);
    }
}

run().catch(console.error);
