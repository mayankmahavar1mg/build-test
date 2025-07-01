import React from 'react';

// Simulate a heavy component with lots of code
const HeavyComponent = () => {
  // Simulate heavy computations
  const heavyData = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    name: `Item ${i}`,
    description: `This is a detailed description for item ${i} that contains a lot of text to make this component heavier.`,
    value: Math.random() * 1000,
    category: ['A', 'B', 'C', 'D'][i % 4],
    tags: [`tag${i}`, `tag${i + 1}`, `tag${i + 2}`],
    metadata: {
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      version: '1.0.0',
      author: 'Developer',
      complexity: 'high'
    }
  }));

  const processedData = heavyData.map(item => ({
    ...item,
    processed: true,
    score: item.value * Math.random(),
    priority: item.value > 500 ? 'high' : 'low'
  }));

  return (
    <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
      <h3>Heavy Component Loaded</h3>
      <p>This component contains {heavyData.length} data items and complex logic.</p>
      
      <div style={{ marginTop: '20px' }}>
        <h4>Sample Data (showing first 5 items):</h4>
        <div style={{ maxHeight: '300px', overflow: 'auto' }}>
          {processedData.slice(0, 5).map(item => (
            <div key={item.id} style={{ 
              padding: '10px', 
              margin: '5px 0', 
              background: 'white', 
              borderRadius: '4px',
              border: '1px solid #e9ecef'
            }}>
              <strong>{item.name}</strong> - {item.description.substring(0, 50)}...
              <br />
              <small>Score: {item.score.toFixed(2)} | Priority: {item.priority}</small>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ marginTop: '20px', padding: '15px', background: '#e8f5e8', borderRadius: '4px' }}>
        <strong>✅ Successfully loaded heavy component!</strong>
        <br />
        <small>This demonstrates real code splitting and lazy loading.</small>
      </div>
    </div>
  );
};

export default HeavyComponent; 