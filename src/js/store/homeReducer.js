// Action Types
export const SET_HOME_DATA = 'SET_HOME_DATA'
export const SET_LOADING = 'SET_LOADING'
export const SET_ERROR = 'SET_ERROR'

// Initial state
const initialState = {
    data: null,
    loading: false,
    error: null,
    lastUpdated: null
}

// Home reducer
const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_HOME_DATA:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null,
                lastUpdated: new Date().toISOString()
            }
        
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        
        case SET_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        
        default:
            return state
    }
}

export default homeReducer 