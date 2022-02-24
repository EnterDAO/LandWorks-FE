import { AssetEntity, CoordinatesLAND } from './api';

export const calculateNeighbours = (coordinatesList: CoordinatesLAND[]): string[] => {
  let neighbours = [] as string[];

  for (const coordinates of coordinatesList) {
    neighbours = [...neighbours, ...getNeighbours(coordinates)];
  }

  return [...new Set(neighbours)].filter((item) => !coordinatesList.some((l) => l.id === item));
};

export const getNeighbours = (coordinates: CoordinatesLAND): string[] => {
  const numX = +coordinates.x;
  const numY = +coordinates.y;

  return [`${numX - 1}-${numY}`, `${numX}-${numY - 1}`, `${numX}-${numY + 1}`, `${numX + 1}-${numY}`];
};

export const getAllLandsCoordinates = (data: AssetEntity[]): CoordinatesLAND[] => {
  let coords: CoordinatesLAND[] = [];

  data.forEach((land) => {
    if (land.decentralandData?.coordinates) {
      coords = coords.concat(land.decentralandData?.coordinates);
    }
  });

  return coords;
};
