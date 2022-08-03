import React from 'react';

import { DesktopSidebar } from './DesktopSidebar';
import { MobileSidebar } from './MobileSidebar';
import type { SidebarNavItem } from './SidebarNav';

export interface SidebarProps {
  nav: SidebarNavItem[];
}
export const Sidebar = (props: SidebarProps) => {
  return (
    <>
      <MobileSidebar {...props} />
      <DesktopSidebar {...props} />
    </>
  );
};
