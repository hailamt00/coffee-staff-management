DROP TABLE IF EXISTS shifts CASCADE;

CREATE TABLE shifts (
    id SERIAL PRIMARY KEY,

    position_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,

    start_time TIME NOT NULL,
    end_time TIME NOT NULL,

    CONSTRAINT fk_shift_position
        FOREIGN KEY (position_id)
        REFERENCES positions(id)
        ON DELETE CASCADE,

    CONSTRAINT uq_shift UNIQUE (position_id, name)
);

ALTER TABLE shifts
ADD COLUMN is_enabled BOOLEAN NOT NULL DEFAULT TRUE;


INSERT INTO shifts (position_id, name, start_time, end_time)
VALUES
(
    (SELECT id FROM positions WHERE name = 'Phục vụ'),
    'Ca sáng',
    '06:30',
    '11:00'
),
(
    (SELECT id FROM positions WHERE name = 'Phục vụ'),
    'Ca chiều',
    '14:00',
    '18:00'
),
(
    (SELECT id FROM positions WHERE name = 'Phục vụ'),
    'Ca tối',
    '18:00',
    '22:30'
);

INSERT INTO shifts (position_id, name, start_time, end_time)
VALUES
(
    (SELECT id FROM positions WHERE name = 'Pha chế (PartTime)'),
    'Ca sáng',
    '06:00',
    '13:00'
),
(
    (SELECT id FROM positions WHERE name = 'Pha chế (PartTime)'),
    'Ca chiều',
    '13:00',
    '18:00'
),
(
    (SELECT id FROM positions WHERE name = 'Pha chế (PartTime)'),
    'Ca tối',
    '18:00',
    '22:30'
);

INSERT INTO shifts (position_id, name, start_time, end_time)
VALUES
(
    (SELECT id FROM positions WHERE name = 'Pha chế (Thử việc)'),
    'Ca sáng',
    '06:00',
    '13:00'
),
(
    (SELECT id FROM positions WHERE name = 'Pha chế (Thử việc)'),
    'Ca chiều',
    '13:00',
    '18:00'
),
(
    (SELECT id FROM positions WHERE name = 'Pha chế (Thử việc)'),
    'Ca tối',
    '18:00',
    '22:30'
);
