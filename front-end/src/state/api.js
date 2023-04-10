const domain = "http://localhost:3000/api/";

const APIPath = {
    "login": domain + "user/login",
    "follow": domain + "user/follow",
    "getFollower": domain + "user/getFollower",
    "getFollowing": domain + "user/getFollowing",
    "register": domain + "user/register",
    "updateInfo": domain + "user/updateInfo",
    "searchUser": domain + "user/searchUser",
    "deleteUser": domain + "user/deleteUser",
    "postTweet": domain + "tweet/post",
    "editTweet": domain + "tweet/edit",
    "deleteTweet": domain + "tweet/delete",
    "getTweet": domain + "tweet/gettweet",
    "comment": domain + "tweet/comment",
    "like": domain + "tweet/like",
    "getComment": domain + "tweet/getcomment",
};


export default APIPath;
