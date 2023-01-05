import { ApplicationConfigurationDto } from "@abp/generated/api";
import create from "zustand";
import { AbpApplicationConfigurationService } from "./../generated/api/services/AbpApplicationConfigurationService";

type State = {
  appConfig: ApplicationConfigurationDto;
  fetchAppConfig: () => Promise<ApplicationConfigurationDto>;
  isDone: boolean;
  setAppConfig: (config: ApplicationConfigurationDto) => void;
  setIsDone: (isDone: boolean) => void;
};

const useAppConfigStore = create<State>((set) => ({
  appConfig: {},
  isDone: false,
  setAppConfig: (config: ApplicationConfigurationDto) => {
    set({ appConfig: config, isDone: true });
  },
  setIsDone: (isDone: boolean) => {
    set({ isDone: isDone });
  },
  fetchAppConfig: async (): Promise<ApplicationConfigurationDto> => {
    const config =
      await AbpApplicationConfigurationService.abpApplicationConfigurationGet();
    if (config) {
      set({ appConfig: config, isDone: true });
      return config;
    }
    return {};
  },
}));

export default useAppConfigStore;
