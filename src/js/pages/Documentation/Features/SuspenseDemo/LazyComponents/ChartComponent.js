import React from 'react';

// Simulate a chart component with heavy dependencies
const ChartComponent = () => {
  // Simulate chart data processing
  const generateChartData = () => {
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        x: i,
        y: Math.sin(i * 0.1) * 100 + Math.random() * 50,
        category: ['Sales', 'Revenue', 'Users', 'Growth'][i % 4],
        timestamp: new Date(Date.now() - (100 - i) * 86400000).toISOString()
      });
    }
    return data;
  };

  const chartData = generateChartData();
  
  // Simulate chart calculations
  const statistics = {
    total: chartData.length,
    average: chartData.reduce((sum, item) => sum + item.y, 0) / chartData.length,
    max: Math.max(...chartData.map(item => item.y)),
    min: Math.min(...chartData.map(item => item.y)),
    categories: [...new Set(chartData.map(item => item.category))]
  };

  // Simulate chart rendering logic
  const renderChart = () => {
    const maxY = Math.max(...chartData.map(item => item.y));
    const minY = Math.min(...chartData.map(item => item.y));
    const range = maxY - minY;
    
    return chartData.slice(0, 20).map((point, index) => {
      const height = ((point.y - minY) / range) * 100;
      return (
        <div
          key={index}
          style={{
            width: '20px',
            height: `${height}px`,
            background: `hsl(${(index * 18) % 360}, 70%, 60%)`,
            margin: '0 2px',
            borderRadius: '2px 2px 0 0',
            display: 'inline-block',
            verticalAlign: 'bottom'
          }}
          title={`${point.category}: ${point.y.toFixed(2)}`}
        />
      );
    });
  };

  return (
    <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
      <h3>Chart Component Loaded</h3>
      <p>This component simulates a heavy chart library with data processing.</p>
      
      <div style={{ marginTop: '20px' }}>
        <h4>Chart Visualization:</h4>
        <div style={{ 
          height: '120px', 
          background: 'white', 
          border: '1px solid #e9ecef',
          borderRadius: '4px',
          padding: '10px',
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'center'
        }}>
          {renderChart()}
        </div>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h4>Statistics:</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
          <div style={{ padding: '10px', background: 'white', borderRadius: '4px', textAlign: 'center' }}>
            <strong>Total Points</strong><br />
            {statistics.total}
          </div>
          <div style={{ padding: '10px', background: 'white', borderRadius: '4px', textAlign: 'center' }}>
            <strong>Average</strong><br />
            {statistics.average.toFixed(2)}
          </div>
          <div style={{ padding: '10px', background: 'white', borderRadius: '4px', textAlign: 'center' }}>
            <strong>Max Value</strong><br />
            {statistics.max.toFixed(2)}
          </div>
          <div style={{ padding: '10px', background: 'white', borderRadius: '4px', textAlign: 'center' }}>
            <strong>Categories</strong><br />
            {statistics.categories.length}
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '20px', padding: '15px', background: '#e8f5e8', borderRadius: '4px' }}>
        <strong>📊 Chart component loaded successfully!</strong>
        <br />
        <small>This demonstrates real code splitting for heavy chart libraries.</small>
      </div>
    </div>
  );
};

export default ChartComponent; 