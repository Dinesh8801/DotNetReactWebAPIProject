using BulkyBooks.Models.Models;
using Microsoft.EntityFrameworkCore;

namespace BulkyBooks.DataAccess.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            
        }

        public DbSet<CategoryModel> Categories { get; set; }

    }
}
