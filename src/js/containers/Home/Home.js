import React from "react"
import { Link, useCurrentRouteData } from "@tata1mg/router"
import css from "./Home.scss"

function Home() {
    const { data, error, isFetching } = useCurrentRouteData()

    if (isFetching) return <div className={css.loading}>Loading breeds...</div>
    if (error) return <div className={css.error}>Error loading breeds: {error.message}</div>

    const dogs = data?.message || []
    const breeds = Object.keys(dogs)

    return (
        <div className={css.app}>
            <header className={css.appHeader}>
                <h1 className={css.heading}>Catalyst Framework</h1>
                <p className={css.subtitle}>
                    A modern React framework with SSR, routing, and state management
                </p>
                
                <div className={css.navigation}>
                    <Link to="/products" className={css.navLink}>
                        Products (Redux Demo)
                    </Link>
                    <Link to="/about" className={css.navLink}>
                        About (Code Splitting)
                    </Link>
                    <Link to="/styling" className={css.navLink}>
                        Styling Demo
                    </Link>
                </div>
            </header>

            <main className={css.main}>
                <h2>Available Dog Breeds</h2>
                <p>Click on a breed to see details (demonstrates dynamic routing and data fetching)</p>
                
                <div className={css.breedGrid}>
                    {breeds.slice(0, 12).map(breed => (
                        <div key={breed} className={css.breedCard}>
                            <h3 className={css.breedName}>{breed}</h3>
                            <p>Click to see available dogs</p>
                            <Link to={`/breed/${breed}`} className={css.breedLink}>
                                View Dogs
                            </Link>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}

// Server fetcher for SSR
Home.serverFetcher = async () => {
    try {
        const response = await fetch('https://dog.ceo/api/breeds/list/all')
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching dog breeds:', error)
        throw error
    }
}

// Client fetcher for client-side navigation
Home.clientFetcher = async () => {
    try {
        const response = await fetch('https://dog.ceo/api/breeds/list/all')
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching dog breeds:', error)
        throw error
    }
}

export default Home
