using CoffeeStaffManagement.Application.Common.Interfaces;
using MediatR;

namespace CoffeeStaffManagement.Application.ActivityLogs.Queries;

public record GetActivityLogsQuery() : IRequest<List<ActivityLogDto>>;

public class ActivityLogDto
{
    public int Id { get; set; }
    public string Action { get; set; } = null!;
    public DateTime CreatedAt { get; set; }
}

public class GetActivityLogsQueryHandler : IRequestHandler<GetActivityLogsQuery, List<ActivityLogDto>>
{
    private readonly IActivityLogRepository _repo;

    public GetActivityLogsQueryHandler(IActivityLogRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<ActivityLogDto>> Handle(GetActivityLogsQuery request, CancellationToken ct)
    {
        var logs = await _repo.ListAllAsync(ct);

        return logs
            .OrderByDescending(l => l.CreatedAt)
            .Select(l => new ActivityLogDto
            {
                Id = l.Id,
                Action = l.Action,
                CreatedAt = l.CreatedAt
            })
            .ToList();
    }
}
