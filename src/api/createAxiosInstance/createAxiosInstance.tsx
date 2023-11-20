import axios from "axios";

const createAxiosInstance = () => {
    const config = {
        baseURL: process.env.REACT_APP_API_URL,
        headers: { "Content-Type": "application/json" }
    }

    return axios.create(config)
}

export default createAxiosInstance