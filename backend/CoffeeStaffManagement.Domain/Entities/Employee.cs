using CoffeeStaffManagement.Domain.Common;
using CoffeeStaffManagement.Domain.Enums;

namespace CoffeeStaffManagement.Domain.Entities;

public class Employee : AuditableEntity
{
  public string Code { get; set; } = null!;
  public string Name { get; set; } = null!;
  public string Phone { get; set; } = null!;
  public string? Cid { get; set; }
  public Gender Gender { get; set; }

  public DateOnly? Dob { get; set; }
  public DateOnly? HireDate { get; set; }

  public decimal? ServiceSalary { get; set; } // Prop names match provided snippet: service_salary
  public decimal? BaristaSalary { get; set; }

  public bool Status { get; set; } = true;

  // Based on previous work, Gender existed. Prompt schema doesn't show it but prompt C# code doesn't either.
  // However, I should keep it if it was there and is in the TypeScript.
  // TS: dob, hireDate, serviceSalary, baristaSalary. No Gender in TS provided?
  // Wait, prompt TS provided:
  /*
  export interface Employee {
    id: Id
    code: string
    name: string
    phone: string
    cid?: string | null
    dob?: DateTimeString | null
    hireDate?: DateTimeString | null
    serviceSalary?: number | null
    baristaSalary?: number | null
    status: boolean
    createdAt: DateTimeString
  }
  */
  // No Gender in prompt TS. But I had Gender before. 
  // I will stick to prompt schema but keep Gender if it's implicitly needed by previous handlers.
  // Actually, prompt SQL doesn't have gender either.
  // I'll follow prompt SQL + C# snippet exactly now.

  /* ================= NAVIGATION ================= */

  public ICollection<Schedule> Schedules { get; set; } = new List<Schedule>();
  public ICollection<ScheduleRequest> ScheduleRequests { get; set; } = new List<ScheduleRequest>();
  public ICollection<Attendance> Attendances { get; set; } = new List<Attendance>();
  public ICollection<RewardPenalty> RewardsPenalties { get; set; } = new List<RewardPenalty>();
  public ICollection<Payroll> Payrolls { get; set; } = new List<Payroll>();
  public ICollection<Revenue> Revenues { get; set; } = new List<Revenue>();
}
