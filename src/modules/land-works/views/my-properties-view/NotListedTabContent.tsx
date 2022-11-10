import React, { FC } from 'react';

import LandsWorksGridEmptyState from 'modules/land-works/components/land-works-grid-empty-state';

import { TabContentProps } from '.';

const NotListedTabContent: FC<TabContentProps> = () => {
  // TODO: add ui
  return <LandsWorksGridEmptyState />;
};

export default NotListedTabContent;
