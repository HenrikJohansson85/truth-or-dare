// script2.js - Logique métier du jeu Action ou Vérité

class GameLogic {
    constructor() {
        this.config = null;
        this.currentPlayer = null;
        this.lastSelectedPlayers = [];
        this.gameHistory = [];
        
        this.initializeEventListeners();
        this.loadConfiguration();
        
        console.log('GameLogic initialized');
    }

    initializeEventListeners() {
        // Listen to UI events
        window.addEventListener('choosePlayer', () => this.handleChoosePlayer());
        window.addEventListener('requestAction', () => this.handleRequestAction());
        window.addEventListener('requestTruth', () => this.handleRequestTruth());
        
        console.log('GameLogic event listeners bound');
    }

    loadConfiguration() {
        try {
            const saved = localStorage.getItem('truthDareConfig');
            if (saved) {
                this.config = JSON.parse(saved);
                console.log('Configuration loaded:', this.config);
                this.updateDebugInfo();
            } else {
                console.log('No saved configuration found');
            }
        } catch (error) {
            console.error('Error loading configuration:', error);
        }
    }

    // Main game handlers
    handleChoosePlayer() {
        console.log('handleChoosePlayer called');
        
        // Reload configuration if not present
        if (!this.config) {
            console.log('No config, attempting to reload...');
            this.loadConfiguration();
        }
        
        if (!this.config || !this.config.players) {
            console.error('No configuration loaded or no players configured');
            alert('Erreur: Aucune configuration trouvée. Veuillez configurer les joueurs d\'abord.');
            return;
        }

        console.log('Config found, selecting player...');
        const selectedPlayer = this.selectRandomPlayer();
        this.currentPlayer = selectedPlayer;
        
        // Store in history
        this.addToHistory('playerSelected', selectedPlayer.name);
        
        // Notify UI
        window.dispatchEvent(new CustomEvent('playerSelected', {
            detail: { playerName: selectedPlayer.name, player: selectedPlayer }
        }));
        
        console.log('Player selected:', selectedPlayer.name);
        this.updateDebugInfo();
    }

    handleRequestAction() {
        if (!this.currentPlayer) {
            console.error('No player selected');
            return;
        }

        const action = this.selectRandomAction();
        const processedText = this.processVariables(action.text);
        
        // Store in history
        this.addToHistory('action', { original: action.text, processed: processedText });
        
        // Notify UI
        window.dispatchEvent(new CustomEvent('actionResult', {
            detail: { text: processedText, action: action }
        }));
        
        console.log('Action selected:', { action, processedText });
        this.updateDebugInfo();
    }

    handleRequestTruth() {
        if (!this.currentPlayer) {
            console.error('No player selected');
            return;
        }

        const truth = this.selectRandomTruth();
        const processedText = this.processVariables(truth.text);
        
        // Store in history
        this.addToHistory('truth', { original: truth.text, processed: processedText });
        
        // Notify UI
        window.dispatchEvent(new CustomEvent('truthResult', {
            detail: { text: processedText, truth: truth }
        }));
        
        console.log('Truth selected:', { truth, processedText });
        this.updateDebugInfo();
    }

    // Player selection logic
    selectRandomPlayer() {
        const players = this.config.players;
        
        // Simple random selection for now - could be enhanced with weights
        const availablePlayers = players.filter(p => {
            // Avoid selecting the same player too often
            const recentSelections = this.lastSelectedPlayers.slice(-Math.max(1, players.length - 1));
            return !recentSelections.includes(p.id) || players.length <= 2;
        });
        
        const selectedPool = availablePlayers.length > 0 ? availablePlayers : players;
        const randomIndex = Math.floor(Math.random() * selectedPool.length);
        const selectedPlayer = selectedPool[randomIndex];
        
        // Update recent selections
        this.lastSelectedPlayers.push(selectedPlayer.id);
        if (this.lastSelectedPlayers.length > players.length) {
            this.lastSelectedPlayers.shift();
        }
        
        return selectedPlayer;
    }

    // Action selection logic
    selectRandomAction() {
        const validActions = this.filterValidActions();
        
        if (validActions.length === 0) {
            console.warn('No valid actions found, using fallback');
            return this.getFallbackAction();
        }
        
        const weightedActions = this.applyWeights(validActions);
        return this.selectFromWeightedPool(weightedActions);
    }

    filterValidActions() {
        const playerGender = this.currentPlayer.gender;
        const cardHardMin = this.config.selectedCard.hardMin;
        const cardHardMax = this.config.selectedCard.hardMax;
        
        // Utilise les actions depuis data.js (chargé globalement)
        if (typeof actions === 'undefined') {
            console.error('Actions data not loaded');
            return [];
        }
        
        return actions.filter(action => {
            // Check gender compatibility
            if (action.genre !== 'importe' && action.genre !== playerGender) {
                return false;
            }
            
            // Check hard level compatibility
            if (action.hard < cardHardMin || action.hard > cardHardMax) {
                return false;
            }
            
            return true;
        });
    }

    // Truth selection logic
    selectRandomTruth() {
        const validTruths = this.filterValidTruths();
        
        if (validTruths.length === 0) {
            console.warn('No valid truths found, using fallback');
            return this.getFallbackTruth();
        }
        
        const weightedTruths = this.applyWeights(validTruths);
        return this.selectFromWeightedPool(weightedTruths);
    }

    filterValidTruths() {
        const playerGender = this.currentPlayer.gender;
        const cardHardMin = this.config.selectedCard.hardMin;
        const cardHardMax = this.config.selectedCard.hardMax;
        
        // Utilise les vérités depuis data.js (chargé globalement)
        if (typeof verites === 'undefined') {
            console.error('Verites data not loaded');
            return [];
        }
        
        return verites.filter(truth => {
            // Check gender compatibility
            if (truth.genre !== 'importe' && truth.genre !== playerGender) {
                return false;
            }
            
            // Check hard level compatibility
            const truthHard = truth.hard || 5; // Default hard level if not specified
            if (truthHard < cardHardMin || truthHard > cardHardMax) {
                return false;
            }
            
            return true;
        });
    }

    // Weight calculation system
    applyWeights(items) {
        const playerHard = this.currentPlayer.hard;
        const cardHard = this.config.selectedCard.hard;
        
        return items.map(item => {
            const itemHard = item.hard || 5;
            
            // Calculate weight based on player hard + card hard vs item hard
            const totalPlayerHard = (playerHard + cardHard) / 2;
            const hardDifference = Math.abs(totalPlayerHard - itemHard);
            
            // Closer hard levels get higher weights
            const weight = Math.max(1, 10 - hardDifference);
            
            return { ...item, weight };
        });
    }

    selectFromWeightedPool(weightedItems) {
        const totalWeight = weightedItems.reduce((sum, item) => sum + item.weight, 0);
        let random = Math.random() * totalWeight;
        
        for (const item of weightedItems) {
            random -= item.weight;
            if (random <= 0) {
                return item;
            }
        }
        
        // Fallback to last item
        return weightedItems[weightedItems.length - 1];
    }

    // Variable processing system
    processVariables(text) {
        let processed = text;
        
        // Process all variable types
        processed = this.processPlayerVariables(processed);
        processed = this.processColorVariables(processed);
        processed = this.processClothesVariables(processed);
        processed = this.processNumberVariables(processed);
        
        return processed;
    }

    processPlayerVariables(text) {
        let processed = text;
        
        // Replace {player}
        processed = processed.replace(/{player}/g, this.currentPlayer.name);
        
        // Replace {other}
        processed = processed.replace(/{other}/g, () => {
            const otherPlayer = this.selectOtherPlayer();
            return otherPlayer ? otherPlayer.name : 'un autre joueur';
        });
        
        // Replace {otherh} - other male player
        processed = processed.replace(/{otherh}/g, () => {
            const otherPlayer = this.selectOtherPlayer('homme');
            return otherPlayer ? otherPlayer.name : 'un autre joueur';
        });
        
        // Replace {otherf} - other female player
        processed = processed.replace(/{otherf}/g, () => {
            const otherPlayer = this.selectOtherPlayer('femme');
            return otherPlayer ? otherPlayer.name : 'une autre joueuse';
        });
        
        return processed;
    }

    selectOtherPlayer(genderFilter = null) {
        const availablePlayers = this.config.players.filter(player => {
            if (player.id === this.currentPlayer.id) return false;
            if (genderFilter && player.gender !== genderFilter) return false;
            return true;
        });
        
        if (availablePlayers.length === 0) {
            return null;
        }
        
        // Apply relationship weights avec logique bidirectionnelle
        const weightedPlayers = availablePlayers.map(player => {
            let baseWeight = 2.5; // Poids par défaut
            
            // Cherche la relation dans les deux sens
            const currentPlayerId = this.currentPlayer.id;
            const targetPlayerId = player.id;
            
            // Si current < target, la relation est stockée chez current
            if (currentPlayerId < targetPlayerId) {
                const relationship = this.currentPlayer.relationships[targetPlayerId];
                if (relationship && relationship.weight) {
                    baseWeight = relationship.weight;
                }
            } 
            // Si current > target, la relation est stockée chez target
            else {
                const relationship = player.relationships[currentPlayerId];
                if (relationship && relationship.weight) {
                    baseWeight = relationship.weight;
                }
            }
            
            // Apply curve: higher relationship weights get more chance
            // But also consider the hard level for modulation
            const playerHard = this.currentPlayer.hard;
            const cardHard = this.config.selectedCard.hard;
            const avgHard = (playerHard + cardHard) / 2;
            
            // Higher hard levels make relationship weights matter more
            const hardMultiplier = 1 + (avgHard / 10);
            const finalWeight = baseWeight * hardMultiplier;
            
            console.log(`Relationship weight between ${this.currentPlayer.name} (${currentPlayerId}) and ${player.name} (${targetPlayerId}): base=${baseWeight}, final=${finalWeight}`);
            
            return { ...player, weight: finalWeight };
        });
        
        return this.selectFromWeightedPool(weightedPlayers);
    }

    processColorVariables(text) {
        return text.replace(/{color}/g, () => {
            if (typeof colors === 'undefined') {
                return 'rouge';
            }
            const randomIndex = Math.floor(Math.random() * colors.length);
            return colors[randomIndex];
        });
    }

    processClothesVariables(text) {
        return text.replace(/{clothes}/g, () => {
            if (typeof clothes === 'undefined') {
                return 'haut';
            }
            const randomIndex = Math.floor(Math.random() * clothes.length);
            return clothes[randomIndex];
        });
    }

    processNumberVariables(text) {
        // Process {number+n}
        text = text.replace(/{number\+(\d+)}/g, (match, n) => {
            const addition = parseInt(n);
            const max = Math.max(1, 6 + addition);
            return Math.floor(Math.random() * max) + 1;
        });
        
        // Process {number-n}
        text = text.replace(/{number-(\d+)}/g, (match, n) => {
            const subtraction = parseInt(n);
            const max = Math.max(1, 6 - subtraction);
            return Math.floor(Math.random() * max) + 1;
        });
        
        // Process {number}
        text = text.replace(/{number}/g, () => {
            return Math.floor(Math.random() * 6) + 1;
        });
        
        return text;
    }

    // Fallback methods
    getFallbackAction() {
        return {
            id: 'fallback_action',
            text: '{player}, fais un bisou sur la joue de {other}.',
            genre: 'importe',
            hard: 1
        };
    }

    getFallbackTruth() {
        return {
            id: 'fallback_truth',
            text: '{player}, dis nous ton plus beau souvenir avec {other}.',
            genre: 'importe',
            hard: 1
        };
    }

    // History and debug
    addToHistory(type, data) {
        const entry = {
            timestamp: new Date().toISOString(),
            type,
            player: this.currentPlayer ? this.currentPlayer.name : null,
            data
        };
        
        this.gameHistory.push(entry);
        
        // Keep only last 50 entries
        if (this.gameHistory.length > 50) {
            this.gameHistory.shift();
        }
        
        console.log('Added to history:', entry);
    }

    updateDebugInfo() {
        const debugData = {
            currentPlayer: this.currentPlayer,
            lastSelectedPlayers: this.lastSelectedPlayers,
            historyCount: this.gameHistory.length,
            config: this.config ? {
                playerCount: this.config.playerCount,
                selectedCard: this.config.selectedCard?.title,
                playersNames: this.config.players?.map(p => p.name)
            } : null,
            lastActions: this.gameHistory.slice(-3),
            availableActions: this.currentPlayer ? this.filterValidActions().length : 0,
            availableTruths: this.currentPlayer ? this.filterValidTruths().length : 0
        };
        
        const debugElement = document.getElementById('debug-info');
        if (debugElement) {
            debugElement.textContent = JSON.stringify(debugData, null, 2);
        }
        
        console.log('Debug info updated:', debugData);
    }

    // Utility methods
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // Public API for external access
    getCurrentPlayer() {
        return this.currentPlayer;
    }

    getGameHistory() {
        return this.gameHistory;
    }

    getConfiguration() {
        return this.config;
    }

    resetGame() {
        this.currentPlayer = null;
        this.lastSelectedPlayers = [];
        this.gameHistory = [];
        console.log('Game reset');
    }
}

// Initialize game logic when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.truthDareGame = new GameLogic();
    console.log('Truth or Dare Game Logic loaded successfully');
});