using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Application.Employees.DTOs;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace CoffeeStaffManagement.Application.Employees.Queries;

public class GetEmployeeByIdQueryHandler
    : IRequestHandler<GetEmployeeByIdQuery, EmployeeDto?>
{
    private readonly IEmployeeRepository _repo;

    public GetEmployeeByIdQueryHandler(IEmployeeRepository repo)
    {
        _repo = repo;
    }

    public async Task<EmployeeDto?> Handle(
        GetEmployeeByIdQuery request,
        CancellationToken cancellationToken)
    {
        var e = await _repo.GetByIdAsync(request.Id);
        if (e == null) return null;

        return new EmployeeDto(
            e.Id,
            e.Code,
            e.Name,
            e.Phone,
            e.Cid,
            e.Gender,
            e.ServiceSalary ?? 0,
            e.BaristaSalary ?? 0,
            e.Dob,
            e.HireDate ?? default,
            e.CreatedAt
        );
    }
}
