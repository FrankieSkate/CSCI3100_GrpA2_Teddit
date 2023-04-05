import { ManageAccountsOutlined, EditOutlined } from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "../../../components/UserImage";
import FlexBetween from "../../../components/FlexBetween";
import WidgetWrapper from "../../../components/WidgetWrapper";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath }) => {
  //   const [user, setUser] = useState({});
  const { palette } = useTheme();
  const navigate = useNavigate();
  //   const token = useSelector(state => state.token);
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  //   const getUser = async () => {
  //     const response = await fetch(`http://localhost:3001/users/${userId}`, {
  //       method: "GET",
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     const data = await response.json();
  //     setUser(data);
  //   };

  //   useEffect(() => {
  //     getUser();
  //   }, []);

  //   if (!user) {
  //     return null;
  //   }
  const user = {
    firstName: "Jimmy",
    lastName: "Hung",
    viewedProfile: "frankie",
    friends: "frankie",
  };
  //   const { firstName, lastName, viewedProfile, friends } = user;
  const iconStyle = {
    "&:hover": {
      color: palette.primary.dark,
      cursor: "pointer",
    },
    fontSize: "24px",
  };

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.5rem "
        onClick={() => navigate("/profile")}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.dark,
                  cursor: "pointer",
                },
              }}
            >
              {user.firstName} {user.lastName}
            </Typography>
            <Typography color={medium}>
              {user.friends.length} friends
            </Typography>
          </Box>
        </FlexBetween>

        <ManageAccountsOutlined sx={iconStyle} />
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {user.viewedProfile}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="600">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={iconStyle} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="600">
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={iconStyle} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
