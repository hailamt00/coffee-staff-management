using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace CoffeeStaffManagement.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(
        this IServiceCollection services)
    {
        services.AddMediatR(cfg =>
            cfg.RegisterServicesFromAssembly(
                typeof(Application.DependencyInjection).Assembly));

        return services;
    }
}
