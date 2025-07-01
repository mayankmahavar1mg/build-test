import React, { useState, useEffect } from 'react';
import styles from './LifecycleDemo.module.scss';

const LifecycleDemo = () => {
  const [lifecycleEvents, setLifecycleEvents] = useState([]);
  const [currentStage, setCurrentStage] = useState('initialized');

  // Simulate lifecycle events
  const simulateLifecycle = () => {
    const events = [
      { stage: 'preServerInit', description: 'Server initialization started', timestamp: new Date() },
      { stage: 'onRouteMatch', description: 'Route matching completed', timestamp: new Date() },
      { stage: 'onFetcherSuccess', description: 'Data fetching completed', timestamp: new Date() },
      { stage: 'render', description: 'Component rendering completed', timestamp: new Date() }
    ];

    setLifecycleEvents(events);
    setCurrentStage('completed');
  };

  const simulateError = () => {
    const events = [
      { stage: 'preServerInit', description: 'Server initialization started', timestamp: new Date() },
      { stage: 'onRouteMatch', description: 'Route matching completed', timestamp: new Date() },
      { stage: 'onFetcherSuccess', description: 'Data fetching failed', timestamp: new Date(), isError: true },
      { stage: 'onRequestError', description: 'Request handling error', timestamp: new Date(), isError: true }
    ];

    setLifecycleEvents(events);
    setCurrentStage('error');
  };

  const resetDemo = () => {
    setLifecycleEvents([]);
    setCurrentStage('initialized');
  };

  return (
    <div className={styles.lifecycleDemo}>
      <h2>Lifecycle Methods Demo</h2>
      <p>This demo shows Catalyst's SSR lifecycle methods and their execution order.</p>
      
      <div className={styles.controls}>
        <button onClick={simulateLifecycle} disabled={currentStage === 'completed'}>
          Simulate Normal Flow
        </button>
        <button onClick={simulateError} disabled={currentStage === 'error'}>
          Simulate Error Flow
        </button>
        <button onClick={resetDemo}>
          Reset Demo
        </button>
      </div>

      <div className={styles.lifecycleFlow}>
        <h3>Lifecycle Flow</h3>
        <div className={styles.flowDiagram}>
          <div className={styles.stage}>
            <div className={styles.stageNumber}>1</div>
            <div className={styles.stageContent}>
              <h4>preServerInit</h4>
              <p>Before server starts</p>
            </div>
          </div>
          <div className={styles.arrow}>→</div>
          <div className={styles.stage}>
            <div className={styles.stageNumber}>2</div>
            <div className={styles.stageContent}>
              <h4>onRouteMatch</h4>
              <p>After route matching</p>
            </div>
          </div>
          <div className={styles.arrow}>→</div>
          <div className={styles.stage}>
            <div className={styles.stageNumber}>3</div>
            <div className={styles.stageContent}>
              <h4>onFetcherSuccess</h4>
              <p>After data fetching</p>
            </div>
          </div>
          <div className={styles.arrow}>→</div>
          <div className={styles.stage}>
            <div className={styles.stageNumber}>4</div>
            <div className={styles.stageContent}>
              <h4>Render</h4>
              <p>Component rendering</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.eventsLog}>
        <h3>Events Log</h3>
        <div className={styles.logContainer}>
          {lifecycleEvents.length === 0 ? (
            <div className={styles.emptyLog}>No events logged yet. Click a button to simulate lifecycle.</div>
          ) : (
            lifecycleEvents.map((event, index) => (
              <div key={index} className={`${styles.eventEntry} ${event.isError ? styles.error : ''}`}>
                <div className={styles.eventHeader}>
                  <span className={styles.eventStage}>{event.stage}</span>
                  <span className={styles.eventTime}>
                    {event.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <div className={styles.eventDescription}>{event.description}</div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className={styles.codeExample}>
        <h3>Code Example</h3>
        <pre>
{`// server/index.js
export const preServerInit = () => {
  console.log('Server initialization started');
}

export const onServerError = (error) => {
  console.error('Server error:', error);
}

export const onRouteMatch = (route) => {
  console.log('Route matched:', route);
}

export const onFetcherSuccess = (data) => {
  console.log('Data fetched successfully:', data);
}

export const onRenderError = (error) => {
  console.error('Render error:', error);
}

export const onRequestError = (error) => {
  console.error('Request error:', error);
}`}
        </pre>
      </div>
    </div>
  );
};

export default LifecycleDemo; 