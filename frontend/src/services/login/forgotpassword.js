import { fetchUrl } from "../../utils/fetchUrl";

export const forgotPassword = async (email)=>{
    const url = 'https://employeemanagementsystem-dg3q.onrender.com' + '/api/v1/employees/forgotPassword';
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = { email };
    const requestOptions = { method: 'POST', headers, body: JSON.stringify(body), redirect: 'follow' };
    return await fetchUrl(url, requestOptions);
}