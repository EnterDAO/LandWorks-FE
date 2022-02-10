import { Box, IconButton, Typography } from 'design-system';
import { CloseIcon } from 'design-system/icons';

import { styles } from './actionMessage-styles';

interface ActionMessageProps {
  messageText: string;
  messageType?: string;
  closeMessage?: () => void;
  onClickMessageType?: () => void;
}

const ActionMessage = (props: ActionMessageProps) => {
  const { messageText, messageType, closeMessage, onClickMessageType } = props;

  return (
    <Box sx={styles.messageContainer}>
      <Typography variant="button" sx={{ fontWeight: '500' }}>
        {messageText}
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <Typography variant="button" onClick={onClickMessageType}>
          {messageType?.toUpperCase()}
        </Typography>
        <IconButton
          variant="circular"
          btnSize="small"
          icon={<CloseIcon />}
          colorVariant="light"
          onClick={closeMessage}
          sx={styles.closeIcon}
        />
      </Box>
    </Box>
  );
};
export default ActionMessage;
