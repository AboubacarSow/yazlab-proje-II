using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sna_infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class EditEdgeKeys : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Edges",
                table: "Edges");

            migrationBuilder.DropIndex(
                name: "IX_Edges_GraphId_NodeAId",
                table: "Edges");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Edges",
                table: "Edges",
                columns: new[] { "GraphId", "NodeAId", "NodeBId" });

            migrationBuilder.CreateIndex(
                name: "IX_Edges_GraphId_NodeAId_NodeBId",
                table: "Edges",
                columns: new[] { "GraphId", "NodeAId", "NodeBId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Edges",
                table: "Edges");

            migrationBuilder.DropIndex(
                name: "IX_Edges_GraphId_NodeAId_NodeBId",
                table: "Edges");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Edges",
                table: "Edges",
                columns: new[] { "GraphId", "NodeAId" });

            migrationBuilder.CreateIndex(
                name: "IX_Edges_GraphId_NodeAId",
                table: "Edges",
                columns: new[] { "GraphId", "NodeAId" },
                unique: true);
        }
    }
}
