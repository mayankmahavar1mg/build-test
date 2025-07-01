import React from "react"
import { Link, useCurrentRouteData } from "@tata1mg/router"
import { useSelector, useDispatch } from "react-redux"
import { addToCart, removeFromCart, updateQuantity } from "../../store/actions"
import css from "./Products.scss"

function Products() {
    const dispatch = useDispatch()
    const { data, error, isFetching } = useCurrentRouteData()
    const cart = useSelector(state => state.app.cart)
    const products = useSelector(state => state.app.products)

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId))
    }

    const handleUpdateQuantity = (productId, quantity) => {
        dispatch(updateQuantity(productId, quantity))
    }

    const getCartItem = (productId) => {
        return cart.find(item => item.id === productId)
    }

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    }

    if (isFetching) return <div className={css.loading}>Loading products...</div>
    if (error) return <div className={css.error}>Error loading products: {error.message}</div>

    return (
        <div className={css.container}>
            <header className={css.header}>
                <Link to="/" className={css.backLink}>
                    ← Back to Home
                </Link>
                <h1 className={css.title}>Products Store</h1>
                <p className={css.subtitle}>
                    Redux State Management Demo - Add items to cart and manage quantities
                </p>
                {data && (
                    <div className={css.routeData}>
                        <p>Route Data: {data.message || 'Products loaded successfully'}</p>
                    </div>
                )}
            </header>

            <main className={css.main}>
                <div className={css.content}>
                    <section className={css.productsSection}>
                        <h2>Available Products</h2>
                        <div className={css.productsGrid}>
                            {products.map(product => {
                                const cartItem = getCartItem(product.id)
                                const isInCart = !!cartItem

                                return (
                                    <div key={product.id} className={css.productCard}>
                                        <div className={css.productImage}>
                                            <img 
                                                src={product.image} 
                                                alt={product.name}
                                                className={css.image}
                                            />
                                        </div>
                                        <div className={css.productInfo}>
                                            <h3 className={css.productName}>{product.name}</h3>
                                            <p className={css.productDescription}>{product.description}</p>
                                            <div className={css.productPrice}>${product.price}</div>
                                            
                                            {isInCart ? (
                                                <div className={css.cartControls}>
                                                    <div className={css.quantityControls}>
                                                        <button 
                                                            onClick={() => handleUpdateQuantity(product.id, cartItem.quantity - 1)}
                                                            disabled={cartItem.quantity <= 1}
                                                            className={css.quantityBtn}
                                                        >
                                                            -
                                                        </button>
                                                        <span className={css.quantity}>{cartItem.quantity}</span>
                                                        <button 
                                                            onClick={() => handleUpdateQuantity(product.id, cartItem.quantity + 1)}
                                                            className={css.quantityBtn}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <button 
                                                        onClick={() => handleRemoveFromCart(product.id)}
                                                        className={css.removeBtn}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ) : (
                                                <button 
                                                    onClick={() => handleAddToCart(product)}
                                                    className={css.addBtn}
                                                >
                                                    Add to Cart
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>

                    <aside className={css.cartSection}>
                        <h2>Shopping Cart</h2>
                        {cart.length === 0 ? (
                            <div className={css.emptyCart}>
                                <p>Your cart is empty</p>
                                <p>Add some products to get started!</p>
                            </div>
                        ) : (
                            <div className={css.cartItems}>
                                {cart.map(item => (
                                    <div key={item.id} className={css.cartItem}>
                                        <div className={css.cartItemInfo}>
                                            <h4>{item.name}</h4>
                                            <p>${item.price} × {item.quantity}</p>
                                        </div>
                                        <div className={css.cartItemTotal}>
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                                <div className={css.cartTotal}>
                                    <strong>Total: ${getTotalPrice().toFixed(2)}</strong>
                                </div>
                                <button className={css.checkoutBtn}>
                                    Checkout ({cart.length} items)
                                </button>
                            </div>
                        )}
                    </aside>
                </div>
            </main>
        </div>
    )
}

// Server fetcher for SSR
Products.serverFetcher = async () => {
    try {
        // Simulate API call for products data
        await new Promise(resolve => setTimeout(resolve, 500))
        return { message: 'Products data loaded from server' }
    } catch (error) {
        console.error('Error fetching products data:', error)
        throw error
    }
}

// Client fetcher for client-side navigation
Products.clientFetcher = async () => {
    try {
        // Simulate API call for products data
        await new Promise(resolve => setTimeout(resolve, 300))
        return { message: 'Products data loaded from client' }
    } catch (error) {
        console.error('Error fetching products data:', error)
        throw error
    }
}

export default Products 