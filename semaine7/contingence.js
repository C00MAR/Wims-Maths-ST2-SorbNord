function roundToDecimals(number, decimals = 3) {
    // Utilisation de la méthode de multiplication/division pour éviter les erreurs de virgule flottante
    const factor = Math.pow(10, decimals);
    return Math.round(number * factor) / factor;
}

function analyzeContingencyTable(data, decimals = 3) {
    // Calculer les totaux en gardant la précision maximale
    const rowTotals = data.map(row => row.reduce((sum, val) => sum + val, 0));
    const colTotals = data[0].map((_, colIndex) => 
        data.reduce((sum, row) => sum + row[colIndex], 0)
    );
    const grandTotal = rowTotals.reduce((sum, val) => sum + val, 0);

    // Calculer les effectifs théoriques sans arrondir les résultats intermédiaires
    const theoreticalEffectives = data.map((row, rowIndex) => 
        row.map((_, colIndex) => {
            const theoretical = (rowTotals[rowIndex] * colTotals[colIndex]) / grandTotal;
            return roundToDecimals(theoretical, decimals);
        })
    );

    // Calculer les taux de liaison en gardant la précision maximale jusqu'à l'arrondi final
    const linkageRates = data.map((row, rowIndex) => 
        row.map((value, colIndex) => {
            const theoretical = (rowTotals[rowIndex] * colTotals[colIndex]) / grandTotal;
            const rate = (value - theoretical) / theoretical;
            return roundToDecimals(rate, decimals);
        })
    );

    return {
        theoreticalEffectives,
        linkageRates
    };
}

// Test avec le tableau de l'exercice
const contingencyTable = [
    [31, 81, 8],
    [19, 32, 37],
    [44, 39, 32],
    [54, 49, 28]
];

const results = analyzeContingencyTable(contingencyTable);

// Afficher les résultats avec une mise en forme claire
console.log("Effectifs théoriques :");
results.theoreticalEffectives.forEach((row, index) => {
    console.log(`Ligne ${index + 1}:`, row.map(val => val.toFixed(3)).join('\t'));
});

console.log("\nTaux de liaison :");
results.linkageRates.forEach((row, index) => {
    console.log(`Ligne ${index + 1}:`, row.map(val => val.toFixed(3)).join('\t'));
});

// Test de vérification des calculs intermédiaires
function verifyCalculation(data) {
    const row = 0;
    const col = 0;
    
    const rowTotals = data.map(row => row.reduce((sum, val) => sum + val, 0));
    const colTotals = data[0].map((_, colIndex) => 
        data.reduce((sum, row) => sum + row[colIndex], 0)
    );
    const grandTotal = rowTotals.reduce((sum, val) => sum + val, 0);
    
    console.log('\nVérification des calculs intermédiaires :');
    console.log('Total ligne:', rowTotals[row]);
    console.log('Total colonne:', colTotals[col]);
    console.log('Total général:', grandTotal);
    
    const theoretical = (rowTotals[row] * colTotals[col]) / grandTotal;
    console.log('Effectif théorique non arrondi:', theoretical);
    console.log('Effectif théorique arrondi:', roundToDecimals(theoretical, 3));
}

verifyCalculation(contingencyTable);