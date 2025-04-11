using BulkyBooksAPI.DataAccess.Data;
using BulkyBooksAPI.DataAccess.Repository.IRepository;
using BulkyBooksAPI.Models.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.EntityFrameworkCore;

namespace BulkyBooksAPI.DataAccess.Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDbContext _context;

        public CategoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<List<CategoryModel>> GetAllCategoriesAsync()
        {
            var records = await _context.Categories.Select(x => new CategoryModel()
            {
                Id = x.Id,
                Name = x.Name,
                DisplayOrder = x.DisplayOrder
            }).ToListAsync();

            return records;
        }

        public async Task<CategoryModel> GetCategoryByIdAsync(int categoryId)
        {
            var records = await _context.Categories.Where(x => x.Id == categoryId).Select(x => new CategoryModel()
            {
                Id = x.Id,
                Name = x.Name,
                DisplayOrder = x.DisplayOrder
            }).FirstOrDefaultAsync();

            return records;
        }

        public async Task<int> AddCategoryAsync(CategoryModel categoryModel)
        {
            var category = new CategoryModel()
            {
                Name = categoryModel.Name,
                DisplayOrder = categoryModel.DisplayOrder
            };
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
            return category.Id;
        }

        public async Task UpdateCategoryAsync(int categoryId, CategoryModel categoryModel)
        {
            //var category = await _context.Categories.FindAsync(categoryId);
            //if(category != null) 
            //{
            //    category.Name = categoryModel.Name;
            //    category.DisplayOrder = categoryModel.DisplayOrder;

            //    await _context.SaveChangesAsync();
            //}

            var category = new CategoryModel()
            {
                Id = categoryId,
                Name = categoryModel.Name,
                DisplayOrder = categoryModel.DisplayOrder
            };
            _context.Categories.Update(category);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateCategoryPatchAsync(int categoryId, JsonPatchDocument categoryModel)
        {
            var category = await _context.Categories.FindAsync(categoryId);
            if (category != null)
            {
                categoryModel.ApplyTo(category);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteCategoryAsync(int categoryId)
        {
            var category = new CategoryModel() { Id = categoryId };
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
        }


    }
}
