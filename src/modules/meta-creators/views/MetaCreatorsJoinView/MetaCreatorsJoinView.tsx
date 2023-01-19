import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Widget } from '@typeform/embed-react';

import Container from 'components/custom/container';
import { Icon, Stack } from 'design-system';
import { BackIcon } from 'design-system/icons';
import { LocationState } from 'modules/interface';
import { useStickyOffset } from 'providers/sticky-offset-provider';
import { APP_ROUTES, LANDING_ROUTES, useIsAppRoute } from 'router/routes';

import { BreadCrumbs } from './styled';

const MetaCreatorsJoinView = () => {
  const stickyOffset = useStickyOffset();
  const location = useLocation<LocationState>();
  const isAppRoute = useIsAppRoute();
  const metaCreatorsRoute = isAppRoute ? APP_ROUTES.metaCreators : LANDING_ROUTES.metaCreators;

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleSubmit = () => {
    document.body.style.overflow = '';
  };

  return (
    <Container
      py={5}
      display="flex"
      flexDirection="column"
      minHeight={700}
      height={`calc(100vh - ${stickyOffset.offsets.header}px)`}
    >
      <BreadCrumbs>
        <Link className="button-back" to={location.state?.from || metaCreatorsRoute}>
          <div className="button-icon">
            <Icon iconSize={'m'} iconElement={<BackIcon />} />
          </div>
          <span>Back to {location.state?.title || 'Scene Builder'}</span>
        </Link>
      </BreadCrumbs>

      <Stack
        id="S4r8lyP4"
        component={Widget}
        onSubmit={handleSubmit}
        flex="1 1 100%"
        sx={{
          '*': {
            pointerEvents: 'all',
            borderRadius: '0px !important',
            overflow: 'hidden',
            flex: '1 1 100%',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      />
    </Container>
  );
};

export default MetaCreatorsJoinView;
