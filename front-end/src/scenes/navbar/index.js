// import { useState } from "react";
import {
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
} from "@mui/material";
import { Search, Message, Notifications } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setLogout } from "../../state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";

const Navbar = (loginStatus, ChatroomStatus) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const user = useSelector(state => state.user);

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  //   const fullName = `${user.firstName} ${user.lastName}`;
  const fullName = "Jimmy Hung";
  const [isLogin, setIsLogin] = useState(loginStatus);
  const [isChatroom, setIsChatroom] = useState(ChatroomStatus);
  const handleLogout = () => {
    setIsLogin(!isLogin);
    dispatch(setLogout());
  };

  const handleChatroomClick = () => {
    setIsChatroom(!ChatroomStatus);
  };
  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      {/* default */}
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/login")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          Teddit
        </Typography>
        <FlexBetween
          backgroundColor={neutralLight}
          borderRadius="0.5rem"
          gap={isLogin ? "4rem" : "20rem"}
          padding="0.1rem 1.5rem"
        >
          <InputBase placeholder="Search everything..." />
          <IconButton>
            <Search />
          </IconButton>
        </FlexBetween>
      </FlexBetween>
      {/* after login */}
      {isLogin && (
        <>
          <FlexBetween gap="2rem">
            <IconButton onClick={handleChatroomClick}>
              <Message sx={{ fontSize: "24px" }} />
            </IconButton>
            <Notifications sx={{ fontSize: "24px" }} />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </>
      )}
    </FlexBetween>
  );
};

export default Navbar;
