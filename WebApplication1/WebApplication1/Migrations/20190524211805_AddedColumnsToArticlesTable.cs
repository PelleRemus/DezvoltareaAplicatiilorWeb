using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Migrations
{
    public partial class AddedColumnsToArticlesTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comment_Articles_ArticleID",
                table: "Comment");

            migrationBuilder.DropIndex(
                name: "IX_Comment_ArticleID",
                table: "Comment");

            migrationBuilder.AlterColumn<Guid>(
                name: "ArticleID",
                table: "Comment",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "Comment",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Rate",
                table: "Comment",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "Articles",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Difficulty",
                table: "Articles",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Language",
                table: "Articles",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Date",
                table: "Comment");

            migrationBuilder.DropColumn(
                name: "Rate",
                table: "Comment");

            migrationBuilder.DropColumn(
                name: "Date",
                table: "Articles");

            migrationBuilder.DropColumn(
                name: "Difficulty",
                table: "Articles");

            migrationBuilder.DropColumn(
                name: "Language",
                table: "Articles");

            migrationBuilder.AlterColumn<Guid>(
                name: "ArticleID",
                table: "Comment",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.CreateIndex(
                name: "IX_Comment_ArticleID",
                table: "Comment",
                column: "ArticleID");

            migrationBuilder.AddForeignKey(
                name: "FK_Comment_Articles_ArticleID",
                table: "Comment",
                column: "ArticleID",
                principalTable: "Articles",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
