import axios from "axios";


const ApiRequest = axios.create({
    baseURL: '/api'
})

ApiRequest.interceptors.request.use(config => {
    config.headers['api-key'] = 'JerwinServitoSecretKey'
    return config
})

export default ApiRequest