using Volo.Abp.Settings;

namespace MyProject.Settings
{
    public class MyProjectSettingDefinitionProvider : SettingDefinitionProvider
    {
        public override void Define(ISettingDefinitionContext context)
        {
            //Define your own settings here. Example:
            //context.Add(new SettingDefinition(MyProjectSettings.MySetting1));
        }
    }
}
