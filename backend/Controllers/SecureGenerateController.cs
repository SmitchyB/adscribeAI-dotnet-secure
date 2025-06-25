using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

public record GenerateRequest(string ProductName, string Keywords);

[ApiController]
[Route("api/[controller]")]
public class GenerateController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;
    // Add a field to hold the configuration
    private readonly IConfiguration _configuration;

    // Inject both IHttpClientFactory and IConfiguration via the constructor
    public GenerateController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
    {
        _httpClientFactory = httpClientFactory;
        _configuration = configuration;
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] GenerateRequest request)
    {
        // --- SECURE VERSION ---
        //----Change 1----
        // Read the secret key from the configuration. In Development, this comes from User Secrets.
        var openAIApiKey = _configuration["OpenAI:ApiKey"];

        // Add a check to ensure the key exists.
        if (string.IsNullOrEmpty(openAIApiKey))
        {
            return StatusCode(500, "OpenAI API Key is not configured in User Secrets.");
        }

        var prompt = $"Write a short, catchy, and professional product description for a \"{request.ProductName}\" that highlights these keywords: \"{request.Keywords}\".";

        var httpClient = _httpClientFactory.CreateClient();
        httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", openAIApiKey);

        var openAIRequest = new
        {
            model = "gpt-3.5-turbo",
            messages = new[]
            {
                new { role = "user", content = prompt }
            },
            max_tokens = 100
        };

        var jsonRequest = JsonSerializer.Serialize(openAIRequest);
        var content = new StringContent(jsonRequest, Encoding.UTF8, "application/json");

        try
        {
            var response = await httpClient.PostAsync("https://api.openai.com/v1/chat/completions", content);

            if (!response.IsSuccessStatusCode)
            {
                var errorBody = await response.Content.ReadAsStringAsync();
                Console.Error.WriteLine($"OpenAI API Error: {errorBody}");
                return StatusCode(500, "Failed to generate description due to an API error.");
            }

            var jsonResponse = await response.Content.ReadAsStringAsync();
            
            using (JsonDocument doc = JsonDocument.Parse(jsonResponse))
            {
                JsonElement root = doc.RootElement;
                string description = root.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString()?.Trim() ?? "";
                return Ok(new { description });
            }
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Exception in GenerateController: {ex.Message}");
            return StatusCode(500, "An internal server error occurred.");
        }
    }
}
