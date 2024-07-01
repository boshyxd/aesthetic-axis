// src/theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: '"Josefin Sans", sans-serif',
    body: '"Josefin Sans", sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'var(--bg-color)',
        color: 'var(--text-color)',
      },
    },
  },
});

export default theme;
