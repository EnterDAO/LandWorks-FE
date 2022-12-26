import React from 'react';

import { APP_ROUTES, LANDING_ROUTES, useIsAppRoute } from 'router/routes';

export const CanIHire: React.FC = () => {
  const isAppRoute = useIsAppRoute();

  return (
    <span>
      Yes! Visit our{' '}
      <a href={isAppRoute ? APP_ROUTES.metaCreators : LANDING_ROUTES.metaCreators} target="_blank">
        MetaCreators
      </a>{' '}
      page to explore some of the best studios and individuals who are building metaverse projects.
    </span>
  );
};
