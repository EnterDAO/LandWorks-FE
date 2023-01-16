export const METAVERSES = {
  Decentraland: '1',
  Voxels: '2',
} as const;

export type MetaverseId = (typeof METAVERSES)[keyof typeof METAVERSES];
