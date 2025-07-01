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

  // Simulate setMetaData function
  const setMetaData = (apiResponse) => {
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
    setMetaData(null);
  }, []);

  useEffect(() => {
    if (apiResponse) {
      setMetaData(apiResponse);
    }
  }, [apiResponse, currentPage]);

  return (
    <div className={styles.dynamicMetadataDemo}>
      <h2>Dynamic Metadata Demo</h2>
      <p>This demo shows how to implement dynamic metadata for different pages in Catalyst.</p>
      
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
        <h3>Code Example</h3>
        <pre>
{`// Page Component
import React from "react"

function HomePage() {
  return <div>Homepage</div>
}

const setMetaData = (apiResponse) => {
  return [
    <title>Home Page</title>,
    <meta name="description" content="Free Web tutorials"/>,
    <meta name="keywords" content="HTML, CSS, JavaScript"/>,
    <meta name="author" content="John Doe"/>
  ]
}

HomePage.setMetaData = setMetaData
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
    </div>
  );
};

export default DynamicMetadataDemo; 