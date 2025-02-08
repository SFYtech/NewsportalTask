using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System.Net;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NewsFullstack.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly IMemoryCache _cache;
        public NewsController(IHttpClientFactory httpClientFactory, IMemoryCache cache)
        {
            _httpClient = httpClientFactory.CreateClient();
            _cache = cache;
        }

        // GET: api/News/headlines
        [HttpGet("headlines")]
        public async Task<IActionResult> GetHeadlines()
        {
            string cacheKey = "HeadlinesCache";
            string apiKey = "pub_6848725cf8bd67ad680d1f0b8f4dae0208985";
            string apiUrl = $"https://newsdata.io/api/1/news?apikey={apiKey}&q=information%20technology&country=" +
                            $"in&language=en&category=business,education,science,sports,technology";

            // Check if the data is cached
            if (_cache.TryGetValue(cacheKey, out string cachedData))
            {
                return Ok(cachedData);
            }

            try
            {
                var response = await _httpClient.GetAsync(apiUrl);

                if (response.StatusCode == (HttpStatusCode)429)  // Handle rate limiting
                {
                    var retryAfter = response.Headers.RetryAfter?.Delta?.TotalSeconds ?? 60;  // Default retry after 60 seconds
                    return StatusCode(429, $"Rate limit exceeded. Please retry after {retryAfter} seconds.");
                }

                if (response.IsSuccessStatusCode)
                {
                    var data = await response.Content.ReadAsStringAsync();

                    // Cache the response for 5 minutes
                    _cache.Set(cacheKey, data, TimeSpan.FromMinutes(5));

                    return Ok(data);
                }
                else
                {
                    return StatusCode((int)response.StatusCode, "Error fetching news data.");
                }
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/News/{id} - Fetch individual news details
        [HttpGet("{id}")]
        public async Task<IActionResult> GetNewsById(string id)
        {
            string apiKey = "pub_6848725cf8bd67ad680d1f0b8f4dae0208985";

            // If your API supports fetching details by ID, replace the below URL accordingly.
            string apiUrl = $"https://newsdata.io/api/1/news?apikey={apiKey}&id={id}";

            try
            {
                var response = await _httpClient.GetAsync(apiUrl);

                if (response.IsSuccessStatusCode)
                {
                    var data = await response.Content.ReadAsStringAsync();
                    return Ok(data);
                }
                else
                {
                    return NotFound($"News article with ID {id} not found.");
                }
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
