import { FaChalkboard, FaDatabase, FaUserCog, FaUsers } from "react-icons/fa";
export const Menus = [
  {
    Name: "How it works",
    Link: "#",
  },
  {
    Name: "Features",
    Link: "#",
  },
  {
    Name: "Pricing",
    Link: "#",
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
