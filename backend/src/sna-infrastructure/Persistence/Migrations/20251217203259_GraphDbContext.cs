using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sna_infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class GraphDbContext : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Edges_Vertices_NodeAId",
                table: "Edges");

            migrationBuilder.DropForeignKey(
                name: "FK_Edges_Vertices_NodeBId",
                table: "Edges");

            migrationBuilder.DropForeignKey(
                name: "FK_Vertices_Graphs_GraphId",
                table: "Vertices");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Vertices",
                table: "Vertices");

            migrationBuilder.RenameTable(
                name: "Vertices",
                newName: "Node");

            migrationBuilder.RenameIndex(
                name: "IX_Vertices_GraphId",
                table: "Node",
                newName: "IX_Node_GraphId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Node",
                table: "Node",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Edges_Node_NodeAId",
                table: "Edges",
                column: "NodeAId",
                principalTable: "Node",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Edges_Node_NodeBId",
                table: "Edges",
                column: "NodeBId",
                principalTable: "Node",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Node_Graphs_GraphId",
                table: "Node",
                column: "GraphId",
                principalTable: "Graphs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Edges_Node_NodeAId",
                table: "Edges");

            migrationBuilder.DropForeignKey(
                name: "FK_Edges_Node_NodeBId",
                table: "Edges");

            migrationBuilder.DropForeignKey(
                name: "FK_Node_Graphs_GraphId",
                table: "Node");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Node",
                table: "Node");

            migrationBuilder.RenameTable(
                name: "Node",
                newName: "Vertices");

            migrationBuilder.RenameIndex(
                name: "IX_Node_GraphId",
                table: "Vertices",
                newName: "IX_Vertices_GraphId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Vertices",
                table: "Vertices",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Edges_Vertices_NodeAId",
                table: "Edges",
                column: "NodeAId",
                principalTable: "Vertices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Edges_Vertices_NodeBId",
                table: "Edges",
                column: "NodeBId",
                principalTable: "Vertices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Vertices_Graphs_GraphId",
                table: "Vertices",
                column: "GraphId",
                principalTable: "Graphs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
