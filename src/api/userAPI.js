import axios from "axios";

const onestop_api_url = process.env.REACT_APP_ONESTOP_API_URL;

const userAPI = {
    retrieveInfo: async(email) => {
        return axios.get(`${onestop_api_url}/users/${email}`)
            .then((res) => res.data);
    }
}

export default userAPI;