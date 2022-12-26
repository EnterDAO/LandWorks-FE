import { useMemo } from 'react';

import useGetAllMetaCreatorsQuery from './useGetAllMetaCreatorsQuery';

const useGetMetaCreatorByIdQuery = (id: string) => {
  const request = useGetAllMetaCreatorsQuery();
  const data = useMemo(() => {
    if (!request.data) {
      return request.data;
    }

    return request.data.find((sceneBuilder) => sceneBuilder.builderName === id);
  }, [request.data, id]);

  return {
    ...request,
    isLoading: !request.data,
    data,
  };
};

export default useGetMetaCreatorByIdQuery;
