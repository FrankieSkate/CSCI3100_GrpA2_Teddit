import { Box, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "../../components/WidgetWrapper";
import UsersList from "./UsersList";

const ManageUsers = () => {
  const theme = useTheme();
  return (
    <WidgetWrapper>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="24px" color="primary">
          Manage Users System
        </Typography>
        <UsersList />
      </Box>
    </WidgetWrapper>
  );
};

export default ManageUsers;
