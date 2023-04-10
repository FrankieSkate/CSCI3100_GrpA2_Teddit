import { Box } from "@mui/material";
import AdminNavbar from "./AdminNavbar";
import ManageUsers from "./ManageUsers";

const AdminPage = () => {
  return (
    <Box>
      <AdminNavbar />
      <Box
        width="100%"
        padding="2rem 5%"
        display="flex"
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis="100%">
          <ManageUsers />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminPage;
