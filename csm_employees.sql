DROP SEQUENCE IF EXISTS employee_code_seq;

CREATE SEQUENCE employee_code_seq
START 1
INCREMENT 1;

GRANT USAGE, SELECT ON SEQUENCE employee_code_seq TO csm_user;

DROP TABLE IF EXISTS employees;

CREATE TABLE employees (
    id BIGSERIAL PRIMARY KEY,

    code VARCHAR(3) NOT NULL UNIQUE
        DEFAULT LPAD(nextval('employee_code_seq')::TEXT, 3, '0'),

    name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,

    cid VARCHAR(20),
    gender VARCHAR(10),

    salary_service NUMERIC(12,2) DEFAULT 0,
    salary_bar NUMERIC(12,2) DEFAULT 0,

    dob DATE,
    hire_date TIMESTAMPTZ DEFAULT NOW(),

    created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO employees
(name, phone, cid, gender, salary_service, salary_bar, dob, hire_date)
VALUES
('Admin', '0000000000', NULL, NULL, 0, 0, NULL, '2025-05-05'),
('Thanh Tú', '0765457988', NULL, 'Female', 22000, 24000, NULL, '2025-09-01'),
('Trịnh Hải Lâm', '0398413786', '040202000172', 'Male', 24000, 26000, '2002-10-28', '2025-02-14'),
('Ngọc Hân', '0942511614', NULL, 'Female', 22000, 24000, NULL, NOW()),
('Phạm Thị Vinh', '0919495106', NULL, 'Female', 22000, 24000, NULL, NOW()),
('Phương Ly', '0896869903', NULL, 'Female', 24000, 26000, NULL, NOW()),
('Phước Khang', '0855224187', NULL, 'Male', 22000, 0, NULL, NOW()),
('Trần Phú', '0766250207', NULL, 'Male', 22000, 0, NULL, NOW()),
('Nguyễn Nhật Phương Vy', '0901823105', NULL, 'Female', 0, 0, NULL, NOW()),
('Gia Hân', '0915778422', NULL, 'Female', 22000, 0, NULL, NOW()),
('Thạch Nhất Khang', '0777751896', NULL, 'Male', 0, 0, NULL, NOW());

