import { setMode, setLogin, setLogout, setFriends, setPosts, setPost } from "./state";
import { APIPath } from "./api";
import axios from 'axios';

const login = async (account, password) => {
    await axios.post(APIPath.login, {
        "account": account,
        "password": password
    }).then((response) => {
        dispatch(
            setLogin({
                user: response.data,
                // token: loggedIn.token,
            })
        );
        navigate("/home");
    }).catch((error) => {
        return "Invalid account or password";
    });
};


const register = async (account, password, mail_address) => {
    await axios.post(APIPath.register, {
        "account": account,
        "password": password,
        "mail_address": mail_address
    }).then(() => {
        navigate("/successRegister");
    }).catch((error) => {
        return false;
    });
};

const logout = async () => {
    dispatch(setLogout());
    navigate("/login");
};

const getFollower = async () => {
    const user = useSelector(state => state.user);
    await axios.get(APIPath.getFollower, { 
        params: { "user_id": user.user_id } 
    }).then((response) => {
        dispatch(setFriends(response.data));
    }).catch((error) => {
        return false;
    });
};

const getFollowing = async () => {
    const user = useSelector(state => state.user);
    await axios.get(APIPath.getFollowing, { 
        params: { "user_id": user.user_id } 
    }).then((response) => {
        dispatch(setFriends(response.data));
    }).catch((error) => {
        return false;
    });
};

const search_user = async (search_params) => {
    await axios.get(APIPath.searchUser, { 
        params: { "search_field": search_params } 
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        return false;
    });
};

const deleteAccount = async () => {
    const user = useSelector(state => state.user);
    await axios.delete(`${APIPath.deleteUser}/${user.user_id}`).then(() => {
        navigate("/login");
    }).catch((error) => {
        return false;
    });
};

const deleteUser = async (user_id) => {
    const admin = useSelector(state => state.admin);
    if(!admin){
        return false;
    }
    await axios.delete(`${APIPath.deleteUser}/${user_id}`).then(() => {
        navigate("/login");
    }).catch((error) => {
        return false;
    });
};

const getPosts = async () => {
    await axios.get(APIPath.getTweet).then((response) => {
        dispatch(setPosts(response.data));
    }).catch((error) => {
        return false;
    });
};

const getFollowingPosts = async () => {
    const user = useSelector(state => state.user);
    await axios.get(APIPath.getFollowingPosts, { 
        params: { "user_id": user.user_id } 
    }).then((response) => {
        dispatch(setPosts(response.data));
    }).catch((error) => {
        return false;
    });
};

const follow = async (following_id) => {
    const user = useSelector(state => state.user);
    const friends = useSelector(state => state.friends);
    await axios.post(APIPath.follow, {
        "user_id": user.user_id,
        "following_id": following_id
    }).then((response) => {
        dispatch(setFriends(response.data));
        return true;
    }).catch((error) => {
        return false;
    });
};

const unfollow = async (following_id) => {
    const user = useSelector(state => state.user);
    await axios.post(APIPath.unfollow, {
        "user_id": user.user_id,
        "following_id": following_id
    }).then(() => {
        return true;
    }).catch((error) => {
        return false;
    });
};

const post = async (content) => {
    const user = useSelector(state => state.user);
    await axios.post(APIPath.post, {
        "user_id": user.user_id,
        "content": content
    }).then(() => {
        return true;
    }).catch((error) => {
        return false;
    });
};

const comment = async (tweet_id, content) => {
    const user = useSelector(state => state.user);
    await axios.post(APIPath.comment, {
        "user_id": user.user_id,
        "tweet_id": tweet_id,
        "content": content
    }).then(() => {
        return true;
    }).catch((error) => {
        return false;
    });
};

// like/dislike : 0/1
const like = async (like) => {
    const user = useSelector(state => state.user);
    await axios.post(APIPath.like, {
        "user_id": user.user_id,
        "tweet_id": tweet_id
    }).then(() => {
        return true;
    }).catch((error) => {
        return false;
    });
};

const getPostsComment = async (tweet_id) => {
    await axios.get(APIPath.getComment, { 
        params: { "tweet_id": tweet_id } 
    }).then((response) => {
        dispatch(setPost(response.data));
    }).catch((error) => {
        return false;
    });
};
