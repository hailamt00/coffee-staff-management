using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Application.Payrolls.DTOs;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace CoffeeStaffManagement.Application.Payrolls.Queries;

public record GetPayrollByMonthQuery(int Month, int Year) : IRequest<List<PayrollDto>>;

public class GetPayrollByMonthQueryHandler : IRequestHandler<GetPayrollByMonthQuery, List<PayrollDto>>
{
    private readonly IPayrollRepository _repo;
    // Assuming we might need detailed employee info, but repository should handle includes
    // or we might need AppDbContext if repository doesn't have custom query

    public GetPayrollByMonthQueryHandler(IPayrollRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<PayrollDto>> Handle(GetPayrollByMonthQuery request, CancellationToken cancellationToken)
    {
        var payrolls = await _repo.GetByMonthAsync(request.Month, request.Year, cancellationToken);

        return payrolls.Select(p => new PayrollDto
        {
            Id = p.Id,
            EmployeeId = p.EmployeeId,
            EmployeeName = p.Employee?.Name ?? "Unknown",
            Month = p.Month,
            Year = p.Year,
            TotalSalary = p.TotalSalary,
            CreatedAt = p.CreatedAt
        }).ToList();
    }
}
