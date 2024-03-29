﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebApplication1.Data;

namespace WebApplication1.Migrations
{
    [DbContext(typeof(WebApplication1Context))]
    [Migration("20190517151157_CreatedArticles")]
    partial class CreatedArticles
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.3-servicing-35854")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WebApplication1.Models.Article", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Content");

                    b.Property<float>("Rating");

                    b.Property<string>("Title");

                    b.Property<int>("Views");

                    b.HasKey("ID");

                    b.ToTable("Articles");
                });

            modelBuilder.Entity("WebApplication1.Models.Comment", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid?>("ArticleID");

                    b.Property<string>("Content");

                    b.Property<string>("User");

                    b.HasKey("Id");

                    b.HasIndex("ArticleID");

                    b.ToTable("Comment");
                });

            modelBuilder.Entity("WebApplication1.Models.Comment", b =>
                {
                    b.HasOne("WebApplication1.Models.Article")
                        .WithMany("Comments")
                        .HasForeignKey("ArticleID");
                });
#pragma warning restore 612, 618
        }
    }
}
