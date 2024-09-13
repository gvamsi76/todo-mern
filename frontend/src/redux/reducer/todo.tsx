import { todoType } from "../types/todo";


const initialState = {
    title: "",
    description: "",
    completed: ""
};
const todoReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case todoType.TODO_SUCCESS:
            return {
                ...state,
                data: action.payload,
            };
        case todoType.TODO_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};
export default todoReducer;
