/**
 * AI Prediction Engine for Bond Trading Platform
 * Handles sale probability, price prediction, confidence scoring, and recommendations
 */

class BondAIEngine {
    constructor() {
        this.modelVersion = "1.2.3";
        this.lastUpdateTime = new Date();
        this.marketDataCache = new Map();
        
        // AI Model Parameters
        this.weights = {
            creditRating: 0.25,
            marketSentiment: 0.20,
            liquidityWindow: 0.18,
            priceMovement: 0.15,
            sectorStrength: 0.12,
            holdingPeriod: 0.10
        };
        
        this.riskFactors = {
            HIGH: { volatility: 0.15, baseScore: 75 },
            MEDIUM: { volatility: 0.08, baseScore: 80 },
            LOW: { volatility: 0.03, baseScore: 85 }
        };
    }

    /**
     * Main AI prediction function for bond sale probability and timing
     * @param {Object} bond - Bond details
     * @param {Object} userHolding - User's holding information
     * @param {Object} marketData - Current market conditions
     * @param {Object} platformStatus - Platform liquidity status
     * @returns {Object} Complete AI prediction with probability, confidence, timing
     */
    predictBondSale(bond, userHolding, marketData, platformStatus) {
        try {
            // 1. Calculate Sale Probability
            const saleProbability = this.calculateSaleProbability(bond, userHolding, marketData, platformStatus);
            
            // 2. Calculate Confidence Score
            const confidence = this.calculateConfidence(bond, userHolding, marketData);
            
            // 3. Determine Expected Timing
            const timing = this.calculateExpectedTiming(userHolding, platformStatus);
            
            // 4. Calculate Price Impact
            const priceImpact = this.calculatePriceImpact(bond, userHolding, marketData);
            
            // 5. Generate Recommendation
            const recommendation = this.generateRecommendation(bond, userHolding, saleProbability, timing);
            
            // 6. Identify Key Factors
            const factors = this.identifyKeyFactors(bond, userHolding, marketData, platformStatus);
            
            return {
                saleProbability: Math.round(saleProbability),
                confidence: Math.round(confidence),
                expectedTiming: timing,
                priceImpact: Math.round(priceImpact * 100) / 100,
                recommendation,
                factors,
                modelVersion: this.modelVersion,
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            console.error('AI Prediction Error:', error);
            return this.getFallbackPrediction();
        }
    }

    /**
     * Calculate sale probability based on multiple factors
     */
    calculateSaleProbability(bond, userHolding, marketData, platformStatus) {
        let probability = this.riskFactors[bond.riskLevel].baseScore;
        
        // Credit Rating Impact
        const creditScore = this.getCreditRatingScore(bond.creditRating);
        probability += creditScore * this.weights.creditRating * 100;
        
        // Market Sentiment Impact
        const sentimentScore = this.getMarketSentimentScore(marketData.sentiment);
        probability += sentimentScore * this.weights.marketSentiment * 100;
        
        // Liquidity Window Impact
        const liquidityScore = this.getLiquidityScore(userHolding, platformStatus);
        probability += liquidityScore * this.weights.liquidityWindow * 100;
        
        // Price Movement Impact
        const priceScore = this.getPriceMovementScore(bond, userHolding);
        probability += priceScore * this.weights.priceMovement * 100;
        
        // Sector Strength Impact
        const sectorScore = this.getSectorStrengthScore(bond.sector, marketData);
        probability += sectorScore * this.weights.sectorStrength * 100;
        
        // Holding Period Impact
        const holdingScore = this.getHoldingPeriodScore(userHolding);
        probability += holdingScore * this.weights.holdingPeriod * 100;
        
        // Normalize and apply bounds
        return Math.max(35, Math.min(98, probability));
    }

    /**
     * Calculate confidence in the prediction
     */
    calculateConfidence(bond, userHolding, marketData) {
        let confidence = 85; // Base confidence
        
        // Data quality factors
        const dataAge = this.getDataAge(marketData.lastUpdated);
        if (dataAge < 1) confidence += 10; // Fresh data
        else if (dataAge > 7) confidence -= 15; // Stale data
        
        // Market volatility impact
        const volatility = this.riskFactors[bond.riskLevel].volatility;
        confidence -= volatility * 50;
        
        // Credit rating certainty
        const ratingCertainty = this.getCreditRatingCertainty(bond.creditRating);
        confidence += ratingCertainty;
        
        // Historical accuracy for similar bonds
        const historicalAccuracy = this.getHistoricalAccuracy(bond.sector, bond.riskLevel);
        confidence = (confidence + historicalAccuracy) / 2;
        
        return Math.max(60, Math.min(98, confidence));
    }

    /**
     * Determine expected sale timing based on eligibility and market conditions
     */
    calculateExpectedTiming(userHolding, platformStatus) {
        // Check reserve eligibility
        if (userHolding.reserveEligible && this.isLiquidityWindowOpen(platformStatus)) {
            return "Instant via reserve";
        }
        
        if (userHolding.reserveEligible) {
            const daysToWindow = this.getDaysToNextWindow(platformStatus);
            return `Next window in ${daysToWindow} days`;
        }
        
        if (userHolding.daysUntilEligible) {
            return `Lock-in expires in ${userHolding.daysUntilEligible} days`;
        }
        
        // Peer-to-peer timing based on market conditions
        const avgSaleTime = this.calculatePeerToPeerTiming(userHolding);
        return `Peer-to-peer: ${avgSaleTime} days`;
    }

    /**
     * Calculate expected price impact of sale
     */
    calculatePriceImpact(bond, userHolding, marketData) {
        const marketTrend = marketData.trend || 0;
        const sectorTrend = marketData.sectorTrends?.[bond.sector] || 0;
        const liquidityImpact = userHolding.reserveEligible ? 0.1 : -0.2;
        
        return marketTrend + sectorTrend + liquidityImpact;
    }

    /**
     * Generate AI recommendation based on analysis
     */
    generateRecommendation(bond, userHolding, probability, timing) {
        if (probability > 90 && timing.includes("Instant")) {
            return "Excellent time to sell - high demand and instant liquidity";
        }
        
        if (probability > 80 && userHolding.reserveEligible) {
            return "Good sale opportunity with reserve fund access";
        }
        
        if (probability < 60) {
            return "Consider holding - market conditions not optimal";
        }
        
        if (!userHolding.reserveEligible) {
            return "Hold until reserve eligibility for better liquidity";
        }
        
        return "Market conditions favorable for sale";
    }

    /**
     * Identify key factors influencing the prediction
     */
    identifyKeyFactors(bond, userHolding, marketData, platformStatus) {
        const factors = [];
        
        if (userHolding.reserveEligible) {
            factors.push("Reserve fund eligible");
        } else {
            factors.push(`Lock-in period: ${userHolding.daysUntilEligible} days remaining`);
        }
        
        if (marketData.sentiment === 'positive') {
            factors.push("Positive market sentiment");
        }
        
        if (bond.creditRating === 'AAA' || bond.creditRating === 'AA') {
            factors.push("High credit rating");
        }
        
        const priceChange = ((bond.currentPrice - userHolding.purchasePrice) / userHolding.purchasePrice) * 100;
        if (priceChange > 2) {
            factors.push("Price above purchase level");
        } else if (priceChange < -2) {
            factors.push("Price below purchase level");
        }
        
        if (this.isHighDemandSector(bond.sector)) {
            factors.push("High demand sector");
        }
        
        if (platformStatus.reserveFund.percentage > 70) {
            factors.push("Strong platform liquidity");
        }
        
        return factors;
    }

    /**
     * Price prediction for bond value
     */
    predictBondPrice(bond, marketData, timeHorizon = 30) {
        const currentPrice = bond.currentPrice;
        let predictedPrice = currentPrice;
        
        // Market direction impact
        const marketTrend = marketData.trend || 0;
        predictedPrice *= (1 + marketTrend / 100);
        
        // Interest rate impact
        const interestRateChange = marketData.interestRateChange || 0;
        const duration = this.calculateModifiedDuration(bond);
        predictedPrice *= (1 - duration * interestRateChange / 100);
        
        // Credit spread impact
        const creditSpreadChange = marketData.creditSpreadChange || 0;
        predictedPrice *= (1 - creditSpreadChange / 100);
        
        // Sector-specific factors
        const sectorMultiplier = this.getSectorMultiplier(bond.sector, marketData);
        predictedPrice *= sectorMultiplier;
        
        // Time decay to maturity
        const timeToMaturity = this.getTimeToMaturity(bond.maturityDate);
        if (timeToMaturity < 365) {
            predictedPrice += (bond.faceValue - predictedPrice) * 0.1; // Pull to par
        }
        
        return predictedPrice;
    }

    /**
     * Calculate personalized reserve fund allocation
     */
    calculatePersonalizedReserve(userHolding, platformStatus) {
        if (!userHolding.reserveEligible) {
            return {
                allocation: 0,
                eligible: false,
                daysUntilEligible: userHolding.daysUntilEligible
            };
        }
        
        const totalValue = userHolding.currentValue + userHolding.accruedInterest;
        const maxLiquidation = Math.min(
            totalValue,
            platformStatus.reserveFund.available * 0.1, // Max 10% of reserve per user
            platformStatus.reserveFund.monthlyCapacity * 0.05 // Max 5% of monthly cap per user
        );
        
        return {
            allocation: maxLiquidation,
            eligible: true,
            percentage: (maxLiquidation / totalValue) * 100,
            remainingCapacity: platformStatus.reserveFund.monthlyCapacity - platformStatus.reserveFund.capacityUsed
        };
    }

    // Helper Methods

    getCreditRatingScore(rating) {
        const scores = {
            'AAA': 1.0, 'AA+': 0.95, 'AA': 0.90, 'AA-': 0.85,
            'A+': 0.80, 'A': 0.75, 'A-': 0.70,
            'BBB+': 0.65, 'BBB': 0.60, 'BBB-': 0.55,
            'BB+': 0.50, 'BB': 0.45, 'BB-': 0.40
        };
        return scores[rating] || 0.30;
    }

    getMarketSentimentScore(sentiment) {
        const scores = {
            'very_positive': 1.0,
            'positive': 0.7,
            'neutral': 0.5,
            'negative': 0.3,
            'very_negative': 0.1
        };
        return scores[sentiment] || 0.5;
    }

    getLiquidityScore(userHolding, platformStatus) {
        if (userHolding.reserveEligible && this.isLiquidityWindowOpen(platformStatus)) {
            return 1.0; // Maximum score for instant liquidity
        }
        
        if (userHolding.reserveEligible) {
            return 0.8; // High score but not immediate
        }
        
        return 0.3; // Peer-to-peer only
    }

    getPriceMovementScore(bond, userHolding) {
        const priceChange = (bond.currentPrice - userHolding.purchasePrice) / userHolding.purchasePrice;
        
        if (priceChange > 0.05) return 1.0; // Significant gain
        if (priceChange > 0.02) return 0.8; // Moderate gain
        if (priceChange > -0.02) return 0.6; // Flat
        if (priceChange > -0.05) return 0.4; // Moderate loss
        return 0.2; // Significant loss
    }

    getSectorStrengthScore(sector, marketData) {
        const sectorScores = {
            'Banking & Financial Services': 0.9,
            'Government': 1.0,
            'Energy & Petrochemicals': 0.7,
            'Renewable Energy': 0.8,
            'Technology': 0.6,
            'Healthcare': 0.8,
            'Real Estate': 0.5
        };
        
        const baseScore = sectorScores[sector] || 0.6;
        const sectorTrend = marketData.sectorTrends?.[sector] || 0;
        
        return Math.max(0.1, Math.min(1.0, baseScore + sectorTrend));
    }

    getHoldingPeriodScore(userHolding) {
        const holdingDays = this.getDaysSincePurchase(userHolding.purchaseDate);
        
        if (holdingDays < 30) return 0.3; // Very short hold
        if (holdingDays < 90) return 0.5; // Short hold
        if (holdingDays < 180) return 0.7; // Medium hold
        if (holdingDays < 365) return 0.9; // Long hold
        return 1.0; // Very long hold
    }

    getCreditRatingCertainty(rating) {
        const certainty = {
            'AAA': 15, 'AA+': 12, 'AA': 10, 'AA-': 8,
            'A+': 6, 'A': 4, 'A-': 2,
            'BBB+': 0, 'BBB': -2, 'BBB-': -4,
            'BB+': -6, 'BB': -8, 'BB-': -10
        };
        return certainty[rating] || -5;
    }

    getHistoricalAccuracy(sector, riskLevel) {
        // Simulated historical accuracy based on sector and risk
        const accuracyMap = {
            'Banking & Financial Services': { HIGH: 88, MEDIUM: 92, LOW: 95 },
            'Government': { HIGH: 90, MEDIUM: 94, LOW: 98 },
            'Energy & Petrochemicals': { HIGH: 82, MEDIUM: 87, LOW: 91 },
            'Renewable Energy': { HIGH: 79, MEDIUM: 84, LOW: 89 }
        };
        
        return accuracyMap[sector]?.[riskLevel] || 85;
    }

    /**
     * Calculate expected peer-to-peer sale timing
     */
    calculatePeerToPeerTiming(userHolding) {
        const bond = this.getBondById(userHolding.bondId);
        if (!bond) return "7-14";
        
        // Base timing by risk level
        const baseTimings = {
            LOW: { min: 3, max: 8 },
            MEDIUM: { min: 5, max: 12 },
            HIGH: { min: 7, max: 18 }
        };
        
        const timing = baseTimings[bond.riskLevel] || baseTimings.MEDIUM;
        
        // Adjust based on market conditions
        const marketMultiplier = this.getMarketTimingMultiplier();
        timing.min *= marketMultiplier;
        timing.max *= marketMultiplier;
        
        return `${Math.round(timing.min)}-${Math.round(timing.max)}`;
    }

    /**
     * Check if liquidity window is currently open
     */
    isLiquidityWindowOpen(platformStatus) {
        const today = new Date();
        const nextWindow = new Date(platformStatus.reserveFund.nextWindow);
        
        // Window is open for 3 days starting from nextWindow date
        const windowStart = new Date(nextWindow);
        const windowEnd = new Date(nextWindow.getTime() + 3 * 24 * 60 * 60 * 1000);
        
        return today >= windowStart && today <= windowEnd;
    }

    /**
     * Get days until next liquidity window
     */
    getDaysToNextWindow(platformStatus) {
        const today = new Date();
        const nextWindow = new Date(platformStatus.reserveFund.nextWindow);
        const diffTime = Math.abs(nextWindow - today);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    /**
     * Calculate modified duration for interest rate sensitivity
     */
    calculateModifiedDuration(bond) {
        const yearsToMaturity = this.getTimeToMaturity(bond.maturityDate) / 365;
        const couponRate = bond.couponRate / 100;
        
        // Simplified modified duration calculation
        return yearsToMaturity / (1 + couponRate);
    }

    /**
     * Get time to maturity in days
     */
    getTimeToMaturity(maturityDate) {
        const today = new Date();
        const maturity = new Date(maturityDate);
        return Math.max(0, (maturity - today) / (1000 * 60 * 60 * 24));
    }

    /**
     * Get days since purchase
     */
    getDaysSincePurchase(purchaseDate) {
        const today = new Date();
        const purchase = new Date(purchaseDate);
        return Math.max(0, (today - purchase) / (1000 * 60 * 60 * 24));
    }

    /**
     * Get data age in days
     */
    getDataAge(lastUpdated) {
        if (!lastUpdated) return 7; // Assume week old if no timestamp
        const today = new Date();
        const updated = new Date(lastUpdated);
        return (today - updated) / (1000 * 60 * 60 * 24);
    }

    /**
     * Check if sector is in high demand
     */
    isHighDemandSector(sector) {
        const highDemandSectors = [
            'Banking & Financial Services',
            'Government',
            'Renewable Energy'
        ];
        return highDemandSectors.includes(sector);
    }

    /**
     * Get sector performance multiplier
     */
    getSectorMultiplier(sector, marketData) {
        const sectorPerformance = marketData.sectorPerformance || {};
        return sectorPerformance[sector] || 1.0;
    }

    /**
     * Get market timing multiplier for peer-to-peer sales
     */
    getMarketTimingMultiplier() {
        // Simulate market conditions affecting sale timing
        const hour = new Date().getHours();
        if (hour >= 9 && hour <= 17) return 0.8; // Market hours - faster
        return 1.2; // After hours - slower
    }

    /**
     * Fallback prediction when AI fails
     */
    getFallbackPrediction() {
        return {
            saleProbability: 75,
            confidence: 70,
            expectedTiming: "5-10 days",
            priceImpact: 0,
            recommendation: "Standard market conditions",
            factors: ["Limited data available"],
            modelVersion: this.modelVersion,
            timestamp: new Date().toISOString(),
            fallback: true
        };
    }

    /**
     * Real-time market data simulation
     */
    getSimulatedMarketData() {
        return {
            sentiment: 'positive',
            trend: 0.5, // 0.5% positive trend
            interestRateChange: 0, // No change
            creditSpreadChange: -0.1, // Slight tightening
            lastUpdated: new Date().toISOString(),
            sectorTrends: {
                'Banking & Financial Services': 0.3,
                'Renewable Energy': 0.8,
                'Energy & Petrochemicals': -0.2,
                'Government': 0.1
            },
            sectorPerformance: {
                'Banking & Financial Services': 1.05,
                'Renewable Energy': 1.12,
                'Energy & Petrochemicals': 0.95,
                'Government': 1.02
            }
        };
    }

    /**
     * Update AI model with new market data
     */
    updateMarketData() {
        const newData = this.getSimulatedMarketData();
        this.marketDataCache.set('current', newData);
        this.lastUpdateTime = new Date();
        
        // Trigger UI updates if needed
        if (window.bondApp) {
            window.bondApp.onMarketDataUpdate(newData);
        }
    }

    /**
     * Get current market data
     */
    getCurrentMarketData() {
        return this.marketDataCache.get('current') || this.getSimulatedMarketData();
    }

    /**
     * Start real-time updates
     */
    startRealtimeUpdates() {
        // Update market data every 30 seconds
        setInterval(() => {
            this.updateMarketData();
        }, 30000);
        
        // Initial update
        this.updateMarketData();
    }

    /**
     * Calculate reserve fund impact on sale
     */
    calculateReserveFundImpact(userHolding, platformStatus) {
        if (!userHolding.reserveEligible) {
            return {
                impact: 0,
                reason: "Not reserve eligible",
                daysUntilEligible: userHolding.daysUntilEligible
            };
        }
        
        const reserveRatio = platformStatus.reserveFund.percentage / 100;
        const capacityUsed = platformStatus.reserveFund.capacityUsedPercent / 100;
        
        let impact = 0.8; // Base positive impact
        
        if (reserveRatio > 0.8) impact += 0.2; // High reserves
        if (capacityUsed < 0.1) impact += 0.1; // Low utilization
        
        return {
            impact,
            reason: "Reserve fund available",
            liquidityScore: impact
        };
    }

    /**
     * Generate detailed AI explanation for UI tooltips
     */
    generateAIExplanation(prediction, bond, userHolding) {
        return {
            probabilityExplanation: `Based on ${prediction.factors.length} key factors including market sentiment, credit rating, and liquidity conditions.`,
            confidenceExplanation: `AI model has ${prediction.confidence}% confidence based on historical data accuracy for similar ${bond.sector} bonds.`,
            timingExplanation: `Expected timing calculated from current market liquidity and your reserve fund eligibility status.`,
            recommendationExplanation: `Recommendation considers your holding period, market conditions, and optimal exit strategy.`
        };
    }

    /**
     * Batch prediction for multiple holdings
     */
    predictPortfolio(userPortfolio, platformStatus) {
        const marketData = this.getCurrentMarketData();
        const predictions = new Map();
        
        userPortfolio.forEach(holding => {
            const bond = this.getBondById(holding.bondId);
            if (bond) {
                const prediction = this.predictBondSale(bond, holding, marketData, platformStatus);
                predictions.set(holding.bondId, prediction);
            }
        });
        
        return predictions;
    }

    /**
     * Get bond by ID (this would typically query a database)
     */
    getBondById(bondId) {
        // This would be replaced with actual data fetching
        const bonds = window.bondApp?.bonds || [];
        return bonds.find(bond => bond.id === bondId);
    }
}

// Initialize AI Engine
window.bondAI = new BondAIEngine();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BondAIEngine;
}