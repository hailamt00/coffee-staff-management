const fs = require('fs');

const records = [
    // Phục vụ
    // T4
    { date: '2026-03-04', shift: 59, emp: 78 }, // Gia Hân
    { date: '2026-03-04', shift: 61, emp: 72 }, // Phương Ly
    // T5
    { date: '2026-03-05', shift: 59, emp: 78 }, // Gia Hân
    { date: '2026-03-05', shift: 61, emp: 75 }, // Phước Khang
    // T6
    { date: '2026-03-06', shift: 59, emp: 76 }, // Trần Phú
    { date: '2026-03-06', shift: 61, emp: 76 }, // Trần Phú
    // T7
    { date: '2026-03-07', shift: 59, emp: 75 }, // Phước Khang
    { date: '2026-03-07', shift: 61, emp: 72 }, // Phương Ly
    // CN
    { date: '2026-03-08', shift: 59, emp: 76, note: '6h30' }, // Trần Phú
    { date: '2026-03-08', shift: 59, emp: 72, note: '8h00' }, // Phương Ly
    { date: '2026-03-08', shift: 61, emp: 76 }, // Trần Phú

    // Pha chế
    // T4
    { date: '2026-03-04', shift: 62, emp: 77 }, // Phương Vy
    { date: '2026-03-04', shift: 63, emp: 79 }, // Nhất Khang
    { date: '2026-03-04', shift: 64, emp: 71 }, // Trịnh Hải Lâm
    // T5
    { date: '2026-03-05', shift: 62, emp: 77 }, // Phương Vy
    { date: '2026-03-05', shift: 63, emp: 77 }, // Phương Vy
    { date: '2026-03-05', shift: 64, emp: 71 }, // Trịnh Hải Lâm
    // T6
    { date: '2026-03-06', shift: 62, emp: 77 }, // Phương Vy
    { date: '2026-03-06', shift: 63, emp: 79 }, // Nhất Khang
    { date: '2026-03-06', shift: 64, emp: 71 }, // Trịnh Hải Lâm
    // T7
    { date: '2026-03-07', shift: 62, emp: 70 }, // Thanh Tú
    { date: '2026-03-07', shift: 63, emp: 71 }, // Trịnh Hải Lâm
    { date: '2026-03-07', shift: 64, emp: 79 }, // Nhất Khang
    // CN
    { date: '2026-03-08', shift: 62, emp: 70 }, // Thanh Tú
    { date: '2026-03-08', shift: 62, emp: 71 }, // Trịnh Hải Lâm
    { date: '2026-03-08', shift: 63, emp: 73 }, // Ngọc Hân
    { date: '2026-03-08', shift: 64, emp: 79 },  // Nhất Khang
];

let sql = `SET client_encoding = 'UTF8';\nDO $$\nBEGIN\n`;

records.forEach(r => {
    let noteStr = r.note ? `'${r.note}'` : 'NULL';
    sql += `
    IF NOT EXISTS (SELECT 1 FROM schedules WHERE employee_id = ${r.emp} AND shift_id = ${r.shift} AND work_date = '${r.date}') THEN
        INSERT INTO schedules (employee_id, shift_id, work_date, approved_at, note) 
        VALUES (${r.emp}, ${r.shift}, '${r.date}', NOW(), ${noteStr});
    END IF;
`;
});

sql += `END $$;\n`;

fs.writeFileSync('seed_mar_4_8_safe.sql', sql);
console.log('Done mapping safe PL/pgSQL to seed_mar_4_8_safe.sql');
