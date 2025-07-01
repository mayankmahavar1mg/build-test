import React, { useState } from 'react';
import styles from './CustomDocumentDemo.module.scss';

const CustomDocumentDemo = () => {
  const [selectedFeatures, setSelectedFeatures] = useState({
    metaTags: true,
    thirdPartyScripts: false,
    customStyles: false,
    googleFonts: false
  });

  const toggleFeature = (feature) => {
    setSelectedFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
  };

  const generateDocumentCode = () => {
    let code = `import { Head, Body } from "catalyst"\n\nfunction Document(props) {\n    return (\n        <html lang="en">\n`;
    
    if (selectedFeatures.metaTags) {
      code += `            <Head {...props}>\n                <meta charset="UTF-8" />\n                <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n                <meta name="description" content="Catalyst Demo Application" />\n                <meta name="keywords" content="catalyst, react, ssr" />\n`;
    }
    
    if (selectedFeatures.googleFonts) {
      code += `                <link rel="preconnect" href="https://fonts.googleapis.com" />\n                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />\n                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />\n`;
    }
    
    if (selectedFeatures.thirdPartyScripts) {
      code += `                <script dangerouslySetInnerHTML={{ __html: \`
                    console.log('Third-party script loaded');
                    window.analytics = { track: (event) => console.log('Track:', event) };
                  \`}} />\n`;
    }
    
    if (selectedFeatures.metaTags || selectedFeatures.googleFonts || selectedFeatures.thirdPartyScripts) {
      code += `            </Head>\n`;
    } else {
      code += `            <Head {...props} />\n`;
    }
    
    code += `            <Body {...props} />\n        </html>\n    )\n}\n\nexport default Document`;
    
    return code;
  };

  const generateHTMLOutput = () => {
    let html = `<!DOCTYPE html>\n<html lang="en">\n<head>\n`;
    
    if (selectedFeatures.metaTags) {
      html += `    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <meta name="description" content="Catalyst Demo Application">\n    <meta name="keywords" content="catalyst, react, ssr">\n`;
    }
    
    if (selectedFeatures.googleFonts) {
      html += `    <link rel="preconnect" href="https://fonts.googleapis.com">\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">\n    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">\n`;
    }
    
    if (selectedFeatures.thirdPartyScripts) {
      html += `    <script>
        console.log('Third-party script loaded');
        window.analytics = { track: (event) => console.log('Track:', event) };
      </script>\n`;
    }
    
    html += `</head>\n<body>\n    <!-- Your app content here -->\n</body>\n</html>`;
    
    return html;
  };

  return (
    <div className={styles.customDocumentDemo}>
      <h2>Custom Document Demo</h2>
      <p>This demo shows how to create a custom document in Catalyst with various features.</p>
      
      <div className={styles.featureSelector}>
        <h3>Document Features</h3>
        <div className={styles.featureGrid}>
          <label className={styles.featureItem}>
            <input
              type="checkbox"
              checked={selectedFeatures.metaTags}
              onChange={() => toggleFeature('metaTags')}
            />
            <span>Meta Tags</span>
          </label>
          <label className={styles.featureItem}>
            <input
              type="checkbox"
              checked={selectedFeatures.googleFonts}
              onChange={() => toggleFeature('googleFonts')}
            />
            <span>Google Fonts</span>
          </label>
          <label className={styles.featureItem}>
            <input
              type="checkbox"
              checked={selectedFeatures.thirdPartyScripts}
              onChange={() => toggleFeature('thirdPartyScripts')}
            />
            <span>Third-party Scripts</span>
          </label>
          <label className={styles.featureItem}>
            <input
              type="checkbox"
              checked={selectedFeatures.customStyles}
              onChange={() => toggleFeature('customStyles')}
            />
            <span>Custom Styles</span>
          </label>
        </div>
      </div>

      <div className={styles.codeSection}>
        <h3>Generated Document Code</h3>
        <div className={styles.codeCard}>
          <pre>{generateDocumentCode()}</pre>
        </div>
      </div>

      <div className={styles.htmlSection}>
        <h3>Generated HTML Output</h3>
        <div className={styles.htmlCard}>
          <pre>{generateHTMLOutput()}</pre>
        </div>
      </div>

      <div className={styles.featuresInfo}>
        <h3>Available Features</h3>
        <div className={styles.featuresGrid}>
          <div className={styles.featureInfo}>
            <h4>Meta Tags</h4>
            <p>Add SEO-friendly meta tags for better search engine optimization and social media sharing.</p>
          </div>
          <div className={styles.featureInfo}>
            <h4>Google Fonts</h4>
            <p>Include Google Fonts for better typography and design consistency across browsers.</p>
          </div>
          <div className={styles.featureInfo}>
            <h4>Third-party Scripts</h4>
            <p>Add analytics, tracking, or other third-party scripts that need to load before your app.</p>
          </div>
          <div className={styles.featureInfo}>
            <h4>Custom Styles</h4>
            <p>Include global CSS or critical styles that should be loaded before the main application.</p>
          </div>
        </div>
      </div>

      <div className={styles.importantNotes}>
        <h3>Important Notes</h3>
        <ul>
          <li><strong>Head and Body tags are required</strong> - The application won't work without them</li>
          <li><strong>Props must be passed</strong> - They are used internally by Head and Body components</li>
          <li><strong>Server-side rendering</strong> - The document is always rendered on the server</li>
          <li><strong>Custom content</strong> - Add custom tags between Head and Body components</li>
        </ul>
      </div>
    </div>
  );
};

export default CustomDocumentDemo; 