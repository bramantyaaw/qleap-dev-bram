const initialState = {
    faqData: [],
};

const faqReducer = (state = initialState, action)=>{
    switch(action.type){
        case "SET_DATA_FAQ":
            return{
                ...state,
                faqData: action.payload,
            }
        default:
            return state;
    }
}
export default faqReducer;