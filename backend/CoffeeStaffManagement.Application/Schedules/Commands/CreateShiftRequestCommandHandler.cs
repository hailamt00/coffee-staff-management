using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
using MediatR;

public class CreateShiftRequestCommandHandler
    : IRequestHandler<CreateShiftRequestCommand>
{
    private readonly IEmployeeShiftRequestRepository _repo;

    public CreateShiftRequestCommandHandler(IEmployeeShiftRequestRepository repo)
    {
        _repo = repo;
    }

    public async Task Handle(
        CreateShiftRequestCommand request,
        CancellationToken cancellationToken)
    {
        var entity = new EmployeeShiftRequest
        {
            EmployeeId = request.EmployeeId,
            ShiftId = request.ShiftId,
            WorkDate = request.WorkDate,
            CreatedAt = DateTime.UtcNow
        };

        await _repo.AddAsync(entity);
    }

    
}
