import axios from "axios";

export const MainAxios= axios.create({
    baseURL: "https://physiotherapy-backend.onrender.com",
    withCredentials: true,
    timeout: 5000,
    timeoutErrorMessage: "error az samte server"

})
