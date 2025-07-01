import React, { useState } from 'react'
import DocumentationLayout from '../../DocumentationLayout'
import css from './RoutingDemo.module.scss'

const RoutingDemo = () => {
    const [currentRoute, setCurrentRoute] = useState('home')
    const [routeParams, setRouteParams] = useState({})

    const routes = {
        home: { name: 'Home', path: '/', component: 'HomePage' },
        about: { name: 'About', path: '/about', component: 'AboutPage' },
        user: { name: 'User Profile', path: '/user/:id', component: 'UserPage' },
        products: { name: 'Products', path: '/products', component: 'ProductsPage' }
    }

    const handleRouteChange = (route) => {
        setCurrentRoute(route)
        if (route === 'user') {
            setRouteParams({ id: '123' })
        } else {
            setRouteParams({})
        }
    }

    return (
        <DocumentationLayout 
            title="Routing" 
            description="Master Catalyst's powerful routing system for dynamic navigation and parameter handling."
        >
            <div className={css.routingDemo}>
                <div className={css.demoContent}>
                    <h2>Dynamic Routing Examples</h2>
                    <p>This example demonstrates Catalyst's routing capabilities including dynamic parameters and navigation.</p>
                    
                    <div className={css.routingExample}>
                        <div className={css.routeNavigation}>
                            <h3>Route Navigation</h3>
                            <div className={css.navButtons}>
                                {Object.entries(routes).map(([key, route]) => (
                                    <button
                                        key={key}
                                        className={`${css.navBtn} ${currentRoute === key ? css.active : ''}`}
                                        onClick={() => handleRouteChange(key)}
                                    >
                                        {route.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        <div className={css.routeDisplay}>
                            <h3>Current Route</h3>
                            <div className={css.routeInfo}>
                                <div className={css.routePath}>
                                    <strong>Path:</strong> {routes[currentRoute].path}
                                </div>
                                <div className={css.routeComponent}>
                                    <strong>Component:</strong> {routes[currentRoute].component}
                                </div>
                                {Object.keys(routeParams).length > 0 && (
                                    <div className={css.routeParams}>
                                        <strong>Parameters:</strong>
                                        <pre>{JSON.stringify(routeParams, null, 2)}</pre>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <div className={css.routeContent}>
                            <h3>Component Content</h3>
                            <div className={css.contentSimulation}>
                                {currentRoute === 'home' && (
                                    <div className={`${css.pageContent} ${css.home}`}>
                                        <h4>Welcome to Home Page</h4>
                                        <p>This is the main landing page of our application.</p>
                                    </div>
                                )}
                                {currentRoute === 'about' && (
                                    <div className={`${css.pageContent} ${css.about}`}>
                                        <h4>About Us</h4>
                                        <p>Learn more about our company and mission.</p>
                                    </div>
                                )}
                                {currentRoute === 'user' && (
                                    <div className={`${css.pageContent} ${css.user}`}>
                                        <h4>User Profile</h4>
                                        <p>Viewing profile for user ID: {routeParams.id}</p>
                                    </div>
                                )}
                                {currentRoute === 'products' && (
                                    <div className={`${css.pageContent} ${css.products}`}>
                                        <h4>Products Catalog</h4>
                                        <p>Browse our collection of products.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DocumentationLayout>
    )
}

export default RoutingDemo 