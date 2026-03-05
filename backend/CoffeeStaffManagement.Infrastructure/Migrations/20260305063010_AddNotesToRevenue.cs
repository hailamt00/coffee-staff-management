using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoffeeStaffManagement.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddNotesToRevenue : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "exnote",
                table: "revenues",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "innote",
                table: "revenues",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "exnote",
                table: "revenues");

            migrationBuilder.DropColumn(
                name: "innote",
                table: "revenues");
        }
    }
}
