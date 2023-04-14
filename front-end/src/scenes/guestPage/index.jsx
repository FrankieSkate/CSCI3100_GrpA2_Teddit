import { Box } from "@mui/material";
import GuestNavbar from "./GuestNavbar";
import GuestPostsWidget from "../widgets/GuestPostsWidget";

const GuestPage = () => {
  return (
    <Box>
      <GuestNavbar />
      <Box
        width="50%"
        padding="2rem 5%"
        display="flex"
        gap="0.5rem"
        justifyContent="space-between"
        margin="auto"
      >
        <Box>
          <GuestPostsWidget />
        </Box>
      </Box>
    </Box>
  );
};

export default GuestPage;
