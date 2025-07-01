import React from 'react'
import DocumentationLayout from '../../DocumentationLayout'
import css from './AppShellDemo.module.scss'

const AppShellDemo = () => {
    return (
        <DocumentationLayout 
            title="App Shell" 
            description="Learn how Catalyst implements the App Shell pattern for optimal performance."
        >
            <div className={css.appShellDemo}>
                <div className={css.demoContent}>
                    <h2>App Shell Implementation</h2>
                    <p>This example demonstrates how Catalyst implements the App Shell pattern to provide a fast, reliable loading experience.</p>
                    
                    <div className={css.appShellExample}>
                        <div className={css.shellHeader}>
                            <div className={css.logo}>Catalyst</div>
                            <nav className={css.nav}>
                                <a href="#" className={css.navLink}>Home</a>
                                <a href="#" className={css.navLink}>About</a>
                                <a href="#" className={css.navLink}>Contact</a>
                            </nav>
                        </div>
                        
                        <div className={css.shellContent}>
                            <div className={css.contentPlaceholder}>
                                <div className={css.loadingSkeleton}>
                                    <div className={css.skeletonLine}></div>
                                    <div className={css.skeletonLine}></div>
                                    <div className={css.skeletonLine}></div>
                                </div>
                                <p>App Shell loads instantly while content loads in background</p>
                            </div>
                        </div>
                        
                        <div className={css.shellFooter}>
                            <p>Footer content</p>
                        </div>
                    </div>
                </div>
            </div>
        </DocumentationLayout>
    )
}

export default AppShellDemo 