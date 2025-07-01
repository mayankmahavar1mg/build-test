import React, { useState } from 'react';
import styles from './FontsDemo.module.scss';

const FontsDemo = () => {
  const [selectedFont, setSelectedFont] = useState('poppins');
  const [fontSize, setFontSize] = useState(16);
  const [fontWeight, setFontWeight] = useState(400);

  const fonts = {
    poppins: {
      name: 'Poppins',
      type: 'Google Fonts',
      url: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
      description: 'A geometric sans-serif typeface designed for clarity and readability'
    },
    roboto: {
      name: 'Roboto',
      type: 'Google Fonts',
      url: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap',
      description: 'A clean, modern sans-serif font designed for optimal readability'
    },
    opensans: {
      name: 'Open Sans',
      type: 'Google Fonts',
      url: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap',
      description: 'A humanist sans-serif typeface designed for excellent legibility'
    },
    local: {
      name: 'Local Font',
      type: 'Local Font',
      url: 'src/static/fonts/LocalFont.woff2',
      description: 'A custom font loaded from local files for better performance'
    }
  };

  const fontWeights = [100, 200, 300, 400, 500, 600, 700, 800, 900];
  const fontSizes = [12, 14, 16, 18, 20, 24, 28, 32, 36, 48];

  const generateDocumentCode = () => {
    if (fonts[selectedFont].type === 'Google Fonts') {
      return `// server/document.js
import { Head, Body } from "catalyst"

function Document(props) {
    return (
        <html lang="en">
            <Head {...props}>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link href="${fonts[selectedFont].url}" rel="stylesheet" />
            </Head>
            <Body {...props} />
        </html>
    )
}`;
    } else {
      return `// src/static/css/base/index.scss
@font-face {
    font-family: '${fonts[selectedFont].name}';
    font-style: normal;
    font-weight: 400;
    font-display: optional;
    src: local("${fonts[selectedFont].name}"), 
         url("${fonts[selectedFont].url}") format("woff2");
}

// server/server.js
export function addMiddlewares(app) {
    app.use("/fonts", express.static(path.join(__dirname, "../src/static/fonts")))
}`;
    }
  };

  const generateCSSUsage = () => {
    return `/* CSS Usage */
body {
    font-family: '${fonts[selectedFont].name}', sans-serif;
    font-weight: ${fontWeight};
    font-size: ${fontSize}px;
}

.heading {
    font-family: '${fonts[selectedFont].name}', sans-serif;
    font-weight: 700;
    font-size: 2rem;
}`;
  };

  return (
    <div className={styles.fontsDemo}>
      <h2>Fonts Demo</h2>
      <p>This demo shows how to implement Google Fonts and local fonts in Catalyst applications.</p>
      
      <div className={styles.fontSelector}>
        <h3>Select Font</h3>
        <div className={styles.fontButtons}>
          {Object.keys(fonts).map(font => (
            <button
              key={font}
              onClick={() => setSelectedFont(font)}
              className={selectedFont === font ? styles.active : ''}
              style={{ fontFamily: fonts[font].name }}
            >
              {fonts[font].name}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.fontPreview}>
        <h3>Font Preview</h3>
        <div className={styles.previewControls}>
          <div className={styles.control}>
            <label>Font Size: {fontSize}px</label>
            <input
              type="range"
              min="12"
              max="48"
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
            />
          </div>
          <div className={styles.control}>
            <label>Font Weight: {fontWeight}</label>
            <select value={fontWeight} onChange={(e) => setFontWeight(parseInt(e.target.value))}>
              {fontWeights.map(weight => (
                <option key={weight} value={weight}>{weight}</option>
              ))}
            </select>
          </div>
        </div>
        <div 
          className={styles.previewText}
          style={{
            fontFamily: fonts[selectedFont].name,
            fontSize: `${fontSize}px`,
            fontWeight: fontWeight
          }}
        >
          <h2>The quick brown fox jumps over the lazy dog</h2>
          <p>This is a sample text demonstrating the {fonts[selectedFont].name} font at {fontSize}px with weight {fontWeight}. The font provides excellent readability and is perfect for web applications.</p>
          <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ<br/>
          abcdefghijklmnopqrstuvwxyz<br/>
          0123456789</p>
        </div>
      </div>

      <div className={styles.fontInfo}>
        <h3>Font Information</h3>
        <div className={styles.infoCard}>
          <div className={styles.infoItem}>
            <strong>Font Name:</strong> {fonts[selectedFont].name}
          </div>
          <div className={styles.infoItem}>
            <strong>Type:</strong> {fonts[selectedFont].type}
          </div>
          <div className={styles.infoItem}>
            <strong>Description:</strong> {fonts[selectedFont].description}
          </div>
          <div className={styles.infoItem}>
            <strong>URL:</strong> <code>{fonts[selectedFont].url}</code>
          </div>
        </div>
      </div>

      <div className={styles.codeExample}>
        <h3>Implementation Code</h3>
        <div className={styles.codeTabs}>
          <div className={styles.codeTab}>
            <h4>Document Setup</h4>
            <pre>{generateDocumentCode()}</pre>
          </div>
          <div className={styles.codeTab}>
            <h4>CSS Usage</h4>
            <pre>{generateCSSUsage()}</pre>
          </div>
        </div>
      </div>

      <div className={styles.fontTypes}>
        <h3>Font Types</h3>
        <div className={styles.typesGrid}>
          <div className={styles.typeCard}>
            <h4>🌐 Google Fonts</h4>
            <p>Easy to implement, wide variety, but requires external requests. Best for prototyping and small projects.</p>
            <ul>
              <li>Easy setup</li>
              <li>Large selection</li>
              <li>Automatic optimization</li>
              <li>External dependency</li>
            </ul>
          </div>
          <div className={styles.typeCard}>
            <h4>💾 Local Fonts</h4>
            <p>Better performance, full control, but requires font file management. Best for production applications.</p>
            <ul>
              <li>Better performance</li>
              <li>No external requests</li>
              <li>Full control</li>
              <li>File management required</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.bestPractices}>
        <h3>Best Practices</h3>
        <div className={styles.practicesGrid}>
          <div className={styles.practice}>
            <h4>🎯 Font Display</h4>
            <p>Use <code>font-display: optional</code> for better loading performance and user experience.</p>
          </div>
          <div className={styles.practice}>
            <h4>⚡ Preconnect</h4>
            <p>Add preconnect links for Google Fonts to improve loading speed.</p>
          </div>
          <div className={styles.practice}>
            <h4>📦 Subset Fonts</h4>
            <p>Use font subsets to reduce file size and improve loading times.</p>
          </div>
          <div className={styles.practice}>
            <h4>🔄 Fallbacks</h4>
            <p>Always provide fallback fonts for better user experience during loading.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FontsDemo; 