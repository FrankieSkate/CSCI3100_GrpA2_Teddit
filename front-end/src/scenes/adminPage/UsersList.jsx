import UserInfo from "./UserInfo";
import { Divider, Box } from "@mui/material";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUsers } from "../../state";
const UsersList = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const users = useSelector(state => state.users);

  const getUsers = async () => {
    const response = await fetch("http://localhost:8002/users/getAll", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setUsers({ users: data }));
  };

  console.log("users :", users);

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
              />
            ))}
        </Box>
      </WidgetWrapper>
    </>
  );
};
export default UsersList;
