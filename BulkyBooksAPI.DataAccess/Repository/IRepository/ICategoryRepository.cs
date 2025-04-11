
using BulkyBooksAPI.Models.Models;
using Microsoft.AspNetCore.JsonPatch;

namespace BulkyBooksAPI.DataAccess.Repository.IRepository
{
    public interface ICategoryRepository
    {
        Task<List<CategoryModel>> GetAllCategoriesAsync();

        Task<CategoryModel> GetCategoryByIdAsync(int categoryId);

        Task<int> AddCategoryAsync(CategoryModel categoryModel);

        Task UpdateCategoryAsync(int categoryId, CategoryModel categoryModel);

        Task UpdateCategoryPatchAsync(int id, JsonPatchDocument categoryModel);

        Task DeleteCategoryAsync(int categoryId);
    }
}
