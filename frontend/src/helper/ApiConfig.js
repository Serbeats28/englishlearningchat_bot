// import axios from "axios";


// const ApiRequest = axios.create({
//     baseURL: '/api'
// })

// ApiRequest.interceptors.request.use(config => {
//     config.headers['api-key'] = 'JerwinServitoSecretKey'
//     return config
// })

// export default ApiRequest

import axios from "axios";

let baseURL = "";

if (import.meta.env.DEV) {
    // Local: use Vite dev server proxy
    baseURL = "/api";
} else {
    // Production: use Render URL from .env
    baseURL = import.meta.env.VITE_API_URL;
}

const ApiRequest = axios.create({
    baseURL,
});

ApiRequest.interceptors.request.use((config) => {
    config.headers["api-key"] = "JerwinServitoSecretKey";
    return config;
});

export default ApiRequest;
