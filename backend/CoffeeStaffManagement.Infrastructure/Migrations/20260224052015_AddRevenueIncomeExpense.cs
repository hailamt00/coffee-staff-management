using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoffeeStaffManagement.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddRevenueIncomeExpense : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Expenses",
                table: "revenues");

            migrationBuilder.DropColumn(
                name: "Income",
                table: "revenues");
        }
    }
}
