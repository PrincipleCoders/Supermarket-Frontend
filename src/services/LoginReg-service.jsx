import axios from 'axios';

const API_URL = 'http://localhost:8081/auth/';

export function validateLoginByToken(access_token) {
    return axios.get(API_URL + 'login', {
        headers: {
            Authorization: `AccessToken ${access_token}`
        }
    });
}