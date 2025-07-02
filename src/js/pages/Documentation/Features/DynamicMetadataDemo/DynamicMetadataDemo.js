import React, { useState, useEffect } from 'react';
import styles from './DynamicMetadataDemo.module.scss';

const DynamicMetadataDemo = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [metadata, setMetadata] = useState({});
  const [apiResponse, setApiResponse] = useState(null);

  // Simulate different pages with different metadata
  const pages = {
    home: {
      title: 'Home Page - Catalyst Demo',
      description: 'Welcome to our Catalyst application demo',
      keywords: 'catalyst, react, ssr, demo',
      author: 'Catalyst Team'
    },
    products: {
      title: 'Products - Catalyst Demo',
      description: 'Browse our amazing products built with Catalyst',
      keywords: 'products, catalyst, react, shopping',
      author: 'Catalyst Team'
    },
    about: {
      title: 'About Us - Catalyst Demo',
      description: 'Learn more about our team and Catalyst framework',
      keywords: 'about, team, catalyst, framework',
      author: 'Catalyst Team'
    }
  };

  // Simulate setMetaData function for demo purposes
  const simulateSetMetaData = (apiResponse) => {
    const pageData = pages[currentPage];
    const metaData = [
      <title key="title">{pageData.title}</title>,
      <meta key="description" name="description" content={pageData.description} />,
      <meta key="keywords" name="keywords" content={pageData.keywords} />,
      <meta key="author" name="author" content={pageData.author} />,
      <meta key="og:title" property="og:title" content={pageData.title} />,
      <meta key="og:description" property="og:description" content={pageData.description} />
    ];
    
    setMetadata({
      title: pageData.title,
      description: pageData.description,
      keywords: pageData.keywords,
      author: pageData.author
    });
    
    return metaData;
  };

  const changePage = (pageName) => {
    setCurrentPage(pageName);
    // Simulate API response
    setApiResponse({ page: pageName, timestamp: new Date().toISOString() });
  };

  useEffect(() => {
    // Initialize with home page
    simulateSetMetaData(null);
  }, []);

  useEffect(() => {
    if (apiResponse) {
      simulateSetMetaData(apiResponse);
    }
  }, [apiResponse, currentPage]);

  return (
    <div className={styles.dynamicMetadataDemo}>
      <h2>Dynamic Metadata Demo</h2>
      <p>This demo shows how to implement dynamic metadata for different pages in Catalyst using the built-in <code>setMetaData</code> function.</p>
      
      <div className={styles.pageSelector}>
        <h3>Select Page</h3>
        <div className={styles.pageButtons}>
          {Object.keys(pages).map(page => (
            <button
              key={page}
              onClick={() => changePage(page)}
              className={currentPage === page ? styles.active : ''}
            >
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.metadataDisplay}>
        <h3>Current Metadata</h3>
        <div className={styles.metadataCard}>
          <div className={styles.metadataItem}>
            <strong>Title:</strong> {metadata.title}
          </div>
          <div className={styles.metadataItem}>
            <strong>Description:</strong> {metadata.description}
          </div>
          <div className={styles.metadataItem}>
            <strong>Keywords:</strong> {metadata.keywords}
          </div>
          <div className={styles.metadataItem}>
            <strong>Author:</strong> {metadata.author}
          </div>
        </div>
      </div>

      <div className={styles.apiResponse}>
        <h3>API Response (Simulated)</h3>
        <div className={styles.responseCard}>
          {apiResponse ? (
            <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
          ) : (
            <p>No API response yet. Select a page to simulate data fetching.</p>
          )}
        </div>
      </div>

      <div className={styles.codeExample}>
        <h3>Proper Catalyst setMetaData Implementation</h3>
        <pre>
{`// Page Component with proper setMetaData
import React from "react"

function HomePage() {
  return <div>Homepage</div>
}

// ✅ CORRECT: Use Catalyst's setMetaData function
// This function receives apiResponse from serverFetcher/clientFetcher
const setMetaData = (apiResponse) => {
  // apiResponse contains data from your fetchers
  const pageData = apiResponse?.pageData || {
    title: 'Default Home Page',
    description: 'Default description'
  }
  
  return [
    <title key="title">{pageData.title}</title>,
    <meta key="description" name="description" content={pageData.description} />,
    <meta key="keywords" name="keywords" content={pageData.keywords} />,
    <meta key="author" name="author" content={pageData.author} />
  ]
}

// Attach setMetaData to the component
HomePage.setMetaData = setMetaData

// Add your fetchers
HomePage.serverFetcher = async () => {
  const response = await fetch('/api/page-data')
  const data = await response.json()
  return { pageData: data }
}

export default HomePage`}
        </pre>
      </div>

      <div className={styles.htmlOutput}>
        <h3>Generated HTML Head</h3>
        <div className={styles.htmlCard}>
          <pre>
{`<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${metadata.title || 'Page Title'}</title>
  <meta name="description" content="${metadata.description || 'Page description'}" />
  <meta name="keywords" content="${metadata.keywords || 'keywords'}" />
  <meta name="author" content="${metadata.author || 'author'}" />
  <meta property="og:title" content="${metadata.title || 'Page Title'}" />
  <meta property="og:description" content="${metadata.description || 'Page description'}" />
</head>`}
          </pre>
        </div>
      </div>

      <div className={styles.importantNotes}>
        <h3>Key Points About Catalyst's setMetaData</h3>
        <ul>
          <li><strong>Function receives apiResponse:</strong> The <code>setMetaData</code> function automatically receives the response from your <code>serverFetcher</code> and <code>clientFetcher</code></li>
          <li><strong>Must be attached to component:</strong> Use <code>Component.setMetaData = setMetaData</code> to attach the function</li>
          <li><strong>Returns array of elements:</strong> Return an array of JSX elements like <code>&lt;title&gt;</code> and <code>&lt;meta&gt;</code> tags</li>
          <li><strong>Works with both SSR and CSR:</strong> Metadata is set during server-side rendering and client-side navigation</li>
          <li><strong>Dynamic based on data:</strong> You can use the <code>apiResponse</code> to create dynamic metadata based on fetched data</li>
        </ul>
      </div>
    </div>
  );
};

// ✅ PROPER IMPLEMENTATION: Catalyst's setMetaData function
// This function receives apiResponse from serverFetcher/clientFetcher
const setMetaData = (apiResponse) => {
  // Use data from fetchers to create dynamic metadata
  const pageData = apiResponse?.pageData || {
    title: 'Dynamic Metadata Demo - Catalyst',
    description: 'Learn how to implement dynamic metadata in Catalyst applications',
    keywords: 'catalyst, dynamic metadata, react, ssr',
    author: 'Catalyst Team'
  }
  
  return [
    <title key="title">{pageData.title}</title>,
    <meta key="description" name="description" content={pageData.description} />,
    <meta key="keywords" name="keywords" content={pageData.keywords} />,
    <meta key="author" name="author" content={pageData.author} />,
    <meta key="og:title" property="og:title" content={pageData.title} />,
    <meta key="og:description" property="og:description" content={pageData.description} />
  ]
}

// Attach setMetaData to the component
DynamicMetadataDemo.setMetaData = setMetaData

// Add fetchers to demonstrate how apiResponse works
DynamicMetadataDemo.serverFetcher = async () => {
  try {
    // Simulate API call that returns page metadata
    await new Promise(resolve => setTimeout(resolve, 300))
    return {
      pageData: {
        title: 'Dynamic Metadata Demo - Server Rendered',
        description: 'This page demonstrates dynamic metadata with server-side rendering',
        keywords: 'catalyst, dynamic metadata, server-side rendering, react',
        author: 'Catalyst Team'
      }
    }
  } catch (error) {
    console.error('Error fetching metadata data:', error)
    throw error
  }
}

DynamicMetadataDemo.clientFetcher = async () => {
  try {
    // Simulate API call that returns page metadata
    await new Promise(resolve => setTimeout(resolve, 200))
    return {
      pageData: {
        title: 'Dynamic Metadata Demo - Client Rendered',
        description: 'This page demonstrates dynamic metadata with client-side navigation',
        keywords: 'catalyst, dynamic metadata, client-side rendering, react',
        author: 'Catalyst Team'
      }
    }
  } catch (error) {
    console.error('Error fetching metadata data:', error)
    throw error
  }
}

export default DynamicMetadataDemo; 