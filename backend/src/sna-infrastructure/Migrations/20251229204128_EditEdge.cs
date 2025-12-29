using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sna_infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class EditEdge : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "Weight",
                table: "Edges",
                type: "float(4)",
                precision: 4,
                scale: 3,
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "Weight",
                table: "Edges",
                type: "float",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float(4)",
                oldPrecision: 4,
                oldScale: 3);
        }
    }
}
