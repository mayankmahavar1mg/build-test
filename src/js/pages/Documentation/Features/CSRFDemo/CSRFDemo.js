import React, { useState } from 'react';
import styles from './CSRFDemo.module.scss';

const CSRFDemo = () => {
  const [csrfToken, setCsrfToken] = useState('csrf_token_example_12345');
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [requestLog, setRequestLog] = useState([]);
  const [isProtected, setIsProtected] = useState(true);

  const generateToken = () => {
    const newToken = 'csrf_' + Math.random().toString(36).substr(2, 9);
    setCsrfToken(newToken);
    addLog('Generated new CSRF token', 'info');
  };

  const addLog = (message, type = 'info') => {
    const log = {
      message,
      type,
      timestamp: new Date().toLocaleTimeString()
    };
    setRequestLog(prev => [log, ...prev.slice(0, 9)]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (isProtected) {
      addLog('Request submitted with CSRF protection', 'success');
      addLog(`CSRF Token: ${csrfToken}`, 'info');
    } else {
      addLog('Request submitted WITHOUT CSRF protection', 'warning');
    }
    
    addLog(`Form data: ${JSON.stringify(formData)}`, 'info');
  };

  const simulateAttack = () => {
    addLog('⚠️ Simulated CSRF attack attempt', 'error');
    addLog('Request blocked due to missing/invalid CSRF token', 'error');
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className={styles.csrfDemo}>
      <h2>CSRF Protection Demo</h2>
      <p>This demo shows how to implement CSRF (Cross-Site Request Forgery) protection in Catalyst applications.</p>
      
      <div className={styles.protectionToggle}>
        <h3>CSRF Protection</h3>
        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={isProtected}
            onChange={(e) => setIsProtected(e.target.checked)}
          />
          <span className={styles.slider}></span>
          <span className={styles.label}>
            {isProtected ? 'Protected' : 'Unprotected'}
          </span>
        </label>
      </div>

      <div className={styles.tokenSection}>
        <h3>CSRF Token</h3>
        <div className={styles.tokenDisplay}>
          <code>{csrfToken}</code>
          <button onClick={generateToken} className={styles.generateBtn}>
            Generate New Token
          </button>
        </div>
      </div>

      <div className={styles.demoSection}>
        <div className={styles.formSection}>
          <h3>Form Submission Demo</h3>
          <form onSubmit={handleFormSubmit} className={styles.demoForm}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            {isProtected && (
              <input type="hidden" name="_csrf" value={csrfToken} />
            )}
            <button type="submit" className={styles.submitBtn}>
              Submit Form
            </button>
          </form>
        </div>

        <div className={styles.attackSection}>
          <h3>Attack Simulation</h3>
          <button onClick={simulateAttack} className={styles.attackBtn}>
            Simulate CSRF Attack
          </button>
          <p className={styles.attackNote}>
            This simulates what happens when a malicious site tries to submit a form without a valid CSRF token.
          </p>
        </div>
      </div>

      <div className={styles.requestLog}>
        <h3>Request Log</h3>
        <div className={styles.logContainer}>
          {requestLog.length === 0 ? (
            <div className={styles.emptyLog}>No requests logged yet. Try submitting the form or simulating an attack.</div>
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

      <div className={styles.codeExample}>
        <h3>Implementation Code</h3>
        <div className={styles.codeTabs}>
          <div className={styles.codeTab}>
            <h4>Server Setup</h4>
            <pre>
{`// server/server.js
import csrf from "csurf"

const csrfMiddleware = csrf({ 
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } 
})

export function addMiddlewares(app) {
  app.use(csrfMiddleware)
}`}
            </pre>
          </div>
          <div className={styles.codeTab}>
            <h4>Document Template</h4>
            <pre>
{`// server/document.js
import { Head, Body } from "catalyst"

function Document(props) {
    const { req } = props
    const csrf = typeof req.csrfToken === "function" && req.csrfToken()
    
    return (
        <html lang="en">
            <Head {...props} />
            <Body {...props}>
                <input type="hidden" id="_csrf" name="_csrf" value={csrf} />
            </Body>
        </html>
    )
}`}
            </pre>
          </div>
        </div>
      </div>

      <div className={styles.securityInfo}>
        <h3>Security Benefits</h3>
        <div className={styles.benefitsGrid}>
          <div className={styles.benefit}>
            <h4>🛡️ Protection</h4>
            <p>Prevents malicious websites from making unauthorized requests on behalf of authenticated users.</p>
          </div>
          <div className={styles.benefit}>
            <h4>🔐 Token Validation</h4>
            <p>Each form submission is validated against a unique, time-limited token.</p>
          </div>
          <div className={styles.benefit}>
            <h4>🚫 Attack Prevention</h4>
            <p>Blocks cross-origin requests that don't include the proper CSRF token.</p>
          </div>
          <div className={styles.benefit}>
            <h4>⚡ Automatic</h4>
            <p>CSRF protection is automatically applied to all forms when properly configured.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSRFDemo; 