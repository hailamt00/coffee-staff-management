using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoffeeStaffManagement.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddReasonToRewardPenaltyV2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Expenses",
                table: "revenues");

            migrationBuilder.DropColumn(
                name: "Income",
                table: "revenues");

            migrationBuilder.AddColumn<string>(
                name: "reason",
                table: "rewards_penalties",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "reason",
                table: "rewards_penalties");

            migrationBuilder.AddColumn<decimal>(
                name: "Expenses",
                table: "revenues",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "Income",
                table: "revenues",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
