import { Box, Typography } from "@mui/material";
import Navbar from "../navbar";
import { useNavigate } from "react-router-dom";
import WidgetWrapper from "../../components/WidgetWrapper";
import UserInfo from "../adminPage/UserInfo";
import { useSelector, useDispatch } from "react-redux";
import { setFriends } from "../../state";
import { Divider } from "@mui/material";

const SearchPage = () => {
  const search = useSelector(state => state.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector(state => state.user);
  const token = useSelector(state => state.token);

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:8002/users/${_id}/${search._id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
    navigate("/");
  };

  return (
    <Box>
      <Navbar />

      {search?._id ? 
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
            <UserInfo
              key={search._id}
              userId={search._id}
              name={`${search.firstName} ${search.lastName}`}
              email={search.email}
              createdDate={search.createdAt}
              onClick={patchFriend}
              search={true}
            />
          </Box>
        </WidgetWrapper>
      </> :
      <WidgetWrapper>
        <Typography fontWeight="600" variant="h2" component="h3" sx={{ mb: "1.5rem" }}>
          No user is found.
        </Typography>
      </WidgetWrapper>
    }
    </Box>
  );
};

export default SearchPage;
