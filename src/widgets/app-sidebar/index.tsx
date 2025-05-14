import {
   Book,
   Calculator,
   Circle,
   Home,
   Stars,
   StepForward,
   User,
} from 'lucide-react';

import { ROUTES } from '@/shared/config';
import {
   Sidebar,
   SidebarContent,
   SidebarGroup,
   SidebarGroupContent,
   SidebarGroupLabel,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
} from '@/shared/ui/sidebar';
import { Link } from 'react-router-dom';

// Menu items.
const items = [
   {
      title: 'Home',
      url: ROUTES.HOME,
      icon: Home,
   },
   {
      title: 'Counter',
      url: ROUTES.COUNTER,
      icon: Calculator,
   },
   {
      title: 'Authors',
      url: ROUTES.AUTHORS,
      icon: User,
   },
   {
      title: 'Books',
      url: ROUTES.BOOKS,
      icon: Book,
   },
   {
      title: 'Supers',
      url: ROUTES.SUPERS,
      icon: Stars,
   },
   {
      title: 'UI Loading',
      url: ROUTES.UI_LOADING,
      icon: Circle,
   },
   {
      title: 'Effects Sequence',
      url: ROUTES.EFFECTS_SEQUENCE,
      icon: StepForward,
   },
   {
      title: 'Not Found',
      url: ROUTES.NOT_FOUND,
      icon: Circle,
   },
];

export function AppSidebar() {
   return (
      <Sidebar>
         <SidebarContent>
            <SidebarGroup>
               <SidebarGroupLabel>Application</SidebarGroupLabel>
               <SidebarGroupContent>
                  <SidebarMenu>
                     {items.map(item => (
                        <SidebarMenuItem key={item.title}>
                           <SidebarMenuButton asChild>
                              {/* <a href={item.url}>
                                 <item.icon />
                                 <span>{item.title}</span>
                              </a> */}
                              <Link to={item.url}>
                                 <item.icon />
                                 <span>{item.title}</span>
                              </Link>
                           </SidebarMenuButton>
                        </SidebarMenuItem>
                     ))}
                  </SidebarMenu>
               </SidebarGroupContent>
            </SidebarGroup>
         </SidebarContent>
      </Sidebar>
   );
}
