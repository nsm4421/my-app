import { extendTheme } from '@chakra-ui/react'

const customTheme = extendTheme({
  colors: {
    primary: '#FF0000', // Customize your primary color
    secondary: '#00FF00', // Customize your secondary color
  },
  fonts: {
    body: 'Roboto, sans-serif', // Customize your body font
    heading: 'Montserrat, serif', // Customize your heading font
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
      },
      sizes: {
        xl: {
          fontSize: '24px',
          padding: '16px 24px',
        },
      },
      variants: {
        solid: {
          bg: 'primary',
          color: 'white',
        },
      },
    },
  },
})

export default customTheme
