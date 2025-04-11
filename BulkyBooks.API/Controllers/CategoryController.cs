
using BulkyBooksAPI.DataAccess.Repository.IRepository;
using BulkyBooksAPI.Models.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace BulkyBooks.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryController(ICategoryRepository categoryRepository) 
        {
            _categoryRepository = categoryRepository;
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await _categoryRepository.GetAllCategoriesAsync();
            return Ok(categories);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryById([FromRoute]int id)
        {
            var category = await _categoryRepository.GetCategoryByIdAsync(id);
            if (category == null) 
            {
                return NotFound();
            }
            return Ok(category);
        }

        [HttpPost("")]
        public async Task<IActionResult> AddNewCategory([FromBody]CategoryModel categoryModel)
        {
            var id = await _categoryRepository.AddCategoryAsync(categoryModel);
            return CreatedAtAction(nameof(GetCategoryById), new {id = id, Controller = "category"}, id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory([FromBody] CategoryModel categoryModel, [FromRoute]int id)
        {
            await _categoryRepository.UpdateCategoryAsync(id, categoryModel);
            return Ok();
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateCategoryPatch([FromBody] JsonPatchDocument categoryModel, [FromRoute] int id)
        {
            await _categoryRepository.UpdateCategoryPatchAsync(id, categoryModel);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory([FromRoute] int id)
        {
            await _categoryRepository.DeleteCategoryAsync(id);
            return Ok();
        }
    }
}
