using System.Threading.Tasks;
using Shouldly;
using Xunit;

namespace MyProject.Pages;

public class Index_Tests : MyProjectWebTestBase
{
    [Fact]
    public async Task Welcome_Page()
    {
        var response = await GetResponseAsStringAsync("/");
        response.ShouldNotBeNull();
    }
}
