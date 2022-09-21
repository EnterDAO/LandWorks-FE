import { FC } from 'react';
import { QueryParamConfig, decodeNumber, encodeNumber, useQueryParam } from 'use-query-params';

import { ControlledSelect } from 'design-system';
import { isSomeEnum } from 'helpers/helpers';

import { statusData } from './filters-data';

import { sessionStorageHandler } from 'utils';

import { RentStatus } from 'modules/land-works/constants';

const isPropertyRentStatusEnum = isSomeEnum(RentStatus);

const STATUS_QUERY_PARAM_KEY = 'status';

const PropertyRentStatusParam: QueryParamConfig<number, RentStatus> = {
  encode: (value) => {
    sessionStorageHandler('set', 'explore-filters', STATUS_QUERY_PARAM_KEY, value);

    return encodeNumber(value);
  },
  decode: (value) => {
    const decodedValue = decodeNumber(value);

    if (isPropertyRentStatusEnum(decodedValue)) {
      return decodedValue;
    }

    const storedValue = sessionStorageHandler('get', 'explore-filters', STATUS_QUERY_PARAM_KEY);

    if (isPropertyRentStatusEnum(storedValue)) {
      return storedValue;
    }

    return RentStatus.All;
  },
};

export const useRentStatusQueryParam = (): [RentStatus, (newValue: number) => void] =>
  useQueryParam(STATUS_QUERY_PARAM_KEY, PropertyRentStatusParam);

const RentStatusSelect: FC = () => {
  const [rentStatus, setRentStatus] = useRentStatusQueryParam();

  return (
    <ControlledSelect width="12.5rem" value={rentStatus} onChange={setRentStatus} withCheckbox options={statusData} />
  );
};

export default RentStatusSelect;
