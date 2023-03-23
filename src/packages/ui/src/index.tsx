// styles
import './styles.css';
import Loader from './Shared/Loader';
import Error from './Shared/Error';
import ThemeSwitcher from './Shared/ThemeChanger';

// layout
export { LandingLayout, type LandingLayoutProps } from './layout/Landing';
export { AdminLayout, type AdminLayoutProps } from './layout/Admin';
export { MainLayout, type MainLayoutProps } from './layout/Main';

// admin

export { NavBar, type NavBarProps } from './Admin/NavBar';
export { Sidebar, type SidebarProps } from './Admin/Sidebar';
export { Dashboard, type DashboardProps } from './Admin/Dashboard';

// role
export { RoleList } from './Role/RoleList';

// section
export { Hero, type HeroProps } from './Sections/Hero';

// shared

export { Meta, type MetaProps } from './Shared/Meta';
export { Button, type ButtonProps } from './Shared/Button';
export { Avatar, AvatarImage, AvatarFallback } from './Shared/Avatar';
export { Tabs, TabsContent, TabsList, TabsTrigger } from './Shared/Tabs';
export { Input, type InputProps } from './Shared/Input';
export { Label } from './Shared/Label';
export { CustomTable, type TableViewProps } from './Shared/CustomTable';
export {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription
} from './Shared/DialogWrapper';
export { Toaster } from './Shared/Toaster';
export { Loader, Error, ThemeSwitcher };
export { Checkbox } from './Shared/Checkbox';
export { AlertDialog } from './Shared/AlertDialog';

// Shared hooks

export { useToast, toast } from './Shared/hooks/useToast';

// tenant

export { TenantList, type TenantListProps } from './Tenant/TenantList';
export { TenantEdit, type TenantEditProps } from './Tenant/TenantEdit';
export { TenantCreate, type TenantCreateProps } from './Tenant/TenantCreate';
export { FeatureList, type FeatureListProps } from './Tenant/FeatureList';

// user

export { UserList } from './User/UserList';
export { AddUser, type AddUserProps } from './User/AddUser';
export { UserDropDown } from './User/UserDropDown';
export { UserMenus, type UserMenusProps } from './User/UserMenus';
