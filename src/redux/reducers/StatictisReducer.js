export const initialState = {
    statictis: null
}
const StatictisReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'STATICTIS_SUCCESS':
            return {
                ...state,
                ...{statictis: action.payload}
            }
        default:
            return state
    }
}

export default StatictisReducer