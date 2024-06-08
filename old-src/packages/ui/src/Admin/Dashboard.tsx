import { useSession } from 'next-auth/react';

export interface DashboardProps {}

export const Dashboard = ({}: DashboardProps) => {
    const session = useSession();
    return (
        <div>
            <h1 className="text-4xl font-semibold ">
                Hello, {session.data?.user?.name}!
            </h1>
        </div>
    );
};
