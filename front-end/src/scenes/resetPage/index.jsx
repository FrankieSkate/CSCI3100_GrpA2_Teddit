import { Box, Typography, useTheme } from "@mui/material";
import Form from "./Form";

const ResetPage = () => {
  const theme = useTheme();
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="48px" color="primary">
          TEDDIT
        </Typography>
      </Box>

      <Box
        width="50%"
        p="2rem"
        m="2rem auto"
        borderRadius="1rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="600" variant="h5" sx={{ mb: "1.5rem" }}>
          Reset Password
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default ResetPage;
