import axios from 'axios';
import Cookies from '../components/Cookies';

const fetchApi = (method, url, data) => {
    try {
        axios.interceptors.response.use(response => {
            return response;
        }, error => {
            return error.response.data;
        });

        let config = {
            method: method,
            url: url,
            data: (!!data) ? { ...data } : { },
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${Cookies.get('access_token')}`
            },
        }
        return axios(config);
    } catch (error) {
        return error;
    }
}

export default fetchApi;