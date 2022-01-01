using MyProject.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Modularity;

namespace MyProject.DbMigrator
{
    [DependsOn(
        typeof(AbpAutofacModule),
        typeof(MyProjectEntityFrameworkCoreModule),
        typeof(MyProjectApplicationContractsModule)
        )]
    public class MyProjectDbMigratorModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpBackgroundJobOptions>(options => options.IsJobExecutionEnabled = false);
        }
    }
}
