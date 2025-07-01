import React, { useState } from 'react'
import DocumentationLayout from '../../DocumentationLayout'
import styles from './MiddlewareDemo.module.scss'

const MiddlewareDemo = () => {
    const [selectedMiddleware, setSelectedMiddleware] = useState('logging')
    const [requestLog, setRequestLog] = useState([])
    const [isEnabled, setIsEnabled] = useState(true)

    const middlewares = {
        logging: {
            name: 'Request Logging',
            description: 'Log all incoming requests for debugging and monitoring',
            code: `app.use((req, res, next) => {
    console.log(\`\${req.method} \${req.url} - \${new Date().toISOString()}\`)
    next()
})`,
            benefits: ['Debug requests', 'Monitor performance', 'Track errors']
        },
        cors: {
            name: 'CORS',
            description: 'Handle Cross-Origin Resource Sharing for API endpoints',
            code: `app.use(cors({
    origin: ['http://localhost:3000', 'https://yourdomain.com'],
    credentials: true
})`,
            benefits: ['Cross-origin requests', 'Security control', 'API access']
        },
        compression: {
            name: 'Compression',
            description: 'Compress response bodies for better performance',
            code: `app.use(compression({
    level: 6,
    threshold: 1024
})`,
            benefits: ['Reduced bandwidth', 'Faster loading', 'Better UX']
        },
        rateLimit: {
            name: 'Rate Limiting',
            description: 'Limit requests per IP to prevent abuse',
            code: `app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
})`,
            benefits: ['Prevent abuse', 'Protect resources', 'Fair usage']
        }
    }

    const simulateRequest = () => {
        if (!isEnabled) {
            addLog('Middleware disabled - request processed normally', 'warning')
            return
        }

        const middleware = middlewares[selectedMiddleware]
        addLog(`Processing request with ${middleware.name}`, 'info')
        
        if (selectedMiddleware === 'logging') {
            addLog(`GET /api/data - ${new Date().toISOString()}`, 'success')
        } else if (selectedMiddleware === 'cors') {
            addLog('CORS headers added to response', 'success')
        } else if (selectedMiddleware === 'compression') {
            addLog('Response compressed (gzip)', 'success')
        } else if (selectedMiddleware === 'rateLimit') {
            addLog('Rate limit check passed', 'success')
        }
    }

    const addLog = (message, type = 'info') => {
        const log = {
            message,
            type,
            timestamp: new Date().toLocaleTimeString()
        }
        setRequestLog(prev => [log, ...prev.slice(0, 9)])
    }

    const clearLog = () => {
        setRequestLog([])
    }

    return (
        <DocumentationLayout 
            title="Middleware" 
            description="Add custom middleware to handle requests, responses, and application logic in your Catalyst application."
        >
            <div className={styles.middlewareDemo}>
                <div className={styles.demoContent}>
                    <h2>Middleware Examples</h2>
                    <p>This example demonstrates how to implement custom middleware in Catalyst applications.</p>
                    
                    <div className={styles.controls}>
                        <div className={styles.middlewareSelector}>
                            <h3>Select Middleware</h3>
                            <div className={styles.middlewareTabs}>
                                {Object.keys(middlewares).map(middleware => (
                                    <button
                                        key={middleware}
                                        className={`${styles.middlewareTab} ${selectedMiddleware === middleware ? styles.active : ''}`}
                                        onClick={() => setSelectedMiddleware(middleware)}
                                    >
                                        {middlewares[middleware].name}
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        <div className={styles.demoControls}>
                            <label className={styles.toggle}>
                                <input
                                    type="checkbox"
                                    checked={isEnabled}
                                    onChange={(e) => setIsEnabled(e.target.checked)}
                                />
                                <span className={styles.slider}></span>
                                <span>Enable Middleware</span>
                            </label>
                            
                            <button onClick={simulateRequest} className={styles.simulateBtn}>
                                Simulate Request
                            </button>
                            
                            <button onClick={clearLog} className={styles.clearBtn}>
                                Clear Log
                            </button>
                        </div>
                    </div>
                    
                    <div className={styles.middlewareExamples}>
                        <div className={styles.middlewareExample}>
                            <h3>{middlewares[selectedMiddleware].name}</h3>
                            <p>{middlewares[selectedMiddleware].description}</p>
                            
                            <div className={styles.codeExample}>
                                <h4>Implementation</h4>
                                <pre>{middlewares[selectedMiddleware].code}</pre>
                            </div>
                            
                            <div className={styles.benefits}>
                                <h4>Benefits</h4>
                                <ul>
                                    {middlewares[selectedMiddleware].benefits.map((benefit, index) => (
                                        <li key={index}>{benefit}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.requestLog}>
                            <h3>Request Log</h3>
                            <div className={styles.logContainer}>
                                {requestLog.length === 0 ? (
                                    <div className={styles.emptyLog}>No requests logged yet. Click "Simulate Request" to see middleware in action.</div>
                                ) : (
                                    requestLog.map((log, index) => (
                                        <div key={index} className={`${styles.logEntry} ${styles[log.type]}`}>
                                            <span className={styles.timestamp}>{log.timestamp}</span>
                                            <span className={styles.message}>{log.message}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                    
                    <div className={styles.middlewareInfo}>
                        <h3>Middleware Best Practices</h3>
                        <div className={styles.practicesGrid}>
                            <div className={styles.practice}>
                                <h4>Order Matters</h4>
                                <p>Middleware executes in the order they're added. Add security middleware first.</p>
                            </div>
                            <div className={styles.practice}>
                                <h4>Error Handling</h4>
                                <p>Always call next() or send a response to prevent hanging requests.</p>
                            </div>
                            <div className={styles.practice}>
                                <h4>Performance</h4>
                                <p>Keep middleware lightweight and avoid blocking operations.</p>
                            </div>
                            <div className={styles.practice}>
                                <h4>Conditional Use</h4>
                                <p>Use middleware conditionally based on routes or environment.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DocumentationLayout>
    )
}

export default MiddlewareDemo 