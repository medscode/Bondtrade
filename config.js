/**
 * Configuration file for Bond Trading Platform
 * Edit these settings to customize AI behavior, fees, and platform parameters
 */

// AI Model Configuration
export const AI_CONFIG = {
    // Model weights (must sum close to 1.0)
    predictionWeights: {
        creditRating: 0.25,      // Credit rating influence (0-1)
        marketSentiment: 0.20,   // Market sentiment impact (0-1)
        liquidityWindow: 0.18,   // Reserve window availability (0-1)
        priceMovement: 0.15,     // Price change since purchase (0-1)
        sectorStrength: 0.12,    // Sector performance (0-1)
        holdingPeriod: 0.10      // Time held influence (0-1)
    },

    // Confidence thresholds
    confidenceThresholds: {
        minimum: 60,             // Minimum confidence to show predictions
        high: 90,                // High confidence threshold
        dataFreshness: 24        // Hours before data is considered stale
    },

    // Prediction bounds
    probabilityBounds: {
        minimum: 35,             // Minimum sale probability %
        maximum: 98              // Maximum sale probability %
    },

    // Model update intervals
    updateIntervals: {
        marketData: 30000,       // 30 seconds
        predictions: 60000,      // 1 minute
        portfolioRefresh: 120000 // 2 minutes
    }
};

// Platform Fee Structure
export const FEES_CONFIG = {
    trading: {
        listingFee: 0.3,         // % fee for peer-to-peer listings
        exitFee: 0.5,            // % fee on all sales
        lpClubFee: 4.0,          // % fee for LP club membership
        issuerEscrow: 3.0,       // % held in issuer escrow
        tradingSpread: 0.6       // % trading spread
    },
    
    payment: {
        upi: 0.0,                // % processing fee for UPI
        netbanking: 0.1,         // % processing fee for net banking
        cards: 0.2,              // % processing fee for cards
        wallet: 0.15             // % processing fee for digital wallets
    },
    
    // Fee calculation methods
    calculation: {
        exitFeeBase: 'marketValue',     // 'marketValue' or 'faceValue'
        listingFeeBase: 'orderValue',   // 'orderValue' or 'faceValue'
        roundingMode: 'up'              // 'up', 'down', or 'nearest'
    }
};

// Reserve Fund Configuration
export const RESERVE_CONFIG = {
    eligibility: {
        minimumLockPeriod: 180,         // Days before reserve eligibility
        minimumHolding: 1000,           // Minimum ₹ value for eligibility
        maximumPerUser: 0.1,            // Max 10% of total reserve per user
        maximumPerWindow: 0.05          // Max 5% of monthly capacity per user
    },
    
    liquidityWindows: {
        frequency: 'monthly',           // 'weekly', 'monthly', 'quarterly'
        duration: 3,                    // Days per window
        startDate: 15,                  // Day of month window starts
        timeZone: 'Asia/Kolkata'        // Window timing timezone
    },
    
    capacity: {
        totalReserve: 10000000,         // Total reserve fund size
        monthlyCapacity: 200000,        // Monthly liquidity capacity
        emergencyBuffer: 0.2            // 20% emergency buffer
    }
};

// User Interface Configuration
export const UI_CONFIG = {
    theme: {
        primaryColor: '#3b82f6',        // Primary brand color
        successColor: '#22c55e',        // Success/positive color
        warningColor: '#f59e0b',        // Warning/caution color
        dangerColor: '#ef4444',         // Error/danger color
        aiColor: '#a855f7'              // AI feature color
    },
    
    animations: {
        enabled: true,                  // Enable/disable animations
        duration: 200,                  // Default animation duration (ms)
        easing: 'ease-in-out'          // CSS easing function
    },
    
    display: {
        bondsPerPage: 12,               // Bonds shown in marketplace
        maxRecentTransactions: 5,       // Recent transactions to show
        refreshInterval: 30000,         // UI refresh interval (ms)
        aiUpdateIndicator: true         // Show AI update animations
    }
};

// Market Data Configuration
export const MARKET_CONFIG = {
    dataSources: {
        priceData: 'simulation',        // 'simulation', 'api', 'websocket'
        marketSentiment: 'simulation',  // 'simulation', 'newsapi', 'social'
        creditRatings: 'static',        // 'static', 'api', 'database'
        sectorData: 'simulation'        // 'simulation', 'api', 'bloomberg'
    },
    
    simulation: {
        priceVolatility: 0.02,          // Daily price movement %
        sentimentChangeRate: 0.1,       // Sentiment change probability
        updateFrequency: 30000          // Update frequency (ms)
    },
    
    realTime: {
        maxRetries: 3,                  // API retry attempts
        timeout: 5000,                  // API timeout (ms)
        fallbackToSimulation: true      // Use simulation if APIs fail
    }
};

// Security Configuration
export const SECURITY_CONFIG = {
    validation: {
        maxTransactionAmount: 1000000,  // Maximum single transaction ₹
        maxDailyVolume: 5000000,        // Maximum daily trading volume ₹
        requiresConfirmation: 50000,    // Amount requiring extra confirmation ₹
        maxQuantityPerOrder: 10000      // Maximum units per order
    },
    
    rateLimiting: {
        maxApiCalls: 100,               // Max API calls per minute
        maxTransactions: 10,            // Max transactions per hour
        cooldownPeriod: 300000          // Cooldown after limits (ms)
    },
    
    dataProtection: {
        encryptLocalStorage: true,      // Encrypt local data
        sessionTimeout: 1800000,        // Session timeout (30 min)
        logSensitiveData: false         // Log sensitive operations
    }
};

// Development/Debug Configuration
export const DEBUG_CONFIG = {
    logging: {
        level: 'info',                  // 'debug', 'info', 'warn', 'error'
        aiPredictions: true,            // Log AI predictions
        userActions: true,              // Log user interactions
        apiCalls: false,                // Log API calls
        performance: false              // Log performance metrics
    },
    
    simulation: {
        acceleratedTime: false,         // Speed up time for testing
        randomEvents: true,             // Generate random market events
        mockPayments: true,             // Use mock payment processing
        artificialLatency: 1000         // Add artificial delay (ms)
    },
    
    testing: {
        enableTestData: true,           // Use test data instead of real
        mockAIResponses: false,         // Use predetermined AI responses
        bypassValidation: false,        // Skip validation for testing
        simulateErrors: false           // Randomly simulate errors
    }
};

// Integration Configuration
export const INTEGRATION_CONFIG = {
    apis: {
        marketDataProvider: 'bloomberg', // 'bloomberg', 'reuters', 'yahoo'
        paymentGateway: 'razorpay',     // 'razorpay', 'stripe', 'payu'
        aiModelEndpoint: '/api/ai',      // AI prediction API endpoint
        authProvider: 'auth0'            // Authentication provider
    },
    
    endpoints: {
        baseUrl: 'https://api.bondtrade.com',
        aiPredict: '/predict',
        marketData: '/market',
        transactions: '/transactions',
        portfolio: '/portfolio'
    },
    
    features: {
        enableRealTimeData: false,       // Use real-time market data
        enableSocialLogin: true,         // Allow social media login
        enableNotifications: true,       // Push notifications
        enableAnalytics: true           // User analytics tracking
    }
};

// Export all configurations
export default {
    AI_CONFIG,
    FEES_CONFIG,
    RESERVE_CONFIG,
    UI_CONFIG,
    MARKET_CONFIG,
    SECURITY_CONFIG,
    DEBUG_CONFIG,
    INTEGRATION_CONFIG
};

// Usage in other files:
// import config from './config.js';
// const aiWeights = config.AI_CONFIG.predictionWeights;