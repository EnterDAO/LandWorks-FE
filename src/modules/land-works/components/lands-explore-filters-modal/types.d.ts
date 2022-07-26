export interface MoreFiltersType {
  type: string;
  size?: minMax;
  distanceToRoad?: minMax;
  distanceToPlaza?: minMax;
  distanceToDistrict?: minMax;
  height?: minMax;
  area?: minMax;
  hasBasement?: boolean;
  isWaterFront?: boolean;
}

type minMax = {
  min: number;
  max: number;
};
