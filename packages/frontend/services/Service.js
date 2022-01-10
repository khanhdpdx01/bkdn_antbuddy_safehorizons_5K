import axios from 'axios';
const baseDomain = 'http://localhost:8000/api/v1';

export default axios.create({
    baseURL: baseDomain,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    },
    withCredentials: true,
});

export const serializeQuery = query => {
    return Object.keys(query)
        .map(
            key =>
                `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        )
        .join('&');
};
