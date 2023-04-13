import { Box, Typography, useTheme } from "@mui/material";
import Form from "./Form";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const primaryLight = theme.palette.primary.light;
  const iconStyle = {
    fontSize: "25px",
    "&:hover": {
      color: primaryLight,
      cursor: "pointer",
    },
  };
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem"
        textAlign="center"
      >
        <Typography
          fontWeight="bold"
          fontSize="48px"
          color="primary"
          onClick={() => navigate("/")}
          sx={iconStyle}
        >
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
          Welcome to TEDDIT, a social media that was cloned from Twitter
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
