using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoffeeStaffManagement.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddIncomeExpensesToRevenue : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            /*
            migrationBuilder.DropForeignKey(
                name: "FK_revenues_schedules_schedule_id",
                table: "revenues");

            migrationBuilder.AlterColumn<int>(
                name: "schedule_id",
                table: "revenues",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");
            */

            migrationBuilder.AddColumn<decimal>(
                name: "expenses",
                table: "revenues",
                type: "numeric(12,2)",
                precision: 12,
                scale: 2,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "income",
                table: "revenues",
                type: "numeric(12,2)",
                precision: 12,
                scale: 2,
                nullable: false,
                defaultValue: 0m);

            /*
            migrationBuilder.AddForeignKey(
                name: "FK_revenues_schedules_schedule_id",
                table: "revenues",
                column: "schedule_id",
                principalTable: "schedules",
                principalColumn: "id");
            */
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            /*
            migrationBuilder.DropForeignKey(
                name: "FK_revenues_schedules_schedule_id",
                table: "revenues");
            */

            migrationBuilder.DropColumn(
                name: "expenses",
                table: "revenues");

            migrationBuilder.DropColumn(
                name: "income",
                table: "revenues");

            /*
            migrationBuilder.AlterColumn<int>(
                name: "schedule_id",
                table: "revenues",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_revenues_schedules_schedule_id",
                table: "revenues",
                column: "schedule_id",
                principalTable: "schedules",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
            */
        }

    }
}
