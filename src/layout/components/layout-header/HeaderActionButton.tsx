import React, { FC } from 'react';

import { Button } from 'design-system';

const HeaderActionButton: FC<{ onClick: () => void }> = (props) => {
  return (
    <Button
      sx={{
        width: { xs: '100% !important', lg: 'auto' },
        minWidth: { lg: '150px !important', xl: '200px !important' },
        height: { lg: '42px !important', xl: '52px !important' },
      }}
      btnSize="medium"
      variant="gradient"
      {...props}
    />
  );
};

export default HeaderActionButton;
