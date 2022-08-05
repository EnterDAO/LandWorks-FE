import React from 'react';

import { routes } from 'router/routes';

export const CanIHire: React.FC = () => {
  return (
    <span>
      Yes! Visit our{' '}
      <a href={routes.sceneBuilder} target="_blank">
        Scene Builders
      </a>{' '}
      page to explore some of the best studios and individuals who are building metaverse projects.
    </span>
  );
};
