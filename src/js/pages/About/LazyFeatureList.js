import React from "react"

function LazyFeatureList() {
    const features = [
        {
            title: "Server-Side Rendering (SSR)",
            description: "Pre-render pages on the server for better SEO and performance",
            icon: "⚡"
        },
        {
            title: "Client-Side Routing",
            description: "Fast navigation with client-side routing and data fetching",
            icon: "🛣️"
        },
        {
            title: "State Management",
            description: "Built-in Redux integration for predictable state management",
            icon: "📊"
        },
        {
            title: "Code Splitting",
            description: "Automatic code splitting and lazy loading for optimal performance",
            icon: "📦"
        },
        {
            title: "Styling Support",
            description: "CSS modules, SCSS, and CSS-in-JS support out of the box",
            icon: "🎨"
        },
        {
            title: "Hot Reloading",
            description: "Instant feedback during development with hot module replacement",
            icon: "🔥"
        }
    ]

    return (
        <div>
            <h3>Catalyst Framework Features</h3>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
                marginTop: '20px'
            }}>
                {features.map((feature, index) => (
                    <div key={index} style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        padding: '20px',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}>
                        <div style={{
                            fontSize: '24px',
                            marginBottom: '12px'
                        }}>
                            {feature.icon}
                        </div>
                        <h4 style={{
                            margin: '0 0 8px 0',
                            color: '#61dafb',
                            fontSize: '18px',
                            fontWeight: '600'
                        }}>
                            {feature.title}
                        </h4>
                        <p style={{
                            margin: '0',
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: '14px',
                            lineHeight: '1.5'
                        }}>
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LazyFeatureList 