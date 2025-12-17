using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sna_infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class EditGraph : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Graphs",
                newName: "Tag");

            migrationBuilder.CreateIndex(
                name: "IX_Edges_GraphId_NodeAId_NodeBId",
                table: "Edges",
                columns: ["GraphId", "NodeAId", "NodeBId"],
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Edges_GraphId_NodeAId_NodeBId",
                table: "Edges");

            migrationBuilder.RenameColumn(
                name: "Tag",
                table: "Graphs",
                newName: "Name");
        }
    }
}
