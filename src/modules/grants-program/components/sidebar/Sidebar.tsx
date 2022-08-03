import React, { FC } from 'react';

import { DesktopSidebar } from './DesktopSidebar';
import { MobileSidebar } from './MobileSidebar';
import type { SidebarNavItem } from './SidebarNav';

export interface SidebarProps {
  nav: SidebarNavItem[];
}
export const Sidebar: FC<SidebarProps> = (props) => {
  return (
    <>
      <MobileSidebar {...props} />
      <DesktopSidebar {...props} />
    </>
  );
};
