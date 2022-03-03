import { ChangeEvent } from 'react';

import { Grid, StyledSwitch } from 'design-system';

import CustomDropdownInput from '../land-works-input';

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
}) => {
  return (
    <>
      <Grid alignItems="center" display="flex" flexDirection="row" mt={3}>
        <span className="label">Min Rent Period</span>
        <StyledSwitch className="switch" checked={isMinPeriodSelected} onChange={handleMinCheckboxChange} />
      </Grid>
      {isMinPeriodSelected && (
        <Grid mt={3}>
          <CustomDropdownInput
            handleOptionChange={handleMinSelectChange}
            onInput={handleMinInputChange}
            options="times"
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
              handleOptionChange={handleMaxSelectChange}
              onInput={handleMaxInputChange}
              options="times"
            />
          </Grid>
          <Grid alignItems="center" display="flex" flexDirection="row" mt={3}>
            <span className="label">Max Rent Queue</span>
          </Grid>
          <Grid mt={3}>
            <CustomDropdownInput
              handleOptionChange={handleAtMostSelectChange}
              onInput={handleAtMostInputChange}
              options="times"
            />
          </Grid>
        </>
      )}
    </>
  );
};

export default RentPeriod;
