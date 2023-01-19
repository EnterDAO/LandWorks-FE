import React, { FC } from 'react';

import { Button, Icon } from 'design-system';

interface MapControlButtonProps {
  onClick: () => void;
  disabled?: boolean;
  icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
}

const MapControlButton: FC<MapControlButtonProps> = ({ icon: SpecificIcon, disabled, onClick }) => {
  return (
    <Button
      disabled={disabled}
      sx={{
        overflow: 'hidden',
        width: '36px !important',
        height: '36px !important',
        borderRadius: '8px',
        padding: 0,
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        '& > span': {
          display: 'flex',
        },
        ':before': {
          borderRadius: '0 !important',
        },
      }}
      onClick={onClick}
      variant="primary"
      type="button"
    >
      <Icon iconSize="m" iconElement={<SpecificIcon />} />
    </Button>
  );
};

export default MapControlButton;
