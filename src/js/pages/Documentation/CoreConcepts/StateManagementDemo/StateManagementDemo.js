import React, { useState, useEffect, useMemo } from 'react'
import { useSelector, useDispatch, Provider } from 'react-redux'
import { addToCart, removeFromCart, updateQuantity } from './actions.js'
import configureLocalStore from './store.js'
import DocumentationLayout from '../../DocumentationLayout'
import css from './StateManagementDemo.module.scss'

// Dynamic imports using Catalyst aliases
const StateManagementDemoContent = () => {
    const dispatch = useDispatch()
    const { cart, products } = useSelector(state => state.app)
    const { data, loading, error, lastUpdated } = useSelector(state => state.homePageData)
    const [dynamicData, setDynamicData] = useState(null)

    // Dynamic import demonstration
    useEffect(() => {
        const loadDynamicData = async () => {
            try {
                // Simulate dynamic import
                const { getHomePageData, isLoading } = await import('./homePageActions.js')
                dispatch(isLoading())
                const result = await dispatch(getHomePageData())
                setDynamicData(result)
            } catch (error) {
                console.error('Dynamic import failed:', error)
            }
        }

        loadDynamicData()
    }, [dispatch])

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId))
    }

    const handleUpdateQuantity = (productId, quantity) => {
        dispatch(updateQuantity(productId, quantity))
    }

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    }

    return (
        <DocumentationLayout 
            title="State Management" 
            description="Manage application state effectively with Catalyst's built-in Redux integration and React hooks."
        >
            <div className={css.stateManagementDemo}>
                <div className={css.demoContent}>
                    <h2>State Management Examples</h2>
                    <p>This example demonstrates different state management patterns in Catalyst applications.</p>
                    
                    <div className={css.stateExamples}>
                        <div className={css.stateExample}>
                            <h3>Dynamic Imports with Catalyst Aliases</h3>
                            <p>Using @reducers and @actions for clean imports</p>
                            
                            <div className={css.dynamicImportDemo}>
                                <div className={css.codeExample}>
                                    <h4>Import Pattern</h4>
                                    <pre>{`// Using Catalyst aliases
import homeReducer from "@reducers/homeReducer.js"
import { getHomePageData, isLoading } from "@actions/homePageActions.js"`}</pre>
                                </div>
                                
                                <div className={css.dynamicData}>
                                    <h4>Dynamically Loaded Data</h4>
                                    {loading ? (
                                        <div className={css.loading}>Loading dynamic data...</div>
                                    ) : error ? (
                                        <div className={css.error}>Error: {error}</div>
                                    ) : dynamicData ? (
                                        <div className={css.dataDisplay}>
                                            <h5>{dynamicData.title}</h5>
                                            <p>{dynamicData.description}</p>
                                            <div className={css.features}>
                                                <strong>Features:</strong>
                                                <ul>
                                                    {dynamicData.features.map((feature, index) => (
                                                        <li key={index}>{feature}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className={css.stats}>
                                                <strong>Stats:</strong>
                                                <div>Performance: {dynamicData.stats.performance}</div>
                                                <div>Accessibility: {dynamicData.stats.accessibility}</div>
                                                <div>SEO: {dynamicData.stats.seo}</div>
                                            </div>
                                            {lastUpdated && (
                                                <small>Last updated: {new Date(lastUpdated).toLocaleString()}</small>
                                            )}
                                        </div>
                                    ) : (
                                        <div className={css.noData}>No data loaded</div>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        <div className={css.stateExample}>
                            <h3>Redux Global State (Shopping Cart)</h3>
                            <p>Global state management with Redux actions and reducers</p>
                            
                            <div className={css.reduxDemo}>
                                <div className={css.cartSection}>
                                    <h4>Shopping Cart</h4>
                                    <div className={css.cartItems}>
                                        {cart.length === 0 ? (
                                            <p className={css.emptyCart}>Cart is empty</p>
                                        ) : (
                                            cart.map(item => (
                                                <div key={item.id} className={css.cartItem}>
                                                    <div className={css.itemInfo}>
                                                        <h5>{item.name}</h5>
                                                        <p>${item.price}</p>
                                                    </div>
                                                    <div className={css.itemControls}>
                                                        <button 
                                                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            -
                                                        </button>
                                                        <span className={css.quantity}>{item.quantity}</span>
                                                        <button 
                                                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                        >
                                                            +
                                                        </button>
                                                        <button 
                                                            className={css.removeBtn}
                                                            onClick={() => handleRemoveFromCart(item.id)}
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    {cart.length > 0 && (
                                        <div className={css.cartTotal}>
                                            <strong>Total: ${getCartTotal().toFixed(2)}</strong>
                                        </div>
                                    )}
                                </div>
                                
                                <div className={css.productsSection}>
                                    <h4>Available Products</h4>
                                    <div className={css.productsGrid}>
                                        {products.map(product => (
                                            <div key={product.id} className={css.productCard}>
                                                <img src={product.image} alt={product.name} className={css.productImage} />
                                                <div className={css.productInfo}>
                                                    <h5>{product.name}</h5>
                                                    <p>{product.description}</p>
                                                    <p className={css.productPrice}>${product.price}</p>
                                                    <button 
                                                        className={css.addToCartBtn}
                                                        onClick={() => handleAddToCart(product)}
                                                    >
                                                        Add to Cart
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className={css.stateExample}>
                            <h3>Redux Store Structure</h3>
                            <p>Current Redux store state visualization</p>
                            
                            <div className={css.storeDemo}>
                                <div className={css.storeIndicator}>
                                    <span className={css.badge}>Redux Store</span>
                                    <div className={css.storeState}>
                                        <pre>{JSON.stringify({
                                            app: {
                                                cart: cart,
                                                products: products.length + ' products'
                                            },
                                            homePageData: {
                                                data: dynamicData ? 'Loaded' : 'Not loaded',
                                                loading: loading,
                                                error: error,
                                                lastUpdated: lastUpdated
                                            }
                                        }, null, 2)}</pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DocumentationLayout>
    )
}

// Main component with Redux Provider
const StateManagementDemo = () => {
    const store = useMemo(() => configureLocalStore(), [])
    
    return (
        <Provider store={store}>
            <StateManagementDemoContent />
        </Provider>
    )
}

export default StateManagementDemo 