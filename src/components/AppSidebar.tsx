import {
  QrCode,
  Database,
  Files,
  UserRound,
  CreditCard,
  Mail,
  HelpCircle,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  {
    title: "Crear código QR",
    icon: QrCode,
    path: "/qrgenerator",
  },
  {
    title: "Datos analíticos",
    icon: Database,
    path: "/analytics",
  },
  {
    title: "Mis códigos QR",
    icon: Files,
    path: "/my-codes",
  },
  {
    title: "Mi cuenta",
    icon: UserRound,
    path: "/account",
  },
  {
    title: "Facturación",
    icon: CreditCard,
    path: "/billing",
  },
  {
    title: "Contáctenos",
    icon: Mail,
    path: "/contact",
  },
  {
    title: "Preguntas frecuentes",
    icon: HelpCircle,
    path: "/faq",
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <img
          src="/lovable-uploads/6b1ebaa3-85a6-43de-9d60-2002486b144a.png"
          alt="Logo"
          className="h-8"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === item.path}
                tooltip={item.title}
              >
                <Link to={item.path} className="w-full">
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}