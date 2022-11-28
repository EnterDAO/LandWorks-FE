import useLoadMoreButton from 'layout/components/load-more-button/useLoadMoreButton';

import { sessionStorageHandler } from 'utils';

const useMyPropertiesLoadMoreButton = <T>(items: T[]) => {
  return useLoadMoreButton(items, {
    itemsPerLoad: 18,
    initialListed: sessionStorageHandler('get', 'my-properties', 'listed') || 18,
  });
};

export default useMyPropertiesLoadMoreButton;
