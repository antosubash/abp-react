import { ApplicationConfigurationDto } from "@abp/generated/MyProjectModels";
import { getAppConfig } from "@abp/services/AppConfigService";
import create from "zustand";

type State = {
  appConfig: ApplicationConfigurationDto;
  fetchAppConfig: () => Promise<ApplicationConfigurationDto>;
  isDone: boolean;
  setAppConfig: (config: ApplicationConfigurationDto) => void;
  setIsDone: (isDone: boolean) => void;
};

const useAppConfigStore = create<State>((set) => ({
  appConfig: new ApplicationConfigurationDto(),
  isDone: false,
  setAppConfig: (config: ApplicationConfigurationDto) => {
    set({ appConfig: config, isDone: true });
  },
  setIsDone: (isDone: boolean) => {
    set({ isDone: isDone });
  },
  fetchAppConfig: async (): Promise<ApplicationConfigurationDto> => {
    const res = await getAppConfig();
    if (res) {
      set({ appConfig: res.data, isDone: true });
      return res.data;
    }
    return new ApplicationConfigurationDto();
  },
}));

export default useAppConfigStore;