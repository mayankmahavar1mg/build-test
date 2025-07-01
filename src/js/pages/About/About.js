import React, { useState, Suspense } from "react"
import { Link, useCurrentRouteData } from "@tata1mg/router"
import css from "./About.scss"

// Lazy load components to demonstrate code splitting
const LazyFeatureList = React.lazy(() => import('./LazyFeatureList'))
const LazyTeamInfo = React.lazy(() => import('./LazyTeamInfo'))
const LazyContactForm = React.lazy(() => import('./LazyContactForm'))

function About() {
    const [activeTab, setActiveTab] = useState('features')
    const { data, error, isFetching } = useCurrentRouteData()

    const renderLazyComponent = () => {
        switch (activeTab) {
            case 'features':
                return <LazyFeatureList />
            case 'team':
                return <LazyTeamInfo />
            case 'contact':
                return <LazyContactForm />
            default:
                return <LazyFeatureList />
        }
    }

    if (isFetching) return <div className={css.loading}>Loading about page data...</div>
    if (error) return <div className={css.error}>Error loading about page: {error.message}</div>

    return (
        <div className={css.container}>
            <header className={css.header}>
                <Link to="/" className={css.backLink}>
                    ← Back to Home
                </Link>
                <h1 className={css.title}>About Catalyst</h1>
                <p className={css.subtitle}>
                    Code Splitting Demo - Components are loaded dynamically
                </p>
                {data && (
                    <div className={css.routeData}>
                        <p>Route Data: {data.message || 'About page loaded successfully'}</p>
                    </div>
                )}
            </header>

            <main className={css.main}>
                <div className={css.tabContainer}>
                    <div className={css.tabs}>
                        <button 
                            className={`${css.tab} ${activeTab === 'features' ? css.active : ''}`}
                            onClick={() => setActiveTab('features')}
                        >
                            Features
                        </button>
                        <button 
                            className={`${css.tab} ${activeTab === 'team' ? css.active : ''}`}
                            onClick={() => setActiveTab('team')}
                        >
                            Team
                        </button>
                        <button 
                            className={`${css.tab} ${activeTab === 'contact' ? css.active : ''}`}
                            onClick={() => setActiveTab('contact')}
                        >
                            Contact
                        </button>
                    </div>

                    <div className={css.tabContent}>
                        <Suspense fallback={
                            <div className={css.loading}>
                                <div className={css.spinner}></div>
                                <p>Loading component...</p>
                            </div>
                        }>
                            {renderLazyComponent()}
                        </Suspense>
                    </div>
                </div>

                <div className={css.info}>
                    <h2>Code Splitting Benefits</h2>
                    <ul>
                        <li>Reduces initial bundle size</li>
                        <li>Components load only when needed</li>
                        <li>Better performance and user experience</li>
                        <li>Automatic chunk splitting by route</li>
                    </ul>
                </div>
            </main>
        </div>
    )
}

// Server fetcher for SSR
About.serverFetcher = async () => {
    try {
        // Simulate API call for about page data
        await new Promise(resolve => setTimeout(resolve, 400))
        return { message: 'About page data loaded from server' }
    } catch (error) {
        console.error('Error fetching about page data:', error)
        throw error
    }
}

// Client fetcher for client-side navigation
About.clientFetcher = async () => {
    try {
        // Simulate API call for about page data
        await new Promise(resolve => setTimeout(resolve, 200))
        return { message: 'About page data loaded from client' }
    } catch (error) {
        console.error('Error fetching about page data:', error)
        throw error
    }
}

export default About 