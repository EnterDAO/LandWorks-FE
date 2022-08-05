import { NavLink } from 'react-router-dom';
import { styled } from '@mui/system';

const StyledNavLink = styled(NavLink, { shouldForwardProp: (propName) => propName !== 'sx' })({});

export default StyledNavLink;
