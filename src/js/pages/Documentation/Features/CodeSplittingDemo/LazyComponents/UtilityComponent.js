import React from 'react';

const UtilityComponent = () => {
  // Simulate utility functions and helpers
  const utilities = [
    {
      name: 'Data Validation',
      functions: ['validateEmail', 'validatePhone', 'validatePassword'],
      size: '~8KB',
      usage: 'Form validation and data integrity'
    },
    {
      name: 'Date Utilities',
      functions: ['formatDate', 'parseDate', 'dateDiff', 'addDays'],
      size: '~12KB',
      usage: 'Date manipulation and formatting'
    },
    {
      name: 'String Utilities',
      functions: ['capitalize', 'slugify', 'truncate', 'sanitize'],
      size: '~6KB',
      usage: 'String processing and formatting'
    },
    {
      name: 'Array Utilities',
      functions: ['groupBy', 'sortBy', 'filterBy', 'unique'],
      size: '~10KB',
      usage: 'Array manipulation and data processing'
    }
  ];

  const totalFunctions = utilities.reduce((total, util) => total + util.functions.length, 0);
  const totalSize = utilities.reduce((total, util) => {
    const size = parseInt(util.size.replace('~', '').replace('KB', ''));
    return total + size;
  }, 0);

  return (
    <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
      <h3>Utility Component Loaded</h3>
      <p>This component contains utility functions and helper methods.</p>
      
      <div style={{ marginTop: '20px' }}>
        <h4>Available Utilities:</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          {utilities.map((utility, index) => (
            <div key={index} style={{
              background: 'white',
              border: '1px solid #e9ecef',
              borderRadius: '6px',
              padding: '1rem'
            }}>
              <h5 style={{ margin: '0 0 0.5rem 0', color: '#495057' }}>{utility.name}</h5>
              <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#6c757d' }}>
                {utility.usage}
              </p>
              <div style={{ fontSize: '0.8rem', color: '#6c757d' }}>
                <div><strong>Functions:</strong> {utility.functions.length}</div>
                <div><strong>Size:</strong> {utility.size}</div>
              </div>
              <div style={{ marginTop: '0.5rem', fontSize: '0.7rem', color: '#adb5bd' }}>
                {utility.functions.slice(0, 2).join(', ')}
                {utility.functions.length > 2 && '...'}
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
        <strong>🔧 Utility component loaded successfully!</strong>
        <br />
        <small>{totalFunctions} functions | ~{totalSize}KB total | Loaded on demand</small>
      </div>
    </div>
  );
};

export default UtilityComponent; 