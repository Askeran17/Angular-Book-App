using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using MyApp.Data;
using Npgsql;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Load environment variables from .env file
DotNetEnv.Env.Load("../.env");

// Debug output to verify environment variables
var databaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL");
Console.WriteLine($"DATABASE_URL: {databaseUrl}");

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Configure JWT authentication
var jwtSettings = builder.Configuration.GetSection("Jwt");
var jwtKey = jwtSettings["Key"];
if (string.IsNullOrEmpty(jwtKey))
{
    throw new ArgumentNullException("Jwt:Key", "JWT Key is not configured.");
}

var keyBytes = Encoding.UTF8.GetBytes(jwtKey);
if (keyBytes.Length < 16) // Ensure the key is at least 128 bits (16 bytes)
{
    throw new ArgumentException("Jwt:Key must be at least 128 bits (16 bytes) long.");
}

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    var issuer = jwtSettings["Issuer"];
    var audience = jwtSettings["Audience"];

    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = issuer,
        ValidAudience = audience,
        IssuerSigningKey = new SymmetricSecurityKey(keyBytes)
    };
});

builder.Services.AddAuthorization();

// Manually parse the PostgreSQL connection string from the environment variable
if (string.IsNullOrEmpty(databaseUrl))
{
    throw new ArgumentNullException("DATABASE_URL", "Database URL is not configured.");
}

var connString = new NpgsqlConnectionStringBuilder();

var keyValues = databaseUrl.Split(';');
foreach (var keyValue in keyValues)
{
    var pair = keyValue.Split('=');
    if (pair.Length == 2)
    {
        switch (pair[0].Trim())
        {
            case "Host":
                connString.Host = pair[1].Trim();
                break;
            case "Database":
                connString.Database = pair[1].Trim();
                break;
            case "Username":
                connString.Username = pair[1].Trim();
                break;
            case "Password":
                connString.Password = pair[1].Trim();
                break;
        }
    }
}

connString.SslMode = SslMode.Require;

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connString.ConnectionString));

// Add Swagger
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseSwagger();
app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1"));

app.UseHttpsRedirection();
app.UseStaticFiles(); // Обслуживание статических файлов из wwwroot
app.UseRouting();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

public partial class Program { }

