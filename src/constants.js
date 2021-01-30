export const apiLink = {
    topNews: "news/top",
    signup: "user/signup",
    login: "auth/login",
    favNews: "news/favorite",
    logout: "auth/logout",
    markFav: "news/mark",
    deleteFav: (id) => `news/delete?id=${id}`,
    updateProfile: "user/profile", 
    getProfile: "user/info", 
};

export const pageLink = {
    dashboard: "/user/dashboard",
    home: "/",
    news: "/user/news",
    profile: "/user/profile",
};

export const redux = {
    PENDING: "PENDING",
    SUCCESS: "SUCCESS",
    FAIL: "FAIL",
    UPDATE_USERNAME: "UPDATE_USERNAME",
    UPDATE_EMAIL: "UPDATE_EMAIL",
    UPDATE_PASSWORD: "UPDATE_PASSWORD",
    UPDATE_CPASSWORD: "UPDATE_CPASSWORD",
    UPDATE_USERNAME_OR_EMAIL: "UPDATE_USERNAME_OR_EMAIL"
};