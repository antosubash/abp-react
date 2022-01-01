using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace MyProject.Data
{
    /* This is used if database provider does't define
     * IMyProjectDbSchemaMigrator implementation.
     */
    public class NullMyProjectDbSchemaMigrator : IMyProjectDbSchemaMigrator, ITransientDependency
    {
        public Task MigrateAsync()
        {
            return Task.CompletedTask;
        }
    }
}