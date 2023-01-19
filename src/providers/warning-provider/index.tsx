import React from 'react';
import { useLocalStorage } from 'react-use-storage';

import { ReactComponent as RoundClose } from 'assets/icons/round-close.svg';
import Container from 'components/custom/container';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { Button } from 'design-system';

import s from './s.module.scss';

export type WarningContextType = {
  addWarn: (opts: WarnType) => () => void;
  warns: WarnType[];
};

const WarningContext = React.createContext<WarningContextType>({
  addWarn: () => () => undefined,
  warns: [],
});

export function useWarning(): WarningContextType {
  return React.useContext<WarningContextType>(WarningContext);
}

export type WarnType = {
  text: string;
  closable?: boolean;
  storageIdentity?: string;
};

type WarnProps = WarnType & {
  onClose?: () => void;
};

const Warn: React.FC<WarnProps> = (props) => {
  const { storageIdentity, text, closable, onClose } = props;

  const [storageState, setStorageState] = useLocalStorage(storageIdentity ?? '');

  function handleClose() {
    onClose?.();

    if (storageIdentity) {
      setStorageState(false);
    }
  }

  if (storageIdentity && storageState === false) {
    return null;
  }

  return (
    <Container
      sx={{
        py: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
      }}
      className={s.warning}
    >
      <Grid flow="col" gap={16} align="center">
        <Icon name="warning-outlined" color="red" />
        <Text type="p2" weight="semibold" className={s.text}>
          {text}
        </Text>
      </Grid>
      {closable && (
        <Button
          variant="secondary"
          sx={{
            width: '52px !important',
            p: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            '> *': { display: 'flex' },
          }}
          onClick={handleClose}
        >
          <RoundClose width={20} height={20} />
        </Button>
      )}
    </Container>
  );
};

const WarningProvider: React.FC = (props) => {
  const [warns, setWarns] = React.useState<WarnType[]>([]);

  function removeWarm(warn: WarnType) {
    setWarns((prevState) => prevState.filter((w) => w !== warn));
  }

  function addWarn(warn: WarnType) {
    setWarns((prevState) => [...prevState, warn]);

    return () => {
      removeWarm(warn);
    };
  }

  return (
    <WarningContext.Provider
      value={{
        addWarn,
        warns,
      }}
    >
      <Grid className="warning-list" flow="row">
        {warns.map((warn, idx) => (
          <Warn key={idx} {...warn} onClose={() => removeWarm(warn)} />
        ))}
      </Grid>
      {props.children}
    </WarningContext.Provider>
  );
};

export default WarningProvider;
