import { Dispatch, FC, SetStateAction } from 'react';
import {
  MY_PROPERTIES_TAB_STATE_ALL,
  MY_PROPERTIES_TAB_STATE_LENT,
  MY_PROPERTIES_TAB_STATE_RENTED,
} from 'constants/modules';

import { Box } from 'design-system';

import LandsBannerClaimRents from '../lands-banner-claim-rents';
import { RootStyled, TabListStyled, TabStyled, TypographyStyled } from './styled';

interface Props {
  setTab: Dispatch<SetStateAction<string>>;
  allCount: number;
  rentedCount: number;
  lentCount: number;
}

const LandsMyPropertiesHeader: FC<Props> = ({ allCount, rentedCount, lentCount, setTab }) => {
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <RootStyled>
      <Box>
        <TypographyStyled variant="h1">My Properties</TypographyStyled>
      </Box>

      <Box>
        <TabListStyled onChange={handleChange} aria-label="Lands tabs filter">
          <TabStyled
            label={
              <>
                <strong>
                  All <span>{allCount}</span>
                </strong>
              </>
            }
            value={MY_PROPERTIES_TAB_STATE_ALL}
          />
          <TabStyled
            label={
              <>
                <strong>
                  Rented <span>{rentedCount}</span>
                </strong>
              </>
            }
            value={MY_PROPERTIES_TAB_STATE_RENTED}
          />
          <TabStyled
            label={
              <>
                <strong>
                  Lent <span>{lentCount}</span>
                </strong>
              </>
            }
            value={MY_PROPERTIES_TAB_STATE_LENT}
          />
        </TabListStyled>
      </Box>

      <Box>
        <LandsBannerClaimRents />
      </Box>
    </RootStyled>
  );
};

export default LandsMyPropertiesHeader;
