import { useState, useEffect } from 'react';
import Cookies from '../components/Cookies';
import axios from 'axios';

const useFetch = (url) => { 

    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        let config = {
            url,
            cancelToken: source.token,
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${Cookies.get('access_token')}`
            }
        };

        setTimeout(async () => {

            try {
                
                let response = await axios(config);

                setData(response.data);
                setError(null);
                setIsPending(false);

            } catch (thrown) {

                if (axios.isCancel(thrown)) {
                    console.log('Request canceled', thrown.message);
                    setData([]);
                    setError(thrown.message);
                    setIsPending(false);
                } else {
                    setData([]);
                    setError(thrown.message);
                    setIsPending(false);
                }

            }

        }, 1000);
        
        return () => source.cancel("axios request cancelled");
    }, [url]);

    return { data, isPending, error, setData };
}

export default useFetch;