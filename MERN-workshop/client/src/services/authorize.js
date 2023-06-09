//contain token / username => session storage
export const authentication = (res, next) => {
   if (window !== "undefined") {
      //contain data to store session
      sessionStorage.setItem("token", JSON.stringify(res.data.token));
      sessionStorage.setItem("user", JSON.stringify(res.data.username));
   }
   next();
};

// Get token
export const getToken = () => {
   if (window !== "undefined") {
      if (sessionStorage.getItem("token")) {
         return JSON.parse(sessionStorage.getItem("token"));
      } else {
         return false;
      }
   }
};

// Get user
export const getUser = () => {
   if (window !== "undefined") {
      if (sessionStorage.getItem("user")) {
         return JSON.parse(sessionStorage.getItem("user"));
      } else {
         return false;
      }
   }
};

//logout
export const logout = (next) => {
   if (window !== "undefined") {
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
   }
   next();
};
