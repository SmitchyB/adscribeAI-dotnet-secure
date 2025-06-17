var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

// Add CORS services.
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          // Replace http://localhost:3000 with your React app's URL
                          policy.WithOrigins("http://localhost:3000")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});

// This registers the IHttpClientFactory.
builder.Services.AddHttpClient();

// This adds the services for the controllers we are using.
builder.Services.AddControllers();

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection(); // We can leave this commented out for now.

// This tells the app to use the CORS policy we defined above.
app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

// This maps the routes defined in your controller files.
app.MapControllers();

app.Run();