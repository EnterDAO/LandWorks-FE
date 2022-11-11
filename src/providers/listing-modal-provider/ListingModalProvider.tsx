import React, { FC, useMemo, useState } from 'react';

import { Modal } from 'design-system';
import ListNewProperty from 'modules/land-works/components/list-new-property';

import { createSafeContext, useSafeContext } from 'utils/context';

interface ContextValue {
  open: () => void;
}

const Context = createSafeContext<ContextValue>();

export const useListingModal = (): ContextValue => useSafeContext(Context);

const ListingModalProvider: FC = ({ children }) => {
  const [isOpened, setIsOpened] = useState(false);

  const value = useMemo(() => {
    return {
      open: () => setIsOpened(true),
      close: () => setIsOpened(false),
    };
  }, []);

  return (
    <>
      <Context.Provider value={value}>{children}</Context.Provider>

      <Modal open={isOpened} handleClose={value.close}>
        <ListNewProperty closeModal={value.close} />
      </Modal>
    </>
  );
};

export default ListingModalProvider;
