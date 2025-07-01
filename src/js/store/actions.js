// Action Types
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY'

// Action Creators
export const addToCart = (product) => ({
    type: ADD_TO_CART,
    payload: {
        ...product,
        quantity: 1
    }
})

export const removeFromCart = (productId) => ({
    type: REMOVE_FROM_CART,
    payload: productId
})

export const updateQuantity = (productId, quantity) => ({
    type: UPDATE_QUANTITY,
    payload: {
        productId,
        quantity: Math.max(1, quantity) // Ensure quantity is at least 1
    }
}) 