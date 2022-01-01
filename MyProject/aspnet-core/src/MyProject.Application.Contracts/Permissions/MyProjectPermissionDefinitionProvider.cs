using MyProject.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace MyProject.Permissions
{
    public class MyProjectPermissionDefinitionProvider : PermissionDefinitionProvider
    {
        public override void Define(IPermissionDefinitionContext context)
        {
            var myGroup = context.AddGroup(MyProjectPermissions.GroupName);
            //Define your own permissions here. Example:
            //myGroup.AddPermission(MyProjectPermissions.MyPermission1, L("Permission:MyPermission1"));
        }

        private static LocalizableString L(string name)
        {
            return LocalizableString.Create<MyProjectResource>(name);
        }
    }
}
