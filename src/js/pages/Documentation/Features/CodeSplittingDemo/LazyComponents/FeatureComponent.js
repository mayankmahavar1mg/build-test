import React from 'react';

const FeatureComponent = () => {
  // Simulate a feature-rich component with complex logic
  const features = [
    {
      id: 1,
      name: 'Advanced Analytics',
      description: 'Real-time data processing and visualization',
      complexity: 'high',
      dependencies: ['chart.js', 'd3.js', 'moment.js'],
      size: '~45KB'
    },
    {
      id: 2,
      name: 'User Management',
      description: 'Complete user authentication and authorization system',
      complexity: 'medium',
      dependencies: ['jwt', 'bcrypt', 'validator'],
      size: '~28KB'
    },
    {
      id: 3,
      name: 'File Upload',
      description: 'Drag-and-drop file upload with progress tracking',
      complexity: 'medium',
      dependencies: ['dropzone', 'axios', 'file-saver'],
      size: '~32KB'
    },
    {
      id: 4,
      name: 'Real-time Chat',
      description: 'WebSocket-based messaging system',
      complexity: 'high',
      dependencies: ['socket.io', 'redis', 'moment'],
      size: '~38KB'
    }
  ];

  const calculateTotalSize = () => {
    return features.reduce((total, feature) => {
      const size = parseInt(feature.size.replace('~', '').replace('KB', ''));
      return total + size;
    }, 0);
  };

  return (
    <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
      <h3>Feature Component Loaded</h3>
      <p>This component demonstrates real code splitting with multiple features.</p>
      
      <div style={{ marginTop: '20px' }}>
        <h4>Available Features:</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          {features.map(feature => (
            <div key={feature.id} style={{
              background: 'white',
              border: '1px solid #e9ecef',
              borderRadius: '6px',
              padding: '1rem'
            }}>
              <h5 style={{ margin: '0 0 0.5rem 0', color: '#495057' }}>{feature.name}</h5>
              <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#6c757d' }}>
                {feature.description}
              </p>
              <div style={{ fontSize: '0.8rem', color: '#6c757d' }}>
                <div><strong>Complexity:</strong> {feature.complexity}</div>
                <div><strong>Size:</strong> {feature.size}</div>
                <div><strong>Dependencies:</strong> {feature.dependencies.length}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        background: '#e8f5e8', 
        borderRadius: '4px',
        textAlign: 'center'
      }}>
        <strong>✅ Feature component loaded successfully!</strong>
        <br />
        <small>Total estimated size: ~{calculateTotalSize()}KB | Loaded via code splitting</small>
      </div>
    </div>
  );
};

export default FeatureComponent; 