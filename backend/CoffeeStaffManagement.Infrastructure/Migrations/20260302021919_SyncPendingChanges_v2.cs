using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoffeeStaffManagement.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class SyncPendingChanges_v2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("ALTER TABLE attendance DROP CONSTRAINT IF EXISTS \"FK_attendance_schedules_schedule_id\" CASCADE;");

            migrationBuilder.Sql("ALTER TABLE rewards_penalties DROP CONSTRAINT IF EXISTS \"FK_rewards_penalties_attendance_attendance_id\" CASCADE;");

            migrationBuilder.Sql("ALTER TABLE rewards_penalties DROP CONSTRAINT IF EXISTS \"FK_rewards_penalties_employees_employee_id\" CASCADE;");

            migrationBuilder.Sql("ALTER TABLE rewards_penalties DROP CONSTRAINT IF EXISTS \"FK_rewards_penalties_reward_penalty_types_type_id\" CASCADE;");

            migrationBuilder.Sql("ALTER TABLE rewards_penalties DROP CONSTRAINT IF EXISTS \"PK_rewards_penalties\" CASCADE;");

            migrationBuilder.RenameTable(
                name: "rewards_penalties",
                newName: "rewards_penalties_v2");

            migrationBuilder.RenameIndex(
                name: "IX_rewards_penalties_type_id",
                table: "rewards_penalties_v2",
                newName: "IX_rewards_penalties_v2_type_id");

            migrationBuilder.RenameIndex(
                name: "IX_rewards_penalties_employee_id",
                table: "rewards_penalties_v2",
                newName: "IX_rewards_penalties_v2_employee_id");

            migrationBuilder.RenameIndex(
                name: "IX_rewards_penalties_attendance_id",
                table: "rewards_penalties_v2",
                newName: "IX_rewards_penalties_v2_attendance_id");

            migrationBuilder.AddColumn<decimal>(
                name: "amount",
                table: "reward_penalty_types",
                type: "numeric(12,2)",
                precision: 12,
                scale: 2,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AlterColumn<int>(
                name: "schedule_id",
                table: "attendance",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddPrimaryKey(
                name: "PK_rewards_penalties_v2",
                table: "rewards_penalties_v2",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_attendance_schedules_schedule_id",
                table: "attendance",
                column: "schedule_id",
                principalTable: "schedules",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_rewards_penalties_v2_attendance_attendance_id",
                table: "rewards_penalties_v2",
                column: "attendance_id",
                principalTable: "attendance",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_rewards_penalties_v2_employees_employee_id",
                table: "rewards_penalties_v2",
                column: "employee_id",
                principalTable: "employees",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_rewards_penalties_v2_reward_penalty_types_type_id",
                table: "rewards_penalties_v2",
                column: "type_id",
                principalTable: "reward_penalty_types",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_attendance_schedules_schedule_id",
                table: "attendance");

            migrationBuilder.DropForeignKey(
                name: "FK_rewards_penalties_v2_attendance_attendance_id",
                table: "rewards_penalties_v2");

            migrationBuilder.DropForeignKey(
                name: "FK_rewards_penalties_v2_employees_employee_id",
                table: "rewards_penalties_v2");

            migrationBuilder.DropForeignKey(
                name: "FK_rewards_penalties_v2_reward_penalty_types_type_id",
                table: "rewards_penalties_v2");

            migrationBuilder.DropPrimaryKey(
                name: "PK_rewards_penalties_v2",
                table: "rewards_penalties_v2");

            migrationBuilder.DropColumn(
                name: "amount",
                table: "reward_penalty_types");

            migrationBuilder.RenameTable(
                name: "rewards_penalties_v2",
                newName: "rewards_penalties");

            migrationBuilder.RenameIndex(
                name: "IX_rewards_penalties_v2_type_id",
                table: "rewards_penalties",
                newName: "IX_rewards_penalties_type_id");

            migrationBuilder.RenameIndex(
                name: "IX_rewards_penalties_v2_employee_id",
                table: "rewards_penalties",
                newName: "IX_rewards_penalties_employee_id");

            migrationBuilder.RenameIndex(
                name: "IX_rewards_penalties_v2_attendance_id",
                table: "rewards_penalties",
                newName: "IX_rewards_penalties_attendance_id");

            migrationBuilder.AlterColumn<int>(
                name: "schedule_id",
                table: "attendance",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_rewards_penalties",
                table: "rewards_penalties",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_attendance_schedules_schedule_id",
                table: "attendance",
                column: "schedule_id",
                principalTable: "schedules",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_rewards_penalties_attendance_attendance_id",
                table: "rewards_penalties",
                column: "attendance_id",
                principalTable: "attendance",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_rewards_penalties_employees_employee_id",
                table: "rewards_penalties",
                column: "employee_id",
                principalTable: "employees",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_rewards_penalties_reward_penalty_types_type_id",
                table: "rewards_penalties",
                column: "type_id",
                principalTable: "reward_penalty_types",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
