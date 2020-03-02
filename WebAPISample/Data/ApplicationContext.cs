using Microsoft.EntityFrameworkCore;
using WebAPISample.Models;

namespace WebAPISample.Data
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions options)
            :base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Seed data - needs migration
            // modelBuilder.Entity<Movie>
            //  .HasData(
            //  new Movie{Fill All Properties}
            //  );
            // View PlayerTracker project for example
        }

        public DbSet<Movie> Movies { get; set; }
    }
}
