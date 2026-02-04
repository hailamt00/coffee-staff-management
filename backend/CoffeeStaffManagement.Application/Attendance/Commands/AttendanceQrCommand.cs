using MediatR;
using CoffeeStaffManagement.Domain.Enums;

public record AttendanceQrCommand(
    string Phone,
    string Role,
    AttendanceQrAction Action
) : IRequest<Unit>;
