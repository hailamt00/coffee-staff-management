const http = require('http');

const payload = JSON.stringify({
    employeeId: 77, // Phương Vy
    shiftId: 62, // Sáng
    workDate: '2026-03-02',
    simulatedNow: '2026-03-02T18:03:00'
});

const options = {
    hostname: '127.0.0.1',
    port: 5136,
    path: '/api/attendance/check-out',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': payload.length
    }
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.write(payload);
req.end();
