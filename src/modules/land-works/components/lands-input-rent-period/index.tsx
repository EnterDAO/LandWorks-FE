import { ChangeEvent } from 'react';

import { Grid, StyledSwitch } from 'design-system';
import { Option } from 'modules/interface';

import CustomDropdownInput from '../land-works-input';
import { LandsTooltip } from '../lands-tooltip';

import './index.scss';

interface IProps {
  isMinPeriodSelected: boolean;
  handleMinCheckboxChange: (e: any) => void;
  handleMinSelectChange: (value: number) => void;
  handleMinInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isMaxPeriodSelected: boolean;
  handleMaxCheckboxChange: (e: any) => void;
  handleMaxSelectChange: (value: number) => void;
  handleMaxInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleAtMostInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleAtMostSelectChange: (value: number) => void;
  minOptions: Option[];
  maxOptions: Option[];
  atMostOptions: Option[];
  minValue: number;
  maxValue: number;
  atMostValue: number;
}

export const RentPeriod: React.FC<IProps> = ({
  isMinPeriodSelected,
  handleMinCheckboxChange,
  handleMinSelectChange,
  handleMinInputChange,
  isMaxPeriodSelected,
  handleMaxCheckboxChange,
  handleMaxSelectChange,
  handleMaxInputChange,
  handleAtMostInputChange,
  handleAtMostSelectChange,
  minOptions,
  maxOptions,
  atMostOptions,
  minValue,
  maxValue,
  atMostValue,
}) => {
  console.log({ minOptions, maxOptions, atMostOptions });
  return (
    <>
      <Grid alignItems="center" display="flex" flexDirection="row" mt={3}>
        <span className="label">Min Rent Period</span>
        <StyledSwitch className="switch" checked={isMinPeriodSelected} onChange={handleMinCheckboxChange} />
      </Grid>
      {isMinPeriodSelected && (
        <Grid mt={3}>
          <CustomDropdownInput
            value={minValue}
            handleOptionChange={handleMinSelectChange}
            onInput={handleMinInputChange}
            options={minOptions}
          />
        </Grid>
      )}
      <Grid alignItems="center" display="flex" flexDirection="row" mt={3}>
        <span className="label">Max Rent Period</span>
        <StyledSwitch className="switch" checked={isMaxPeriodSelected} onChange={handleMaxCheckboxChange} />
      </Grid>
      {isMaxPeriodSelected && (
        <>
          <Grid mt={3}>
            <CustomDropdownInput
              value={maxValue}
              handleOptionChange={handleMaxSelectChange}
              onInput={handleMaxInputChange}
              options={maxOptions}
            />
          </Grid>
          <Grid alignItems="center" display="flex" flexDirection="row" mt={3}>
            <span className="label">Max Rent Queue</span>
            <span style={{ marginLeft: '15px' }}>in the future</span>
            <LandsTooltip
              zIndex={1001}
              placement="bottom"
              trigger="hover"
              text="The timestamp delta after which the protocol will not allow for the property to be rented. It is a utility to lenders so that they can enforce liquidity restrictions on the property being listed. E.g if the property is popular and rented non-stop, restrictions can be made using this configuration so that you can have your property liquid (available for withdrawal). This configuration resembles the maximum time you are willing to wait in order to withdraw your property from the protocol."
            />
          </Grid>
          <Grid mt={3}>
            <CustomDropdownInput
              value={atMostValue}
              handleOptionChange={handleAtMostSelectChange}
              onInput={handleAtMostInputChange}
              options={atMostOptions}
            />
          </Grid>
        </>
      )}
    </>
  );
};

export default RentPeriod;
