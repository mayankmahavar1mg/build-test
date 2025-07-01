// Bundle analyzer for Code Splitting demo
export const analyzeCodeSplitting = () => {
  const performance = window.performance;
  
  // Get all resource entries
  const resources = performance.getEntriesByType('resource');
  
  // Filter JavaScript files and chunks
  const jsResources = resources.filter(entry => 
    entry.name.includes('.js') || 
    entry.name.includes('chunk') || 
    entry.name.includes('bundle')
  );

  // Analyze chunks
  const chunks = jsResources.map(entry => {
    const name = entry.name.split('/').pop();
    const size = entry.transferSize || entry.encodedBodySize || 0;
    const duration = entry.duration;
    
    return {
      name,
      size,
      duration,
      url: entry.name,
      type: name.includes('chunk') ? 'lazy' : 'initial'
    };
  });

  // Calculate statistics
  const initialChunks = chunks.filter(chunk => chunk.type === 'initial');
  const lazyChunks = chunks.filter(chunk => chunk.type === 'lazy');
  
  const totalSize = chunks.reduce((sum, chunk) => sum + chunk.size, 0);
  const initialSize = initialChunks.reduce((sum, chunk) => sum + chunk.size, 0);
  const lazySize = lazyChunks.reduce((sum, chunk) => sum + chunk.size, 0);
  
  const savings = initialSize > 0 ? ((lazySize / totalSize) * 100).toFixed(1) : 0;

  return {
    chunks,
    initialChunks,
    lazyChunks,
    totalSize,
    initialSize,
    lazySize,
    savings,
    totalChunks: chunks.length,
    initialChunkCount: initialChunks.length,
    lazyChunkCount: lazyChunks.length
  };
};

// Track component loading for code splitting
export const trackCodeSplitLoad = (componentName) => {
  const startTime = performance.now();
  
  return {
    start: () => startTime,
    end: () => {
      const loadTime = performance.now() - startTime;
      console.log(`Code split component "${componentName}" loaded in ${loadTime.toFixed(2)}ms`);
      return loadTime;
    }
  };
};

// Estimate chunk sizes based on component type
export const estimateChunkSize = (componentType) => {
  const sizeEstimates = {
    'feature': { min: 35, max: 50, unit: 'KB' },
    'utility': { min: 15, max: 25, unit: 'KB' },
    'route': { min: 20, max: 40, unit: 'KB' },
    'component': { min: 10, max: 20, unit: 'KB' }
  };
  
  const estimate = sizeEstimates[componentType] || sizeEstimates.component;
  const size = Math.random() * (estimate.max - estimate.min) + estimate.min;
  
  return {
    size: size.toFixed(1),
    unit: estimate.unit,
    range: `${estimate.min}-${estimate.max} ${estimate.unit}`
  };
};

// Get route-based splitting information
export const getRouteSplittingInfo = () => {
  const routes = [
    { path: '/home', size: estimateChunkSize('route'), loaded: true },
    { path: '/products', size: estimateChunkSize('route'), loaded: false },
    { path: '/about', size: estimateChunkSize('route'), loaded: false },
    { path: '/contact', size: estimateChunkSize('route'), loaded: false },
    { path: '/dashboard', size: estimateChunkSize('route'), loaded: false },
    { path: '/settings', size: estimateChunkSize('route'), loaded: false }
  ];

  return routes;
}; 