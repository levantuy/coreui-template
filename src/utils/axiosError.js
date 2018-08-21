import { logout } from '../actions/action_auth';
import axios from 'axios';

const createAxiosMiddleware = (axios) => ({ dispatch, getState }) => {
    axios.interceptors.response.use(null, (error) => {
        if (error.response.status === 401) {
            alert('Your session has expired. Please login again.');
            dispatch(logout());
        }
    });

    return (next) => (action) => next(action);
}

export default createAxiosMiddleware(axios);