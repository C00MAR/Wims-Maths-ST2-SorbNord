function calculateStats(data) {
    // Extract values and weights
    const values = data.map(item => item[0]);
    const weights = data.map(item => item[1]);
    
    // Calculate weighted mean
    const weightedSum = weights.reduce((acc, w, i) => acc + w * values[i], 0);
    const totalWeight = weights.reduce((acc, w) => acc + w, 0);
    const mean = weightedSum / totalWeight;
    
    // Calculate weighted variance
    const squaredDiffs = values.map(x => Math.pow(x - mean, 2));
    const weightedSquaredDiffs = squaredDiffs.map((diff, i) => diff * weights[i]);
    const variance = weightedSquaredDiffs.reduce((acc, val) => acc + val, 0) / totalWeight;
    
    // Calculate standard deviation
    const stdDev = Math.sqrt(variance);
    
    return {
        mean: Number(mean.toFixed(4)),
        variance: Number(variance.toFixed(4)),
        stdDev: Number(stdDev.toFixed(4))
    };
}

// Test data format: [[value, weight], ...]
const data = [
    [0, 4],   // j1
    [-5, 2],  // j2
    [17, 3]   // j3
];

const results = calculateStats(data);
console.log("Moyenne:", results.mean);
console.log("Variance:", results.variance);
console.log("Écart-type:", results.stdDev);