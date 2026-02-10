using FluentValidation;

namespace CoffeeStaffManagement.Application.Employees.Commands;

public class CreateEmployeeCommandValidator : AbstractValidator<CreateEmployeeCommand>
{
    public CreateEmployeeCommandValidator()
    {
        RuleFor(v => v.Request.Name)
            .NotEmpty().WithMessage("Employee name is required")
            .MaximumLength(100).WithMessage("Employee name cannot exceed 100 characters");

        RuleFor(v => v.Request.Phone)
            .NotEmpty().WithMessage("Phone number is required")
            .Matches(@"^\d{10,11}$").WithMessage("Invalid phone number format");

        RuleFor(v => v.Request.ServiceSalary)
            .GreaterThanOrEqualTo(0).WithMessage("Service salary cannot be negative");

        RuleFor(v => v.Request.BaristaSalary)
            .GreaterThanOrEqualTo(0).WithMessage("Barista salary cannot be negative");
    }
}
