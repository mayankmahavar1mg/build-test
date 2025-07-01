import React, { useState } from 'react'
import DocumentationLayout from '../../DocumentationLayout'
import styles from './FeaturesStylingDemo.module.scss'

const FeaturesStylingDemo = () => {
    const [theme, setTheme] = useState('light')
    const [fontSize, setFontSize] = useState('medium')

    return (
        <DocumentationLayout 
            title="Styling Features" 
            description="Learn how to style your Catalyst applications with SCSS, CSS modules, and dynamic theming."
        >
            <div className={styles.featuresStylingDemo}>
                <div className={styles.demoContent}>
                    <h2>Advanced Styling Examples</h2>
                    <p>This example demonstrates advanced styling capabilities in Catalyst including theming, responsive design, and CSS modules.</p>
                    
                    <div className={styles.stylingExamples}>
                        <div className={styles.stylingExample}>
                            <h3>Dynamic Theming</h3>
                            <p>Switch between light and dark themes</p>
                            
                            <div className={`${styles.themeDemo} ${styles[theme]}`}>
                                <div className={styles.themeControls}>
                                    <button 
                                        className={theme === 'light' ? styles.active : ''}
                                        onClick={() => setTheme('light')}
                                    >
                                        Light Theme
                                    </button>
                                    <button 
                                        className={theme === 'dark' ? styles.active : ''}
                                        onClick={() => setTheme('dark')}
                                    >
                                        Dark Theme
                                    </button>
                                </div>
                                
                                <div className={styles.themePreview}>
                                    <div className={styles.previewHeader}>
                                        <h4>Theme Preview</h4>
                                        <p>Current theme: {theme}</p>
                                    </div>
                                    <div className={styles.previewContent}>
                                        <div className={styles.card}>
                                            <h5>Sample Card</h5>
                                            <p>This card adapts to the selected theme.</p>
                                            <button className={styles.btnPrimary}>Primary Button</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles.stylingExample}>
                            <h3>Responsive Design</h3>
                            <p>Responsive layout that adapts to different screen sizes</p>
                            
                            <div className={styles.responsiveDemo}>
                                <div className={styles.screenSizes}>
                                    <div className={`${styles.screenSize} ${styles.mobile}`}>
                                        <span className={styles.label}>Mobile</span>
                                        <div className={styles.screenPreview}>
                                            <div className={styles.mobileContent}>
                                                <div className={styles.mobileHeader}>Header</div>
                                                <div className={styles.mobileBody}>Content</div>
                                                <div className={styles.mobileFooter}>Footer</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className={`${styles.screenSize} ${styles.tablet}`}>
                                        <span className={styles.label}>Tablet</span>
                                        <div className={styles.screenPreview}>
                                            <div className={styles.tabletContent}>
                                                <div className={styles.tabletSidebar}>Sidebar</div>
                                                <div className={styles.tabletMain}>Main Content</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className={`${styles.screenSize} ${styles.desktop}`}>
                                        <span className={styles.label}>Desktop</span>
                                        <div className={styles.screenPreview}>
                                            <div className={styles.desktopContent}>
                                                <div className={styles.desktopHeader}>Header</div>
                                                <div className={styles.desktopBody}>
                                                    <div className={styles.desktopSidebar}>Sidebar</div>
                                                    <div className={styles.desktopMain}>Main Content</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles.stylingExample}>
                            <h3>CSS Modules & SCSS</h3>
                            <p>Component-scoped styles with SCSS features</p>
                            
                            <div className={styles.scssDemo}>
                                <div className={styles.scssFeatures}>
                                    <div className={styles.featureItem}>
                                        <h4>Variables</h4>
                                        <div className={styles.colorPalette}>
                                            <div className={`${styles.colorSwatch} ${styles.primary}`}></div>
                                            <div className={`${styles.colorSwatch} ${styles.secondary}`}></div>
                                            <div className={`${styles.colorSwatch} ${styles.success}`}></div>
                                            <div className={`${styles.colorSwatch} ${styles.danger}`}></div>
                                        </div>
                                    </div>
                                    
                                    <div className={styles.featureItem}>
                                        <h4>Mixins</h4>
                                        <div className={styles.mixinExamples}>
                                            <button className={`${styles.btnMixin} ${styles.btnPrimary}`}>Primary</button>
                                            <button className={`${styles.btnMixin} ${styles.btnSecondary}`}>Secondary</button>
                                            <button className={`${styles.btnMixin} ${styles.btnOutline}`}>Outline</button>
                                        </div>
                                    </div>
                                    
                                    <div className={styles.featureItem}>
                                        <h4>Nesting</h4>
                                        <div className={styles.nestedStructure}>
                                            <div className={styles.parent}>
                                                <div className={styles.child}>
                                                    <div className={styles.grandchild}>Nested Elements</div>
                                                </div>
                                            </div>
                                        </div>
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

export default FeaturesStylingDemo 