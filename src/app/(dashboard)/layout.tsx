import { cookies } from 'next/headers';

import { strings } from '@/shared/i18n/strings';
import { AppSidebar } from '@/shared/shell/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/shared/ui/sidebar';
import { TooltipProvider } from '@/shared/ui/tooltip';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isSidebarOpen = cookieStore.get('sidebar_state')?.value !== 'false';

  return (
    <TooltipProvider>
      <SidebarProvider
        defaultOpen={isSidebarOpen}
        style={{ '--sidebar-width': 'var(--sidebar-w)' } as React.CSSProperties}
      >
        <AppSidebar />
        <SidebarInset>
          <header className="border-border flex h-14 shrink-0 items-center gap-3 border-b px-4">
            <SidebarTrigger aria-label={strings.nav.toggleMenu} />
          </header>
          <div className="flex-1 p-6">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
