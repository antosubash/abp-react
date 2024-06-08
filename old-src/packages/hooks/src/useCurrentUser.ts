import { CurrentUserDto } from '@abpreact/proxy';

import { useAppConfig } from './useAppConfig';

export const useCurrentUser = (): CurrentUserDto | undefined => {
    const { data } = useAppConfig();
    return data?.currentUser;
};
