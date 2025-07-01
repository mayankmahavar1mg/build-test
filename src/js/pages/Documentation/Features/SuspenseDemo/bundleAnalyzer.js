// Bundle analyzer utility for Suspense demo
export const analyzeBundle = () => {
  // Get performance timing information
  const performance = window.performance;
  const navigation = performance.getEntriesByType('navigation')[0];
  
  // Get resource timing for script files
  const scriptResources = performance.getEntriesByType('resource')
    .filter(entry => entry.name.includes('.js') || entry.name.includes('chunk'))
    .map(entry => ({
      name: entry.name.split('/').pop(),
      size: entry.transferSize || entry.encodedBodySize || 0,
      duration: entry.duration,
      startTime: entry.startTime
    }));

  // Calculate bundle statistics
  const totalScriptSize = scriptResources.reduce((sum, resource) => sum + resource.size, 0);
  const averageLoadTime = scriptResources.reduce((sum, resource) => sum + resource.duration, 0) / scriptResources.length;

  return {
    totalScripts: scriptResources.length,
    totalSize: totalScriptSize,
    averageLoadTime: averageLoadTime,
    resources: scriptResources,
    navigation: {
      domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart,
      loadComplete: navigation?.loadEventEnd - navigation?.loadEventStart,
      domInteractive: navigation?.domInteractive,
      domComplete: navigation?.domComplete
    }
  };
};

// Track component loading times
export const trackComponentLoad = (componentName) => {
  const startTime = performance.now();
  
  return {
    start: () => startTime,
    end: () => {
      const loadTime = performance.now() - startTime;
      console.log(`${componentName} loaded in ${loadTime.toFixed(2)}ms`);
      return loadTime;
    }
  };
};

// Estimate bundle size based on component complexity
export const estimateBundleSize = (componentType) => {
  const sizeEstimates = {
    'heavy': { min: 15, max: 25, unit: 'KB' },
    'chart': { min: 20, max: 35, unit: 'KB' },
    'form': { min: 10, max: 20, unit: 'KB' },
    'basic': { min: 5, max: 15, unit: 'KB' }
  };
  
  const estimate = sizeEstimates[componentType] || sizeEstimates.basic;
  const size = Math.random() * (estimate.max - estimate.min) + estimate.min;
  
  return {
    size: size.toFixed(1),
    unit: estimate.unit,
    range: `${estimate.min}-${estimate.max} ${estimate.unit}`
  };
}; 