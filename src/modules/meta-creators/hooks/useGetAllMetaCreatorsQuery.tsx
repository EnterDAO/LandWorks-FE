import useSWR from 'swr';

import { useNotion } from 'api/notion/client';

import { NotionResultForProfile } from '../components/scene-builder-card/types';

const useGetAllMetaCreatorsQuery = () => {
  const { getSceneProviders } = useNotion();

  return useSWR<NotionResultForProfile[]>('meta-creators', getSceneProviders);
};

export default useGetAllMetaCreatorsQuery;
