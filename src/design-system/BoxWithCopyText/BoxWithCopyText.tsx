import { FC, useEffect, useState } from 'react';
import { Box, BoxProps, Typography } from '@mui/material';

import { CopyIcon } from '../icons';
import Icon from '../icons/Icon';
import Tooltip from '../Tooltip/Tooltip';

import { THEME_COLORS } from 'themes/theme-constants';

const styles = {
  container: {
    padding: '20px',
    paddingTop: '15px',
    background: THEME_COLORS.accentBlue,
    borderRadius: '12px',
    maxWidth: '300px',
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  icon: {
    color: THEME_COLORS.light,
    cursor: 'pointer',
  },
} as const;

let copyButtonTimeout: NodeJS.Timeout | null = null;

interface BoxWithCopyTextProps extends BoxProps {
  heading: string;
  textToCopy: string;
}

const BoxWithCopyText: FC<BoxWithCopyTextProps> = (props) => {
  const { heading, textToCopy } = props;
  const [isWalletAddressCopied, setIsWalletAddressCopied] = useState(false);

  const copyWalletAddress = () => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setIsWalletAddressCopied(true);
        copyButtonTimeout = setTimeout(() => {
          setIsWalletAddressCopied(false);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    return () => {
      if (copyButtonTimeout !== null) {
        clearTimeout(copyButtonTimeout);
      }
    };
  }, []);

  return (
    <Box {...props} sx={styles.container}>
      <Typography variant="button" component="p" mb={2}>
        {heading}
      </Typography>
      {/* TODO Discuss text ellipsis */}
      <Box sx={styles.textContainer}>
        <Typography variant="button" component="p" mr={2} sx={styles.text}>
          {textToCopy}
        </Typography>
        <Tooltip
          title={
            <Typography variant="button" color={THEME_COLORS.grey01} component="p">
              {isWalletAddressCopied ? 'Copied!' : 'Copy'}
            </Typography>
          }
          placement="bottom"
        >
          <Icon iconElement={<CopyIcon />} iconSize="s" sx={styles.icon} onClick={() => copyWalletAddress()} />
        </Tooltip>
      </Box>
    </Box>
  );
};

export default BoxWithCopyText;
