import type { NextPage } from 'next';
import { LandingLayout } from '@abpreact/ui';
import { Menus } from '../utils/Constants';

const Index: NextPage = () => {
    return <LandingLayout menus={Menus}></LandingLayout>;
};

export default Index;
