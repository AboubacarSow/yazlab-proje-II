using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sna_infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ContactInfos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FullAddress = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactInfos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Graphs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastUpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Graphs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Messages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Subject = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsRead = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messages", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Nodes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GraphId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Tag = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Activity = table.Column<double>(type: "float", nullable: false),
                    Interaction = table.Column<int>(type: "int", nullable: false),
                    NormalizedDegreeCentrality = table.Column<double>(type: "float", nullable: true),
                    DegreeCentrality = table.Column<int>(type: "int", nullable: false),
                    Connections = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Nodes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Nodes_Graphs_GraphId",
                        column: x => x.GraphId,
                        principalTable: "Graphs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Edges",
                columns: table => new
                {
                    GraphId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NodeAId = table.Column<int>(type: "int", nullable: false),
                    NodeBId = table.Column<int>(type: "int", nullable: false),
                    Weight = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Edges", x => new { x.GraphId, x.NodeAId, x.NodeBId });
                    table.CheckConstraint("CK_Edges_NodeOrder", "[NodeAId] < [NodeBId]");
                    table.ForeignKey(
                        name: "FK_Edges_Graphs_GraphId",
                        column: x => x.GraphId,
                        principalTable: "Graphs",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Edges_Nodes_NodeAId",
                        column: x => x.NodeAId,
                        principalTable: "Nodes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Edges_Nodes_NodeBId",
                        column: x => x.NodeBId,
                        principalTable: "Nodes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Edges_GraphId_NodeAId_NodeBId",
                table: "Edges",
                columns: new[] { "GraphId", "NodeAId", "NodeBId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Edges_NodeAId",
                table: "Edges",
                column: "NodeAId");

            migrationBuilder.CreateIndex(
                name: "IX_Edges_NodeBId",
                table: "Edges",
                column: "NodeBId");

            migrationBuilder.CreateIndex(
                name: "IX_Nodes_GraphId",
                table: "Nodes",
                column: "GraphId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ContactInfos");

            migrationBuilder.DropTable(
                name: "Edges");

            migrationBuilder.DropTable(
                name: "Messages");

            migrationBuilder.DropTable(
                name: "Nodes");

            migrationBuilder.DropTable(
                name: "Graphs");
        }
    }
}
