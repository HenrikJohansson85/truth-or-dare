// script.js - Gestion de l'interface utilisateur optimisée pour 2-100 joueurs

class UIManager {
    constructor() {
        this.currentPlayerCount = 0;
        this.selectedCard = null;
        this.currentCarouselIndex = 0;
        
        this.initializeElements();
        this.bindEvents();
        this.loadSavedConfig();
        
        console.log('UIManager initialized');
    }

    initializeElements() {
        // Configuration elements
        this.playerCountInput = document.getElementById('player-count');
        this.validatePlayersBtn = document.getElementById('validate-players');
        this.playersForm = document.getElementById('players-form');
        this.playersList = document.getElementById('players-list');
        this.difficultySection = document.getElementById('difficulty-section');
        this.difficultyCarousel = document.getElementById('difficulty-carousel');
        this.saveConfigBtn = document.getElementById('save-config');
        
        // Game elements
        this.configSection = document.getElementById('config-section');
        this.gameSection = document.getElementById('game-section');
        this.choosePlayerBtn = document.getElementById('choose-player');
        this.currentPlayerDisplay = document.getElementById('current-player-display');
        this.currentPlayerName = document.getElementById('current-player-name');
        this.actionButtons = document.getElementById('action-buttons');
        this.actionBtn = document.getElementById('action-btn');
        this.truthBtn = document.getElementById('truth-btn');
        this.resultDisplay = document.getElementById('result-display');
        this.resultType = document.getElementById('result-type');
        this.resultText = document.getElementById('result-text');
        
        // Navigation elements
        this.newRoundBtn = document.getElementById('new-round');
        this.changeConfigBtn = document.getElementById('change-config');
        this.carouselPrevBtn = document.getElementById('carousel-prev');
        this.carouselNextBtn = document.getElementById('carousel-next');
        
        // Debug
        this.debugInfo = document.getElementById('debug-info');
    }

    bindEvents() {
        // Configuration events
        this.validatePlayersBtn.addEventListener('click', () => this.handleValidatePlayers());
        this.saveConfigBtn.addEventListener('click', () => this.handleSaveConfig());
        
        // Game events
        this.choosePlayerBtn.addEventListener('click', () => this.handleChoosePlayer());
        this.actionBtn.addEventListener('click', () => this.handleAction());
        this.truthBtn.addEventListener('click', () => this.handleTruth());
        this.newRoundBtn.addEventListener('click', () => this.handleNewRound());
        this.changeConfigBtn.addEventListener('click', () => this.handleChangeConfig());
        
        // Carousel events
        this.carouselPrevBtn.addEventListener('click', () => this.navigateCarousel(-1));
        this.carouselNextBtn.addEventListener('click', () => this.navigateCarousel(1));
        
        // Input validation
        this.playerCountInput.addEventListener('input', () => this.validatePlayerCount());
        
        console.log('Events bound successfully');
    }

    // Configuration handlers
    handleValidatePlayers() {
        const count = parseInt(this.playerCountInput.value);
        
        if (count < 2 || count > 100) {
            this.showError('Le nombre de joueurs doit être entre 2 et 100');
            return;
        }
        
        // Avertissement pour un grand nombre de joueurs
        if (count > 20) {
            const confirm = window.confirm(
                `⚠️ Vous avez choisi ${count} joueurs. Avec un grand nombre de joueurs, la configuration des relations peut être longue. Continuer ?`
            );
            if (!confirm) return;
        }
        
        this.currentPlayerCount = count;
        this.generatePlayersForm();
        this.generateDifficultyCarousel();
        
        this.playersForm.classList.remove('hidden');
        this.difficultySection.classList.remove('hidden');
        this.saveConfigBtn.classList.remove('hidden');
        
        console.log(`Generated form for ${count} players`);
    }

    generatePlayersForm() {
        this.playersList.innerHTML = '';
        
        // Afficher un indicateur de progression pour un grand nombre de joueurs
        if (this.currentPlayerCount > 10) {
            const progressDiv = document.createElement('div');
            progressDiv.className = 'progress-indicator';
            progressDiv.innerHTML = `<p>Génération des formulaires pour ${this.currentPlayerCount} joueurs...</p>`;
            this.playersList.appendChild(progressDiv);
        }
        
        // Utiliser requestAnimationFrame pour éviter de bloquer l'UI
        this.generatePlayersAsync(1);
    }

    generatePlayersAsync(playerIndex) {
        if (playerIndex > this.currentPlayerCount) {
            // Terminé, supprimer l'indicateur de progression
            const progressIndicator = this.playersList.querySelector('.progress-indicator');
            if (progressIndicator) {
                progressIndicator.remove();
            }
            return;
        }
        
        const playerRow = this.createPlayerRow(playerIndex);
        this.playersList.appendChild(playerRow);
        
        // Continuer avec le joueur suivant de manière asynchrone
        if (playerIndex < this.currentPlayerCount) {
            requestAnimationFrame(() => this.generatePlayersAsync(playerIndex + 1));
        } else {
            // Terminé, supprimer l'indicateur de progression
            const progressIndicator = this.playersList.querySelector('.progress-indicator');
            if (progressIndicator) {
                progressIndicator.remove();
            }
        }
    }

    createPlayerRow(playerIndex) {
        const row = document.createElement('div');
        row.className = 'player-row';
        row.innerHTML = `
            <h4>Joueur ${playerIndex}</h4>
            <div class="player-fields">
                <div class="input-group">
                    <label>Nom:</label>
                    <input type="text" id="player-${playerIndex}-name" placeholder="Nom du joueur" required>
                </div>
                <div class="input-group">
                    <label>Genre:</label>
                    <select id="player-${playerIndex}-gender" required>
                        <option value="">Choisir...</option>
                        <option value="homme">Homme</option>
                        <option value="femme">Femme</option>
                    </select>
                </div>
                <div class="input-group">
                    <label>Niveau Hard:</label>
                    <select id="player-${playerIndex}-hard" required>
                        <option value="">Choisir...</option>
                        <option value="1">Ange (1)</option>
                        <option value="3">Good Guy (3)</option>
                        <option value="5">Lambda (5)</option>
                        <option value="7">Bad Guy (7)</option>
                        <option value="9">NSFW (9)</option>
                    </select>
                </div>
            </div>
            ${this.generateStatusFieldsOptimized(playerIndex)}
        `;
        
        return row;
    }

    generateStatusFieldsOptimized(currentPlayerIndex) {
        const numberOfFields = this.currentPlayerCount - currentPlayerIndex;
        
        // Pour un grand nombre de joueurs, limiter les relations ou proposer une option simplifiée
        if (this.currentPlayerCount > 50) {
            return `
                <div class="status-fields">
                    <label>Relations (mode simplifié pour ${this.currentPlayerCount} joueurs):</label>
                    <select id="player-${currentPlayerIndex}-default-status" class="status-select">
                        <option value="ami">Relation par défaut: Ami</option>
                        <option value="good-friend">Relation par défaut: Good Friend</option>
                        <option value="ex">Relation par défaut: Ex</option>
                        <option value="couple">Relation par défaut: Couple</option>
                        <option value="plan-cul">Relation par défaut: Plan cul</option>
                    </select>
                    <small>Mode simplifié: une relation par défaut sera appliquée avec tous les autres joueurs</small>
                </div>
            `;
        }
        
        // Pour 11-50 joueurs, afficher un avertissement mais permettre la configuration complète
        let warningHtml = '';
        if (numberOfFields > 10) {
            warningHtml = '<small style="color: #e53e3e;">⚠️ Beaucoup de relations à configurer</small>';
        }
        
        const statusOptions = [
            { value: 'ex', label: 'Ex', weight: 1 },
            { value: 'ami', label: 'Ami', weight: 2 },
            { value: 'good-friend', label: 'Good Friend', weight: 3 },
            { value: 'couple', label: 'Couple', weight: 4 },
            { value: 'plan-cul', label: 'Plan cul', weight: 5 }
        ];
        
        let html = `<div class="status-fields">
            <label>Relations avec les autres joueurs:</label>
            ${warningHtml}`;
        
        console.log(`Player ${currentPlayerIndex}: generating ${numberOfFields} status fields (toward players ${currentPlayerIndex + 1} to ${this.currentPlayerCount})`);
        
        for (let targetPlayerIndex = currentPlayerIndex + 1; targetPlayerIndex <= this.currentPlayerCount; targetPlayerIndex++) {
            html += `
                <select id="player-${currentPlayerIndex}-status-${targetPlayerIndex}" class="status-select">
                    <option value="">Vers Joueur ${targetPlayerIndex}</option>
                    ${statusOptions.map(opt => 
                        `<option value="${opt.value}" data-weight="${opt.weight}">${opt.label}</option>`
                    ).join('')}
                </select>
            `;
        }
        
        html += '</div>';
        return html;
    }

    generateDifficultyCarousel() {
        this.difficultyCarousel.innerHTML = '';
        
        // Utilise les cartes depuis data.js (chargé globalement)
        if (typeof cards !== 'undefined') {
            cards.forEach((card, index) => {
                const cardElement = this.createDifficultyCard(card, index);
                this.difficultyCarousel.appendChild(cardElement);
            });
        } else {
            console.error('Cards data not loaded');
        }
        
        console.log('Difficulty carousel generated');
    }

    createDifficultyCard(card, index) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'difficulty-card';
        cardDiv.dataset.cardId = card.id;
        cardDiv.dataset.index = index;
        
        cardDiv.innerHTML = `
            <img src="${card.imgUrl}" alt="${card.title}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMzAiIGZpbGw9IiM2NjdlZWEiLz4KPHRleHQgeD0iMzAiIHk9IjM1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyMCI+8J+OrzwvdGV4dD4KPC9zdmc+'">
            <h4>${card.title}</h4>
            <div class="hard-info">Hard: ${card.hardMin}-${card.hardMax}</div>
        `;
        
        cardDiv.addEventListener('click', () => this.selectDifficultyCard(card, cardDiv));
        
        return cardDiv;
    }

    selectDifficultyCard(card, cardElement) {
        // Remove previous selection
        document.querySelectorAll('.difficulty-card').forEach(el => {
            el.classList.remove('selected');
        });
        
        // Add selection to clicked card
        cardElement.classList.add('selected');
        this.selectedCard = card;
        
        console.log('Selected difficulty card:', card);
        this.updateDebugInfo();
    }

    navigateCarousel(direction) {
        const carousel = this.difficultyCarousel;
        const cardWidth = 175; // Card width + gap
        const currentScroll = carousel.scrollLeft;
        const newScroll = currentScroll + (direction * cardWidth);
        
        carousel.scrollTo({
            left: newScroll,
            behavior: 'smooth'
        });
        
        console.log(`Carousel navigated ${direction > 0 ? 'right' : 'left'}`);
    }

    handleSaveConfig() {
        console.log('Save config clicked');
        
        if (!this.validateConfiguration()) {
            console.log('Configuration validation failed');
            return;
        }
        
        const config = this.collectConfiguration();
        console.log('Configuration collected:', config);
        
        this.saveConfiguration(config);
        this.switchToGameMode();
        
        console.log('Configuration saved and switched to game mode');
    }

    validateConfiguration() {
        // Check if difficulty card is selected
        if (!this.selectedCard) {
            this.showError('Veuillez sélectionner un niveau de difficulté');
            return false;
        }
        
        // Check all players have required fields
        for (let i = 1; i <= this.currentPlayerCount; i++) {
            const name = document.getElementById(`player-${i}-name`).value.trim();
            const gender = document.getElementById(`player-${i}-gender`).value;
            const hard = document.getElementById(`player-${i}-hard`).value;
            
            if (!name || !gender || !hard) {
                this.showError(`Veuillez remplir tous les champs du joueur ${i}`);
                return false;
            }
        }
        
        return true;
    }

    collectConfiguration() {
        const players = [];
        
        for (let i = 1; i <= this.currentPlayerCount; i++) {
            const name = document.getElementById(`player-${i}-name`).value.trim();
            const gender = document.getElementById(`player-${i}-gender`).value;
            const hard = parseInt(document.getElementById(`player-${i}-hard`).value);
            
            // Collect status relationships
            const relationships = {};
            
            // Mode simplifié pour un grand nombre de joueurs
            if (this.currentPlayerCount > 50) {
                const defaultStatusSelect = document.getElementById(`player-${i}-default-status`);
                if (defaultStatusSelect) {
                    const defaultStatus = defaultStatusSelect.value;
                    const defaultWeight = this.getStatusWeight(defaultStatus);
                    
                    // Appliquer la relation par défaut à tous les autres joueurs
                    for (let targetPlayerIndex = i + 1; targetPlayerIndex <= this.currentPlayerCount; targetPlayerIndex++) {
                        relationships[targetPlayerIndex] = { 
                            status: defaultStatus, 
                            weight: defaultWeight 
                        };
                    }
                }
            } else {
                // Mode complet pour moins de 50 joueurs
                for (let targetPlayerIndex = i + 1; targetPlayerIndex <= this.currentPlayerCount; targetPlayerIndex++) {
                    const statusSelect = document.getElementById(`player-${i}-status-${targetPlayerIndex}`);
                    if (statusSelect) {
                        const status = statusSelect.value;
                        const weight = status ? parseInt(statusSelect.selectedOptions[0].dataset.weight) : 2; // Poids par défaut
                        relationships[targetPlayerIndex] = { status, weight };
                        
                        console.log(`Player ${i} -> Player ${targetPlayerIndex}: ${status} (weight: ${weight})`);
                    }
                }
            }
            
            players.push({
                id: i,
                name,
                gender,
                hard,
                relationships
            });
        }
        
        return {
            players,
            selectedCard: this.selectedCard,
            playerCount: this.currentPlayerCount
        };
    }

    getStatusWeight(status) {
        const weights = {
            'ex': 1,
            'ami': 2,
            'good-friend': 3,
            'couple': 4,
            'plan-cul': 5
        };
        return weights[status] || 2;
    }

    saveConfiguration(config) {
        try {
            const configString = JSON.stringify(config);
            
            // Vérifier la taille des données pour éviter les problèmes de localStorage
            const sizeInMB = new Blob([configString]).size / (1024 * 1024);
            if (sizeInMB > 5) {
                console.warn(`Configuration is large (${sizeInMB.toFixed(2)}MB). This might cause issues.`);
            }
            
            localStorage.setItem('truthDareConfig', configString);
            console.log('Configuration saved to localStorage:', configString.length, 'characters');
            
            // Verify it was saved
            const verification = localStorage.getItem('truthDareConfig');
            console.log('Verification - saved config length:', verification ? verification.length : 'null');
            
        } catch (error) {
            console.error('Error saving configuration:', error);
            if (error.name === 'QuotaExceededError') {
                this.showError('Configuration trop volumineuse pour être sauvegardée. Essayez avec moins de joueurs.');
            } else {
                this.showError('Erreur lors de la sauvegarde de la configuration');
            }
        }
    }

    loadSavedConfig() {
        try {
            const saved = localStorage.getItem('truthDareConfig');
            if (saved) {
                const config = JSON.parse(saved);
                console.log('Loaded saved configuration:', config);
                
                // If we have a saved config, show option to continue or start new
                if (config.players && config.players.length > 0) {
                    this.showContinueOption(config);
                }
            }
        } catch (error) {
            console.error('Error loading saved configuration:', error);
        }
    }

    showContinueOption(config) {
        const continueBtn = document.createElement('button');
        continueBtn.className = 'btn secondary';
        continueBtn.textContent = `Continuer la partie précédente (${config.playerCount} joueurs)`;
        continueBtn.onclick = () => {
            this.restoreConfiguration(config);
            this.switchToGameMode();
            continueBtn.remove();
        };
        
        this.configSection.querySelector('.config-card').appendChild(continueBtn);
    }

    restoreConfiguration(config) {
        this.currentPlayerCount = config.playerCount;
        this.selectedCard = config.selectedCard;
        
        // Store in localStorage for game logic
        localStorage.setItem('truthDareConfig', JSON.stringify(config));
        
        console.log('Configuration restored');
    }

    // Game handlers
    handleChoosePlayer() {
        console.log('Choose player clicked - UI side');
        
        // Check if we have a configuration
        try {
            const saved = localStorage.getItem('truthDareConfig');
            if (saved) {
                const config = JSON.parse(saved);
                console.log('Config found in localStorage:', config);
            } else {
                console.log('No config in localStorage');
            }
        } catch (error) {
            console.error('Error checking localStorage:', error);
        }
        
        // This will be handled by script2.js
        window.dispatchEvent(new CustomEvent('choosePlayer'));
    }

    handleAction() {
        console.log('Action button clicked');
        
        window.dispatchEvent(new CustomEvent('requestAction'));
    }

    handleTruth() {
        console.log('Truth button clicked');
        
        window.dispatchEvent(new CustomEvent('requestTruth'));
    }

    handleNewRound() {
        console.log('New round clicked');
        
        this.hideCurrentPlayer();
        this.hideActionButtons();
        this.hideResult();
    }

    handleChangeConfig() {
        console.log('Change config clicked');
        
        this.switchToConfigMode();
    }

    // UI State Management
    switchToGameMode() {
        this.configSection.classList.remove('active');
        this.configSection.classList.add('hidden');
        this.gameSection.classList.remove('hidden');
        this.gameSection.classList.add('active');
        
        console.log('Switched to game mode');
    }

    switchToConfigMode() {
        this.gameSection.classList.remove('active');
        this.gameSection.classList.add('hidden');
        this.configSection.classList.remove('hidden');
        this.configSection.classList.add('active');
        
        // Reset game UI
        this.hideCurrentPlayer();
        this.hideActionButtons();
        this.hideResult();
        
        console.log('Switched to config mode');
    }

    showCurrentPlayer(playerName) {
        this.currentPlayerName.textContent = playerName;
        this.currentPlayerDisplay.classList.remove('hidden');
        this.actionButtons.classList.remove('hidden');
        
        console.log('Showing current player:', playerName);
    }

    hideCurrentPlayer() {
        this.currentPlayerDisplay.classList.add('hidden');
    }

    hideActionButtons() {
        this.actionButtons.classList.add('hidden');
    }

    showResult(type, text) {
        this.resultType.textContent = type;
        this.resultText.textContent = text;
        this.resultDisplay.classList.remove('hidden');
        
        // Scroll to result
        this.resultDisplay.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        console.log('Showing result:', { type, text });
    }

    hideResult() {
        this.resultDisplay.classList.add('hidden');
    }

    // Utility methods
    validatePlayerCount() {
        const count = parseInt(this.playerCountInput.value);
        
        if (count < 2 || count > 100 || isNaN(count)) {
            this.validatePlayersBtn.disabled = true;
            this.playerCountInput.style.borderColor = '#e53e3e';
        } else {
            this.validatePlayersBtn.disabled = false;
            this.playerCountInput.style.borderColor = '#48bb78';
        }
    }

    showError(message) {
        // Simple error display - could be enhanced with a modal or toast
        alert(message);
        console.error('UI Error:', message);
    }

    updateDebugInfo() {
        const debugData = {
            currentPlayerCount: this.currentPlayerCount,
            selectedCard: this.selectedCard,
            timestamp: new Date().toISOString()
        };
        
        this.debugInfo.textContent = JSON.stringify(debugData, null, 2);
    }
}

// Event listeners for communication with script2.js
window.addEventListener('playerSelected', (event) => {
    const ui = window.truthDareUI;
    ui.showCurrentPlayer(event.detail.playerName);
});

window.addEventListener('actionResult', (event) => {
    const ui = window.truthDareUI;
    ui.showResult('🎯 ACTION', event.detail.text);
});

window.addEventListener('truthResult', (event) => {
    const ui = window.truthDareUI;
    ui.showResult('💭 VÉRITÉ', event.detail.text);
});

// Initialize UI when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.truthDareUI = new UIManager();
    console.log('Truth or Dare UI loaded successfully');
});
