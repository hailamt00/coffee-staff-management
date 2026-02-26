using CoffeeStaffManagement.Application.Common.Interfaces;
using CoffeeStaffManagement.Domain.Entities;
using CoffeeStaffManagement.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace CoffeeStaffManagement.Infrastructure.Persistence;

public static class DbInitializer
{
    public static void Initialize(AppDbContext context, IPasswordHasher hasher)
    {


        var admin = context.Admins.FirstOrDefault(a => a.Username == "admin");
        if (admin != null)
        {

            // Check if password is plain text "123456" (from SQL seed) or invalid
            // BCrypt hashes start with $2a$, $2b$, or $2y$.
            if (admin.PasswordHash == "123456" || !admin.PasswordHash.StartsWith("$"))
            {
                admin.PasswordHash = hasher.Hash("123456");
                context.SaveChanges();
            }
        }

        // --- MIGRATION: Consolidate Barista Positions ---
        // 1. Ensure "Pha chế" exists
        var baristaPosition = context.Positions.FirstOrDefault(p => p.Name == "Pha chế");
        if (baristaPosition == null)
        {
            baristaPosition = new Position { Name = "Pha chế", Status = true };
            context.Positions.Add(baristaPosition);
            context.SaveChanges();
        }

        // 2. Find old positions
        var oldPositions = context.Positions
            .Where(p => p.Name == "Pha chế (Parttime)" || p.Name == "Pha chế (Thử việc)")
            .Include(p => p.Shifts)
            .ToList();

        if (oldPositions.Any())
        {
            foreach (var oldPos in oldPositions)
            {
                // 3. Move Shifts to new position
                // Scheduls link to Shift, so moving Shift is enough.
                if (oldPos.Shifts.Any())
                {
                    foreach (var shift in oldPos.Shifts)
                    {
                        shift.PositionId = baristaPosition.Id;
                    }
                }
            }

            // Save changes to update Foreign Keys first
            context.SaveChanges();

            // 4. Delete old positions
            context.Positions.RemoveRange(oldPositions);
            context.SaveChanges();
        }
        // ------------------------------------------------

        // --- MIGRATION: Fix Shift Times to User Custom Specs ---
        var shifts = context.Shifts.Include(s => s.Position).ToList();
        foreach (var s in shifts)
        {
            if (s.Name == null) continue;

            if (s.Position?.Name == "Phục vụ")
            {
                if (s.Name.Contains("Sáng")) { s.StartTime = new TimeSpan(6, 30, 0); s.EndTime = new TimeSpan(11, 0, 0); }
                if (s.Name.Contains("Chiều")) { s.StartTime = new TimeSpan(14, 0, 0); s.EndTime = new TimeSpan(18, 0, 0); }
                if (s.Name.Contains("Tối")) { s.StartTime = new TimeSpan(18, 0, 0); s.EndTime = new TimeSpan(22, 30, 0); }
            }
            else if (s.Position?.Name == "Pha chế")
            {
                if (s.Name.Contains("Sáng")) { s.StartTime = new TimeSpan(6, 0, 0); s.EndTime = new TimeSpan(13, 0, 0); }
                if (s.Name.Contains("Chiều")) { s.StartTime = new TimeSpan(13, 0, 0); s.EndTime = new TimeSpan(18, 0, 0); }
                if (s.Name.Contains("Tối")) { s.StartTime = new TimeSpan(18, 0, 0); s.EndTime = new TimeSpan(22, 30, 0); }
            }
        }
        context.SaveChanges();

        if (!context.RewardPenaltyTypes.Any())
        {
            context.RewardPenaltyTypes.AddRange(
                new RewardPenaltyType { Name = "Đi làm muộn", Type = RewardPenaltyKind.Penalty, Amount = 20000 },
                new RewardPenaltyType { Name = "Làm hỏng đồ", Type = RewardPenaltyKind.Penalty, Amount = 50000 },
                new RewardPenaltyType { Name = "Không chấp hành đồng phục", Type = RewardPenaltyKind.Penalty, Amount = 10000 },
                new RewardPenaltyType { Name = "Thái độ chưa tốt", Type = RewardPenaltyKind.Penalty, Amount = 0 },
                new RewardPenaltyType { Name = "Chuyên cần", Type = RewardPenaltyKind.Reward, Amount = 100000 },
                new RewardPenaltyType { Name = "Phục vụ tốt", Type = RewardPenaltyKind.Reward, Amount = 50000 },
                new RewardPenaltyType { Name = "Nhân viên xuất sắc", Type = RewardPenaltyKind.Reward, Amount = 200000 }
            );
            context.SaveChanges();
        }
    }
}
