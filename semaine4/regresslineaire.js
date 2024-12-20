function calculateRegression(data) {
    // Calculate means
    const n = data.length;
    const xMean = data.reduce((sum, [x]) => sum + x, 0) / n;
    const yMean = data.reduce((sum, [_, y]) => sum + y, 0) / n;
    
    // Calculate variance of x and covariance of x,y
    const varX = data.reduce((sum, [x]) => sum + Math.pow(x - xMean, 2), 0) / n;
    const covXY = data.reduce((sum, [x, y]) => sum + (x - xMean) * (y - yMean), 0) / n;
    
    // Calculate regression coefficients
    const a = covXY / varX;
    const b = yMean - a * xMean;
    
    // Return the coefficients rounded to 3 decimal places
    return {
        a: Number(a.toFixed(3)),
        b: Number(b.toFixed(3))
    };
}

function estimate(a, b, x) {
    return Number((a * x + b).toFixed(2));
}

// Test data from the example
const testData = [
    [12, 11],
    [6, 6],
    [14, 10],
    [11, 7],
    [-5, -1],
    [14, 7],
    [18, 21],
    [21, 8]
];

// Calculate regression coefficients
const {a, b} = calculateRegression(testData);
console.log(`a = ${a}`); // Coefficient directeur
console.log(`b = ${b}`); // Ordonnée à l'origine

// Calculate estimation for x = 10
const estimateForX10 = estimate(a, b, 10);
console.log(`ỹ for x = 10: ${estimateForX10}`);