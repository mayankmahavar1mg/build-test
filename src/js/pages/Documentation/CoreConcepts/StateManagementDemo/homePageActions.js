import { SET_HOME_DATA, SET_LOADING, SET_ERROR } from './homeReducer.js'

// Action Creators
export const setHomeData = (data) => ({
    type: SET_HOME_DATA,
    payload: data
})

export const setLoading = (loading) => ({
    type: SET_LOADING,
    payload: loading
})

export const setError = (error) => ({
    type: SET_ERROR,
    payload: error
})

// Async Action Creator - getHomePageData
export const getHomePageData = () => {
    return async (dispatch, getState, { api }) => {
        try {
            dispatch(setLoading(true))
            
            // Simulate API call
            const mockData = {
                title: 'Welcome to Catalyst',
                description: 'A powerful React framework for building modern web applications',
                features: [
                    'Server-Side Rendering',
                    'Client-Side Hydration',
                    'Redux Integration',
                    'Dynamic Imports',
                    'Code Splitting'
                ],
                stats: {
                    performance: '95%',
                    accessibility: '100%',
                    seo: 'Excellent'
                }
            }
            
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000))
            
            dispatch(setHomeData(mockData))
            return mockData
        } catch (error) {
            dispatch(setError(error.message))
            throw error
        }
    }
}

// Loading action
export const isLoading = () => setLoading(true) 