import React, { useState, useEffect } from 'react'
import { useCurrentRouteData } from '@tata1mg/router'
import DocumentationLayout from '../../DocumentationLayout'
import css from './DataFetchingDemo.module.scss'

const DataFetchingDemo = () => {
    // Catalyst's useCurrentRouteData hook for server/client fetched data
    const { data, error, isFetching, refetch, clear } = useCurrentRouteData()
    
    // Separate server and client data
    const serverData = data?.serverData
    const clientData = data?.clientData
    const serverMessage = data?.serverMessage
    const clientMessage = data?.clientMessage

    const handleRefetch = () => {
        refetch()
    }

    const handleClear = () => {
        clear()
    }

    return (
        <DocumentationLayout 
            title="Data Fetching" 
            description="Learn how to fetch data efficiently in Catalyst applications with server-side and client-side rendering."
        >
            <div className={css.dataFetchingDemo}>
                <div className={css.demoContent}>
                    <h2>Data Fetching Examples</h2>
                    <p>This example demonstrates both server-side and client-side data fetching patterns in Catalyst.</p>
                    
                    <div className={css.controls}>
                        <h3>Data Controls</h3>
                        <p>Use these buttons to test Catalyst's data revalidation features</p>
                        <div className={css.buttonGroup}>
                            <button 
                                onClick={handleRefetch}
                                className={css.controlButton}
                                disabled={isFetching}
                            >
                                {isFetching ? 'Refetching...' : 'Refetch Data'}
                            </button>
                            <button 
                                onClick={handleClear}
                                className={css.controlButton}
                                disabled={isFetching}
                            >
                                Clear Cache
                            </button>
                        </div>
                    </div>

                    <div className={css.fetchingExample}>
                        <div className={css.fetchType}>
                            <h3>Server-Side Fetching (Catalyst)</h3>
                            <p>Data pre-loaded on server using <code>serverFetcher</code></p>
                            
                            {isFetching && (
                                <div className={css.loading}>
                                    <div className={css.spinner}></div>
                                    <p>Loading server data...</p>
                                </div>
                            )}
                            
                            {error && (
                                <div className={css.error}>
                                    <p>Server Error: {error.message}</p>
                                </div>
                            )}
                            
                            {!isFetching && !error && serverData && (
                                <div className={css.serverData}>
                                    <div className={css.dataCard}>
                                        <h4>Server Data</h4>
                                        <p><strong>Message:</strong> {serverMessage}</p>
                                        <p><strong>Timestamp:</strong> {data.serverTimestamp}</p>
                                        <p><strong>Source:</strong> {data.serverSource}</p>
                                        {serverData?.post && (
                                            <div className={css.apiData}>
                                                <h5>API Data (Post):</h5>
                                                <div className={css.apiResponse}>
                                                    <pre>{JSON.stringify(serverData.post, null, 2)}</pre>
                                                </div>
                                            </div>
                                        )}
                                        <div className={css.badge}>SSR</div>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        <div className={css.fetchType}>
                            <h3>Client-Side Fetching (Catalyst)</h3>
                            <p>Data loaded automatically using <code>clientFetcher</code></p>
                            
                            {isFetching && (
                                <div className={css.loading}>
                                    <div className={css.spinner}></div>
                                    <p>Loading client data...</p>
                                </div>
                            )}
                            
                            {error && (
                                <div className={css.error}>
                                    <p>Client Error: {error.message}</p>
                                </div>
                            )}
                            
                            {!isFetching && !error && clientData && (
                                <div className={css.clientData}>
                                    <div className={css.dataCard}>
                                        <h4>Client Data</h4>
                                        <p><strong>Message:</strong> {clientMessage}</p>
                                        <p><strong>Timestamp:</strong> {data.clientTimestamp}</p>
                                        <p><strong>Source:</strong> {data.clientSource}</p>
                                        {clientData?.comment && (
                                            <div className={css.apiData}>
                                                <h5>API Data (Comment):</h5>
                                                <div className={css.apiResponse}>
                                                    <pre>{JSON.stringify(clientData.comment, null, 2)}</pre>
                                                </div>
                                            </div>
                                        )}
                                        <div className={css.badge}>CSR</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={css.codeExample}>
                        <h3>Code Example</h3>
                        <div className={css.codeBlock}>
                            <h4>Server-Side Data Fetching</h4>
                            <pre>
{`// Server fetcher runs on server during SSR
Component.serverFetcher = async () => {
    const response = await fetch('https://api.example.com/data')
    const data = await response.json()
    return data
}

// Component receives data via useCurrentRouteData()
const Component = () => {
    const { data } = useCurrentRouteData()
    return <div>{data.message}</div>
}`}
                            </pre>
                        </div>
                        
                        <div className={css.codeBlock}>
                            <h4>Client-Side Data Fetching</h4>
                            <pre>
{`// Client-side fetching for user interactions
const Component = () => {
    const [data, setData] = useState([])
    
    const fetchData = async () => {
        const response = await fetch('/api/data')
        const result = await response.json()
        setData(result)
    }
    
    return <button onClick={fetchData}>Fetch Data</button>
}`}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </DocumentationLayout>
    )
}

// Catalyst serverFetcher - runs on server during SSR
DataFetchingDemo.serverFetcher = async () => {
    try {
        // Real API call on server
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1')
        const postData = await response.json()
        
        return {
            serverMessage: 'Data fetched on server using Catalyst serverFetcher',
            serverTimestamp: new Date().toISOString(),
            serverSource: 'Server-Side Rendering',
            serverData: {
                post: postData
            }
        }
    } catch (error) {
        console.error('Server fetch error:', error)
        throw new Error('Failed to fetch server data')
    }
}

// Catalyst clientFetcher - runs on client during navigation
DataFetchingDemo.clientFetcher = async () => {
    try {
        // Real API call on client
        const response = await fetch('https://jsonplaceholder.typicode.com/comments/1')
        const commentData = await response.json()
        
        return {
            clientMessage: 'Data fetched on client using Catalyst clientFetcher',
            clientTimestamp: new Date().toISOString(),
            clientSource: 'Client-Side Rendering',
            clientData: {
                comment: commentData
            }
        }
    } catch (error) {
        console.error('Client fetch error:', error)
        throw new Error('Failed to fetch client data')
    }
}

export default DataFetchingDemo 