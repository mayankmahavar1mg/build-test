import React from "react"
import { Link, useParams, useCurrentRouteData } from "@tata1mg/router"
import css from "./BreedDetail.scss"

function BreedDetail() {
    const { breedId } = useParams()
    const { data, error, isFetching } = useCurrentRouteData()

    if (isFetching) return <div className={css.loading}>Loading {breedId} images...</div>
    if (error) return <div className={css.error}>Error loading {breedId}: {error.message}</div>

    const images = data?.message || []

    return (
        <div className={css.container}>
            <header className={css.header}>
                <Link to="/" className={css.backLink}>
                    ← Back to Breeds
                </Link>
                <h1 className={css.title}>{breedId} Dogs</h1>
                <p className={css.subtitle}>
                    Showing {images.length} images of {breedId} dogs
                </p>
            </header>

            <main className={css.main}>
                {images.length > 0 ? (
                    <div className={css.imageGrid}>
                        {images.slice(0, 9).map((image, index) => (
                            <div key={index} className={css.imageCard}>
                                <img 
                                    src={image} 
                                    alt={`${breedId} dog ${index + 1}`}
                                    className={css.dogImage}
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={css.noImages}>
                        <p>No images available for {breedId}</p>
                    </div>
                )}
            </main>

            <footer className={css.footer}>
                <Link to="/" className={css.homeLink}>
                    View All Breeds
                </Link>
            </footer>
        </div>
    )
}

// Server fetcher for SSR
BreedDetail.serverFetcher = async ({ params }) => {
    const { breedId } = params
    try {
        const response = await fetch(`https://dog.ceo/api/breed/${breedId}/images`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(`Error fetching ${breedId} images:`, error)
        throw error
    }
}

// Client fetcher for client-side navigation
BreedDetail.clientFetcher = async ({ params }) => {
    const { breedId } = params
    try {
        const response = await fetch(`https://dog.ceo/api/breed/${breedId}/images`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(`Error fetching ${breedId} images:`, error)
        throw error
    }
}

export default BreedDetail 