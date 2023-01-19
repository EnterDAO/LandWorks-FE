import { styled } from '@mui/material';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => {
  return {
    padding: '0 0 25px 40px',
    [theme.breakpoints.up('md')]: {
      paddingLeft: 67,
    },
  };
});

export default AccordionDetails;
