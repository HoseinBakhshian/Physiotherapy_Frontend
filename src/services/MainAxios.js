import axios from "axios";

export const MainAxios= axios.create({
    baseURL: "https://physiotherapy-backend.onrender.com",
    withCredentials: true,
    timeoutErrorMessage: "error az samte server",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      }

})
