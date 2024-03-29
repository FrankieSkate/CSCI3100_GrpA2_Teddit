// color design tokens export
export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary: {
    50: "#B3CBFA",
    100: "#CCF7FE",
    200: "#99EEFD",
    300: "#66E6FC",
    400: "#33DDFB",
    500: "#5570A6",
    600: "#00A0BC",
    700: "#374197",
    800: "#00353F",
    900: "#992B2B",
  },
};

// mui theme settings
export const themeSettings = mode => {
  return {
    palette: {
      // palette values for light mode
      primary: {
        dark: colorTokens.primary[700],
        main: colorTokens.primary[500],
        light: colorTokens.primary[50],
        red: colorTokens.primary[900],
      },
      neutral: {
        dark: colorTokens.grey[700],
        main: colorTokens.grey[500],
        mediumMain: colorTokens.grey[400],
        medium: colorTokens.grey[300],
        light: colorTokens.grey[50],
      },
      background: {
        default: colorTokens.grey[10],
        alt: colorTokens.grey[0],
      },
    },
    typography: {
      fontFamily: ["Mulish", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Mulish", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Mulish", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Mulish", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Mulish", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Mulish", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Mulish", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
