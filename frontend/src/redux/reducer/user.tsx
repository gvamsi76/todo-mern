import { authType } from "../types/auth";


const initialState = {
    userId: "",
    error: null,
};
const authReducer = (state = initialState, action :any) => {
    switch (action.type) {
        case authType.LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                authenticate: true,
            };
        case authType.LOGIN_FAILURE:
            return {
                ...state,
                error: action.payload,
                authenticate: false,
            };
        default:
            return state;
    }
};
export default authReducer;
