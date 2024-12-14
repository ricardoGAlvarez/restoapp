"use client";

import * as React from "react";
import {
  Carrot,
  Computer,
  HandPlatter,
  Home,
  HomeIcon,
  SquareMenu,
  Store,
  Users,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "Admin",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Restourant App",
      logo: Store,
      plan: "",
    },
    // {
    //   name: "Acme Corp.",
    //   logo: AudioWaveform,
    //   plan: "Startup",
    // },
    // {
    //   name: "Evil Corp.",
    //   logo: Command,
    //   plan: "Free",
    // },
  ],
  navMain: [
    {
      title: "Inicio",
      url: "#",
      icon: HomeIcon,
      items: [
        {
          title: "Inicio",
          url: "/dashboard",
        },
      ],
    },
    {
      title: "Menu",
      url: "#",
      icon: SquareMenu,
      items: [
        {
          title: "Ver Menus",
          url: "/dashboard/menu",
        },
      ],
    },
    {
      title: "Categorias",
      url: "/dashboard/categorias",
      icon: Carrot,
      items: [
        {
          title: "Ver Categorias",
          url: "/dashboard/categorias",
        },
      ],
    },
    {
      title: "Productos",
      url: "/dashboard/productos",
      icon: Carrot,
      items: [
        {
          title: "Ver Productos",
          url: "/dashboard/productos",
        },
      ],
    },
    {
      title: "Pedidos",
      url: "/dashboard/pedidos",
      icon: HandPlatter,
      items: [
        {
          title: "Ver Pedidos",
          url: "/dashboard/pedidos",
        },
      ],
    },
    {
      title: "Caja",
      url: "/dashboard/caja",
      icon: Computer,
      items: [
        {
          title: "Historial de Pagos",
          url: "/dashboard/caja",
        },
      ],
    },
    {
      title: "Clientes",
      url: "/dashboard/clientes",
      icon: Users,
      items: [
        {
          title: "Asignar Mesa",
          url: "/dashboard/clientes",
        },
      ],
    },
  ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <div className="">
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader>

        <SidebarContent>
          <NavMain items={data.navMain} />

          {/* <NavProjects projects={data.projects} /> */}
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </div>
  );
}
