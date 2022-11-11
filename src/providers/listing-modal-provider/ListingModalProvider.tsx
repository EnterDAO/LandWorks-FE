import React, { FC, useMemo, useState } from 'react';

import { Modal } from 'design-system';
import { BaseNFT } from 'modules/interface';
import ListNewProperty from 'modules/land-works/components/list-new-property';

import { createSafeContext, useSafeContext } from 'utils/context';

interface ContextValue {
  open: (asset?: BaseNFT) => void;
  asset?: BaseNFT;
}

const Context = createSafeContext<ContextValue>();

export const useListingModal = (): ContextValue => useSafeContext(Context);

const ListingModalProvider: FC = ({ children }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [asset, setAsset] = useState<BaseNFT>();

  const value = useMemo(() => {
    return {
      asset,
      open: (asset?: BaseNFT) => {
        setIsOpened(true);
        setAsset(asset);
      },
      close: () => {
        setIsOpened(false);
        setAsset(undefined);
      },
    };
  }, [asset]);

  return (
    <>
      <Context.Provider value={value}>
        {children}
        <Modal open={isOpened} handleClose={value.close}>
          <ListNewProperty asset={asset} closeModal={value.close} />
        </Modal>
      </Context.Provider>
    </>
  );
};

export default ListingModalProvider;
