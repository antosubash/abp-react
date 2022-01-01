using MyProject.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace MyProject
{
    [DependsOn(
        typeof(MyProjectEntityFrameworkCoreTestModule)
        )]
    public class MyProjectDomainTestModule : AbpModule
    {

    }
}