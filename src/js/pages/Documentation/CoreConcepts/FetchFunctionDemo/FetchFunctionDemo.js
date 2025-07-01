import React, { useState, useEffect } from 'react';
import DocumentationLayout from '../../DocumentationLayout';
import styles from './FetchFunctionDemo.module.scss';

const FetchFunctionDemo = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [interceptorLog, setInterceptorLog] = useState([]);

  // Simulated fetchFunction with interceptors
  const fetchFunction = (url, options = {}) => {
    let baseURL = 'https://jsonplaceholder.typicode.com';
    let finalUrl = baseURL + url;

    // Request Interceptor
    const requestLog = `Request Interceptor: ${options.method || 'GET'} ${finalUrl}`;
    setInterceptorLog(prev => [...prev, requestLog]);
    
    // Add custom headers
    options.headers = {
      'Content-Type': 'application/json',
      'X-Custom-Header': 'catalyst-demo',
      ...options.headers
    };

    return fetch(finalUrl, options)
      .then(response => {
        return response.json().then(parsedResponse => {
          // Response Interceptor
          const responseLog = `Response Interceptor: Status ${response.status}`;
          setInterceptorLog(prev => [...prev, responseLog]);
          
          // Transform response
          if (parsedResponse.error) {
            throw new Error(parsedResponse.error.message);
          }
          
          return parsedResponse;
        });
      });
  };

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    setInterceptorLog([]);
    
    try {
      const result = await fetchFunction('/posts?_limit=3');
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchWithError = async () => {
    setLoading(true);
    setError(null);
    setInterceptorLog([]);
    
    try {
      const result = await fetchFunction('/nonexistent');
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DocumentationLayout 
      title="Fetch Function" 
      description="Learn how to use Catalyst's fetchFunction utility with request and response interceptors."
    >
      <div className={styles.fetchFunctionDemo}>
        <div className={styles.demoContent}>
          <h2>Fetch Function Demo</h2>
          <p>This demo shows how to use Catalyst's fetchFunction utility with request and response interceptors.</p>
          
          <div className={styles.controls}>
            <button onClick={fetchPosts} disabled={loading}>
              Fetch Posts
            </button>
            <button onClick={fetchWithError} disabled={loading}>
              Test Error Handling
            </button>
          </div>

          <div className={styles.interceptorLog}>
            <h3>Interceptor Log</h3>
            <div className={styles.logContainer}>
              {interceptorLog.map((log, index) => (
                <div key={index} className={styles.logEntry}>
                  {log}
                </div>
              ))}
            </div>
          </div>

          {loading && <div className={styles.loading}>Loading...</div>}
          
          {error && (
            <div className={styles.error}>
              <h3>Error</h3>
              <p>{error}</p>
            </div>
          )}

          {data && (
            <div className={styles.results}>
              <h3>Results</h3>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
          )}

          <div className={styles.codeExample}>
            <h3>Code Example</h3>
            <pre>
{`const fetchFunction = (url, options) => {
  let baseURL = process.env.API_URL
  let finalUrl = baseURL + url

  // Request Interceptor - modify request here
  options.headers = {
    'Content-Type': 'application/json',
    ...options.headers
  }

  return fetch(finalUrl, options)
    .then(response => {
      return response.json().then(parsedResponse => {
        // Response Interceptor - modify response here
        if (parsedResponse.error) {
          throw new Error(parsedResponse.error.message);
        }
        return parsedResponse
      })
    })
}`}
            </pre>
          </div>
        </div>
      </div>
    </DocumentationLayout>
  );
};

export default FetchFunctionDemo; 