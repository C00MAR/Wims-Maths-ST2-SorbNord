function analyzeContingencyTable(data) {
    // Fonction d'arrondi améliorée pour chaque étape
    function roundTo(number, decimals) {
        return Number(number.toFixed(decimals));
    }

    // Calcul des effectifs marginaux (arrondi à 3 décimales)
    const nj = data.map(row => roundTo(row.reduce((sum, val) => sum + val, 0), 3));
    const nk = data[0].map((_, j) => roundTo(data.reduce((sum, row) => sum + row[j], 0), 3));
    const n = roundTo(nj.reduce((sum, val) => sum + val, 0), 3);

    // Calcul des fréquences marginales (arrondi à 4 décimales)
    const fj = nj.map(val => roundTo(val / n, 4));
    const fk = nk.map(val => roundTo(val / n, 4));

    // 1. Effectifs théoriques (arrondi à 3 décimales)
    const theoreticalEffectives = data.map((row, i) => 
        row.map((_, j) => roundTo((nj[i] * nk[j]) / n, 3))
    );

    // 2. Taux de liaison (arrondi à 4 décimales)
    const tauxLiaison = data.map((row, i) => 
        row.map((val, j) => roundTo((val / theoreticalEffectives[i][j]) - 1, 4))
    );

    // 3. Contributions absolues (arrondi à 4 décimales)
    const contributionsAbsolues = data.map((row, i) => 
        row.map((_, j) => roundTo(fj[i] * fk[j] * Math.pow(tauxLiaison[i][j], 2), 4))
    );

    // Calcul des Ctaj et Ctak (arrondi à 4 décimales)
    const ctaJ = contributionsAbsolues.map(row => 
        roundTo(row.reduce((sum, val) => sum + val, 0), 4)
    );
    
    const ctaK = nk.map((_, j) => 
        roundTo(contributionsAbsolues.reduce((sum, row) => sum + row[j], 0), 4)
    );

    // Calcul du Φ² (arrondi à 4 décimales)
    const phiSquare = roundTo(ctaJ.reduce((sum, val) => sum + val, 0), 4);

    // Contributions relatives en pourcentage (arrondi à 1 décimale)
    const relativeContribJ = ctaJ.map(cta => 
        roundTo((cta / phiSquare) * 100, 1)
    );
    
    const relativeContribK = ctaK.map(cta => 
        roundTo((cta / phiSquare) * 100, 1)
    );

    // Déterminer la modalité qui contribue le plus
    const maxJIndex = relativeContribJ.indexOf(Math.max(...relativeContribJ));
    const maxKIndex = relativeContribK.indexOf(Math.max(...relativeContribK));

    return {
        theoreticalEffectives,
        contributionsAbsolues,
        ctaJ,
        ctaK,
        phiSquare,
        relativeContribJ,
        relativeContribK,
        maxJModalite: `j${maxJIndex + 1}`,
        maxJValue: relativeContribJ[maxJIndex],
        maxKModalite: `k${maxKIndex + 1}`,
        maxKValue: relativeContribK[maxKIndex]
    };
}

// Test avec les données 2x3
const data = [
    [6, 16],
    [13, 4]
];

const results = analyzeContingencyTable(data);
console.log("Effectifs théoriques :");
results.theoreticalEffectives.forEach((row, i) => {
    console.log(`j${i+1}: ${row.join('\t')}`);
});

console.log("\nContributions absolues :");
results.contributionsAbsolues.forEach((row, i) => {
    console.log(`j${i+1}: ${row.join('\t')}`);
});

console.log("\nContributions par ligne (Ctaj):", results.ctaJ);
console.log("Contributions par colonne (Ctak):", results.ctaK);

console.log("\nΦ² :", results.phiSquare);



console.log(`\nLa modalité ${results.maxJModalite} prend en compte ${results.maxJValue}% de la variance des taux de liaison.`);
console.log(`La modalité ${results.maxKModalite} prend en compte ${results.maxKValue}% de la variance des taux de liaison.`);
console.log(`j: ${results.relativeContribJ}`)
console.log(`k: ${results.relativeContribK}`)