import UserInfo from "./UserInfo";
import { Divider, Box, Snackbar, Button, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUsers } from "../../state";
const UsersList = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const users = useSelector(state => state.users);
  const [open, setOpen] = useState(false);

  const getUsers = async () => {
    const response = await fetch("http://localhost:8002/users/getAll", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setUsers({ users: data }));
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const onclickDelete = async (userId) => {
    try{
      await fetch(`http://localhost:8002/users/delete`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      }).then(() => {
        const temp_users = [...users];
        const newUsers = temp_users.filter(user => user._id !== userId);
        dispatch(setUsers({ users:newUsers}));
        setOpen(true);
      })
    } catch (err) {
      console.log("error",err);
    }
  };

  const action = (
    <Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <WidgetWrapper>
        <Box
          mb="1rem"
          width="100%"
          display="flex"
          justifyContent="space-between"
          flex-direction="column"
        >
          <Box flexBasis="30%">{"User Id"}</Box>
          <Box flexBasis="30%">{"Name"}</Box>
          <Box flexBasis="30%">{"Registered Email"}</Box>
          <Box flexBasis="30%">{"Created date"}</Box>
          <Box flexBasis="20%">{"Action"}</Box>
        </Box>
        <Divider />
        <Box mt="1rem">
          {users &&
            users
            .filter(user => user.admin===0)
            .map(({ _id, firstName, lastName, email, createdAt }) => (
              <UserInfo
                key={_id}
                userId={_id}
                name={`${firstName} ${lastName}`}
                email={email}
                createdDate={createdAt}
                onClick = {() => {onclickDelete(_id)}}
              />
            ))}
        </Box>
      </WidgetWrapper>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Success"
        action={action}
      />
    </>
  );
};
export default UsersList;
