import React from "react";
import { Button, Box, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";


const UserInfo = ({ userId, name, createdDate, email, onClick= ()=> {}, search=false }) => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const users = useSelector(state => state.users);


  return (
    <Box
      display="flex"
      alignItems="center"
      mt="0.5rem"
      sx={{
        borderRadius: "0.5rem",
        "&:hover": {
          backgroundColor: palette.background.main,
        },
      }}
    >
      <Box flexBasis="30%">
        <Typography color={main}>{userId}</Typography>
      </Box>
      <Box flexBasis="30%">
        <Typography color={main}>{name}</Typography>
      </Box>
      <Box flexBasis="30%">
        <Typography color={main}>{email}</Typography>
      </Box>
      <Box flexBasis="30%">
        <Typography color={main}>{createdDate}</Typography>
      </Box>

      <Box flexBasis="20%">
        <Button
          onClick={onClick}
          sx={{
            color: palette.background.alt,
            backgroundColor: (search) ? palette.primary.light : palette.primary.red,
            borderRadius: "0.5rem",
            "&:hover": { cursor: "pointer" },
          }}
        >
          {search? "FOLLOW" : "DELETE"}
        </Button>
      </Box>
    </Box>
  );
};

export default UserInfo;
