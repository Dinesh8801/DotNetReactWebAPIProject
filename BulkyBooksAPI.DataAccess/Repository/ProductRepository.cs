using BulkyBooksAPI.DataAccess.Data;
using BulkyBooksAPI.DataAccess.Repository.IRepository;
using BulkyBooksAPI.Models.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.EntityFrameworkCore;

namespace BulkyBooksAPI.DataAccess.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _context;

        public ProductRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<ProductModel>> GetAllProductsAsync()
        {
            var records = await _context.Products.Select(x => new ProductModel()
            {
                Id = x.Id,
                Title = x.Title,
                Description = x.Description,
                ISBN = x.ISBN,
                Author = x.Author,
                ListPrice = x.ListPrice,
                Price = x.Price,
                Price50 = x.Price50,
                Price100 = x.Price100,
                CategoryId = x.CategoryId,
                ImageUrl = x.ImageUrl
            }).ToListAsync();

            return records;
        }

        public async Task<ProductModel> GetProductByIdAsync(int productId)
        {
            var records = await _context.Products.Where(x => x.Id == productId).Select(x => new ProductModel()
            {
                Id = x.Id,
                Title = x.Title,
                Description = x.Description,
                ISBN = x.ISBN,
                Author = x.Author,
                ListPrice = x.ListPrice,
                Price = x.Price,
                Price50 = x.Price50,
                Price100 = x.Price100,
                CategoryId = x.CategoryId,
                ImageUrl = x.ImageUrl
            }).FirstOrDefaultAsync();

            return records;
        }

        public async Task<int> AddProductAsync(ProductModel productModel)
        {
            var product = new ProductModel()
            {
                Title = productModel.Title,
                Description = productModel.Description,
                ISBN = productModel.ISBN,
                Author = productModel.Author,
                ListPrice = productModel.ListPrice,
                Price = productModel.Price,
                Price50 = productModel.Price50,
                Price100 = productModel.Price100,
                CategoryId = productModel.CategoryId,
                ImageUrl = productModel.ImageUrl
            };
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return product.Id;
        }

        public async Task UpdateProductAsync(int productId, ProductModel productModel)
        {
            var product = new ProductModel()
            {
                Id = productId,
                Title = productModel.Title,
                Description = productModel.Description,
                ISBN = productModel.ISBN,
                Author = productModel.Author,
                ListPrice = productModel.ListPrice,
                Price = productModel.Price,
                Price50 = productModel.Price50,
                Price100 = productModel.Price100,
                CategoryId = productModel.CategoryId,
                ImageUrl = productModel.ImageUrl
            };
            _context.Products.Update(product);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateProductPatchAsync(int productId, JsonPatchDocument productModel)
        {
            var product = await _context.Products.FindAsync(productId);
            if (product != null)
            {
                productModel.ApplyTo(product);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteProductAsync(int productId)
        {
            var product = new ProductModel() { Id = productId };
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<ProductModel>> GetAllProductsWithCategoryAsync()
        {
            return await _context.Products.Include(p => p.Category).ToListAsync();
        }

        public async Task<ProductModel?> GetProductByIdWithCategoryAsync(int id)
        {
            return await _context.Products
                .Include(p => p.Category)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

    }
}
