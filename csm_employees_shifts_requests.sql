DROP TABLE IF EXISTS employee_shift_requests;

CREATE TABLE employee_shift_requests (
    id BIGSERIAL PRIMARY KEY,

    employee_id BIGINT NOT NULL,
    shift_id INT NOT NULL,
    work_date DATE NOT NULL,

    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    -- PENDING | APPROVED | REJECTED

    note TEXT,

    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE,

    CONSTRAINT fk_request_employee
        FOREIGN KEY (employee_id)
        REFERENCES employees(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_request_shift
        FOREIGN KEY (shift_id)
        REFERENCES shifts(id)
        ON DELETE CASCADE,

    CONSTRAINT uq_employee_shift_request
        UNIQUE (employee_id, shift_id, work_date)
);
