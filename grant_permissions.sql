-- ================================================
-- GRANT PERMISSIONS TO csm_user
-- ================================================
-- Run this script FIRST as postgres superuser
-- Then you can run update_employees.sql as csm_user

-- Grant usage on sequence
GRANT USAGE, SELECT ON SEQUENCE employees_id_seq TO csm_user;
GRANT USAGE, SELECT ON SEQUENCE employee_code_seq TO csm_user;

-- Grant permissions on employees table
GRANT INSERT, UPDATE, DELETE, SELECT ON employees TO csm_user;
