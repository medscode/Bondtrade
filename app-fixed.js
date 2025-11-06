/**
 * Bond Trading Platform - Fixed Light Theme with Working Buttons
 * All button functionality properly implemented
 */

class BondTradingApp {
    constructor() {
        // Application state
        this.currentView = 'dashboard';
        this.currentFilter = 'ALL';
        this.currentP2PFilter = 'all';
        this.selectedBond = null;
        this.selectedHolding = null;
        this.selectedListing = null;
        this.selectedSaleMethod = 'p2p-listing';
        this.selectedPaymentMethod = null;
        this.userBalance = 568900;
        this.windowOpen = false;
        
        // Initialize data
        this.initializeData();
        
        // Setup application
        this.init();
    }

    initializeData() {
        // Bond marketplace data (new issues)
        this.bonds = [
            {
                id: "GEC2027",
                issuerName: "Green Energy Corp",
                sector: "Renewable Energy",
                couponRate: 4.8,
                maturityDate: "2027-11-30",
                riskLevel: "MEDIUM",
                creditRating: "A-",
                faceValue: 1000,
                currentPrice: 945.60,
                yield: 4.8,
                availableUnits: 4000,
                description: "Sustainable energy company bond with environmental focus",
                minInvestment: 100,
                features: ["ESG Compliant", "Medium Risk", "Stable Returns"],
                logo: "🌱",
                isNewIssue: true,
                p2pDemand: "High",
                avgP2PPremium: 2.8
            },
            {
                id: "REL2028",
                issuerName: "Reliance Industries",
                sector: "Energy & Petrochemicals",
                couponRate: 8.5,
                maturityDate: "2028-12-15",
                riskLevel: "HIGH",
                creditRating: "AA",
                faceValue: 100,
                currentPrice: 98.5,
                yield: 8.8,
                availableUnits: 10000,
                description: "High-yield corporate bond with strong P2P liquidity",
                minInvestment: 1000,
                features: ["High Yield", "Active P2P Market", "Quick Liquidity"],
                logo: "⚡",
                isNewIssue: true,
                p2pDemand: "Very High",
                avgP2PPremium: 3.2
            },
            {
                id: "HDFC2026",
                issuerName: "HDFC Bank",
                sector: "Banking & Financial Services",
                couponRate: 6.2,
                maturityDate: "2026-08-30",
                riskLevel: "LOW",
                creditRating: "AAA",
                faceValue: 100,
                currentPrice: 101.2,
                yield: 6.4,
                availableUnits: 15000,
                description: "Premium banking bond with excellent P2P performance",
                minInvestment: 500,
                features: ["AAA Rated", "Stable Returns", "High P2P Success"],
                logo: "🏦",
                isNewIssue: true,
                p2pDemand: "High",
                avgP2PPremium: 2.1
            }
        ];

        // P2P Listings from other users
        this.p2pListings = [
            {
                id: "P2P001",
                bondId: "HDFC2026",
                listingId: "LIST001",
                sellerName: "InvestorPro23",
                bondName: "HDFC Bank Bond 2026",
                sector: "Banking & Financial Services",
                creditRating: "AAA",
                faceValue: 100,
                listingPrice: 103.5,
                marketPrice: 101.2,
                premium: 2.3,
                quantity: 50,
                yield: 6.0,
                accruedInterest: 2.8,
                maturityDate: "2026-08-30",
                riskLevel: "LOW",
                listedDate: "2025-09-03",
                expiryDate: "2025-09-17",
                features: ["Premium Grade", "High Liquidity", "Instant Settlement"],
                logo: "🏦",
                sellerRating: 4.9,
                totalTrades: 47,
                isQuickSale: false,
                isPriority: true
            },
            {
                id: "P2P002",
                bondId: "GEC2027",
                listingId: "LIST002",
                sellerName: "GreenInvestor",
                bondName: "Green Energy Corp Bond",
                sector: "Renewable Energy",
                creditRating: "A-",
                faceValue: 1000,
                listingPrice: 965.0,
                marketPrice: 945.60,
                premium: 2.1,
                quantity: 25,
                yield: 4.6,
                accruedInterest: 18.5,
                maturityDate: "2027-11-30",
                riskLevel: "MEDIUM",
                listedDate: "2025-09-04",
                expiryDate: "2025-09-18",
                features: ["ESG Compliant", "Growth Potential", "Tax Benefits"],
                logo: "🌱",
                sellerRating: 4.8,
                totalTrades: 32,
                isQuickSale: true,
                isPriority: false
            },
            {
                id: "P2P003",
                bondId: "REL2028",
                listingId: "LIST003",
                sellerName: "HighYieldHunter",
                bondName: "Reliance Industries Bond",
                sector: "Energy & Petrochemicals",
                creditRating: "AA",
                faceValue: 100,
                listingPrice: 100.2,
                marketPrice: 98.5,
                premium: 1.7,
                quantity: 100,
                yield: 8.4,
                accruedInterest: 5.2,
                maturityDate: "2028-12-15",
                riskLevel: "HIGH",
                listedDate: "2025-09-02",
                expiryDate: "2025-09-16",
                features: ["High Yield", "Blue Chip", "Regular Dividends"],
                logo: "⚡",
                sellerRating: 5.0,
                totalTrades: 89,
                isQuickSale: false,
                isPriority: true
            }
        ];

        // User portfolio data
        this.userPortfolio = [
            {
                bondId: "GEC2027",
                quantity: 10,
                purchaseDate: "2025-03-15",
                purchasePrice: 940.00,
                lockInExpiry: "2025-09-15",
                reserveEligible: false,
                daysUntilEligible: 11,
                reserveAllocation: 0,
                currentValue: 9456,
                accruedInterest: 234.50,
                saleOptions: ["p2p-listing"],
                canList: true,
                estimatedP2PValue: 9700,
                p2pPotentialGain: 244
            },
            {
                bondId: "REL2028",
                quantity: 50,
                purchaseDate: "2024-12-10",
                purchasePrice: 97.50,
                lockInExpiry: "2025-06-10",
                reserveEligible: true,
                reserveAllocation: 4850,
                currentValue: 4925,
                accruedInterest: 412.75,
                saleOptions: ["p2p-listing"],
                canList: true,
                estimatedP2PValue: 5082,
                p2pPotentialGain: 157,
                reserveLimitReached: false
            },
            {
                bondId: "HDFC2026",
                quantity: 100,
                purchaseDate: "2024-11-20",
                purchasePrice: 100.80,
                lockInExpiry: "2025-05-20",
                reserveEligible: true,
                reserveAllocation: 10120,
                currentValue: 10120,
                accruedInterest: 287.60,
                saleOptions: ["p2p-listing"],
                canList: true,
                estimatedP2PValue: 10333,
                p2pPotentialGain: 213,
                reserveLimitReached: false
            }
        ];

        // User's active listings
        this.userListings = [];

        // Platform status
        this.platformStatus = {
            reserveFund: {
                total: 10000000,
                available: 7200000,
                percentage: 72,
                userAllocation: 14970,
                nextWindow: "2025-09-15",
                windowDaysRemaining: 11,
                monthlyCapacity: 200000,
                capacityUsed: 2800,
                capacityUsedPercent: 1.4,
                windowOpen: false
            },
            feeStructure: {
                listingFee: 0.3,
                exitFee: 0.5,
                lpClubFee: 4.0,
                issuerEscrow: 3.0,
                spread: 0.6,
                p2pFee: 0.5
            },
            p2pStats: {
                activeListings: 24,
                totalVolume: 2400000,
                successRate: 97,
                avgSaleTime: 4.2
            }
        };
    }

    init() {
        try {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setupApplication());
            } else {
                this.setupApplication();
            }
        } catch (error) {
            console.error('❌ Initialization error:', error);
            this.showError('Failed to initialize platform. Please refresh.');
        }
    }

    setupApplication() {
        console.log('🚀 Setting up Fixed P2P Bond Platform...');
        
        // Setup all event listeners
        this.setupEventListeners();
        
        // Update AI predictions
        this.updateAIPredictions();
        
        // Render current view
        this.renderCurrentView();
        
        // Update UI
        this.updateUI();
        
        // Start real-time updates
        this.startRealtimeUpdates();
        
        console.log('✅ Fixed P2P Platform initialized successfully');
        console.log('🔧 All buttons should now work properly');
    }

    setupEventListeners() {
        console.log('🔧 Setting up ALL event listeners...');

        // FIXED: Navigation tabs with proper delegation
        this.setupNavigationListeners();
        
        // FIXED: Filter buttons
        this.setupFilterListeners();
        
        // FIXED: Modal buttons
        this.setupModalListeners();
        
        // FIXED: Form elements
        this.setupFormListeners();
        
        // FIXED: Action buttons
        this.setupActionListeners();
        
        // Global event listeners
        this.setupGlobalListeners();
        
        console.log('✅ ALL event listeners setup complete');
    }

    setupNavigationListeners() {
        console.log('📍 Setting up navigation listeners...');
        
        // Navigation tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const view = e.currentTarget.dataset.view;
                console.log('🔄 Navigation clicked:', view);
                this.switchView(view);
            });
        });
    }

    setupFilterListeners() {
        console.log('🔍 Setting up filter listeners...');
        
        // Filter buttons for new bonds
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const filter = e.currentTarget.dataset.filter;
                console.log('🔍 Filter clicked:', filter);
                this.setFilter(filter);
            });
        });

        // P2P filter buttons
        document.querySelectorAll('.p2p-filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const filter = e.currentTarget.dataset.p2pFilter;
                console.log('🔍 P2P filter clicked:', filter);
                this.setP2PFilter(filter);
            });
        });

        // P2P sort dropdown
        const p2pSort = document.getElementById('p2p-sort');
        if (p2pSort) {
            p2pSort.addEventListener('change', (e) => {
                console.log('🔄 Sort changed:', e.target.value);
                this.sortP2PListings(e.target.value);
            });
        }
    }

    setupModalListeners() {
        console.log('📦 Setting up modal listeners...');
        
        // FIXED: List My Bonds button - CRITICAL
        const listMyBondsBtn = document.getElementById('list-my-bonds-btn');
        if (listMyBondsBtn) {
            console.log('✅ Found list-my-bonds-btn, adding listener');
            listMyBondsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('🎯 LIST MY BONDS CLICKED!');
                this.openListModal();
            });
        } else {
            console.error('❌ list-my-bonds-btn NOT FOUND!');
        }

        // Modal close buttons
        const closeButtons = [
            { id: 'close-list-modal', action: () => this.closeListModal() },
            { id: 'close-buy-modal', action: () => this.closeBuyModal() },
            { id: 'cancel-listing', action: () => this.closeListModal() },
            { id: 'cancel-buy', action: () => this.closeBuyModal() }
        ];

        closeButtons.forEach(({ id, action }) => {
            const btn = document.getElementById(id);
            if (btn) {
                console.log(`✅ Found ${id}, adding listener`);
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    console.log(`🎯 ${id} clicked!`);
                    action();
                });
            } else {
                console.error(`❌ ${id} NOT FOUND!`);
            }
        });

        // Modal overlay clicks
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                console.log('🎯 Modal overlay clicked');
                this.closeAllModals();
            }
        });
    }

    setupFormListeners() {
        console.log('📋 Setting up form listeners...');
        
        // FIXED: Listing form elements
        const listBondSelect = document.getElementById('list-bond-select');
        if (listBondSelect) {
            console.log('✅ Found list-bond-select, adding listener');
            listBondSelect.addEventListener('change', (e) => {
                console.log('🔄 Bond selected:', e.target.value);
                this.updateListingPreview();
            });
        }

        const listQuantity = document.getElementById('list-quantity');
        if (listQuantity) {
            console.log('✅ Found list-quantity, adding listener');
            listQuantity.addEventListener('input', (e) => {
                console.log('🔢 Quantity changed:', e.target.value);
                this.updateListingCalculation();
            });
        }

        const listPrice = document.getElementById('list-price');
        if (listPrice) {
            console.log('✅ Found list-price, adding listener');
            listPrice.addEventListener('input', (e) => {
                console.log('💰 Price changed:', e.target.value);
                this.updateListingCalculation();
            });
        }

        // Buy modal elements
        const buyQuantityInput = document.getElementById('buy-quantity');
        if (buyQuantityInput) {
            console.log('✅ Found buy-quantity, adding listener');
            buyQuantityInput.addEventListener('input', (e) => {
                console.log('🔢 Buy quantity changed:', e.target.value);
                this.updateBuyCalculation();
            });
        }
    }

    setupActionListeners() {
        console.log('🎬 Setting up action listeners...');
        
        // FIXED: Button event listeners
        const setMaxQuantityBtn = document.getElementById('set-max-quantity');
        if (setMaxQuantityBtn) {
            console.log('✅ Found set-max-quantity, adding listener');
            setMaxQuantityBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('🎯 Set max quantity clicked!');
                this.setListQuantityMax();
            });
        }

        const setMarketPriceBtn = document.getElementById('set-market-price');
        if (setMarketPriceBtn) {
            console.log('✅ Found set-market-price, adding listener');
            setMarketPriceBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('🎯 Set market price clicked!');
                this.setMarketPrice();
            });
        }

        // FIXED: Confirm listing button
        const confirmListingBtn = document.getElementById('confirm-listing-btn');
        if (confirmListingBtn) {
            console.log('✅ Found confirm-listing-btn, adding listener');
            confirmListingBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('🎯 Confirm listing clicked!');
                this.confirmListing();
            });
        }

        const proceedPaymentBtn = document.getElementById('proceed-payment');
        if (proceedPaymentBtn) {
            console.log('✅ Found proceed-payment, adding listener');
            proceedPaymentBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('🎯 Proceed payment clicked!');
                this.showPaymentOptions();
            });
        }

        // Price suggestion buttons and duration buttons using event delegation
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('price-suggestion')) {
                e.preventDefault();
                const premium = parseFloat(e.target.dataset.premium);
                console.log('🎯 Price suggestion clicked:', premium);
                this.setPricePremium(premium);
            }
            
            if (e.target.classList.contains('duration-btn')) {
                e.preventDefault();
                console.log('🎯 Duration button clicked:', e.target.dataset.days);
                document.querySelectorAll('.duration-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
            }
        });
    }

    setupGlobalListeners() {
        console.log('🌐 Setting up global listeners...');
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                console.log('⌨️ Escape key pressed');
                this.closeAllModals();
            }
        });
    }

    // Navigation and view management
    switchView(viewName) {
        console.log('🔄 Switching to view:', viewName);
        
        // Update navigation
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        const activeTab = document.querySelector(`[data-view="${viewName}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }

        // Update view
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });
        
        const targetView = document.getElementById(`${viewName}-view`);
        if (targetView) {
            targetView.classList.add('active');
        }

        this.currentView = viewName;
        this.renderCurrentView();
    }

    setFilter(filter) {
        console.log('🔍 Setting filter:', filter);
        
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeFilter = document.querySelector(`[data-filter="${filter}"]`);
        if (activeFilter) {
            activeFilter.classList.add('active');
        }

        this.currentFilter = filter;
        this.renderBonds();
    }

    setP2PFilter(filter) {
        console.log('🔍 Setting P2P filter:', filter);
        
        document.querySelectorAll('.p2p-filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeFilter = document.querySelector(`[data-p2p-filter="${filter}"]`);
        if (activeFilter) {
            activeFilter.classList.add('active');
        }

        this.currentP2PFilter = filter;
        this.renderP2PListings();
    }

    renderCurrentView() {
        console.log('🎨 Rendering current view:', this.currentView);
        
        switch(this.currentView) {
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'portfolio':
                this.renderPortfolio();
                break;
            case 'marketplace':
                this.renderBonds();
                break;
            case 'p2p-marketplace':
                this.renderP2PMarketplace();
                break;
        }
    }

    // Dashboard rendering
    renderDashboard() {
        this.updateAIInsights();
        this.updateDashboardStats();
    }

    updateDashboardStats() {
        const p2pCountElement = document.getElementById('p2p-count');
        if (p2pCountElement) {
            p2pCountElement.textContent = this.platformStatus.p2pStats.activeListings;
        }
    }

    // Portfolio rendering with P2P focus
    renderPortfolio() {
        console.log('🎨 Rendering portfolio...');
        
        const container = document.getElementById('holdings-container');
        if (!container) {
            console.error('❌ holdings-container not found');
            return;
        }

        if (this.userPortfolio.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-briefcase"></i>
                    <h3>No investments yet</h3>
                    <p>Start investing in bonds to build your portfolio</p>
                    <button class="btn btn-primary" onclick="bondApp.switchView('marketplace')">
                        Explore Bonds
                    </button>
                </div>
            `;
            return;
        }

        const holdingsHTML = this.userPortfolio.map((holding, index) => {
            const bond = this.bonds.find(b => b.id === holding.bondId);
            if (!bond) {
                console.warn('Bond not found for holding:', holding.bondId);
                return '';
            }

            const totalReturn = holding.currentValue + holding.accruedInterest - (holding.quantity * holding.purchasePrice);
            const returnPercent = ((totalReturn / (holding.quantity * holding.purchasePrice)) * 100).toFixed(2);
            
            // Get AI prediction for this holding
            const aiPrediction = window.bondAI ? window.bondAI.predictBondSale(
                bond, 
                holding, 
                window.bondAI.getCurrentMarketData(), 
                this.platformStatus
            ) : this.getFallbackPrediction();

            // Enhanced P2P metrics
            const p2pPremium = ((holding.estimatedP2PValue - holding.currentValue) / holding.currentValue * 100).toFixed(1);
            const reserveAvailable = holding.reserveEligible && !holding.reserveLimitReached;

            return `
                <div class="holding-card">
                    <div class="holding-header">
                        <div class="holding-info">
                            <div class="holding-icon">${bond.logo}</div>
                            <div class="holding-details">
                                <h3 class="holding-title">${bond.issuerName}</h3>
                                <p class="holding-subtitle">${bond.sector} • ${holding.quantity} units</p>
                            </div>
                        </div>
                        <div class="holding-status">
                            <span class="status-badge p2p-ready">
                                <i class="fas fa-exchange-alt"></i> P2P Ready
                            </span>
                            ${reserveAvailable ? `<span class="status-badge reserve-backup"><i class="fas fa-shield"></i> Reserve Backup</span>` : ''}
                        </div>
                    </div>

                    <div class="holding-metrics">
                        <div class="metric">
                            <span class="metric-label">Invested</span>
                            <span class="metric-value">₹${(holding.quantity * holding.purchasePrice).toLocaleString()}</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">Current Value</span>
                            <span class="metric-value">₹${holding.currentValue.toLocaleString()}</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">P2P Value</span>
                            <span class="metric-value positive">₹${holding.estimatedP2PValue.toLocaleString()}</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">P2P Advantage</span>
                            <span class="metric-value positive">+₹${holding.p2pPotentialGain} (+${p2pPremium}%)</span>
                        </div>
                    </div>

                    <div class="p2p-opportunity-enhanced">
                        <div class="p2p-header">
                            <i class="fas fa-star"></i>
                            <span>P2P Market Advantage</span>
                            <div class="demand-indicator ${bond.p2pDemand.toLowerCase().replace(' ', '-')}">
                                ${bond.p2pDemand} Demand
                            </div>
                        </div>
                        <div class="p2p-comparison">
                            <div class="comparison-item">
                                <div class="comparison-label">Instant Sale</div>
                                <div class="comparison-value">₹${holding.currentValue.toLocaleString()}</div>
                                <div class="comparison-note">Window closed</div>
                            </div>
                            <div class="vs-indicator">VS</div>
                            <div class="comparison-item preferred">
                                <div class="comparison-label">P2P Market</div>
                                <div class="comparison-value positive">₹${holding.estimatedP2PValue.toLocaleString()}</div>
                                <div class="comparison-note">Avg premium: ${bond.avgP2PPremium}%</div>
                            </div>
                        </div>
                        <div class="p2p-stats">
                            <div class="stat-mini">
                                <i class="fas fa-clock"></i>
                                <span>Avg. ${this.platformStatus.p2pStats.avgSaleTime} days</span>
                            </div>
                            <div class="stat-mini">
                                <i class="fas fa-check-circle"></i>
                                <span>${this.platformStatus.p2pStats.successRate}% success</span>
                            </div>
                            <div class="stat-mini">
                                <i class="fas fa-users"></i>
                                <span>${this.getActiveP2PBuyers(bond)} active buyers</span>
                            </div>
                        </div>
                    </div>

                    ${reserveAvailable ? `
                        <div class="reserve-backup-info">
                            <div class="backup-header">
                                <i class="fas fa-shield-alt"></i>
                                <span>Reserve Backup Available</span>
                            </div>
                            <div class="backup-details">
                                <span>Available: ₹${holding.reserveAllocation.toLocaleString()}</span>
                                <span class="backup-note">Use if P2P doesn't meet expectations</span>
                            </div>
                        </div>
                    ` : `
                        <div class="reserve-unavailable-info">
                            <div class="unavailable-header">
                                <i class="fas fa-info-circle"></i>
                                <span>Reserve Window Status</span>
                            </div>
                            <div class="unavailable-details">
                                <span>Window opens in ${this.platformStatus.reserveFund.windowDaysRemaining} days</span>
                                <span class="unavailable-note">P2P trading available now with better returns</span>
                            </div>
                        </div>
                    `}

                    <div class="ai-prediction">
                        <div class="ai-header">
                            <i class="fas fa-robot"></i>
                            <span>AI P2P Analysis</span>
                            <div class="confidence-indicator">${aiPrediction.confidence}%</div>
                        </div>
                        <div class="ai-metrics">
                            <div class="ai-metric">
                                <span class="ai-label">P2P Success Probability</span>
                                <div class="probability-bar">
                                    <div class="probability-fill" style="width: ${Math.min(95, aiPrediction.saleProbability + 10)}%"></div>
                                </div>
                                <span class="ai-value">${Math.min(95, aiPrediction.saleProbability + 10)}%</span>
                            </div>
                            <div class="ai-metric">
                                <span class="ai-label">Expected Timeline</span>
                                <span class="ai-value">${this.getP2PTimeline(bond)} days</span>
                            </div>
                        </div>
                        <div class="ai-recommendation">
                            <i class="fas fa-lightbulb"></i>
                            <span>${this.getEnhancedP2PRecommendation(bond, holding)}</span>
                        </div>
                    </div>

                    <div class="holding-actions">
                        <button class="btn btn-primary btn-large" onclick="bondApp.openListModalForBond('${holding.bondId}')">
                            <i class="fas fa-tags"></i>
                            List on P2P Market
                            <span class="btn-benefit">+₹${holding.p2pPotentialGain} potential</span>
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = holdingsHTML;
        console.log('✅ Portfolio rendered successfully');
    }

    // New bonds marketplace
    renderBonds() {
        console.log('🎨 Rendering bonds marketplace...');
        
        const grid = document.getElementById('bonds-grid');
        if (!grid) {
            console.error('❌ bonds-grid not found');
            return;
        }

        const filteredBonds = this.getFilteredBonds();
        
        const bondsHTML = filteredBonds.map(bond => {
            const aiPrediction = this.getAIPricePrediction(bond);
            
            return `
                <div class="bond-card">
                    <div class="bond-header">
                        <div class="bond-info">
                            <div class="bond-logo">${bond.logo}</div>
                            <div class="bond-details">
                                <h3 class="bond-name">${bond.issuerName}</h3>
                                <p class="bond-sector">${bond.sector}</p>
                            </div>
                        </div>
                        <div class="risk-indicator ${bond.riskLevel.toLowerCase()}">
                            ${this.getRiskIcon(bond.riskLevel)} ${bond.riskLevel}
                        </div>
                    </div>

                    <div class="bond-metrics">
                        <div class="metric-grid">
                            <div class="bond-metric">
                                <span class="metric-label">Issue Price</span>
                                <span class="metric-value">₹${bond.currentPrice}</span>
                            </div>
                            <div class="bond-metric">
                                <span class="metric-label">Yield</span>
                                <span class="metric-value">${bond.yield}%</span>
                            </div>
                            <div class="bond-metric">
                                <span class="metric-label">P2P Demand</span>
                                <span class="metric-value">${bond.p2pDemand}</span>
                            </div>
                            <div class="bond-metric">
                                <span class="metric-label">P2P Premium</span>
                                <span class="metric-value positive">+${bond.avgP2PPremium}%</span>
                            </div>
                        </div>
                    </div>

                    <div class="ai-insights">
                        <div class="ai-header">
                            <i class="fas fa-brain"></i>
                            <span>P2P Opportunity</span>
                            <span class="confidence-badge">${aiPrediction.confidence}%</span>
                        </div>
                        <div class="ai-content">
                            <div class="price-prediction">
                                <span class="prediction-label">P2P Potential</span>
                                <span class="prediction-value positive">
                                    ₹${(bond.currentPrice * (1 + bond.avgP2PPremium / 100)).toFixed(2)}
                                </span>
                                <span class="prediction-change">
                                    +${bond.avgP2PPremium}% premium
                                </span>
                            </div>
                            <div class="ai-recommendation-badge buy">
                                Strong P2P Asset
                            </div>
                        </div>
                    </div>

                    <div class="bond-features">
                        <span class="feature-tag new-issue">New Issue</span>
                        <span class="feature-tag p2p-ready">P2P Ready</span>
                        ${bond.features.slice(0, 2).map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                    </div>

                    <div class="bond-actions">
                        <button class="btn btn-primary" onclick="bondApp.openBuyModal('${bond.id}', 'new-issue')">
                            <i class="fas fa-plus"></i>
                            Invest for P2P Trading
                        </button>
                        <button class="btn btn-secondary" onclick="bondApp.viewBondDetails('${bond.id}')">
                            <i class="fas fa-info-circle"></i>
                            Details
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        grid.innerHTML = bondsHTML;
        console.log('✅ Bonds marketplace rendered successfully');
    }

    // P2P Marketplace rendering
    renderP2PMarketplace() {
        console.log('🎨 Rendering P2P marketplace...');
        
        this.updateP2PStats();
        this.renderP2PListings();
    }

    updateP2PStats() {
        const stats = this.platformStatus.p2pStats;
        
        const statValues = document.querySelectorAll('.stat-value');
        if (statValues.length >= 3) {
            statValues[0].textContent = stats.activeListings;
            statValues[1].textContent = `₹${(stats.totalVolume / 100000).toFixed(1)}L`;
            statValues[2].textContent = `${stats.successRate}%`;
        }
    }

    renderP2PListings() {
        console.log('🎨 Rendering P2P listings...');
        
        const grid = document.getElementById('p2p-listings-grid');
        if (!grid) {
            console.error('❌ p2p-listings-grid not found');
            return;
        }

        let listings = this.getFilteredP2PListings();
        
        if (listings.length === 0) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <i class="fas fa-exchange-alt"></i>
                    <h3>No P2P listings found</h3>
                    <p>Try adjusting your filters or check back later</p>
                </div>
            `;
            return;
        }

        const listingsHTML = listings.map(listing => {
            const premiumColor = listing.premium > 3 ? 'warning' : listing.premium > 0 ? 'success' : 'muted';
            const timeLeft = this.calculateTimeLeft(listing.expiryDate);
            
            return `
                <div class="p2p-listing-card">
                    <div class="listing-header">
                        <div class="listing-info">
                            <div class="listing-icon">${listing.logo}</div>
                            <div class="listing-details">
                                <h3 class="listing-title">${listing.bondName}</h3>
                                <p class="listing-subtitle">${listing.sector} • by ${listing.sellerName}</p>
                            </div>
                        </div>
                        <div class="listing-badges">
                            <div class="listing-type">P2P</div>
                            ${listing.premium > 0 ? `<div class="premium-badge">+${listing.premium.toFixed(1)}%</div>` : ''}
                            ${listing.isQuickSale ? `<div class="quick-sale-badge">Quick Sale</div>` : ''}
                            ${listing.isPriority ? `<div class="priority-badge">Featured</div>` : ''}
                        </div>
                    </div>

                    <div class="seller-info">
                        <div class="seller-rating">
                            <div class="stars">
                                ${this.generateStars(listing.sellerRating)}
                            </div>
                            <span class="rating-text">${listing.sellerRating} (${listing.totalTrades} trades)</span>
                        </div>
                        <div class="time-left ${timeLeft.urgent ? 'urgent' : ''}">
                            <i class="fas fa-clock"></i>
                            <span>${timeLeft.text}</span>
                        </div>
                    </div>

                    <div class="listing-metrics">
                        <div class="metric-grid">
                            <div class="listing-metric">
                                <span class="metric-label">P2P Price</span>
                                <span class="metric-value">₹${listing.listingPrice}</span>
                            </div>
                            <div class="listing-metric">
                                <span class="metric-label">Market Price</span>
                                <span class="metric-value">₹${listing.marketPrice}</span>
                            </div>
                            <div class="listing-metric">
                                <span class="metric-label">Yield</span>
                                <span class="metric-value">${listing.yield}%</span>
                            </div>
                            <div class="listing-metric">
                                <span class="metric-label">Quantity</span>
                                <span class="metric-value">${listing.quantity} units</span>
                            </div>
                        </div>
                    </div>

                    <div class="price-comparison">
                        <div class="price-info">
                            <span class="price-label">Total Investment</span>
                            <div class="price-details">
                                <span class="total-price">₹${(listing.listingPrice * listing.quantity).toLocaleString()}</span>
                                <span class="premium-indicator ${premiumColor}">
                                    ${listing.premium > 0 ? `+₹${((listing.listingPrice - listing.marketPrice) * listing.quantity).toFixed(0)} premium` : 'At market price'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="listing-features">
                        ${listing.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                    </div>

                    <div class="listing-actions">
                        <button class="btn btn-primary" onclick="bondApp.openBuyModal('${listing.id}', 'p2p-listing')">
                            <i class="fas fa-shopping-cart"></i>
                            Buy from P2P
                        </button>
                        <button class="btn btn-secondary" onclick="bondApp.viewListingDetails('${listing.id}')">
                            <i class="fas fa-info-circle"></i>
                            Details
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        grid.innerHTML = listingsHTML;
        console.log('✅ P2P listings rendered successfully');
    }

    // FIXED: List Modal Functions
    openListModal(bondId = null) {
        console.log('📝 OPENING LIST MODAL for bond:', bondId);
        
        const selectElement = document.getElementById('list-bond-select');
        if (!selectElement) {
            console.error('❌ list-bond-select not found!');
            return;
        }

        const availableBonds = this.userPortfolio.filter(holding => holding.canList);
        console.log('📋 Available bonds to list:', availableBonds.length);
        
        selectElement.innerHTML = '<option value="">Choose a bond from your portfolio...</option>';
        
        availableBonds.forEach(holding => {
            const bond = this.bonds.find(b => b.id === holding.bondId);
            if (bond) {
                selectElement.innerHTML += `
                    <option value="${holding.bondId}" ${bondId === holding.bondId ? 'selected' : ''}>
                        ${bond.issuerName} - ${holding.quantity} units
                    </option>
                `;
            }
        });

        if (bondId) {
            selectElement.value = bondId;
            this.updateListingPreview();
        }

        const modal = document.getElementById('list-modal');
        if (modal) {
            modal.classList.add('active');
            document.body.classList.add('modal-open');
            console.log('✅ List modal opened successfully');
        } else {
            console.error('❌ list-modal not found!');
        }
    }

    // FIXED: Convenience method for portfolio buttons
    openListModalForBond(bondId) {
        console.log('📝 Opening list modal for specific bond:', bondId);
        this.openListModal(bondId);
    }

    closeListModal() {
        console.log('📝 Closing list modal');
        
        const modal = document.getElementById('list-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
            console.log('✅ List modal closed');
        }
    }

    updateListingPreview() {
        console.log('🔄 Updating listing preview');
        
        const selectElement = document.getElementById('list-bond-select');
        const previewElement = document.getElementById('listing-preview');
        
        if (!selectElement || !previewElement) {
            console.error('❌ Missing elements for listing preview');
            return;
        }

        const bondId = selectElement.value;
        if (!bondId) {
            previewElement.style.display = 'none';
            return;
        }

        const holding = this.userPortfolio.find(h => h.bondId === bondId);
        const bond = this.bonds.find(b => b.id === bondId);
        
        if (!holding || !bond) {
            console.error('❌ Bond or holding not found');
            return;
        }

        previewElement.style.display = 'block';
        
        document.getElementById('preview-bond-name').textContent = bond.issuerName;
        document.getElementById('preview-bond-details').textContent = 
            `${bond.sector} • ${bond.creditRating} • ${holding.quantity} units available`;
        
        document.getElementById('list-quantity').value = holding.quantity;
        document.getElementById('list-quantity').max = holding.quantity;
        document.getElementById('list-available-quantity').textContent = holding.quantity;
        document.getElementById('list-price').value = (bond.currentPrice * 1.02).toFixed(2);
        
        this.updateListingCalculation();
        
        document.getElementById('confirm-listing-btn').disabled = false;
        
        console.log('✅ Listing preview updated');
    }

    updateListingCalculation() {
        const quantityInput = document.getElementById('list-quantity');
        const priceInput = document.getElementById('list-price');
        
        if (!quantityInput || !priceInput) return;

        const quantity = parseInt(quantityInput.value) || 0;
        const price = parseFloat(priceInput.value) || 0;
        
        const totalValue = quantity * price;
        const platformFee = totalValue * (this.platformStatus.feeStructure.p2pFee / 100);
        const netAmount = totalValue - platformFee;
        
        const totalElement = document.getElementById('listing-total-value');
        const feeElement = document.getElementById('listing-platform-fee');
        const netElement = document.getElementById('listing-net-amount');
        
        if (totalElement) totalElement.textContent = `₹${totalValue.toFixed(2)}`;
        if (feeElement) feeElement.textContent = `₹${platformFee.toFixed(2)}`;
        if (netElement) netElement.innerHTML = `<strong>₹${netAmount.toFixed(2)}</strong>`;
        
        console.log('💰 Listing calculation updated:', { quantity, price, totalValue, platformFee, netAmount });
    }

    setListQuantityMax() {
        console.log('🎯 Setting quantity to maximum');
        
        const selectElement = document.getElementById('list-bond-select');
        const quantityInput = document.getElementById('list-quantity');
        
        if (!selectElement || !quantityInput) return;

        const bondId = selectElement.value;
        if (!bondId) return;

        const holding = this.userPortfolio.find(h => h.bondId === bondId);
        if (holding) {
            quantityInput.value = holding.quantity;
            this.updateListingCalculation();
            console.log('✅ Quantity set to max:', holding.quantity);
        }
    }

    setMarketPrice() {
        console.log('🎯 Setting price to market price');
        
        const selectElement = document.getElementById('list-bond-select');
        const priceInput = document.getElementById('list-price');
        
        if (!selectElement || !priceInput) return;

        const bondId = selectElement.value;
        if (!bondId) return;

        const bond = this.bonds.find(b => b.id === bondId);
        if (bond) {
            priceInput.value = bond.currentPrice;
            this.updateListingCalculation();
            console.log('✅ Price set to market:', bond.currentPrice);
        }
    }

    setPricePremium(premium) {
        console.log('🎯 Setting price premium:', premium);
        
        const selectElement = document.getElementById('list-bond-select');
        const priceInput = document.getElementById('list-price');
        
        if (!selectElement || !priceInput) return;

        const bondId = selectElement.value;
        if (!bondId) return;

        const bond = this.bonds.find(b => b.id === bondId);
        if (bond) {
            const premiumPrice = bond.currentPrice * (1 + premium / 100);
            priceInput.value = premiumPrice.toFixed(2);
            this.updateListingCalculation();
            
            // Update active state
            document.querySelectorAll('.price-suggestion').forEach(btn => btn.classList.remove('active'));
            document.querySelector(`[data-premium="${premium}"]`)?.classList.add('active');
            
            console.log('✅ Premium price set:', premiumPrice);
        }
    }

    confirmListing() {
        console.log('🎯 CONFIRMING LISTING');
        
        const selectElement = document.getElementById('list-bond-select');
        if (!selectElement || !selectElement.value) {
            this.showError('Please select a bond to list');
            return;
        }

        const bondId = selectElement.value;
        const quantity = parseInt(document.getElementById('list-quantity').value);
        const price = parseFloat(document.getElementById('list-price').value);
        const activeDurationBtn = document.querySelector('.duration-btn.active');
        const duration = activeDurationBtn ? parseInt(activeDurationBtn.dataset.days) : 7;

        if (!quantity || quantity <= 0) {
            this.showError('Please enter a valid quantity');
            return;
        }

        if (!price || price <= 0) {
            this.showError('Please enter a valid price');
            return;
        }

        console.log('📋 Listing details:', { bondId, quantity, price, duration });

        this.showLoading('Creating your P2P listing...');

        setTimeout(() => {
            this.createP2PListing(bondId, quantity, price, duration);
            this.hideLoading();
            this.closeListModal();
            this.showSuccess(`Successfully listed ${quantity} units for ₹${price} each!`);
            
            // Refresh views
            this.renderCurrentView();
        }, 2000);
    }

    createP2PListing(bondId, quantity, price, duration) {
        console.log('📝 Creating P2P listing:', { bondId, quantity, price, duration });
        
        const bond = this.bonds.find(b => b.id === bondId);
        const holding = this.userPortfolio.find(h => h.bondId === bondId);
        
        if (!bond || !holding) {
            console.error('❌ Bond or holding not found');
            return;
        }

        const newListing = {
            id: `P2P${Date.now()}`,
            bondId: bondId,
            listingId: `LIST${Date.now()}`,
            sellerName: "You",
            bondName: `${bond.issuerName} Bond`,
            sector: bond.sector,
            creditRating: bond.creditRating,
            faceValue: bond.faceValue,
            listingPrice: price,
            marketPrice: bond.currentPrice,
            premium: ((price - bond.currentPrice) / bond.currentPrice * 100),
            quantity: quantity,
            yield: bond.yield * (bond.currentPrice / price),
            accruedInterest: holding.accruedInterest / holding.quantity * quantity,
            maturityDate: bond.maturityDate,
            riskLevel: bond.riskLevel,
            listedDate: new Date().toISOString().split('T')[0],
            expiryDate: new Date(Date.now() + duration * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            features: ["Your Listing", ...bond.features.slice(0, 2)],
            logo: bond.logo,
            sellerRating: 5.0,
            totalTrades: 0,
            isQuickSale: duration <= 7
        };

        this.userListings.push(newListing);
        this.p2pListings.push(newListing); // Also add to public listings

        // Update user portfolio
        holding.quantity -= quantity;
        if (holding.quantity <= 0) {
            const index = this.userPortfolio.findIndex(h => h.bondId === bondId);
            this.userPortfolio.splice(index, 1);
        } else {
            const ratio = holding.quantity / (holding.quantity + quantity);
            holding.currentValue *= ratio;
            holding.accruedInterest *= ratio;
            holding.reserveAllocation *= ratio;
        }

        this.platformStatus.p2pStats.activeListings++;
        
        console.log('✅ P2P listing created successfully');
    }

    // Buy Modal Functions
    openBuyModal(bondIdOrListingId, type = 'new-issue') {
        // Find the bond object by ID
        const bond = this.getBondById(bondIdOrListingId); // or getListingById for P2P
        if (!bond) return;
        this.selectedBond = bond;
        this.selectedBondType = type;

        // Populate modal elements
        const nameElement = document.getElementById('buy-bond-name');
        const priceElement = document.getElementById('buy-bond-price');
        const yieldElement = document.getElementById('buy-bond-yield');
        const typeElement = document.getElementById('buy-bond-type');
        const maxAvailableElement = document.getElementById('buy-max-available');
        
        if (nameElement) nameElement.textContent = type === 'p2p-listing' ? bond.bondName : bond.issuerName;
        if (priceElement) priceElement.textContent = `₹${type === 'p2p-listing' ? bond.listingPrice : bond.currentPrice} per unit`;
        if (yieldElement) yieldElement.textContent = `${bond.yield}% yield`;
        if (maxAvailableElement) maxAvailableElement.textContent = type === 'p2p-listing' ? bond.quantity : bond.availableUnits;
        
        if (typeElement) {
            typeElement.innerHTML = `
                <div class="bond-type-indicator ${type === 'p2p-listing' ? 'p2p' : 'new-issue'}">
                    <i class="fas ${type === 'p2p-listing' ? 'fa-exchange-alt' : 'fa-certificate'}"></i>
                    <span>${type}</span>
                    ${type === 'p2p-listing' && bond.premium > 0 ? `<span class="premium-text">+${bond.premium.toFixed(1)}% premium</span>` : ''}
                </div>
            `;
        }
        
        const quantityInput = document.getElementById('buy-quantity');
        if (quantityInput) {
            const minQty = Math.max(1, Math.ceil((bond.minInvestment || 100) / (type === 'p2p-listing' ? bond.listingPrice : bond.currentPrice)));
            quantityInput.value = minQty;
        }
        
        this.updateBuyCalculation();
        
        const modal = document.getElementById('buy-modal');
        if (modal) {
            modal.classList.add('active');
            document.body.classList.add('modal-open');
            console.log('✅ Buy modal opened successfully');
        }
    }

    closeBuyModal() {
        console.log('🛒 Closing buy modal');
        const modal = document.getElementById('buy-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
        // Do NOT clear selectedBond or selectedBondType here
    }

    updateBuyCalculation() {
        if (!this.selectedBond) return;

        const quantityInput = document.getElementById('buy-quantity');
        if (!quantityInput) return;

        const quantity = parseInt(quantityInput.value) || 0;
        const price = this.selectedBondType === 'p2p-listing' ? this.selectedBond.listingPrice : this.selectedBond.currentPrice;
        const subtotal = quantity * price;
        const platformFee = this.selectedBondType === 'p2p-listing' ? 0 : 0;
        const total = subtotal + platformFee;
        
        const subtotalElement = document.getElementById('buy-subtotal');
        if (subtotalElement) subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
        
        const platformFeeElement = document.getElementById('buy-platform-fee');
        if (platformFeeElement) platformFeeElement.textContent = `₹${platformFee.toFixed(2)}`;
        
        const totalElement = document.getElementById('buy-total');
        if (totalElement) totalElement.innerHTML = `<strong>₹${total.toFixed(2)}</strong>`;
        
        console.log('💰 Buy calculation updated:', { quantity, price, subtotal, total });
    }

    showPaymentOptions() {
    console.log('💳 Showing payment options');
    
    const quantityInput = document.getElementById('buy-quantity');
    if (!quantityInput || !this.selectedBond) return;

    const quantity = parseInt(quantityInput.value);
    const price = this.selectedBondType === 'p2p-listing' ? this.selectedBond.listingPrice : this.selectedBond.currentPrice;
    const total = quantity * price;

    if (quantity <= 0) {
        this.showError('Please enter a valid quantity');
        return;
    }

    if (total > this.userBalance) {
        this.showError('Insufficient balance');
        return;
    }

    // FIX: Store selected quantity for use in completePurchase
    this.selectedBuyQuantity = quantity;

    this.showLoading('Processing purchase...');
    
    setTimeout(() => {
        this.completePurchase();
    }, 2000);
    }

    completePurchase() {
        try {
            const bond = this.selectedBond;
            const quantity = this.selectedBuyQuantity;
            if (!bond || !quantity) {
                this.showError('No bond selected or quantity missing.');
                return;
            }
            
            const price = this.selectedBondType === 'p2p-listing' ? bond.listingPrice : bond.currentPrice;
            const totalCost = quantity * price;
            
            this.userBalance -= totalCost;
            
            if (this.selectedBondType === 'p2p-listing') {
                this.processPeerToPeerPurchase(quantity);
            } else {
                this.addToPortfolio(this.selectedBond.id, quantity, this.selectedBond.currentPrice);
            }
            
            this.updateUI();
            this.hideLoading();
            this.closeBuyModal();
            
            const message = this.selectedBondType === 'p2p-listing' 
                ? `Successfully bought ${quantity} units from P2P market!`
                : `Successfully purchased ${quantity} units of ${this.selectedBond.issuerName}!`;
            
            this.showSuccess(message);
            this.switchView('portfolio');
            
            console.log('✅ Purchase completed successfully');
            
        } catch (error) {
            console.error('Purchase error:', error);
            this.hideLoading();
            this.showError('Purchase failed. Please try again.');
        }
    }

    processPeerToPeerPurchase(quantity) {
        console.log('🔄 Processing P2P purchase');
        
        const listing = this.selectedBond;
        
        const bondData = {
            id: listing.bondId,
            issuerName: listing.bondName.split(' Bond')[0],
            sector: listing.sector,
            creditRating: listing.creditRating,
            riskLevel: listing.riskLevel,
            currentPrice: listing.marketPrice,
            yield: listing.yield
        };
        
        this.addToPortfolio(listing.bondId, quantity, listing.listingPrice, bondData);
        
        // Update listing quantity
        const listingIndex = this.p2pListings.findIndex(l => l.id === listing.id);
        if (listingIndex !== -1) {
            if (this.p2pListings[listingIndex].quantity <= quantity) {
                this.p2pListings.splice(listingIndex, 1);
                this.platformStatus.p2pStats.activeListings--;
            } else {
                this.p2pListings[listingIndex].quantity -= quantity;
            }
        }
    }

    addToPortfolio(bondId, quantity, purchasePrice, bondData = null) {
        console.log('📈 Adding to portfolio:', { bondId, quantity, purchasePrice });
        
        const existingHolding = this.userPortfolio.find(h => h.bondId === bondId);
        
        if (existingHolding) {
            const totalQuantity = existingHolding.quantity + quantity;
            const avgPrice = ((existingHolding.quantity * existingHolding.purchasePrice) + 
                             (quantity * purchasePrice)) / totalQuantity;
            
            existingHolding.quantity = totalQuantity;
            existingHolding.purchasePrice = avgPrice;
            existingHolding.currentValue += quantity * purchasePrice;
            
            if (existingHolding.reserveEligible) {
                existingHolding.reserveAllocation += quantity * purchasePrice;
            }
        } else {
            // Add new bond data if needed
            if (bondData && !this.bonds.find(b => b.id === bondId)) {
                this.bonds.push({
                    ...bondData,
                    faceValue: 100,
                    maturityDate: "2027-12-31",
                    availableUnits: 0,
                    minInvestment: 100,
                    features: ["P2P Acquired"],
                    logo: "📊",
                    isNewIssue: false,
                    p2pDemand: "Medium",
                    avgP2PPremium: 2.0
                });
            }
            
            const lockInExpiry = new Date();
            lockInExpiry.setDate(lockInExpiry.getDate() + 180);
            
            this.userPortfolio.push({
                bondId,
                quantity,
                purchaseDate: new Date().toISOString().split('T')[0],
                purchasePrice,
                lockInExpiry: lockInExpiry.toISOString().split('T')[0],
                reserveEligible: false,
                daysUntilEligible: 180,
                reserveAllocation: 0,
                currentValue: quantity * purchasePrice,
                accruedInterest: 0,
                saleOptions: ["p2p-listing"],
                canList: true,
                estimatedP2PValue: quantity * purchasePrice * 1.025,
                p2pPotentialGain: quantity * purchasePrice * 0.025
            });
        }
        
        console.log('✅ Added to portfolio successfully');
    }

    // Helper functions
    getActiveP2PBuyers(bond) {
        const baseCount = {
            'High': 15,
            'Very High': 25,
            'Medium': 8,
            'Low': 4
        };
        return baseCount[bond.p2pDemand] || 8;
    }

    getP2PTimeline(bond) {
        const timelineMap = {
            'Banking & Financial Services': 2.5,
            'Renewable Energy': 3.2,
            'Energy & Petrochemicals': 4.1
        };
        return timelineMap[bond.sector] || 3.5;
    }

    getEnhancedP2PRecommendation(bond, holding) {
        const demand = bond.p2pDemand;
        const premium = holding.p2pPotentialGain;
        
        if (demand === 'Very High' && premium > 200) {
            return `Excellent P2P opportunity - list immediately for maximum returns`;
        } else if (demand === 'High' && premium > 150) {
            return `Strong P2P demand - expect quick sale with good premium`;
        } else if (premium > 100) {
            return `Good P2P opportunity - better than instant sale`;
        } else {
            return `P2P recommended - avoid instant sale fees`;
        }
    }

    getFilteredBonds() {
        if (this.currentFilter === 'ALL') return this.bonds;
        return this.bonds.filter(bond => bond.riskLevel === this.currentFilter);
    }

    getFilteredP2PListings() {
        let filtered = [...this.p2pListings];

        switch (this.currentP2PFilter) {
            case 'premium':
                filtered = filtered.filter(listing => listing.premium > 2);
                break;
            case 'quick-sale':
                filtered = filtered.filter(listing => listing.isQuickSale);
                break;
            case 'high-yield':
                filtered = filtered.filter(listing => listing.yield > 7);
                break;
        }

        return filtered;
    }

    sortP2PListings(sortBy) {
        console.log('🔄 Sorting P2P listings by:', sortBy);
        
        const grid = document.getElementById('p2p-listings-grid');
        if (!grid) return;

        let listings = this.getFilteredP2PListings();

        switch (sortBy) {
            case 'yield-desc':
                listings.sort((a, b) => b.yield - a.yield);
                break;
            case 'price-asc':
                listings.sort((a, b) => a.listingPrice - b.listingPrice);
                break;
            case 'rating-desc':
                listings.sort((a, b) => b.sellerRating - a.sellerRating);
                break;
            case 'time-desc':
                listings.sort((a, b) => new Date(b.listedDate) - new Date(a.listedDate));
                break;
        }

        // Update the array
        this.p2pListings = [...this.p2pListings.filter(l => !listings.find(fl => fl.id === l.id)), ...listings];
        this.renderP2PListings();
    }

    getRiskIcon(riskLevel) {
        const icons = {
            HIGH: '🔥',
            MEDIUM: '⚖️', 
            LOW: '🛡️'
        };
        return icons[riskLevel] || '📊';
    }

    getAIPricePrediction(bond) {
        return {
            predictedPrice: bond.currentPrice * (1 + Math.random() * 0.1 - 0.05),
            confidence: 75 + Math.random() * 20,
            expectedChange: bond.avgP2PPremium,
            recommendation: 'STRONG BUY'
        };
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating - fullStars >= 0.5;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    }

    calculateTimeLeft(expiryDate) {
        const now = new Date();
        const expiry = new Date(expiryDate);
        const diffTime = expiry - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays <= 1) {
            const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
            return { text: `${diffHours}h left`, urgent: true };
        } else if (diffDays <= 3) {
            return { text: `${diffDays} days left`, urgent: true };
        } else {
            return { text: `${diffDays} days left`, urgent: false };
        }
    }

    getFallbackPrediction() {
        return {
            saleProbability: 88,
            confidence: 85,
            expectedTiming: "2-4 days on P2P",
            priceImpact: 2.5,
            recommendation: "Excellent P2P opportunity with premium pricing",
            factors: ["High P2P demand", "Limited reserve capacity"]
        };
    }

    // UI and modal management methods
    updateUI() {
        const userBalanceElement = document.getElementById('user-balance');
        if (userBalanceElement) {
            userBalanceElement.textContent = this.userBalance.toLocaleString();
        }
        
        const userReserveElement = document.getElementById('user-reserve');
        if (userReserveElement) {
            userReserveElement.textContent = this.platformStatus.reserveFund.userAllocation.toLocaleString();
        }
        
        const windowStatusElement = document.getElementById('window-status-text');
        if (windowStatusElement) {
            windowStatusElement.textContent = this.windowOpen ? 'Open' : `Closed (${this.platformStatus.reserveFund.windowDaysRemaining} days)`;
        }
        
        const p2pCountElement = document.getElementById('p2p-count');
        if (p2pCountElement) {
            p2pCountElement.textContent = this.platformStatus.p2pStats.activeListings;
        }
    }

    updateAIPredictions() {
        this.userPortfolio.forEach(holding => {
            const bond = this.bonds.find(b => b.id === holding.bondId);
            if (bond && window.bondAI) {
                holding.aiPrediction = window.bondAI.predictBondSale(
                    bond, 
                    holding, 
                    window.bondAI.getCurrentMarketData(), 
                    this.platformStatus
                );
            }
        });
    }

    updateAIInsights() {
        // Enhanced with business metrics
    }

    startRealtimeUpdates() {
        setInterval(() => {
            this.updateMarketData();
            this.updateAIPredictions();
            if (this.currentView === 'portfolio') {
                this.renderPortfolio();
            } else if (this.currentView === 'p2p-marketplace') {
                this.renderP2PListings();
            }
        }, 30000);
    }

    updateMarketData() {
        this.bonds.forEach(bond => {
            if (bond.isNewIssue !== false) {
                const change = (Math.random() - 0.5) * 0.02;
                bond.currentPrice *= (1 + change);
                bond.currentPrice = Math.round(bond.currentPrice * 100) / 100;
            }
        });
        
        this.userPortfolio.forEach(holding => {
            const bond = this.bonds.find(b => b.id === holding.bondId);
            if (bond) {
                holding.currentValue = holding.quantity * bond.currentPrice;
                holding.estimatedP2PValue = holding.quantity * bond.currentPrice * (1 + bond.avgP2PPremium / 100);
                holding.p2pPotentialGain = holding.estimatedP2PValue - holding.currentValue;
            }
        });
    }

    closeAllModals() {
        console.log('🚪 Closing all modals');
        this.closeListModal();
        this.closeBuyModal();
    }

    // UI feedback
    showSuccess(message) {
        console.log('✅ Success:', message);
        
        const toast = document.getElementById('success-toast');
        const messageElement = document.getElementById('success-message');
        
        if (toast && messageElement) {
            messageElement.textContent = message;
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 4000);
        }
    }

    showError(message) {
        console.error('❌ Error:', message);
        
        const toast = document.getElementById('error-toast');
        const messageElement = document.getElementById('error-message');
        
        if (toast && messageElement) {
            messageElement.textContent = message;
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 4000);
        }
    }

    showLoading(message = 'Processing...') {
        console.log('⏳ Loading:', message);
        
        const overlay = document.getElementById('loading-overlay');
        const text = overlay ? overlay.querySelector('.loading-text') : null;
        
        if (overlay && text) {
            text.textContent = message;
            overlay.classList.add('show');
        }
    }

    hideLoading() {
        console.log('✅ Loading hidden');
        
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.classList.remove('show');
        }
    }

    viewBondDetails(bondId) {
        console.log('🔍 View bond details:', bondId);
        const bond = this.bonds.find(b => b.id === bondId);
        if (bond) {
            this.showSuccess(`Viewing details for ${bond.issuerName} - P2P demand: ${bond.p2pDemand}`);
        }
    }

    viewListingDetails(listingId) {
        console.log('🔍 View P2P listing details:', listingId);
        const listing = this.p2pListings.find(l => l.id === listingId);
        if (listing) {
            this.showSuccess(`Viewing ${listing.bondName} by ${listing.sellerName}`);
        }
    }

    onMarketDataUpdate(marketData) {
        // Optionally handle market data updates here
    }

    getBondById(id) {
        // Try to find in bonds
        let bond = this.bonds.find(b => b.id === id);
        if (bond) return bond;
        // Try to find in P2P listings
        let listing = this.p2pListings.find(l => l.id === id);
        if (listing) return listing;
        return null;
    }
}

// Make the app globally available
let bondApp;

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Starting FIXED Light Theme P2P Bond Platform...');
    
    try {
        if (typeof BondAIEngine !== 'undefined') {
            window.bondAI = new BondAIEngine();
            window.bondAI.startRealtimeUpdates();
            console.log('✅ AI Engine initialized');
        }
        
        bondApp = new BondTradingApp();
        window.bondApp = bondApp; // Also make it available globally
        
        console.log('✅ FIXED P2P application initialized');
        console.log('🔧 Debug: bondApp available globally');
        console.log('🎯 All buttons should now work properly!');
        
    } catch (error) {
        console.error('❌ Failed to initialize:', error);
        document.body.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background: #ffffff; padding: 2rem; text-align: center;">
                <i class="fas fa-exclamation-triangle" style="font-size: 4rem; color: #ef4444; margin-bottom: 2rem;"></i>
                <h2 style="margin-bottom: 1rem; color: #1e293b;">Platform Loading Error</h2>
                <p style="margin-bottom: 2rem; color: #64748b;">Please refresh the page to try again</p>
                <button onclick="location.reload()" style="background: #3b82f6; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 0.75rem; font-weight: 500; cursor: pointer;">Refresh Page</button>
            </div>
        `;
    }
});