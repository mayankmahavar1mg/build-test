import React, { useState } from "react"
import { Link, useCurrentRouteData } from "@tata1mg/router"
import css from "./StylingDemo.scss"

function StylingDemo() {
    const [activeTheme, setActiveTheme] = useState('default')
    const [animationState, setAnimationState] = useState(false)
    const { data, error, isFetching } = useCurrentRouteData()

    const themes = {
        default: {
            primary: '#61dafb',
            secondary: '#282c34',
            accent: '#28a745'
        },
        dark: {
            primary: '#ff6b6b',
            secondary: '#2c3e50',
            accent: '#f39c12'
        },
        light: {
            primary: '#007bff',
            secondary: '#f8f9fa',
            accent: '#6f42c1'
        }
    }

    const currentTheme = themes[activeTheme]

    const toggleAnimation = () => {
        setAnimationState(!animationState)
    }

    if (isFetching) return <div className={css.loading}>Loading styling demo...</div>
    if (error) return <div className={css.error}>Error loading styling demo: {error.message}</div>

    return (
        <div className={css.container}>
            <header className={css.header}>
                <Link to="/" className={css.backLink}>
                    ← Back to Home
                </Link>
                <h1 className={css.title}>Styling Demo</h1>
                <p className={css.subtitle}>
                    Showcasing CSS Modules, Dynamic Styling, and Animations
                </p>
                {data && (
                    <div className={css.routeData}>
                        <p>Route Data: {data.message || 'Styling demo loaded successfully'}</p>
                    </div>
                )}
            </header>

            <main className={css.main}>
                <section className={css.themeSection}>
                    <h2>Theme Switcher</h2>
                    <p>Demonstrates dynamic CSS custom properties and theme switching</p>
                    
                    <div className={css.themeButtons}>
                        {Object.keys(themes).map(theme => (
                            <button
                                key={theme}
                                onClick={() => setActiveTheme(theme)}
                                className={`${css.themeBtn} ${activeTheme === theme ? css.active : ''}`}
                                style={{
                                    '--theme-primary': themes[theme].primary,
                                    '--theme-secondary': themes[theme].secondary,
                                    '--theme-accent': themes[theme].accent
                                }}
                            >
                                {theme.charAt(0).toUpperCase() + theme.slice(1)}
                            </button>
                        ))}
                    </div>
                </section>

                <section className={css.componentsSection}>
                    <h2>Styled Components</h2>
                    <p>Various components showcasing different styling approaches</p>
                    
                    <div className={css.componentGrid}>
                        {/* CSS Modules Card */}
                        <div className={css.card}>
                            <h3>CSS Modules</h3>
                            <p>This card uses CSS Modules with scoped styles</p>
                            <div className={css.badge}>CSS Modules</div>
                        </div>

                        {/* Dynamic Styling Card */}
                        <div 
                            className={css.card}
                            style={{
                                '--card-primary': currentTheme.primary,
                                '--card-secondary': currentTheme.secondary
                            }}
                        >
                            <h3>Dynamic Styling</h3>
                            <p>This card uses CSS custom properties for dynamic theming</p>
                            <div className={css.badge} style={{ background: currentTheme.accent }}>
                                Dynamic
                            </div>
                        </div>

                        {/* Inline Styles Card */}
                        <div 
                            className={css.card}
                            style={{
                                background: `linear-gradient(135deg, ${currentTheme.primary}20, ${currentTheme.accent}20)`,
                                border: `2px solid ${currentTheme.primary}`,
                                color: currentTheme.secondary === '#f8f9fa' ? '#333' : 'white'
                            }}
                        >
                            <h3>Inline Styles</h3>
                            <p>This card uses inline styles for maximum flexibility</p>
                            <div 
                                className={css.badge}
                                style={{
                                    background: currentTheme.primary,
                                    color: currentTheme.secondary === '#f8f9fa' ? '#333' : 'white'
                                }}
                            >
                                Inline
                            </div>
                        </div>
                    </div>
                </section>

                <section className={css.animationSection}>
                    <h2>Animations & Transitions</h2>
                    <p>CSS animations and transitions with React state</p>
                    
                    <div className={css.animationContainer}>
                        <button 
                            onClick={toggleAnimation}
                            className={css.animationToggle}
                            style={{ background: currentTheme.primary }}
                        >
                            {animationState ? 'Stop' : 'Start'} Animation
                        </button>
                        
                        <div className={css.animationDemo}>
                            <div className={`${css.animatedBox} ${animationState ? css.animate : ''}`}>
                                <span>CSS Animation</span>
                            </div>
                            
                            <div 
                                className={css.transitionBox}
                                style={{
                                    transform: animationState ? 'translateX(200px) rotate(360deg)' : 'translateX(0) rotate(0deg)',
                                    background: animationState ? currentTheme.accent : currentTheme.primary,
                                    transition: 'all 0.6s ease-in-out'
                                }}
                            >
                                <span>CSS Transition</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={css.responsiveSection}>
                    <h2>Responsive Design</h2>
                    <p>Responsive grid that adapts to different screen sizes</p>
                    
                    <div className={css.responsiveGrid}>
                        {[1, 2, 3, 4, 5, 6].map(num => (
                            <div 
                                key={num}
                                className={css.responsiveItem}
                                style={{
                                    background: `linear-gradient(45deg, ${currentTheme.primary}, ${currentTheme.accent})`,
                                    animationDelay: `${num * 0.1}s`
                                }}
                            >
                                Item {num}
                            </div>
                        ))}
                    </div>
                </section>

                <section className={css.featuresSection}>
                    <h2>Styling Features</h2>
                    <div className={css.featuresGrid}>
                        <div className={css.feature}>
                            <h4>CSS Modules</h4>
                            <p>Scoped styles with automatic class name generation</p>
                        </div>
                        <div className={css.feature}>
                            <h4>SCSS Support</h4>
                            <p>Full SCSS support with variables, mixins, and nesting</p>
                        </div>
                        <div className={css.feature}>
                            <h4>CSS Custom Properties</h4>
                            <p>Dynamic theming with CSS variables</p>
                        </div>
                        <div className={css.feature}>
                            <h4>Responsive Design</h4>
                            <p>Mobile-first responsive design patterns</p>
                        </div>
                        <div className={css.feature}>
                            <h4>Animations</h4>
                            <p>CSS animations and transitions with React integration</p>
                        </div>
                        <div className={css.feature}>
                            <h4>Flexible Styling</h4>
                            <p>Mix and match different styling approaches</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

// Server fetcher for SSR
StylingDemo.serverFetcher = async () => {
    try {
        // Simulate API call for styling demo data
        await new Promise(resolve => setTimeout(resolve, 300))
        return { message: 'Styling demo data loaded from server' }
    } catch (error) {
        console.error('Error fetching styling demo data:', error)
        throw error
    }
}

// Client fetcher for client-side navigation
StylingDemo.clientFetcher = async () => {
    try {
        // Simulate API call for styling demo data
        await new Promise(resolve => setTimeout(resolve, 150))
        return { message: 'Styling demo data loaded from client' }
    } catch (error) {
        console.error('Error fetching styling demo data:', error)
        throw error
    }
}

export default StylingDemo 