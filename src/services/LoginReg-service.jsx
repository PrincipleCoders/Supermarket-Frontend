import axios from 'axios';

const API_URL = 'http://localhost:8080/auth/';

export function register(userData) {
    return axios.post(API_URL + 'register', {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        profilePicture: userData.profilePicture
    },
    {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export function validateLoginByToken(access_token) {
    return axios.get(API_URL + 'validateLogin', {
        headers: {
            Authorization: `Access ${access_token}`
        }
    });
}