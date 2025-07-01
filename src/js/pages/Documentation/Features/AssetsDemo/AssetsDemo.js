import React, { useState } from 'react'
import DocumentationLayout from '../../DocumentationLayout'
import styles from './AssetsDemo.module.scss'

const AssetsDemo = () => {
    const [selectedAsset, setSelectedAsset] = useState('images')
    const [fontSize, setFontSize] = useState(16)

    const assets = {
        images: [
            { name: 'logo.png', size: '24 KB', type: 'PNG' },
            { name: 'hero-bg.jpg', size: '156 KB', type: 'JPEG' },
            { name: 'icon.svg', size: '2.1 KB', type: 'SVG' },
            { name: 'banner.webp', size: '89 KB', type: 'WebP' }
        ],
        fonts: [
            { name: 'Inter-Regular.woff2', size: '45 KB', type: 'WOFF2' },
            { name: 'Inter-Bold.woff2', size: '52 KB', type: 'WOFF2' },
            { name: 'Roboto-Regular.woff2', size: '38 KB', type: 'WOFF2' }
        ],
        documents: [
            { name: 'manual.pdf', size: '2.3 MB', type: 'PDF' },
            { name: 'data.json', size: '15 KB', type: 'JSON' },
            { name: 'config.xml', size: '3.2 KB', type: 'XML' }
        ]
    }

    return (
        <DocumentationLayout 
            title="Assets & Fonts" 
            description="Manage static assets and custom fonts in your Catalyst application with optimization and caching."
        >
            <div className={styles.assetsDemo}>
                <div className={styles.demoContent}>
                    <h2>Assets Management Examples</h2>
                    <p>This example demonstrates how Catalyst handles static assets, fonts, and file optimization.</p>
                    
                    <div className={styles.assetsExamples}>
                        <div className={styles.assetsExample}>
                            <h3>Asset Types</h3>
                            <p>Different types of assets and their optimization</p>
                            
                            <div className={styles.assetTypes}>
                                <div className={styles.typeTabs}>
                                    {Object.keys(assets).map(type => (
                                        <button
                                            key={type}
                                            className={`${styles.typeTab} ${selectedAsset === type ? styles.active : ''}`}
                                            onClick={() => setSelectedAsset(type)}
                                        >
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </button>
                                    ))}
                                </div>
                                
                                <div className={styles.assetList}>
                                    {assets[selectedAsset].map((asset, index) => (
                                        <div key={index} className={styles.assetItem}>
                                            <div className={styles.assetInfo}>
                                                <span className={styles.assetName}>{asset.name}</span>
                                                <span className={styles.assetType}>{asset.type}</span>
                                            </div>
                                            <div className={styles.assetSize}>{asset.size}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles.assetsExample}>
                            <h3>Font Loading</h3>
                            <p>Custom fonts with different loading strategies</p>
                            
                            <div className={styles.fontDemo}>
                                <div className={styles.fontControls}>
                                    <label>
                                        Font Size:
                                        <input
                                            type="range"
                                            min="12"
                                            max="32"
                                            value={fontSize}
                                            onChange={(e) => setFontSize(e.target.value)}
                                        />
                                        <span>{fontSize}px</span>
                                    </label>
                                </div>
                                
                                <div className={styles.fontPreview}>
                                    <div className={styles.fontSample} style={{ fontSize: `${fontSize}px` }}>
                                        <div className={styles.fontInter}>
                                            <h4>Inter Font Family</h4>
                                            <p>The quick brown fox jumps over the lazy dog.</p>
                                            <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                                            <p>abcdefghijklmnopqrstuvwxyz</p>
                                            <p>0123456789</p>
                                        </div>
                                        
                                        <div className={styles.fontRoboto}>
                                            <h4>Roboto Font Family</h4>
                                            <p>The quick brown fox jumps over the lazy dog.</p>
                                            <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                                            <p>abcdefghijklmnopqrstuvwxyz</p>
                                            <p>0123456789</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles.assetsExample}>
                            <h3>Asset Optimization</h3>
                            <p>Automatic optimization and caching strategies</p>
                            
                            <div className={styles.optimizationDemo}>
                                <div className={styles.optimizationStats}>
                                    <div className={styles.statItem}>
                                        <div className={styles.statValue}>85%</div>
                                        <div className={styles.statLabel}>Size Reduction</div>
                                    </div>
                                    <div className={styles.statItem}>
                                        <div className={styles.statValue}>2.3s</div>
                                        <div className={styles.statLabel}>Load Time</div>
                                    </div>
                                    <div className={styles.statItem}>
                                        <div className={styles.statValue}>1.2MB</div>
                                        <div className={styles.statLabel}>Total Size</div>
                                    </div>
                                </div>
                                
                                <div className={styles.optimizationFeatures}>
                                    <div className={styles.featureItem}>
                                        <h5>Image Optimization</h5>
                                        <ul>
                                            <li>Automatic WebP conversion</li>
                                            <li>Responsive image sizing</li>
                                            <li>Lazy loading</li>
                                        </ul>
                                    </div>
                                    
                                    <div className={styles.featureItem}>
                                        <h5>Font Optimization</h5>
                                        <ul>
                                            <li>WOFF2 format support</li>
                                            <li>Font display: swap</li>
                                            <li>Subset optimization</li>
                                        </ul>
                                    </div>
                                    
                                    <div className={styles.featureItem}>
                                        <h5>Caching Strategy</h5>
                                        <ul>
                                            <li>Long-term caching</li>
                                            <li>Cache busting</li>
                                            <li>CDN integration</li>
                                        </ul>
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

export default AssetsDemo 