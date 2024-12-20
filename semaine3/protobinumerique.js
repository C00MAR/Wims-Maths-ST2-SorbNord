// Data from the table
const data = [
    {x: 11, y: 4},
    {x: -4, y: -1},
    {x: 10, y: 19},
    {x: 4, y: 12},
    {x: 13, y: 23},
    {x: 7, y: 10},
    {x: 22, y: 9}
  ];
  
  // 1. Calculate statistics for x
  const n = data.length;
  const meanX = data.reduce((sum, point) => sum + point.x, 0) / n;
  const varianceX = data.reduce((sum, point) => sum + Math.pow(point.x - meanX, 2), 0) / n;
  const stdDevX = Math.sqrt(varianceX);
  
  // 2. Calculate statistics for y
  const meanY = data.reduce((sum, point) => sum + point.y, 0) / n;
  const varianceY = data.reduce((sum, point) => sum + Math.pow(point.y - meanY, 2), 0) / n;
  const stdDevY = Math.sqrt(varianceY);
  
  // 3. Calculate covariance and correlation coefficient
  const covariance = data.reduce((sum, point) => 
    sum + (point.x - meanX) * (point.y - meanY), 0) / n;
  const correlation = covariance / (stdDevX * stdDevY);
  
  console.log("Statistics for x:");
  console.log(`Mean (x̄) = ${meanX.toFixed(3)}`);
  console.log(`Standard deviation (σx) = ${stdDevX.toFixed(3)}`);
  console.log(`Variance (σx²) = ${varianceX.toFixed(3)}`);
  
  console.log("\nStatistics for y:");
  console.log(`Mean (ȳ) = ${meanY.toFixed(3)}`);
  console.log(`Standard deviation (σy) = ${stdDevY.toFixed(3)}`);
  console.log(`Variance (σy²) = ${varianceY.toFixed(3)}`);
  
  console.log("\nCovariance and Correlation:");
  console.log(`Covariance = ${covariance.toFixed(3)}`);
  console.log(`Correlation coefficient (r) = ${correlation.toFixed(3)}`);