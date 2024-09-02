import axios from "axios";

export const MainAxios= axios.create({
    baseURL: "https://physiotherapy-backend.onrender.com",
    withCredentials: true,
    timeoutErrorMessage: "error az samte server"

})
