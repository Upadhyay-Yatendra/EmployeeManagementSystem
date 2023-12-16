import {fetchUrl} from '../../utils/fetchUrl';

export const signin = async (email, password) =>{
    const url = 'https://employeemanagementsystem-dg3q.onrender.com/api/v1/employees/login'; 
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = {
        email,
        password
    };
    const requestOptions = { method: 'POST', headers, body: JSON.stringify(body), redirect: 'follow' };
    return await fetchUrl(url, requestOptions);
}