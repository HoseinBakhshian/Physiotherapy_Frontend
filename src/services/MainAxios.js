import axios from "axios";

export const MainAxios= axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
    timeout: 5000,
    timeoutErrorMessage: "error az samte server"

})