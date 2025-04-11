using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace BulkyBooksAPI.Models.Models
{
    public class ProductModel
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        [Required]
        public string ISBN { get; set; }
        [Required]
        public string Author { get; set; }
        [Required]
        [DisplayName("List Price")]
        [Range(1, 1000)]
        public double ListPrice { get; set; }

        [Required]
        [DisplayName("Price for 1-50")]
        [Range(1, 1000)]
        public double Price { get; set; }

        [Required]
        [DisplayName("Price for 50+")]
        [Range(1, 1000)]
        public double Price50 { get; set; }

        [Required]
        [DisplayName("Price for 100+")]
        [Range(1, 1000)]
        public double Price100 { get; set; }

        //We need an association with product and category. Each product belongs to one of the category. FK relation between product & category table
        //Without EF Core we used to have a column of CategoryID in product table and have constraint on FK in SQL Server.
        //But with EF Core we need not touch DB, we need to Define a constraint in Model and EF will takecare.

        //Here we need a column for CategoryId
        public int CategoryId { get; set; }
        //to explictly define FK we need a navigation prop to the Category table. annotated as FK. that's it goto seed data add CategoryId and add-migration.
        [ForeignKey("CategoryId")]
        [ValidateNever]
        public CategoryModel Category { get; set; }

        //here we will have prop imageurl
        [ValidateNever]
        public string ImageUrl { get; set; } //goto seed data add ImageUrl and put it as empty for now and add-migration
    }
}
