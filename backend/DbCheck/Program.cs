using System;
using Npgsql;

namespace DbCheck;

public class Program
{
    public static void Main()
    {
        string connString = "Host=localhost;Port=5432;Database=csm_db;Username=csm_user;Password=123456";
        try
        {
            using var conn = new NpgsqlConnection(connString);
            conn.Open();
            using var cmd = new NpgsqlCommand(
                "INSERT INTO \"__EFMigrationsHistory\" (\"MigrationId\", \"ProductVersion\") VALUES ('20260226031119_AddReasonToRewardPenaltyV2', '10.0.0') ON CONFLICT DO NOTHING;",
                conn);
            int rows = cmd.ExecuteNonQuery();
            Console.WriteLine($"Migration status updated: {rows} rows affected.");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
    }
}
