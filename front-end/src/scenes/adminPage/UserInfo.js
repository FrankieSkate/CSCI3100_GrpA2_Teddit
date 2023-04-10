import React from "react";
import { Button, Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
const UserInfo = ({
  userId,
  name,
  createdDate,
  password,
  editUser,
  deleteUser,
}) => {
  const { palette } = useTheme();
  const main = palette.neutral.main;

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
      <Box flexBasis="20%">
        <Typography color={main}>{userId}</Typography>
      </Box>
      <Box flexBasis="20%">
        <Typography color={main}>{name}</Typography>
      </Box>
      <Box flexBasis="20%">
        <Typography color={main}>{password}</Typography>
      </Box>
      <Box flexBasis="20%">
        <Typography color={main}>{createdDate}</Typography>
      </Box>

      <Box flexBasis="20%">
        <FlexBetween m="0 1rem">
          <Button
            onClick={editUser}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: "0.5rem",
              "&:hover": { cursor: "pointer" },
            }}
          >
            EDIT
          </Button>
          <Button
            onClick={deleteUser}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.red,
              borderRadius: "0.5rem",
              "&:hover": { cursor: "pointer" },
            }}
          >
            DELETE
          </Button>
        </FlexBetween>
      </Box>
    </Box>
  );
};

export default UserInfo;
