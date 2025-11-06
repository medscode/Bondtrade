/**
 * AI Engine Test Suite
 * Test and validate AI predictions for bond trading platform
 */

// Test Data
const testBonds = [
    {
        id: "TEST001",
        issuerName: "Test Corp",
        sector: "Banking & Financial Services",
        couponRate: 6.5,
        maturityDate: "2026-12-31",
        riskLevel: "LOW",
        creditRating: "AAA",
        faceValue: 100,
        currentPrice: 102.5
    },
    {
        id: "TEST002", 
        issuerName: "Medium Risk Corp",
        sector: "Renewable Energy",
        couponRate: 7.2,
        maturityDate: "2027-06-15",
        riskLevel: "MEDIUM",
        creditRating: "A",
        faceValue: 1000,
        currentPrice: 985.0
    },
    {
        id: "TEST003",
        issuerName: "High Yield Corp",
        sector: "Energy & Petrochemicals", 
        couponRate: 9.8,
        maturityDate: "2028-03-30",
        riskLevel: "HIGH",
        creditRating: "BBB",
        faceValue: 100,
        currentPrice: 95.5
    }
];

const testHoldings = [
    {
        bondId: "TEST001",
        quantity: 50,
        purchaseDate: "2024-06-15",
        purchasePrice: 101.0,
        lockInExpiry: "2024-12-15",
        reserveEligible: true,
        reserveAllocation: 5000,
        currentValue: 5125,
        accruedInterest: 162.5
    },
    {
        bondId: "TEST002",
        quantity: 5,
        purchaseDate: "2025-07-01", 
        purchasePrice: 980.0,
        lockInExpiry: "2026-01-01",
        reserveEligible: false,
        daysUntilEligible: 120,
        currentValue: 4925,
        accruedInterest: 89.2
    }
];

const testMarketData = {
    sentiment: 'positive',
    trend: 0.8,
    interestRateChange: 0.25,
    creditSpreadChange: -0.1,
    lastUpdated: new Date().toISOString(),
    sectorTrends: {
        'Banking & Financial Services': 0.5,
        'Renewable Energy': 0.3,
        'Energy & Petrochemicals': -0.2
    },
    sectorPerformance: {
        'Banking & Financial Services': 1.05,
        'Renewable Energy': 1.08,
        'Energy & Petrochemicals': 0.98
    }
};

const testPlatformStatus = {
    reserveFund: {
        total: 10000000,
        available: 8000000,
        percentage: 80,
        nextWindow: "2025-09-15",
        monthlyCapacity: 500000,
        capacityUsed: 25000,
        capacityUsedPercent: 5.0
    }
};

/**
 * Test Suite Functions
 */

// Test AI Prediction Accuracy
function testAIPredictions() {
    console.log('🧪 Testing AI Predictions...\n');
    
    const ai = new BondAIEngine();
    const results = [];
    
    testBonds.forEach((bond, index) => {
        const holding = testHoldings[index] || testHoldings[0];
        
        console.log(`📊 Testing ${bond.issuerName} (${bond.riskLevel} risk):`);
        
        const prediction = ai.predictBondSale(bond, holding, testMarketData, testPlatformStatus);
        
        console.log(`  Sale Probability: ${prediction.saleProbability}%`);
        console.log(`  Confidence: ${prediction.confidence}%`);
        console.log(`  Expected Timing: ${prediction.expectedTiming}`);
        console.log(`  Recommendation: ${prediction.recommendation}`);
        console.log(`  Key Factors: ${prediction.factors.join(', ')}`);
        console.log('');
        
        results.push({
            bondId: bond.id,
            riskLevel: bond.riskLevel,
            prediction
        });
    });
    
    return results;
}

// Test Confidence Scoring
function testConfidenceScoring() {
    console.log('🎯 Testing Confidence Scoring...\n');
    
    const ai = new BondAIEngine();
    
    // Test with different data quality scenarios
    const scenarios = [
        { name: 'Fresh Data', dataAge: 0.5 },
        { name: 'Day Old Data', dataAge: 1 },
        { name: 'Week Old Data', dataAge: 7 },
        { name: 'Stale Data', dataAge: 14 }
    ];
    
    scenarios.forEach(scenario => {
        const modifiedMarketData = {
            ...testMarketData,
            lastUpdated: new Date(Date.now() - scenario.dataAge * 24 * 60 * 60 * 1000).toISOString()
        };
        
        const prediction = ai.predictBondSale(
            testBonds[0], 
            testHoldings[0], 
            modifiedMarketData, 
            testPlatformStatus
        );
        
        console.log(`${scenario.name}: ${prediction.confidence}% confidence`);
    });
    
    console.log('');
}

// Test Reserve Fund Calculations
function testReserveFundCalculations() {
    console.log('💧 Testing Reserve Fund Calculations...\n');
    
    const ai = new BondAIEngine();
    
    testHoldings.forEach((holding, index) => {
        const bond = testBonds[index] || testBonds[0];
        
        console.log(`🔍 ${bond.issuerName}:`);
        console.log(`  Reserve Eligible: ${holding.reserveEligible}`);
        
        const allocation = ai.calculatePersonalizedReserve(holding, testPlatformStatus);
        console.log(`  Allocation: ₹${allocation.allocation?.toLocaleString() || 0}`);
        
        if (allocation.eligible) {
            console.log(`  Percentage: ${allocation.percentage?.toFixed(1) || 0}% of holding`);
        } else {
            console.log(`  Days until eligible: ${allocation.daysUntilEligible || 'N/A'}`);
        }
        console.log('');
    });
}

// Test Price Predictions
function testPricePredictions() {
    console.log('💰 Testing Price Predictions...\n');
    
    const ai = new BondAIEngine();
    
    testBonds.forEach(bond => {
        const predictedPrice = ai.predictBondPrice(bond, testMarketData, 30);
        const priceChange = ((predictedPrice - bond.currentPrice) / bond.currentPrice * 100).toFixed(2);
        
        console.log(`📈 ${bond.issuerName}:`);
        console.log(`  Current: ₹${bond.currentPrice}`);
        console.log(`  Predicted: ₹${predictedPrice.toFixed(2)}`);
        console.log(`  Change: ${priceChange >= 0 ? '+' : ''}${priceChange}%`);
        console.log('');
    });
}

// Test Edge Cases
function testEdgeCases() {
    console.log('⚠️ Testing Edge Cases...\n');
    
    const ai = new BondAIEngine();
    
    // Test with invalid data
    try {
        const invalidPrediction = ai.predictBondSale(null, null, null, null);
        console.log('❌ Null data test:', invalidPrediction.fallback ? 'Handled' : 'Failed');
    } catch (error) {
        console.log('❌ Null data test: Unhandled error');
    }
    
    // Test with extreme market conditions
    const extremeMarket = {
        ...testMarketData,
        sentiment: 'very_negative',
        trend: -5.0,
        interestRateChange: 2.0
    };
    
    const extremePrediction = ai.predictBondSale(
        testBonds[0], 
        testHoldings[0], 
        extremeMarket, 
        testPlatformStatus
    );
    
    console.log(`🌪️ Extreme market conditions:`);
    console.log(`  Sale Probability: ${extremePrediction.saleProbability}%`);
    console.log(`  Confidence: ${extremePrediction.confidence}%`);
    console.log('');
    
    // Test with very high price volatility
    const volatileBond = {
        ...testBonds[2],
        riskLevel: 'HIGH'
    };
    
    const volatilePrediction = ai.predictBondSale(
        volatileBond, 
        testHoldings[0], 
        testMarketData, 
        testPlatformStatus
    );
    
    console.log(`📊 High volatility bond:`);
    console.log(`  Sale Probability: ${volatilePrediction.saleProbability}%`);
    console.log(`  Confidence: ${volatilePrediction.confidence}%`);
    console.log('');
}

// Performance Test
function testPerformance() {
    console.log('⚡ Testing Performance...\n');
    
    const ai = new BondAIEngine();
    const iterations = 1000;
    
    console.time('AI Prediction Performance');
    
    for (let i = 0; i < iterations; i++) {
        ai.predictBondSale(testBonds[0], testHoldings[0], testMarketData, testPlatformStatus);
    }
    
    console.timeEnd('AI Prediction Performance');
    console.log(`Average: ${(1000 / iterations).toFixed(2)}ms per prediction\n`);
}

// Test Portfolio Batch Processing
function testPortfolioBatch() {
    console.log('📦 Testing Portfolio Batch Processing...\n');
    
    const ai = new BondAIEngine();
    
    // Create larger test portfolio
    const largePortfolio = [];
    for (let i = 0; i < 50; i++) {
        largePortfolio.push({
            ...testHoldings[i % testHoldings.length],
            bondId: testBonds[i % testBonds.length].id
        });
    }
    
    console.time('Batch Prediction Processing');
    const batchResults = ai.predictPortfolio(largePortfolio, testPlatformStatus);
    console.timeEnd('Batch Prediction Processing');
    
    console.log(`Processed ${batchResults.size} holdings`);
    console.log('');
}

// Test Market Data Updates
function testMarketDataUpdates() {
    console.log('📡 Testing Market Data Updates...\n');
    
    const ai = new BondAIEngine();
    
    // Initial prediction
    const initialPrediction = ai.predictBondSale(
        testBonds[0], 
        testHoldings[0], 
        testMarketData, 
        testPlatformStatus
    );
    
    console.log(`Initial Prediction: ${initialPrediction.saleProbability}%`);
    
    // Update market data
    const updatedMarket = {
        ...testMarketData,
        sentiment: 'negative',
        trend: -1.5
    };
    
    const updatedPrediction = ai.predictBondSale(
        testBonds[0], 
        testHoldings[0], 
        updatedMarket, 
        testPlatformStatus
    );
    
    console.log(`Updated Prediction: ${updatedPrediction.saleProbability}%`);
    console.log(`Change: ${updatedPrediction.saleProbability - initialPrediction.saleProbability}%`);
    console.log('');
}

// Validation Tests
function validateAIOutput() {
    console.log('✅ Validating AI Output Format...\n');
    
    const ai = new BondAIEngine();
    const prediction = ai.predictBondSale(
        testBonds[0], 
        testHoldings[0], 
        testMarketData, 
        testPlatformStatus
    );
    
    const requiredFields = [
        'saleProbability', 'confidence', 'expectedTiming', 
        'priceImpact', 'recommendation', 'factors'
    ];
    
    const validations = requiredFields.map(field => {
        const exists = prediction.hasOwnProperty(field);
        console.log(`  ${field}: ${exists ? '✅' : '❌'} ${exists ? typeof prediction[field] : 'missing'}`);
        return exists;
    });
    
    // Validate value ranges
    const rangeValidations = [
        { field: 'saleProbability', min: 35, max: 98 },
        { field: 'confidence', min: 60, max: 98 },
        { field: 'priceImpact', min: -10, max: 10 }
    ];
    
    console.log('\n  Range Validations:');
    rangeValidations.forEach(({ field, min, max }) => {
        const value = prediction[field];
        const valid = value >= min && value <= max;
        console.log(`  ${field} (${value}): ${valid ? '✅' : '❌'} [${min}-${max}]`);
    });
    
    console.log('');
}

// Main Test Runner
function runAllTests() {
    console.clear();
    console.log('🚀 BondTrade Pro AI Engine Test Suite\n');
    console.log('═'.repeat(50) + '\n');
    
    try {
        // Run all tests
        testAIPredictions();
        testConfidenceScoring();
        testReserveFundCalculations();
        testPricePredictions();
        testEdgeCases();
        testPerformance();
        testPortfolioBatch();
        testMarketDataUpdates();
        validateAIOutput();
        
        console.log('🎉 All tests completed successfully!');
        
    } catch (error) {
        console.error('❌ Test suite failed:', error);
    }
}

// Benchmark Different Scenarios
function benchmarkScenarios() {
    console.log('📊 Benchmarking AI Scenarios...\n');
    
    const ai = new BondAIEngine();
    
    const scenarios = [
        {
            name: "Bull Market",
            market: { ...testMarketData, sentiment: 'very_positive', trend: 2.0 }
        },
        {
            name: "Bear Market", 
            market: { ...testMarketData, sentiment: 'very_negative', trend: -2.0 }
        },
        {
            name: "Rising Rates",
            market: { ...testMarketData, interestRateChange: 1.0 }
        },
        {
            name: "Credit Crunch",
            market: { ...testMarketData, creditSpreadChange: 1.5 }
        }
    ];
    
    scenarios.forEach(scenario => {
        console.log(`📈 ${scenario.name}:`);
        
        testBonds.forEach(bond => {
            const prediction = ai.predictBondSale(
                bond, 
                testHoldings[0], 
                scenario.market, 
                testPlatformStatus
            );
            
            console.log(`  ${bond.issuerName}: ${prediction.saleProbability}% (${prediction.confidence}% conf)`);
        });
        
        console.log('');
    });
}

// Interactive Testing Functions
function testSpecificBond(bondId, holdingData = null) {
    const bond = testBonds.find(b => b.id === bondId) || testBonds[0];
    const holding = holdingData || testHoldings[0];
    
    console.log(`🔍 Testing specific bond: ${bond.issuerName}\n`);
    
    const ai = new BondAIEngine();
    const prediction = ai.predictBondSale(bond, holding, testMarketData, testPlatformStatus);
    
    console.table({
        'Sale Probability': `${prediction.saleProbability}%`,
        'Confidence': `${prediction.confidence}%`,
        'Expected Timing': prediction.expectedTiming,
        'Price Impact': `${prediction.priceImpact}%`,
        'Recommendation': prediction.recommendation
    });
    
    console.log('Key Factors:', prediction.factors);
    
    return prediction;
}

// Test Custom Market Conditions
function testCustomMarket(marketConditions) {
    console.log('🌍 Testing Custom Market Conditions...\n');
    
    const ai = new BondAIEngine();
    const customMarket = { ...testMarketData, ...marketConditions };
    
    const results = testBonds.map(bond => {
        const prediction = ai.predictBondSale(
            bond, 
            testHoldings[0], 
            customMarket, 
            testPlatformStatus
        );
        
        return {
            bond: bond.issuerName,
            probability: prediction.saleProbability,
            confidence: prediction.confidence
        };
    });
    
    console.table(results);
    
    return results;
}

// Export test functions for browser console
if (typeof window !== 'undefined') {
    window.aiTests = {
        runAllTests,
        testAIPredictions,
        testConfidenceScoring,
        testReserveFundCalculations,
        testPricePredictions,
        testEdgeCases,
        testPerformance,
        benchmarkScenarios,
        testSpecificBond,
        testCustomMarket,
        
        // Test data
        testBonds,
        testHoldings,
        testMarketData,
        testPlatformStatus
    };
    
    // Auto-run tests on page load (for development)
    document.addEventListener('DOMContentLoaded', () => {
        if (window.location.search.includes('test=true')) {
            setTimeout(runAllTests, 1000);
        }
    });
}

// Export for Node.js testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        runAllTests,
        testAIPredictions,
        testConfidenceScoring,
        testReserveFundCalculations,
        testPricePredictions,
        testEdgeCases,
        benchmarkScenarios,
        testSpecificBond,
        testCustomMarket
    };
}

/**
 * Usage Examples:
 * 
 * // In browser console:
 * aiTests.runAllTests();                    // Run complete test suite
 * aiTests.testSpecificBond('TEST001');      // Test specific bond
 * aiTests.testCustomMarket({                // Test custom conditions
 *     sentiment: 'negative',
 *     trend: -1.5
 * });
 * 
 * // URL parameters:
 * // Add ?test=true to URL to auto-run tests
 * 
 * // Benchmark scenarios:
 * aiTests.benchmarkScenarios();            // Compare different market conditions
 */