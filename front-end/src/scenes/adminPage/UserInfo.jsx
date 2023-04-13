import React from "react";
import { Button, Box, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../../state";
const UserInfo = ({ userId, name, createdDate, email }) => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const users = useSelector(state => state.users);

  console.log("testing users", users);
  const handleDelete = async () => {
    await fetch(`http://localhost:8002/users/delete`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    const temp_users = [...users];
    const newUsers = temp_users.filter(user => user._id !== userId);
    dispatch(setUsers(newUsers));
  };

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
          onClick={handleDelete}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.red,
            borderRadius: "0.5rem",
            "&:hover": { cursor: "pointer" },
          }}
        >
          DELETE
        </Button>
      </Box>
    </Box>
  );
};

export default UserInfo;
