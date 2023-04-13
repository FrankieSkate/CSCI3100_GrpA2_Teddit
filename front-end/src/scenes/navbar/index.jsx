import { useRef } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setSearch } from "../../state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef("");
  const user = useSelector(state => state.user);
  const token = useSelector(state => user.token);

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;
  const iconStyle = {
    fontSize: "25px",
    "&:hover": {
      color: primaryLight,
      cursor: "pointer",
    },
  };

  const searchTrigger = async (input) => {
    try{
      const [firstName, lastName]= input.split(" ")
      const res = await fetch(`http://localhost:8002/users/search/${firstName}/${lastName}`, {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const [data] = await res.json();
      dispatch(setSearch({search: data}));
      navigate("/search");
    } catch (err) {
      console.log("error",err);
    }
  }

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
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
          <InputBase 
            placeholder="Search everything..." 
            type="text"
            inputRef={inputRef}
          />
          <IconButton
          onClick={() => {
            searchTrigger(inputRef.current.value);
          }}>
            <Search />
          </IconButton>
        </FlexBetween>
      </FlexBetween>
      {/* after login */}
      <FlexBetween gap="2rem">
        <Message sx={iconStyle} onClick={() => navigate("/chatroom")} />
        <Notifications sx={iconStyle} />
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
            <MenuItem
              onClick={() => {
                dispatch(setLogout());
                navigate("/login");
              }}
            >
              Log Out
            </MenuItem>
          </Select>
        </FormControl>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
