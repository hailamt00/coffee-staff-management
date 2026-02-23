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

    if (res.status === 204) return null; // NoContent

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
    const { token } = await login();

    const timestamp = Date.now();
    const phone = `0${timestamp.toString().slice(-9)}`; // Generate unique 10-digit phone

    const newEmployeeParams = {
        name: `Test Employee ${timestamp}`,
        phone: phone,
        cid: "000111222333",
        gender: 1, // Male
        serviceSalary: 25000,
        baristaSalary: 30000,
        dob: "1995-05-15",
        hireDate: new Date().toISOString().split('T')[0]
    };

    console.log(`\n1. [CREATE] Adding new employee: ${newEmployeeParams.name} (${phone})`);
    await fetchJSON('/employees', token, {
        method: 'POST',
        body: JSON.stringify(newEmployeeParams)
    });

    // The endpoint returns CreatedAtAction with null body. Fetch all to find the new ID.
    const allEmps = await fetchJSON('/employees', token);
    const newEmpId = allEmps.find(e => e.phone === phone).id;

    console.log(`[SUCCESS] Created Employee ID: ${newEmpId}`);

    console.log(`\n2. [READ] Fetching employee details for ID: ${newEmpId}`);
    const empDetails = await fetchJSON(`/employees/${newEmpId}`, token);
    console.log(`[SUCCESS] Fetched: ${empDetails.name}, Barista Salary: ${empDetails.baristaSalary}`);

    console.log(`\n3. [UPDATE] Modifying employee salaries...`);
    const updateParams = {
        id: newEmpId,
        name: empDetails.name,
        phone: empDetails.phone,
        cid: empDetails.cid,
        gender: empDetails.gender === 'Male' ? 1 : (empDetails.gender === 'Female' ? 2 : 0),
        serviceSalary: 28000, // Raised from 25000
        baristaSalary: 35000, // Raised from 30000
        dob: empDetails.dob,
        hireDate: empDetails.hireDate
    };
    await fetchJSON(`/employees/${newEmpId}`, token, {
        method: 'PUT',
        body: JSON.stringify(updateParams)
    });
    console.log(`[SUCCESS] Employee updated successfully.`);

    // Verify update
    const updatedEmpDetails = await fetchJSON(`/employees/${newEmpId}`, token);
    console.log(`[VERIFY] New Barista Salary: ${updatedEmpDetails.baristaSalary} (Expected: 35000)`);

    console.log(`\n4. [DELETE] Soft-deleting employee...`);
    await fetchJSON(`/employees/${newEmpId}`, token, { method: 'DELETE' });
    console.log(`[SUCCESS] Employee soft-deleted.`);

    console.log(`\n5. [READ-ALL] Fetching all active employees...`);
    const allActive = await fetchJSON('/employees', token);
    const stillActive = allActive.find(e => e.id === newEmpId);
    if (!stillActive) {
        console.log(`[SUCCESS] Employee ${newEmpId} no longer appears in active list!`);
    } else {
        console.error(`[ERROR] Employee ${newEmpId} is still active!`);
    }
}

run().catch(console.error);
