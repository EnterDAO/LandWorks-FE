import { useMetaverses } from '..';

const useMetaverseById = (metaverseId: string) => {
  const metaverses = useMetaverses();

  return metaverses.find((metaverse) => metaverse.id === metaverseId);
};

export default useMetaverseById;
