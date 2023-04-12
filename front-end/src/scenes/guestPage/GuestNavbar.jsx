import { IconButton, InputBase, Typography, useTheme } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";

const GuestNavbar = () => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const iconStyle = {
    fontSize: "25px",
    "&:hover": {
      color: primaryLight,
      cursor: "pointer",
    },
  };

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/")}
          sx={iconStyle}
        >
          TEDDIT
        </Typography>
        <FlexBetween
          backgroundColor={neutralLight}
          borderRadius="0.5rem"
          gap="3rem"
          padding="0.1rem 1.5rem"
        >
          <InputBase placeholder="Search everything..." />
          <IconButton>
            <Search />
          </IconButton>
        </FlexBetween>
      </FlexBetween>
      {/* Go to Login Page */}
      <FlexBetween gap="2rem">
        <Typography
          onClick={() => {
            navigate("/login");
          }}
          sx={{
            textDecoration: "underline",
            color: palette.primary.main,
            "&:hover": {
              cursor: "pointer",
              color: palette.primary.light,
            },
          }}
        >
          Explore more ? Click to Login
        </Typography>
      </FlexBetween>
    </FlexBetween>
  );
};

export default GuestNavbar;
