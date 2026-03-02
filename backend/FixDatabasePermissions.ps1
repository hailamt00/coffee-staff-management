# Fix PostgreSQL Table Ownership
# This script ensures 'csm_user' owns all tables in 'csm_db', allowing migrations to run.

$PostgresPassword = Read-Host -Prompt "Enter password for 'postgres' user (Try '123456' or leave blank)"
$Env:PGPASSWORD = $PostgresPassword

$Tables = @("revenues", "attendance", "rewards_penalties", "reward_penalty_types", "employees", "positions", "shifts", "schedules", "payrolls", "payroll_details", "transactions", "activities", "schedule_requests", "admin", "__EFMigrationsHistory")

Write-Host "`nStarting ownership transfer to 'csm_user'..." -ForegroundColor Cyan

foreach ($Table in $Tables) {
    Write-Host "Processing table: $Table"
    & psql -h localhost -U postgres -d csm_db -P pager=off -c "ALTER TABLE public.`"$Table`" OWNER TO csm_user;" 2>$null
}

Write-Host "`nOwnership transfer complete! Try running the app again." -ForegroundColor Green
$Env:PGPASSWORD = ""
