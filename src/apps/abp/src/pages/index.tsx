import type { NextPage } from 'next';
import { LandingLayout } from '@abpreact/ui';
import { Menus } from '../utils/Constants';

const LandingPage: NextPage = () => {
    return <LandingLayout menus={Menus}></LandingLayout>;
};

export default LandingPage;
