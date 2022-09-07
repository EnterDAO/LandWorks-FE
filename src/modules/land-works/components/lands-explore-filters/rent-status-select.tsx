import { FC } from 'react';
import { QueryParamConfig, decodeNumber, encodeNumber, useQueryParam } from 'use-query-params';

import { ControlledSelect } from 'design-system';
import { isSomeEnum } from 'helpers/helpers';

import { statusData } from './filters-data';

import { RentStatus } from 'modules/land-works/constants';

const isPropertyRentStatusEnum = isSomeEnum(RentStatus);

const PropertyRentStatusParam: QueryParamConfig<number, RentStatus> = {
  encode: encodeNumber,
  decode: (value) => {
    const num = decodeNumber(value);

    return isPropertyRentStatusEnum(num) ? num : RentStatus.All;
  },
};

export const useRentStatusQueryParam = () => {
  return useQueryParam('status', PropertyRentStatusParam);
};

const RentStatusSelect: FC = () => {
  const [rentStatus, setRentStatus] = useRentStatusQueryParam();

  return (
    <ControlledSelect width="12.5rem" value={rentStatus} onChange={setRentStatus} withCheckbox options={statusData} />
  );
};

export default RentStatusSelect;
