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

    console.log("Fetching employees...");
    const employees = await fetchJSON('/employees', token);

    const targetMonth = 2; // Feb
    const targetYear = 2026;

    console.log(`\nGenerating Payroll for Month ${targetMonth}, Year ${targetYear}...`);
    for (const emp of employees) {
        try {
            await fetchJSON(`/payrolls/generate?employeeId=${emp.id}&month=${targetMonth}&year=${targetYear}`, token, { method: 'POST' });
            console.log(`[SUCCESS] Generated payroll for ${emp.name} (ID: ${emp.id})`);
        } catch (e) {
            console.error(`[ERROR] Failed to generate payroll for ${emp.name} (ID: ${emp.id}): ${e.message}`);
        }
    }

    console.log("\nFetching generated payroll combinations...");
    const computedPayrolls = await fetchJSON(`/payrolls?month=${targetMonth}&year=${targetYear}`, token);
    console.log(`Retrieved ${computedPayrolls.length} finalized payroll reports for Feb 2026.`);

    if (computedPayrolls.length > 0) {
        const sample = computedPayrolls.find(p => p.employeeName === 'Hải Lâm') || computedPayrolls[0];
        console.log(`Sample Payroll -> Name: ${sample.employeeName}, Base Salary Total: ${sample.totalSalary}, Status: ${sample.status}`);
    }
}

run().catch(console.error);
