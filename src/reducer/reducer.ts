import { useDispatch } from "react-redux";
import { api } from "../api/api";

const CREATEOTPCODE = "CREATEOTPCODE";
const SIGNING = "SIGNING";

let initialState = {
    otpCode: {} as number
}
const dispatch = useDispatch();

const signingReducer = (state = initialState, action: any) => {
    let newState = { ...state };

    switch (action.type) {
        case CREATEOTPCODE:
            newState.otpCode = action.otpCode;
            return newState;

        case SIGNING:
            return newState;
        default:
            return newState;
    }
}

export function createOtpCodeActionCreator() { //обращение к reducers
    return { type: CREATEOTPCODE }
}

export function createOtpCodeThunkCreator(phone: number) { //обращение к серверу
    return async (dispatch: any) => {
        try {
            const data = await api.createOtpCode(phone);
            console.log("dcdc");
            dispatch(createOtpCodeActionCreator());

            return data;
        }
        catch (error) {
            console.error("Ошибка:", error);
        }
    }
}

export function signingActionCreator() { //обращение к reducers
    return { type: SIGNING }
}

export function signingThunkCreator(phone: number, otpCode: number) { //обращение к серверу
    return async (dispatch: any) => {
        try {
            const data = await api.signing(phone, otpCode);
            dispatch(signingActionCreator());
        }
        catch (error) {
            console.error("Ошибка:", error);
        }
    }
}

export default signingReducer;