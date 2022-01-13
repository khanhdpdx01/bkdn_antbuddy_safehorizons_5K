import { actionTypes } from './action';

export const initCart = {
    cartItems: [],
    cart_id: null,
    cartTotal: 0,
    totalShipFee: 0,
    subTotalPrice: 0,
    quantityProduct: 0,
};

function reducer(state = initCart, action) {
    switch (action.type) {
        case actionTypes.GET_CART_SUCCESS:
            localStorage.setItem("persist:antbuddy",
                JSON.stringify({ cart_id: action.payload.cart.cart_id }));

            return {
                ...state,
                ...{ cart_id: action.payload.cart.cart_id },
                ...{ cartItems: action.payload.cart.line_items },
                ...{ cartTotal: action.payload.cart.total_price },
                ...{ totalShipFee: action.payload.cart.shipping_fee },
                ...{ subTotalPrice: action.payload.cart.sub_total_price },
                ...{ quantityProduct: action.payload.cart.line_items.length },
            };
        case actionTypes.UPDATE_CART_SUCCESS:
            const { cartItems } = state;
            const idxItem = cartItems.findIndex((item) => item.product.product_id === action.payload.updatedCartItem.product.product_id);
            if (idxItem !== -1) {
                cartItems[idxItem] = action.payload.updatedCartItem;
            } else {
                cartItems.push(action.payload.updatedCartItem);
            }
            localStorage.setItem("persist:antbuddy", JSON.stringify({ cart_id: action.payload.card_id }));
            // case add first product to cart but not load all cart item
            // if (state.cartTotal === 0 && state.subTotalPrice === 0) {
                let sumprice = 0;
                cartItems.forEach(item => {
                    sumprice += item.quantity * item.product.price - item.product.price * item.quantity
                        * item.product.discount / 100;
                })
                state.subTotalPrice = sumprice;
                state.cartTotal = state.subTotalPrice
                    + (action.payload.updatedCartItem.ship_fee ? action.payload.updatedCartItem.ship_fee : 0);
            // }
            return {
                ...state,
                ...cartItems,
                ...{ card_id: action.payload.card_id },
                ...{ quantityProduct: cartItems.length },
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
        case actionTypes.REMOVE_ITEM_SUCCESS:
            const lineItems = [...state.cartItems];
            const idx = lineItems.findIndex((item) => item.product.product_id === action.payload.product_id);
            if (idx !== -1) {
                state.subTotalPrice = state.subTotalPrice -
                    (lineItems[idx].product.price * lineItems[idx].quantity
                    - lineItems[idx].product.price * lineItems[idx].quantity
                        * lineItems[idx].product.discount / 100);
                state.cartTotal = state.subTotalPrice + state.totalShipFee;
                state.quantityProduct = state.quantityProduct - 1;
                lineItems.splice(idx, 1);
            }
            return {
                ...state,
                cartItems: lineItems,
            };
        default:
            return state;
    }
}

export default reducer;
