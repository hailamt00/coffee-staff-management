---
name: coffee-staff-management
description: Coffee Staff Management - Admin Dashboard for a coffee shop. Focus: Backend (.NET, EF Core, MediatR), Frontend (React/TypeScript, Vite), PostgreSQL schema (csm_db).
---

# Coffee Staff Management — Project Documentation

## 1. Project Overview
**Coffee Staff Management (CSM)** is an Admin Dashboard designed to manage employees, schedules, attendance, payroll, and revenue for a coffee shop.
- **Tech Stack**:
    - **Backend**: .NET 10 (Web API), Entity Framework Core (PostgreSQL), MediatR (CQRS).
    - **Frontend**: React (Vite), TypeScript, TailwindCSS (assumed), ShadCN (assumed).
    - **Database**: PostgreSQL (`csm_db`).

## 2. Core Workflows

### 2.1 Authentication & Dashboard
- **Actors**: Admin (Manager).
- **Flow**: Admin logs in via `username`/`password` -> Dashboard.
- **Dashboard**: Displays general stats (Overview). Includes Sidebar/Header for navigation.

### 2.2 Employee Management (`Employees`)
- **View**: List of employees (#, Code, Name, Phone, CID, Salaries, DOB, HireDate, Status).
- **Actions**: Search, Add, Edit, Delete (Soft delete? Status toggle?).

### 2.3 Position & Shift Management (`Positions`, `Shifts`)
- **Structure**: Employees can have multiple roles, but system manages Roles -> Shifts.
- **View**: List of Positions (Name, Shift Count, Status).
    - **Expand**: Show specific Shifts for that position (Name, Start/End Time).
- **Actions**: Manage Positions and their Shifts.

### 2.4 Scheduling (`Schedules`, `ScheduleRequests`)
- **Employee View (Mobile/Public Page)**:
    - Login via Phone Number.
    - View weekly table -> Register for shifts (optional Note).
    - Submit -> Creates `ScheduleRequest` (status: `pending`).
- **Admin View**:
    - View all requests.
    - **Action**: Approve/Reject requests.
    - **Result**: Approved requests become `Schedule` records.
    - **Calendar**: View final weekly schedule.

### 2.5 Attendance (`Attendance`)
- **Employee View**:
    - Login via Phone Number -> Select Position -> "Check In" / "Check Out".
    - System records time.
- **Admin View**:
    - View attendance records (Status, Check-in/out times, Late/Early notes).
    - **Data**: Links `Attendance` -> `Schedule` -> `Employee`.

### 2.6 Payroll (`Payrolls`, `PayrollDetails`)
- **Flow**: Admin Selects Month/Year & Employee -> System calculates Salary.
- **Calculation**:
    - Based on `Attendance` (Total Hours * Role Salary).
    - +/- `Rewards/Penalties`.
    - **Final**: Save to `Payrolls` table.

### 2.7 Revenue & Expenses (`Revenues`, `Transactions`)
- **Employee View (End of Shift)**:
    - Login via Phone -> Input Revenue (Cash, Bank, Expenses during shift).
    - System calculates Deviation (Expected vs Actual).
- **Admin View**:
    - View Daily/Monthly Revenue reports.
    - Manage `Transactions` (Income/Expense).

## 3. Database Schema (PostgreSQL)

### Tables
- **`admin`**: System administrators.
- **`employees`**: Staff details. `status` (bool).
- **`positions`**: Job roles.
- **`shifts`**: Specific work times for positions.
- **`schedule_requests`**: Staff registration for shifts. `status` ('pending', 'approved', 'rejected').
- **`schedules`**: Official assigned shifts.
- **`attendance`**: Actual work logs. Links to `schedules`.
- **`reward_penalty_types`**: Config for bonus/fines.
- **`rewards_penalties`**: Applied records.
- **`payrolls`**: Monthly efficiency summaries.
- **`payroll_details`**: Breakdown by attendance/shift.
- **`revenues`**: Daily/Shift revenue reports.
- **`transactions`**: Income/Expense records.
- **`activities`**: System audit log.

## 4. Current Implementation Status (Backend)
- **Architecture**: Clean Architecture (Domain, Application, Infrastructure, API).
- **Entities**: Synchronized with PostgreSQL Schema.
- **Features**:
    - [x] Employees (CRUD, Soft Delete).
    - [x] Positions/Shifts (CRUD, Status field standardized).
    - [x] Schedules (Request -> Approve cycle). *Renamed from EmployeeShiftRequest*
    - [x] Attendance (Check-in/out). *Linked to Schedules, calculated duration*
    - [x] Payroll (Generation). *Month/Year input, Attendance aggregation*
    - [ ] Revenue/Transactions. *Not started*

## 5. Next Steps
1.  **Database**: Apply `SyncWithSchema` migration (`dotnet ef database update`).
2.  **Feature**: Implement Revenue/Transaction logic.
3.  **Refinement**: Comprehensive testing of Payroll calculations.
