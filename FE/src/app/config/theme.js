import { createTheme } from '@mui/material'

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(45deg, #6CCDDF, #B07EE8, #E445F4)',
          color: 'white',
          minWidth: '10rem',
          width: '100%',
          borderRadius: '20px',
          margin: '10px 0',
          fontWeight: 600,
          '&:hover': {
            backgroundColor: 'darkblue',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: '10px 0',
          width: '100%',
          fieldset: {
            borderWidth: 1,
            borderColor: '#e6e6e6 !important',
            borderRadius: '10px',
          },
          input: {
            padding: '13px 10px',
          },
          '::placeholder': {
            color: '#e6e6e6',
          },
          '&:hover fieldset': {
            borderWidth: 1,
            borderColor: '#e6e6e6 !important',
          },
          '&:focus': {
            borderWidth: 1,
            borderColor: '#e6e6e6 !important',
          },
          borderRadius: 10,
          fontSize: '16px',
        },
      },
    },
  },
})

export default theme
