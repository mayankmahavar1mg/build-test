import React from 'react';
import './ProjectSetup.scss';

const ProjectSetup = () => {
  return (
    <div className="project-setup">
      <div className="container">
        <h1>Project Setup</h1>
        
        <section className="section">
          <h2>Folder Structure</h2>
          <div className="content">
            <p>Understand the recommended folder structure for Catalyst projects.</p>
            <div className="example-placeholder">
              <h3>Live Example</h3>
              <p>CodeSandbox embed will be added here</p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>Environment Variables</h2>
          <div className="content">
            <p>Configure environment variables for different deployment stages.</p>
            <div className="example-placeholder">
              <h3>Live Example</h3>
              <p>CodeSandbox embed will be added here</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProjectSetup; 