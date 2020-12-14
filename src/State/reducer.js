export const initialState = {
    profile: null,
    cart: null,
    cartproduct_complit: null,
    cartproductf_uncomplit: null,
    addsingleproduct: null
};

const reducer = (state, action) => {
    console.log(action.type);
    switch (action.type) {
        case "ADD_PROFILE":
            return {
                ...state,
                profile: action.profile,
            };
        case "ADD_CARTPRODUCT_COMPLIT":
            return {
                ...state,
                cartproduct_complit: action.cartproduct_complit,
            };
        case "ADD_CARTPRODUCT_UNCOMPLIT":
            return {
                ...state,
                cartproductf_uncomplit: action.cartproductf_uncomplit,
            };
        case "ADD_SINGLE_PEODUCT":
            return {
                ...state,
                addsingleproduct: action.addsingleproduct,
            };
        default:
            return state;
    }
};

export default reducer;