set PGPASSWORD=123456
pg_dump -U csm_user -h localhost -p 5432 -d csm_db --inserts -f d:\GitHub\coffee-staff-management\database_inserts.sql
