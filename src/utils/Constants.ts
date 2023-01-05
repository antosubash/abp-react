import { FaChalkboard, FaDatabase, FaUserCog, FaUsers } from "react-icons/fa";
export const Menus = [
  {
    Name: "How it works",
    Link: "#how-it-works",
  },
  {
    Name: "Features",
    Link: "#features",
  },
  {
    Name: "Pricing",
    Link: "#pricing",
  },
];

export const AdminMenus = [
  {
    Name: "Dashboard",
    Link: "/admin",
    Icon: FaChalkboard,
  },
  {
    Name: "Users",
    Link: "/users",
    Icon: FaUsers,
  },
  {
    Name: "Tenants",
    Link: "/tenants",
    Icon: FaDatabase,
  },
  {
    Name: "Settings",
    Link: "/settings",
    Icon: FaUserCog,
  },
];

export const QueryNames = {
  GetUsers: "GetUsers",
  GetTenants: "GetTenants",
  GetRoles: "GetRoles",
  GetAppConfig: "GetAppConfig",
  GetFeatures: "GetFeatures",
}