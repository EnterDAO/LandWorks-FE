import { ChangeEvent } from 'react';

import Icon from 'components/custom/icon';
import { Grid, StyledSwitch, Tooltip } from 'design-system';
import { Option } from 'modules/interface';

import CustomDropdownInput from '../land-works-input';

import './index.scss';

interface IProps {
  isMinPeriodSelected: boolean;
  handleMinCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMinSelectChange: (value: number) => void;
  handleMinInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isMaxPeriodSelected: boolean;
  handleMaxCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMaxSelectChange: (value: number) => void;
  handleMaxInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleAtMostInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleAtMostSelectChange: (value: number) => void;
  minOptions: Option[];
  maxOptions: Option[];
  atMostOptions: Option[];
  minOptionsValue: number;
  maxOptionsValue: number;
  atMostOptionsValue: number;
  minInputValue: number;
  maxInputValue: number;
  atMostInputValue: number;
  minError?: string;
  maxError?: string;
  atMostError?: string;
  withoutSwitch?: boolean;
  layout?: 'adaptive';
}

const RentPeriod: React.FC<IProps> = ({
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
  minOptionsValue,
  maxOptionsValue,
  atMostOptionsValue,
  minInputValue,
  maxInputValue,
  atMostInputValue,
  minError,
  maxError,
  atMostError,
  withoutSwitch,
  layout,
}) => {
  return (
    <Grid container rowSpacing={3} columnSpacing={3}>
      {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore */}
      <Grid item xs={layout === 'adaptive' ? 6 : 12} xxl={12}>
        <Grid alignItems="center" display="flex" flexDirection="row" mb="13px">
          <span className="label">Min Rent Period</span>
          {!withoutSwitch && (
            <StyledSwitch className="switch" checked={isMinPeriodSelected} onChange={handleMinCheckboxChange} />
          )}
        </Grid>
        {isMinPeriodSelected && (
          <>
            <Grid>
              <CustomDropdownInput
                defaultInputValue={minInputValue}
                optionsValue={minOptionsValue}
                handleOptionChange={handleMinSelectChange}
                onInput={handleMinInputChange}
                options={minOptions}
                error={minError}
              />
            </Grid>
            <div className="error">
              <span>{minError}</span>
            </div>
          </>
        )}
      </Grid>

      {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore */}
      <Grid item xs={layout === 'adaptive' ? 6 : 12} xxl={12}>
        <Grid alignItems="center" display="flex" flexDirection="row" mb="13px">
          <span className="label">Max Rent Period</span>
          {!withoutSwitch && (
            <StyledSwitch className="switch" checked={isMaxPeriodSelected} onChange={handleMaxCheckboxChange} />
          )}
        </Grid>

        {isMaxPeriodSelected && (
          <>
            <Grid>
              <CustomDropdownInput
                defaultInputValue={maxInputValue}
                optionsValue={maxOptionsValue}
                handleOptionChange={handleMaxSelectChange}
                onInput={handleMaxInputChange}
                options={maxOptions}
                error={maxError}
              />
            </Grid>
            <div className="error">
              <span>{maxError}</span>
            </div>
          </>
        )}
      </Grid>

      {isMaxPeriodSelected && (
        <Grid item xs={12}>
          <Grid alignItems="center" display="flex" flexDirection="row" mb="13px">
            <span className="label">Max Rent Queue</span>
            <Tooltip
              disableFocusListener
              placement="bottom-start"
              title={
                'The timestamp delta after which the protocol will not allow for the property to be rented. It is a utility to lenders so that they can enforce liquidity restrictions on the property being listed. E.g if the property is popular and rented non-stop, restrictions can be made using this configuration so that you can have your property liquid (available for withdrawal). This configuration resembles the maximum time you are willing to wait in order to withdraw your property from the protocol.'
              }
            >
              <div>
                <Icon name="about" className="info-icon" />
              </div>
            </Tooltip>
          </Grid>
          <Grid>
            <CustomDropdownInput
              defaultInputValue={atMostInputValue}
              optionsValue={atMostOptionsValue}
              handleOptionChange={handleAtMostSelectChange}
              onInput={handleAtMostInputChange}
              options={atMostOptions}
              error={atMostError}
            />
          </Grid>
          <div className="error">
            <span>{atMostError}</span>
          </div>
        </Grid>
      )}
    </Grid>
  );
};

export default RentPeriod;
