using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Application.Employees.DTOs;
using MediatR;

namespace CoffeeStaffManagement.Application.Employees.Queries
{
    public class GetEmployeesQueryHandler
        : IRequestHandler<GetEmployeesQuery, List<EmployeeDto>>
    {
        private readonly IEmployeeRepository _repo;

        public GetEmployeesQueryHandler(IEmployeeRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<EmployeeDto>> Handle(
            GetEmployeesQuery request,
            CancellationToken cancellationToken)
        {
            var employees = await _repo.GetAllAsync(request.Search);

            return employees.Select(e => new EmployeeDto(
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
            )).ToList();
        }
    }
}
