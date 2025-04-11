
using System.Diagnostics;
using BulkyBooksAPI.DataAccess.Repository.IRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BulkyBooks.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class HomeController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        private readonly ILogger<HomeController> _logger;

        public HomeController(IProductRepository productRepository, ILogger<HomeController> logger)
        {
            _productRepository = productRepository;
            _logger = logger;
        }

        // GET: api/home
        [HttpGet("")]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _productRepository.GetAllProductsWithCategoryAsync();
            return Ok(products);
        }

        // GET: api/home/{productId}
        [HttpGet("{productId}")]
        public async Task<IActionResult> GetProductDetails([FromRoute] int productId)
        {
            var product = await _productRepository.GetProductByIdWithCategoryAsync(productId);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        // Optional route for static policy info
        [HttpGet("privacy")]
        public IActionResult GetPrivacyPolicy()
        {
            return Ok("This is the privacy policy for BulkyBooks API.");
        }

        // Optional route for error diagnostics
        [HttpGet("error")]
        public IActionResult GetError()
        {
            var error = new
            {
                RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier,
                Message = "An internal error occurred."
            };
            return StatusCode(500, error);
        }
    }
}
