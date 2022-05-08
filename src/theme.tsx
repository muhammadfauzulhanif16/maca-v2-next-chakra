import { ComponentStyleConfig, extendTheme } from "@chakra-ui/react";

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)",
};

export const theme = extendTheme({
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label":
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              pos: "absolute",
              pointerEvents: "none",
              my: 2,
              transformOrigin: "left top",
              _light: {
                bgColor: "gray.50",
              },
              _dark: {
                bgColor: "gray.900",
              },
            },
          },
        },
      },
    },
  },
  colors: {
    neutral: {
      50: "rgb(250 250 250)",
      100: "rgb(245 245 245)",
      400: "rgb(163 163 163)",
      500: "rgb(115 115 115)",
      800: "rgb(38 38 38)",
      900: "rgb(23 23 23)",
    },
  },
});
