import { Separator } from '@/shared/ui/separator';
import {
   SidebarInset,
   SidebarProvider,
   SidebarTrigger,
} from '@/shared/ui/sidebar';
import { AppSidebar } from '@/widgets/app-sidebar';
import { ModeToggle } from '@/widgets/mode-toggle';

export default function Layout({ children }: { children: React.ReactNode }) {
   return (
      <SidebarProvider>
         <AppSidebar />
         <SidebarInset className='flex flex-col h-screen'>
            <header className='flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4 z-10'>
               <SidebarTrigger className='-ml-1' />
               <Separator orientation='vertical' className='mr-2 h-4' />
               <div className='flex w-full'>
                  <div className='ml-auto'>
                     <ModeToggle />
                  </div>
               </div>
            </header>
            <div className='flex flex-1 flex-col gap-4 max-h-[calc(100vh-64px)] min-h-[calc(100vh-64px)] overflow-auto'>
               {children}
            </div>
         </SidebarInset>
      </SidebarProvider>
   );
}
