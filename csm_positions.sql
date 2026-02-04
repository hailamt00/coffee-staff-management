DROP TABLE IF EXISTS positions;

CREATE TABLE positions (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(150) NOT NULL
);

INSERT INTO positions (name)
VALUES
  ('Phục vụ'),
  ('Pha chế (PartTime)'),
  ('Pha chế (Thử việc)');