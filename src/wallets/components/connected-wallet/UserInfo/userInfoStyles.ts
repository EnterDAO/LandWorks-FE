import { BEFORE_ELEMENT_BASE, OVERLAY_MEDIUM, OVERLAY_SMALL } from 'themes/utility-styles';

const styles = {
  userDetails: {
    minWidth: '265px',
    maxWidth: '330px',
    position: 'relative',
    margin: '0 15px',
    display: 'flex',
    justifyContent: 'flex-end',
    borderRadius: '10px',
    alignItems: 'center',
    cursor: 'pointer',
    zIndex: 0,
    // TODO This goes over the elements (texts, icon and avatar) and changes their color.
    // TODO You can see on other places in the app how we use overlays like this. And prevent changing the color of text and etc.
    '&:hover': {
      '::before': {
        ...OVERLAY_SMALL,
        borderRadius: '10px',
        zIndex: 1,
      },
    },
    '&:active': {
      '::before': {
        ...OVERLAY_MEDIUM,
        borderRadius: '10px',
        background: 'var(--theme-grey900-color)',
        zIndex: 1,
      },
    },
  },
  userAvatar: {
    width: '38px',
    height: '38px',
    position: 'relative',
    margin: '0 10px 0 25px',
    borderRadius: '30px',
    border: `2px solid ${'var(--theme-grey900-color)'}`,
    zIndex: 0,
    '::before': {
      ...BEFORE_ELEMENT_BASE,
      boxShadow: `0 0 0 3px ${'var(--theme-grey900-color)'} inset`,
      borderRadius: '30px', // TODO: Move radiuses to constants
      filter: 'blur(5px)',
      boxSizing: 'border-box',
      zIndex: -1,
    },
  },
  userName: {
    fontWeight: '700',
    color: 'var(--theme-grey900-color)',
    margin: '0 0 0 5px',
  },
  hiIcon: {
    margin: '0 5px',
  },
  dropdown: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5px',
    width: '40px',
    height: '40px',
    background: 'var(--theme-grey200-color)',
    borderRadius: '10px',
    flexDirection: 'column',
    padding: '12px 15px',
    transform: 'rotate(180deg)',
  },
  dropdownRotate: {
    transform: 'rotate(0deg)',
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5px',
    width: '40px',
    height: '40px',
    background: 'var(--theme-grey200-color)',
    borderRadius: '10px',
    flexDirection: 'column',
    padding: '12px 15px',
  },
  chevron: {
    position: 'absolute',
    transform: 'rotate(180deg)',
  },
  chevronRotate: {
    position: 'absolute',
    transform: 'rotate(0deg)',
  },
  divider: {
    height: '20px',
    width: '2px',
    backgroundColor: 'var(--theme-grey400-color)',
    margin: '10px',
    alignSelf: 'center',
  },
  notificationDot: {
    position: 'absolute',
    top: '10px',
    right: '20px',
    bottom: '41px',
    left: '31px',
    width: '9px',
    height: '9px',
    background: 'var(--theme-accent-color)',
    borderRadius: '50%',
    zIndex: 0,
    '::before': {
      ...BEFORE_ELEMENT_BASE,
      boxShadow: `0 0 0 3px ${'var(--theme-accent-color)'} inset`,
      borderRadius: '50%', // TODO: Move radiuses to constants
      filter: 'blur(5px)',
      boxSizing: 'border-box',
      zIndex: -1,
    },
  },
} as const;

export { styles };
