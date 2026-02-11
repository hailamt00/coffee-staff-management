using CoffeeStaffManagement.Domain.Common;
using CoffeeStaffManagement.Domain.Enums;

namespace CoffeeStaffManagement.Domain.Entities;

public class Employee : AuditableEntity
{
  public string Code { get; set; } = null!;
  public string Name { get; set; } = null!;
  public string Phone { get; set; } = null!;
  public string? Cid { get; set; }
  public Gender? Gender { get; set; }

  public DateOnly? Dob { get; set; }
  public DateOnly? HireDate { get; set; }

  public decimal? ServiceSalary { get; set; } // Prop names match provided snippet: service_salary
  public decimal? BaristaSalary { get; set; }

  public bool Status { get; set; } = true;



  /* ================= NAVIGATION ================= */

  public ICollection<Schedule> Schedules { get; set; } = new List<Schedule>();
  public ICollection<ScheduleRequest> ScheduleRequests { get; set; } = new List<ScheduleRequest>();
  public ICollection<Attendance> Attendances { get; set; } = new List<Attendance>();
  public ICollection<RewardPenalty> RewardsPenalties { get; set; } = new List<RewardPenalty>();
  public ICollection<Payroll> Payrolls { get; set; } = new List<Payroll>();
  public ICollection<Revenue> Revenues { get; set; } = new List<Revenue>();
}
