using System.Threading.Tasks;

namespace MyProject.Data
{
    public interface IMyProjectDbSchemaMigrator
    {
        Task MigrateAsync();
    }
}
