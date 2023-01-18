import useSWRImmutable from 'swr/immutable';

import { getENSName } from 'helpers/helpers';

const useEnsName = (walletAddress: string | null) => {
  return useSWRImmutable(walletAddress, getENSName);
};

export default useEnsName;
