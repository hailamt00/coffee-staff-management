using CoffeeStaffManagement.Application.Attendance.DTOs;
using MediatR;

namespace CoffeeStaffManagement.Application.Attendance.Commands;

public record CheckOutCommand(CheckOutRequest Request)
    : IRequest;
