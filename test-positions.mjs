import fs from 'fs';

const API_BASE = 'http://localhost:5136/api';

async function login() {
    const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: '123456' })
    });
    if (!res.ok) throw new Error("Login failed");
    return res.json();
}

async function fetchJSON(url, token, options = {}) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}${url}`, { headers, ...options });

    if (res.status === 204) return null;

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

    const newPositionParams = {
        name: `Bảo vệ`,
        shifts: [
            { name: "Ca sáng", startTime: "06:00:00", endTime: "14:00:00", status: true, isEnabled: true },
            { name: "Ca tối", startTime: "14:00:00", endTime: "22:00:00", status: true, isEnabled: true }
        ]
    };

    console.log(`\n1. [CREATE] Adding new Position: ${newPositionParams.name} with 2 shifts`);
    // Create new Position
    await fetchJSON('/positions', token, {
        method: 'POST',
        body: JSON.stringify(newPositionParams)
    });

    // Fetch all to get the newly created position ID
    const allPositions = await fetchJSON('/positions', token);
    const newPos = allPositions.find(p => p.name === 'Bảo vệ');
    if (!newPos) throw new Error("Could not find created position!");
    const newPosId = newPos.id;
    console.log(`[SUCCESS] Created Position ID: ${newPosId}`);

    console.log(`\n2. [READ] Checking details for Position: ${newPos.name}`);
    console.log(`[SUCCESS] Shift Count: ${newPos.shifts ? newPos.shifts.length : 0} defined.`);

    console.log(`\n3. [UPDATE] Modifying Position - Adding Night Shift...`);
    const updateParams = {
        name: `Bảo vệ`, // Keep same name
        shifts: [
            { name: "Ca sáng", startTime: "06:00:00", endTime: "14:00:00", status: true, isEnabled: true },
            { name: "Ca tối", startTime: "14:00:00", endTime: "22:00:00", status: true, isEnabled: true },
            { name: "Ca đêm", startTime: "22:00:00", endTime: "06:00:00", status: true, isEnabled: true } // New
        ]
    };
    await fetchJSON(`/positions/${newPosId}`, token, {
        method: 'PUT',
        body: JSON.stringify(updateParams)
    });
    console.log(`[SUCCESS] Position updated successfully.`);

    // Read back to verify
    const updatedPositions = await fetchJSON('/positions', token);
    const updatedPos = updatedPositions.find(p => p.id === newPosId);
    console.log(`[VERIFY] New Shift Count: ${updatedPos.shifts.length} (Expected: 3)`);

    // console.log(`\n4. [DELETE] Soft-deleting/Removing position...`);
    // await fetchJSON(`/positions/${newPosId}`, token, { method: 'DELETE' });
    // console.log(`[SUCCESS] Position removed.`);

    // console.log(`\n5. [READ-ALL] Verifying deletion...`);
    // const finalPositions = await fetchJSON('/positions', token);
    // const stillActive = finalPositions.find(p => p.id === newPosId);
    // if (!stillActive) {
    //     console.log(`[SUCCESS] Position ${newPosId} no longer appears in active positions!`);
    // } else {
    //     console.error(`[ERROR] Position ${newPosId} is still present!`);
    // }
}

run().catch(console.error);
