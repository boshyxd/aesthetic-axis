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
  },
  fonts: {
    heading: '"Josefin Sans", sans-serif',
    body: '"Josefin Sans", sans-serif',
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "dark.bg" : "var(--bg-color)",
        color: props.colorMode === "dark" ? "dark.text" : "var(--text-color)",
      },
    }),
  },
});

export default theme;
