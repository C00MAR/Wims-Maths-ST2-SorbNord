const data = [
    [12.719,19.683,32], // [moyenne, variance, effectif]
    [11.158,17.66,19],
    [12.172,7.866,29]
];

// 1. Moyenne générale
function calculateMeanTotal(data) {
    const totalSum = data.reduce((sum, group) => sum + group[0] * group[2], 0);
    const totalEffectif = data.reduce((sum, group) => sum + group[2], 0);
    return totalSum / totalEffectif;
}

// 2. Variance inter et intra
function calculateInterVariance(data, meanTotal) {
    const totalEffectif = data.reduce((sum, group) => sum + group[2], 0);
    const interVariance = data.reduce((sum, group) => {
        return sum + group[2] * Math.pow(group[0] - meanTotal, 2);
    }, 0) / totalEffectif;
    return interVariance;
}

function calculateIntraVariance(data) {
    const totalEffectif = data.reduce((sum, group) => sum + group[2], 0);
    const intraVariance = data.reduce((sum, group) => {
        return sum + group[2] * group[1];
    }, 0) / totalEffectif;
    return intraVariance;
}

// 3. Variance totale
function calculateTotalVariance(interVariance, intraVariance) {
    return interVariance + intraVariance;
}

// 4. Carré du rapport de corrélation
function calculateCorrelationRatio(interVariance, totalVariance) {
    return (interVariance / totalVariance) * 100;
}

// 5. Coefficient de corrélation
function calculateCorrelationCoef(interVariance, totalVariance) {
    return Math.sqrt(interVariance / totalVariance);
}

// Calculs
const meanTotal = calculateMeanTotal(data);
const interVariance = calculateInterVariance(data, meanTotal);
const intraVariance = calculateIntraVariance(data);
const totalVariance = calculateTotalVariance(interVariance, intraVariance);
const correlationRatioSquared = calculateCorrelationRatio(interVariance, totalVariance);
const correlationCoef = calculateCorrelationCoef(interVariance, totalVariance);

// Affichage des résultats avec 3 décimales
console.log(`Moyenne générale: ${meanTotal.toFixed(3)}`);
console.log(`Variance inter: ${interVariance.toFixed(3)}`);
console.log(`Variance intra: ${intraVariance.toFixed(3)}`);
console.log(`Variance totale: ${totalVariance.toFixed(3)}`);
console.log(`Carré du rapport de corrélation: ${correlationRatioSquared.toFixed(1)}%`);
console.log(`Coefficient de corrélation: ${correlationCoef.toFixed(3)}`);