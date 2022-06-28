export interface MoreFiltersType {
  type: string;
  size: minMax;
  distanceToRoad: minMax;
  distanceToPlaza: minMax;
  distanceToDistrict: minMax;
}

type minMax = {
  min: number;
  max: number;
};
