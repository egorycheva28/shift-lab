import axios from "axios";

const instance = axios.create({
    baseURL: 'https://shift-intensive.ru/api/'
});

function createOtpCode(phone: number) {
    const body = {
        phone: phone
    }
    return instance.post("/auth/otp", body)
        .then(response => {
            if (response.status === 201) {
                return response.data;
            }
        })
        .catch(error => {
            console.log(error.response.data.error)
        });
}

function signing(phone: number, otpCode: number) {
    const body = {
        phone: phone,
        code: otpCode
    }
    return instance.post("/users/signin", body)
        .then(response => {
            if (response.status === 201) {
                return response.data;
            }
        })
        .catch(error => {
            console.log(error.response.data.error)
        });
}

export const api = {
    createOtpCode: createOtpCode,
    signing: signing
}