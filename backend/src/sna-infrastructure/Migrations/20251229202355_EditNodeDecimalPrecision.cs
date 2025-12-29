using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sna_infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class EditNodeDecimalPrecision : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "NormalizedDegreeCentrality",
                table: "Nodes",
                type: "decimal(4,3)",
                precision: 4,
                scale: 3,
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(3,2)",
                oldPrecision: 3,
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "NormalizedDegreeCentrality",
                table: "Nodes",
                type: "decimal(3,2)",
                precision: 3,
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(4,3)",
                oldPrecision: 4,
                oldScale: 3,
                oldNullable: true);
        }
    }
}
