using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sna_infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class EditNode : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Edges_Nodes_NodeBId",
                table: "Edges");

            migrationBuilder.AlterColumn<decimal>(
                name: "NormalizedDegreeCentrality",
                table: "Nodes",
                type: "decimal(3,2)",
                precision: 3,
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Edges_Nodes_NodeBId",
                table: "Edges",
                column: "NodeBId",
                principalTable: "Nodes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Edges_Nodes_NodeBId",
                table: "Edges");

            migrationBuilder.AlterColumn<double>(
                name: "NormalizedDegreeCentrality",
                table: "Nodes",
                type: "float",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(3,2)",
                oldPrecision: 3,
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Edges_Nodes_NodeBId",
                table: "Edges",
                column: "NodeBId",
                principalTable: "Nodes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
