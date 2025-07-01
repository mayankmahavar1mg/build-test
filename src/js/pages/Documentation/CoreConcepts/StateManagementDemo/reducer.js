import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY } from './actions.js'

// Initial state
const initialState = {
    cart: [],
    products: [
        {
            id: 1,
            name: "Wireless Headphones",
            description: "High-quality wireless headphones with noise cancellation",
            price: 199.99,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
        },
        {
            id: 2,
            name: "Smart Watch",
            description: "Feature-rich smartwatch with health tracking",
            price: 299.99,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop"
        },
        {
            id: 3,
            name: "Laptop",
            description: "Powerful laptop for work and gaming",
            price: 1299.99,
            image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop"
        },
        {
            id: 4,
            name: "Coffee Maker",
            description: "Automatic coffee maker with timer",
            price: 89.99,
            image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=300&fit=crop"
        },
        {
            id: 5,
            name: "Bluetooth Speaker",
            description: "Portable bluetooth speaker with great sound",
            price: 79.99,
            image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop"
        },
        {
            id: 6,
            name: "Gaming Mouse",
            description: "High-precision gaming mouse with RGB lighting",
            price: 59.99,
            image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop"
        }
    ]
}

// Reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const existingItem = state.cart.find(item => item.id === action.payload.id)
            if (existingItem) {
                return {
                    ...state,
                    cart: state.cart.map(item =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                }
            } else {
                return {
                    ...state,
                    cart: [...state.cart, action.payload]
                }
            }

        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload)
            }

        case UPDATE_QUANTITY:
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === action.payload.productId
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                )
            }

        default:
            return state
    }
}

export default reducer 