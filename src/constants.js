export const apiLink = {
    baseUrl: (process.env.NODE_ENV === 'production') 
        ? "https://newsgen-backend-23689059.us-west-2.elb.amazonaws.com/" 
        : "http://localhost:5001/",
    topNews: "news/top",
    signup: "user/signup",
    login: "auth/login",
    favNews: "news/favorite",
    logout: "auth/logout",
    markFav: "news/mark",
    deleteFav: (id) => `news/delete?id=${id}`,
    updateProfile: "user/profile", 
    getProfile: "user/info",
    deleteAccount: "user/delete",
    sendEmail: "password/sendemail",
    resetPassword: "password/reset",
    refreshToken: "auth/refreshtoken",
};

export const pageLink = {
    dashboard: "/user/dashboard",
    home: "/",
    news: "/user/news",
    profile: "/user/profile",
    email: "/password/email",
    login: "/login",
};

export const redux = {
    PENDING: "PENDING",
    SUCCESS: "SUCCESS",
    FAIL: "FAIL",
    UPDATE_USERNAME: "UPDATE_USERNAME",
    UPDATE_EMAIL: "UPDATE_EMAIL",
    UPDATE_PASSWORD: "UPDATE_PASSWORD",
    UPDATE_CPASSWORD: "UPDATE_CPASSWORD",
    UPDATE_USERNAME_OR_EMAIL: "UPDATE_USERNAME_OR_EMAIL",
    UPDATE_FAV_NEWS: "UPDATE_FAV_NEWS",
    SET_NEWS_TO_DELETE: "SET_NEWS_TO_DELETE",
    SET_ALL: "SET_ALL",
    SHOW_PROMPT: "SHOW_PROMPT",
    DELETE_PROFILE: "DELETE_PROFILE",
};