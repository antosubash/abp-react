using Volo.Abp.Modularity;

namespace MyProject
{
    [DependsOn(
        typeof(MyProjectApplicationModule),
        typeof(MyProjectDomainTestModule)
        )]
    public class MyProjectApplicationTestModule : AbpModule
    {

    }
}