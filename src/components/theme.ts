import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'none',
        color: '#696969',
        fontSize: 10,
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          width: 160,
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 16,
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 700,
      md: 850,
      lg: 1000,
      xl: 1536,
    },
  },
});

export default theme;
