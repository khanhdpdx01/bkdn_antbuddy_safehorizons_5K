import { actionTypes } from './action';

export const initCart = {
    cartItems: [],
    cartTotal: 0,
    totalShipFee: 0,
    amount: 0,
};

function reducer(state = initCart, action) {
    switch (action.type) {
        case actionTypes.GET_CART_SUCCESS:
            return {
                ...state,
            };
        case actionTypes.UPDATE_CART_SUCCESS:
            const { cartItems } = state;
            const idxItem = cartItems.findIndex((item) => (item.product_id === action.payload.updatedCartItem.product_id)
                && (item.cart_id === action.payload.updatedCartItem.cart_id));
            if (indxItem !== -1) {
                cartItems[idxItem] = action.payload.updatedCartItem;
            }
            cartItems.push(action.payload.updatedCartItem);
            return {
                ...state,
                // ...{ cartItems: action.payload.updatedCartItem },
                ...{ totalShipFee: action.payload.totalShipFee },
                ...{ amount: action.payload.amount },
                ...{ cartTotal: action.payload.cartTotal },
                ...{ amount: cartItems.length },
            };
        case actionTypes.CLEAR_CART_SUCCESS:
            return {
                ...state,
                ...{ cartItems: action.payload.cartItems },
                ...{ amount: action.payload.amount },
                ...{ cartTotal: action.payload.cartTotal },
            };
        case actionTypes.GET_CART_ERROR:
            return {
                ...state,
                ...{ error: action.error },
            };
        case actionTypes.UPDATE_CART_ERROR:
            return {
                ...state,
                ...{ error: action.error },
            };
        default:
            return state;
    }
}

export default reducer;
