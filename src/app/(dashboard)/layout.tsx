import { cookies } from 'next/headers';

import { ToastProvider } from '@/shared/feedback/toaster';
import { AppSidebar } from '@/shared/shell/app-sidebar';
import { AppTopbar } from '@/shared/shell/app-topbar';
import { MobileBar } from '@/shared/shell/mobile-bar';
import { THEME_COOKIE, themeFromCookie } from '@/shared/shell/theme';
import { SidebarInset, SidebarProvider } from '@/shared/ui/sidebar';
import { TooltipProvider } from '@/shared/ui/tooltip';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isSidebarOpen = cookieStore.get('sidebar_state')?.value !== 'false';
  const theme = themeFromCookie(cookieStore.get(THEME_COOKIE)?.value);

  return (
    <TooltipProvider>
      <ToastProvider>
        <SidebarProvider
          defaultOpen={isSidebarOpen}
          style={{ '--sidebar-width': 'var(--sidebar-w)' } as React.CSSProperties}
        >
          <AppSidebar />
          <SidebarInset>
            <MobileBar />
            <AppTopbar theme={theme} />
            <div className="flex-1 px-[26px] pt-[22px] pb-[50px] max-[860px]:px-4 max-[860px]:pt-[18px] max-[860px]:pb-9">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </ToastProvider>
    </TooltipProvider>
  );
}
