import axios from "axios";

const api = axios.create({
    baseURL: "https://api-node-teo.onrender.com",
})

export default api;
