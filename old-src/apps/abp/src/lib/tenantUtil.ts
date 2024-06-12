import { hostData } from '../data/HostData';

export const getTenant = (host: string) => {
    const tenant = hostData.find((x) => x.host == host);
    if (!tenant) throw new Error('tenant not found');
    return tenant;
};
