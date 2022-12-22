import { Box } from '@mui/material';

import Divider from 'components/custom/divider';
import Icon from 'components/custom/icon';
import { Tooltip } from 'design-system';

import DateTimePickerField from './DateTimePickerField';

import './index.scss';

interface RentDatePickerProps {
  endDate?: Date;
  startDate?: Date;

  minEndDate: Date;
  maxEndDate: Date;
  onChange: (value: Date | undefined) => void;
}

export const RentDatePicker = ({
  endDate,
  maxEndDate,
  minEndDate,
  onChange,
  startDate,
}: RentDatePickerProps): React.ReactElement => {
  return (
    <Box display="flex">
      <Box flexGrow={1}>
        <DateTimePickerField
          value={startDate}
          disabled
          label={
            <>
              Start Date
              <Tooltip
                placement="bottom-end"
                title="The timestamp your rent will start. If there is no rents for this land, this timestamp will be now. 
           Otherwise the timestamp will be the earliest possible one based on the booked rents. 
           The start of your rent is not configurable - it's the earliest possible timestamp."
              >
                <span>
                  <Icon name="about" className="info-icon" />
                </span>
              </Tooltip>
            </>
          }
        />
      </Box>

      <Divider
        sx={{
          width: 24,
          mx: '8px',
          mt: '58px',
          borderRadius: '1px',
          alignSelf: 'flex-start',
        }}
        flexItem
      />

      <Box flexGrow={1}>
        <DateTimePickerField
          value={endDate}
          onChange={onChange}
          minDate={minEndDate}
          maxDate={maxEndDate}
          label="End Date"
        />
      </Box>
    </Box>
  );
};
