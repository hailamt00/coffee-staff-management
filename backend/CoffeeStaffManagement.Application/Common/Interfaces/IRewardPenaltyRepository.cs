using CoffeeStaffManagement.Domain.Entities;

namespace CoffeeStaffManagement.Application.Common.Interfaces;

public interface IRewardPenaltyRepository : IGenericRepository<RewardPenalty>
{
    // RewardPenaltyType
    Task<List<RewardPenaltyType>> GetTypesAsync();
    Task<RewardPenaltyType?> GetTypeByIdAsync(int id);
    Task AddTypeAsync(RewardPenaltyType type);
    Task UpdateTypeAsync(RewardPenaltyType type);
    Task DeleteTypeAsync(RewardPenaltyType type);

    // RewardPenalty
    Task<List<RewardPenalty>> GetByEmployeeIdAsync(int employeeId, int month, int year);
    Task<List<RewardPenalty>> GetAllAsync(int month, int year);
    Task DeleteAsync(RewardPenalty rewardPenalty);
}
