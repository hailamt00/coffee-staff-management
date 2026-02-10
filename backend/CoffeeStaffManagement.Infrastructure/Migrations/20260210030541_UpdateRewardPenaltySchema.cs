using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoffeeStaffManagement.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateRewardPenaltySchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // migrationBuilder.DropForeignKey(
            //     name: "FK_rewards_penalties_attendance_attendance_id",
            //     table: "rewards_penalties");

            migrationBuilder.AlterColumn<int>(
                name: "attendance_id",
                table: "rewards_penalties",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<DateTime>(
                name: "date",
                table: "rewards_penalties",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "reason",
                table: "rewards_penalties",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "default_amount",
                table: "reward_penalty_types",
                type: "numeric(12,2)",
                precision: 12,
                scale: 2,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddForeignKey(
                name: "FK_rewards_penalties_attendance_attendance_id",
                table: "rewards_penalties",
                column: "attendance_id",
                principalTable: "attendance",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_rewards_penalties_attendance_attendance_id",
                table: "rewards_penalties");

            migrationBuilder.DropColumn(
                name: "date",
                table: "rewards_penalties");

            migrationBuilder.DropColumn(
                name: "reason",
                table: "rewards_penalties");

            migrationBuilder.DropColumn(
                name: "default_amount",
                table: "reward_penalty_types");

            migrationBuilder.AlterColumn<int>(
                name: "attendance_id",
                table: "rewards_penalties",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_rewards_penalties_attendance_attendance_id",
                table: "rewards_penalties",
                column: "attendance_id",
                principalTable: "attendance",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
