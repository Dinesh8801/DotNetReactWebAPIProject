
using BulkyBooksAPI.Models.Models;
using Microsoft.AspNetCore.JsonPatch;

namespace BulkyBooksAPI.DataAccess.Repository.IRepository
{
    public interface IProductRepository
    {
        Task<List<ProductModel>> GetAllProductsAsync();

        Task<ProductModel> GetProductByIdAsync(int productId);

        Task<int> AddProductAsync(ProductModel productModel);

        Task UpdateProductAsync(int productId, ProductModel productModel);

        Task UpdateProductPatchAsync(int productId, JsonPatchDocument productModel);

        Task DeleteProductAsync(int productId);

        Task<IEnumerable<ProductModel>> GetAllProductsWithCategoryAsync();
        Task<ProductModel?> GetProductByIdWithCategoryAsync(int id);

    }
}
