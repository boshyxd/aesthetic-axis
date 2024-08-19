import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    dark: {
      bg: "#1A202C",
      text: "#E2E8F0",
    },
    light: {
      bg: "#F7FAFC",
      text: "#1A202C",
    },
  },
  fonts: {
    heading: '"Josefin Sans", sans-serif',
    body: '"Josefin Sans", sans-serif',
  },
  styles: {
    global: (props) => ({
      body: {
        bg: "dark.bg",
        color: "dark.text",
      },
    }),
  },
});

export default theme;