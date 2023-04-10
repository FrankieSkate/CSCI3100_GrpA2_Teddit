import UserInfo from "./UserInfo";
import { Divider, Box } from "@mui/material";
import WidgetWrapper from "../../components/WidgetWrapper";
const UsersList = () => {
  const userLists = [
    {
      _Id: "1",
      userId: "abc",
      firstName: "Jimmy",
      lastName: "Hung",
      password: "12345678",
      createdDate: "07/04/2023",
    },
    {
      _Id: "2",
      userId: "abd",
      firstName: "Frankie",
      lastName: "Kwok",
      password: "12345678",
      createdDate: "07/04/2023",
    },
    {
      _Id: "3",
      userId: "abe",
      firstName: "Anthony",
      lastName: "Leung",
      password: "12345678",
      createdDate: "07/04/2023",
    },
  ];
  const deleteUser = _id => {};

  const editUser = _id => {};
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
          <Box flexBasis="20%">{"User Id"}</Box>
          <Box flexBasis="20%">{"Name"}</Box>
          <Box flexBasis="20%">{"Password"}</Box>
          <Box flexBasis="20%">{"Created date"}</Box>
          <Box flexBasis="20%">{"Action"}</Box>
        </Box>
        <Divider />
        <Box mt="1rem">
          {userLists.map(
            ({ _id, userId, firstName, lastName, createdDate, password }) => (
              <UserInfo
                key={_id}
                userId={userId}
                name={`${firstName} ${lastName}`}
                createdDate={createdDate}
                password={password}
                deleteUser={deleteUser}
                editUser={editUser}
              />
            )
          )}
        </Box>
      </WidgetWrapper>
    </>
  );
};
export default UsersList;
