// styles
import './styles.css';
import Loader from './Shared/Loader';
import Error from './Shared/Error';
import ThemeSwitcher from './Shared/ThemeChanger';

// layout
export { LandingLayout, type LandingLayoutProps } from './layout/Landing';
export {
    AdminLayout,
    type AdminLayoutProps,
    type SubMenu
} from './layout/Admin';
export { MainLayout, type MainLayoutProps } from './layout/Main';

// admin

export { NavBar, type NavBarProps } from './Admin/NavBar';
export { Sidebar, type SidebarProps } from './Admin/Sidebar';
export { Dashboard, type DashboardProps } from './Admin/Dashboard';

// section
export { Hero, type HeroProps } from './Sections/Hero';

// shared

export { Meta, type MetaProps } from './Shared/Meta';
export { Button, type ButtonProps } from './Shared/Button';
export { Avatar, AvatarImage, AvatarFallback } from './Shared/Avatar';
export { Tabs, TabsContent, TabsList, TabsTrigger } from './Shared/Tabs';
export { Input, type InputProps } from './Shared/Input';
export { Textarea } from './Shared/Textarea';
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
export { Search } from './Shared/Search';
export {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from './Shared/Accordion';
export { Card } from './Shared/Card';
export {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from './Shared/DropdownMenu';

// Shared hooks

export { useToast, toast } from './Shared/hooks/useToast';
export { useDebounce } from './Shared/hooks/useDebounce';

// tenant

export { TenantList } from './Tenant/TenantList';
export { AddTenant } from './Tenant/AddTenant';
export { FeatureList, type FeatureListProps } from './Tenant/FeatureList';

// user

export { UserList } from './User/UserList';
export { AddUser, type AddUserProps } from './User/AddUser';
export { UserDropDown } from './User/UserDropDown';
export { UserMenus, type UserMenusProps } from './User/UserMenus';

// role
export { RoleList } from './Role/RoleList';
export { AddRole } from './Role/AddRole';

// settings
export { Emailing } from './Settings/Emailing';
export { FeatureManagement } from './Settings/FeatureManagement';

// profile settings
export { ProfileSettings } from './Profile/ProfileSettings';
export { ChangePassword } from './Profile/ChangePassword';
