using System;
using System.Collections.Generic;
using System.Text;
using MyProject.Localization;
using Volo.Abp.Application.Services;

namespace MyProject
{
    /* Inherit your application services from this class.
     */
    public abstract class MyProjectAppService : ApplicationService
    {
        protected MyProjectAppService()
        {
            LocalizationResource = typeof(MyProjectResource);
        }
    }
}
