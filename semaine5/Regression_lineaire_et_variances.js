function calculateRegressionStats(data) {
    // Extraire x et y
    const x = data.map(row => row[0]);
    const y = data.map(row => row[1]);
    
    // Calculer les moyennes
    const meanX = x.reduce((a, b) => a + b, 0) / x.length;
    const meanY = y.reduce((a, b) => a + b, 0) / y.length;
    
    // Calculer les variances
    const varX = x.reduce((a, b) => a + Math.pow(b - meanX, 2), 0) / x.length;
    const varY = y.reduce((a, b) => a + Math.pow(b - meanY, 2), 0) / y.length;
    
    // Calculer la covariance
    let covariance = 0;
    for(let i = 0; i < x.length; i++) {
        covariance += (x[i] - meanX) * (y[i] - meanY);
    }
    covariance /= x.length;
    
    // Calculer le coefficient de corrélation
    const r = covariance / Math.sqrt(varX * varY);
    const r2 = r * r;

    // Nouvelle formule pour les variances ajustée et résiduelle
    const varAdjusted = +(r2 * varY).toFixed(4);
    const varResidual = +((1 - r2) * varY).toFixed(4);
    
    return {
        varX: +varX.toFixed(2),
        varY: +varY.toFixed(2),
        r2: +r2.toFixed(4),
        varAdjusted,
        varResidual
    };
}

// Test
const data = [
    [16, 12],
    [-4, 22],
    [24, 2],
    [16, -4],
    [23, 0]
];

console.log(calculateRegressionStats(data));