import 'antd/dist/antd.min.css';

import 'cropperjs/dist/cropper.min.css';

export const CoreTheme = {
  colors: {
    main: {
      primary: '#5585FF',
    },
    utils: {
      text: {
        light: '#FFFFFF',
        dark: '#32325D',
      },
      background: {
        light: '#FFFFFF',
        mid: '#F8F9FE',
      },
      border: {
        mid: '#A4A5AB',
      },
    },
    functional: {
      disabled: '#B7B7B7',
      overlay: 'rgba(183, 183, 183, 0.75)',
      error: '#D42A2A',
    },
  },

  typography: {
    subtitle1: {
      fontWeight: 'normal',
      fontSize: '16px',
      textTransform: 'none',
      letterSpacing: '0.0015em',
    },
    subtitle2: {
      fontWeight: '500',
      fontSize: '14px',
      textTransform: 'none',
      letterSpacing: '0.001em',
    },
    body1: {
      fontWeight: 'normal',
      fontSize: '16px',
      textTransform: 'none',
      letterSpacing: '0.005em',
    },
    body2: {
      fontWeight: 'normal',
      fontSize: '14px',
      textTransform: 'none',
      letterSpacing: '0.0025em',
    },
    button: {
      fontWeight: '500',
      fontSize: '14px',
      textTransform: 'uppercase',
      letterSpacing: '0.0125em',
    },
    caption: {
      fontWeight: 'normal',
      fontSize: '12px',
      textTransform: 'none',
      letterSpacing: '0.004em',
    },
    overline: {
      fontWeight: 'normal',
      fontSize: '10px',
      textTransform: 'uppercase',
      letterSpacing: '0.015em',
    },
  },
};

export type CoreThemePropsType = {
  theme: typeof CoreTheme;
};
