import fs from 'fs';

const API_BASE = 'http://localhost:5136/api';

async function login() {
    const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ username: 'admin', password: '123456' })
    });
    if (!res.ok) throw new Error("Login failed");
    return res.json();
}

async function fetchJSON(url, token, options = {}) {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}${url}`, {
        headers,
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
    console.log("Logging in as Admin to get token...");
    const loginResponse = await login();
    const token = loginResponse.token;

    console.log("Fetching existing Adjustment Types...");
    let types = await fetchJSON('/rewardspenalties/types', token);

    let bonusType = types.find(t => t.type.toLowerCase() === 'reward');
    let penaltyType = types.find(t => t.type.toLowerCase() === 'penalty');

    if (!bonusType) {
        console.log("No Bonus type found, creating one...");
        const id = await fetchJSON('/rewardspenalties/types', token, {
            method: 'POST',
            body: JSON.stringify({ name: "Outstanding Service Bonus", type: 1 })
        });
        bonusType = { id, name: "Outstanding Service Bonus", type: 'Reward' };
    }

    if (!penaltyType) {
        console.log("No Penalty type found, creating one...");
        const id = await fetchJSON('/rewardspenalties/types', token, {
            method: 'POST',
            body: JSON.stringify({ name: "Late Arrival Fine", type: 2 })
        });
        penaltyType = { id, name: "Late Arrival Fine", type: 'Penalty' };
    }

    console.log("Fetching employees...");
    const employees = await fetchJSON('/employees', token);
    const targetEmp1 = employees.find(e => e.name.includes("Lâm")) || employees[0];
    const targetEmp2 = employees[1];

    console.log(`\nApplying Adjustments...`);

    // Apply Bonus
    try {
        await fetchJSON('/rewardspenalties/apply', token, {
            method: 'POST',
            body: JSON.stringify({ employeeId: targetEmp1.id, typeId: bonusType.id, amount: 500000 })
        });
        console.log(`[SUCCESS] Applied 500,000 VND Bonus (${bonusType.name}) to ${targetEmp1.name}`);
    } catch (e) { console.error("Bonus Error:", e.message); }

    // Apply Penalty
    try {
        await fetchJSON('/rewardspenalties/apply', token, {
            method: 'POST',
            body: JSON.stringify({ employeeId: targetEmp2.id, typeId: penaltyType.id, amount: 150000 })
        });
        console.log(`[SUCCESS] Applied 150,000 VND Penalty (${penaltyType.name}) to ${targetEmp2.name}`);
    } catch (e) { console.error("Penalty Error:", e.message); }
}

run().catch(console.error);
