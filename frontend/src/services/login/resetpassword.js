import { fetchUrl } from "../../utils/fetchUrl";

export const resetPassword = async (email, otp, password) =>{
    const url = 'http://localhost:5000' + '/api/v1/employees/resetPassword';
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = { email, otp, newPassword: password };
    const requestOptions = { method: 'POST', headers, body: JSON.stringify(body), redirect: 'follow' };
    return await fetchUrl(url, requestOptions);
}