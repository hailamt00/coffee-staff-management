using CoffeeStaffManagement.Domain.Common;
using CoffeeStaffManagement.Domain.Enums;

namespace CoffeeStaffManagement.Domain.Entities;

public class Transaction : AuditableEntity
{
    public int RevenueId { get; set; }

    public TransactionType Type { get; set; }
    public decimal Amount { get; set; }
    public string? Description { get; set; }


    public Revenue? Revenue { get; set; }
}
