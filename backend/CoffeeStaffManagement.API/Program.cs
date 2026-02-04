using CoffeeStaffManagement.Api.Extensions;
using CoffeeStaffManagement.Application;
using CoffeeStaffManagement.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// ===== CONTROLLERS + SWAGGER =====
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ===== DEPENDENCY INJECTION =====
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddApi(builder.Configuration);

var app = builder.Build();

// ===== MIDDLEWARE =====
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.Run();
