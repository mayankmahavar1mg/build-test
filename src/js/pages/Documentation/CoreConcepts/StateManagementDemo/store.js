import { configureStore as createStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import appReducer from './reducer.js'
import homeReducer from './homeReducer.js'

/**
 * Local store configuration for StateManagementDemo
 * This demonstrates how to create a component-specific store
 */
const configureLocalStore = (initialState) => {
    const store = createStore({
        reducer: combineReducers({ 
            app: appReducer,
            homePageData: homeReducer
        }),
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: { api: null }, // No API for demo
                },
            }),
        preloadedState: initialState,
    })
    return store
}

export default configureLocalStore 