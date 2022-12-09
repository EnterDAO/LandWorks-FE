import { useCallback, useMemo, useState } from 'react';

import { LoadMoreButtonProps } from './LoadMoreButton';

type UseLoadMoreButtonReturn<T> = Readonly<
  [T[], Required<Pick<LoadMoreButtonProps, 'listed' | 'total' | 'onLoadMore' | 'disabled'>>]
>;

const useLoadMoreButton = <T>(
  items: T[],
  { itemsPerLoad = 10, initialListed = itemsPerLoad }: { itemsPerLoad?: number; initialListed?: number }
): UseLoadMoreButtonReturn<T> => {
  const [listed, setListed] = useState(initialListed);
  const onLoadMore = useCallback(() => {
    setListed((prevState) => Math.min(prevState + itemsPerLoad, items.length));
  }, [itemsPerLoad, items.length]);

  // useLayoutEffect

  const loadMoreButtonProps = useMemo(() => {
    const total = items.length;
    const numberOfListed = Math.min(listed, total);
    const disabled = total === numberOfListed;

    return {
      onLoadMore,
      listed: numberOfListed,
      total,
      disabled,
    };
  }, [onLoadMore, items.length, listed]);

  const listedItems = useMemo(() => {
    return items.slice(0, listed);
  }, [items, listed]);

  return [listedItems, loadMoreButtonProps] as const;
};

export default useLoadMoreButton;
