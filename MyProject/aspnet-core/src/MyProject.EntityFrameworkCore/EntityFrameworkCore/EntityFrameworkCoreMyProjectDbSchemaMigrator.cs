using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using MyProject.Data;
using Volo.Abp.DependencyInjection;

namespace MyProject.EntityFrameworkCore
{
    public class EntityFrameworkCoreMyProjectDbSchemaMigrator
        : IMyProjectDbSchemaMigrator, ITransientDependency
    {
        private readonly IServiceProvider _serviceProvider;

        public EntityFrameworkCoreMyProjectDbSchemaMigrator(
            IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task MigrateAsync()
        {
            /* We intentionally resolving the MyProjectDbContext
             * from IServiceProvider (instead of directly injecting it)
             * to properly get the connection string of the current tenant in the
             * current scope.
             */

            await _serviceProvider
                .GetRequiredService<MyProjectDbContext>()
                .Database
                .MigrateAsync();
        }
    }
}
