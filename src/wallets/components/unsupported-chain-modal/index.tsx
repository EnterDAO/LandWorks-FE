import { Typography } from '@mui/material';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Grid, Modal } from 'design-system';
import { networks } from 'helpers/chain-configurations';
import { useEthWeb3 } from 'providers/eth-web3-provider';
import { useWallet } from 'wallets/wallet';

interface UnsupportedChainModalProps {
  open: boolean;
  handleClose: () => void;
}

const UnsupportedChainModal: React.FC<UnsupportedChainModalProps> = ({
  handleClose,
  open,
}: UnsupportedChainModalProps) => {
  const ethWeb3 = useEthWeb3();
  const wallet = useWallet();

  return (
    <Modal handleClose={handleClose} height={'100%'} open={open}>
      <Grid width="480px" gap={24}>
        <Grid gap={16}>
          <Typography variant="h2">Wrong network</Typography>
          <Typography variant="body1">
            Please switch your wallet network to {ethWeb3.networkName ?? '<!>'} to use the app
          </Typography>
          <Typography variant="body1">
            If you still encounter problems, you may want to switch to a different wallet
          </Typography>
        </Grid>

        <Button
          variant="gradient"
          sx={{
            marginTop: 5,
          }}
          onClick={async () => {
            if (!(window as any).ethereum) {
              console.log("Couldn't find wallet");
            }
            try {
              await (window as any).ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: networks[ethWeb3.networkName.toLowerCase() as keyof typeof networks].chainId }],
              });
              handleClose?.();
              wallet.showWalletsModal();
            } catch (err) {
              console.error('error while switching networks');
            }
          }}
        >
          Switch network
        </Button>
      </Grid>
    </Modal>
  );
};

export default UnsupportedChainModal;
