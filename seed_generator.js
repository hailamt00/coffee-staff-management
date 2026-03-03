const fs = require('fs');

const employees = [
    { id: 70, name: 'Thanh Tu Edit' },
    { id: 71, name: 'Trịnh Hải Lâm' },
    { id: 72, name: 'Phương Ly' },
    { id: 73, name: 'Ngọc Hân' },
    { id: 74, name: 'Phạm Thị Vinh' },
    { id: 75, name: 'Phước Khang' },
    { id: 76, name: 'Trần Phú' },
    { id: 77, name: 'Nguyễn Nhật Phương Vy' },
    { id: 78, name: 'Gia Hân' },
    { id: 79, name: 'Thạch Nhất Khang' },
];

let sql = "DELETE FROM attendance;\n";
sql += "INSERT INTO attendance (employee_id, check_in, check_out, total_hours, note) VALUES\n";

const records = [];

// Generate for Feb 1 to Feb 28, 2026
for (let day = 1; day <= 28; day++) {
    const dateStr = `2026-02-${day.toString().padStart(2, '0')}`;

    // Each day, pick 5 random employees
    const workingEmps = [...employees].sort(() => 0.5 - Math.random()).slice(0, 5);

    for (const emp of workingEmps) {
        // Random shift: Morning (6-12), Afternoon (12-18), Night (18-22)
        const shiftType = Math.floor(Math.random() * 3);
        let startH, endH, startM, endM;
        if (shiftType === 0) { startH = 6; endH = 12; }
        else if (shiftType === 1) { startH = 12; endH = 18; }
        else { startH = 18; endH = 22; }

        startM = Math.floor(Math.random() * 15); // 0-14 mins
        endM = Math.floor(Math.random() * 30); // 0-29 mins

        const inTime = `${dateStr} ${startH.toString().padStart(2, '0')}:${startM.toString().padStart(2, '0')}:00`;
        const outTime = `${dateStr} ${endH.toString().padStart(2, '0')}:${endM.toString().padStart(2, '0')}:00`;

        const diff = endH - startH + ((endM - startM) / 60);

        const note = Math.random() > 0.85 ? "'[Admin added]'" : "NULL";

        records.push(`(${emp.id}, '${inTime}', '${outTime}', ${diff.toFixed(2)}, ${note})`);
    }
}

sql += records.join(",\n") + ";\n";

fs.writeFileSync('seed_feb_attendance.sql', sql);
console.log("Seed script generated.");
