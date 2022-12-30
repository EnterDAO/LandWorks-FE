import { useQuery } from '@apollo/client';

import { GET_METAVERSES_QUERY } from 'modules/land-works/api';

const useGetAllMetaversesQuery = () => {
  const { data, ...other } = useQuery<{ metaverses: { id: string; name: string }[] }>(GET_METAVERSES_QUERY);

  return {
    data: data?.metaverses,
    ...other,
  };
};

export default useGetAllMetaversesQuery;
