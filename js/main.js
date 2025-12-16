let currentActiveSection = 'history';

function showHistorySection() {
    const historySection = document.getElementById('historySection');
    const statsSection = document.getElementById('statsSection');
    const btnHistory = document.querySelector('.btn-history');
    const btnStats = document.querySelector('.btn-stats');
    
    if (historySection && statsSection) {
        historySection.style.display = 'block';
        statsSection.style.display = 'none';
    }
    
    if (btnHistory && btnStats) {
        btnHistory.classList.add('active');
        btnStats.classList.remove('active');
    }
    
    currentActiveSection = 'history';
}

function showStatsSection() {
    const historySection = document.getElementById('historySection');
    const statsSection = document.getElementById('statsSection');
    const btnHistory = document.querySelector('.btn-history');
    const btnStats = document.querySelector('.btn-stats');
    
    if (historySection && statsSection) {
        statsSection.style.display = 'block';
        historySection.style.display = 'none';
    }
    
    if (btnHistory && btnStats) {
        btnStats.classList.add('active');
        btnHistory.classList.remove('active');
    }
    
    currentActiveSection = 'stats';
}

class AdvancedTotoPredictor {
    constructor() {
        this.metodeEngine = new MetodeEngine();
        this.history = this.loadFromLocalStorage('predictorHistory', []);
        this.metodeStats = this.loadFromLocalStorage('metodeStats', Array(12).fill(0).map(() => ({ 
            hits: 0, 
            total: 0, 
            percentage: 0,
            avgScore: 0,
            totalScore: 0
        })));
        
        this.migrateOldData();
    }

    migrateOldData() {
        let needsSave = false;
        
        if (this.metodeStats.length < 12) {
            while (this.metodeStats.length < 12) {
                this.metodeStats.push({
                    hits: 0, 
                    total: 0, 
                    percentage: 0,
                    avgScore: 0,
                    totalScore: 0
                });
            }
            needsSave = true;
        }
        
        this.history = this.history.map(item => {
            if (!item.detailedTimestamp) {
                const oldDate = new Date(item.id || Date.now());
                item.detailedTimestamp = {
                    jam: oldDate.getHours().toString().padStart(2, '0'),
                    menit: oldDate.getMinutes().toString().padStart(2, '0'),
                    detik: oldDate.getSeconds().toString().padStart(2, '0'),
                    tanggal: oldDate.getDate(),
                    bulan: oldDate.getMonth() + 1,
                    tahun: oldDate.getFullYear(),
                    hari: oldDate.toLocaleDateString('id-ID', { weekday: 'long' })
                };
                needsSave = true;
            }
            return item;
        });
        
        if (needsSave) {
            this.saveToLocalStorage('predictorHistory', this.history);
            this.saveToLocalStorage('metodeStats', this.metodeStats);
        }
    }

    validateInput(input) {
        const cleanInput = input.trim().replace(/[,;]/g, ' ').replace(/\s+/g, ' ');
        
        const numberStrings = cleanInput.split(' ').filter(num => num.trim() !== '');

        if (numberStrings.length < 3) {
            throw new Error('Minimal 3 nomor diperlukan untuk prediksi');
        }

        if (numberStrings.length > 5) {
            throw new Error('Maksimal 5 nomor history terakhir');
        }

        const firstLength = numberStrings[0].length;
        if (![4, 5].includes(firstLength)) {
            throw new Error('Nomor harus 4D atau 5D');
        }

        numberStrings.forEach((numStr, idx) => {
            if (!/^\d+$/.test(numStr)) {
                throw new Error(`Nomor ${idx + 1}: "${numStr}" harus berupa angka`);
            }
            
            const length = numStr.length;
            if (length !== firstLength) {
                throw new Error(`Semua nomor harus ${firstLength}D. Nomor ${idx + 1}: "${numStr}" adalah ${length}D`);
            }
        });

        const numbers = numberStrings.map(numStr => parseInt(numStr));

        return numbers;
    }

    predictNext(numbers) {
        const metodes = this.metodeEngine.getAllMetodes();

        const predictions = metodes.map(metode => {
            try {
                return metode(numbers);
            } catch (error) {
                console.error('Metode error:', error);
                return {
                    result: '00000'.substring(0, numbers[0].toString().length),
                    confidence: 0,
                    metodeNum: 0,
                    reason: 'Error dalam kalkulasi'
                };
            }
        });
        
        predictions.sort((a, b) => {
            const aStats = this.metodeStats[a.metodeNum - 1];
            const bStats = this.metodeStats[b.metodeNum - 1];
            
            if (!aStats || !bStats) {
                return b.confidence - a.confidence;
            }
            
            if (aStats.total === 0 && bStats.total === 0) {
                return b.confidence - a.confidence;
            }
            if (aStats.total === 0) return 1;
            if (bStats.total === 0) return -1;
            
            return bStats.avgScore - aStats.avgScore;
        });

        return {
            predictions,
            inputNumbers: [...numbers],
            type: numbers[0].toString().length === 5 ? '5D' : '4D'
        };
    }

    addToHistory(inputNumbers, result, playerName) {
        const now = new Date();
        const detailedTimestamp = {
            jam: now.getHours().toString().padStart(2, '0'),
            menit: now.getMinutes().toString().padStart(2, '0'),
            detik: now.getSeconds().toString().padStart(2, '0'),
            tanggal: now.getDate(),
            bulan: now.getMonth() + 1,
            tahun: now.getFullYear(),
            hari: now.toLocaleDateString('id-ID', { weekday: 'long' })
        };

        const historyItem = {
            id: Date.now(),
            inputNumbers: [...inputNumbers],
            predictions: result.predictions,
            type: result.type,
            detailedTimestamp,
            playerName,
            verified: false,
            actualResult: null
        };

        this.history.unshift(historyItem);
        
        if (this.history.length > 50) {
            this.history = this.history.slice(0, 50);
        }

        this.saveToLocalStorage('predictorHistory', this.history);
        return historyItem;
    }

    searchHistory(query) {
        if (!query.trim()) return this.history;
        
        const searchTerm = query.toLowerCase();
        return this.history.filter(item => {
            return (
                item.playerName.toLowerCase().includes(searchTerm) ||
                item.inputNumbers.some(num => num.toString().includes(searchTerm)) ||
                item.predictions.some(pred => pred.result.includes(searchTerm)) ||
                (item.actualResult && item.actualResult.toString().includes(searchTerm))
            );
        });
    }

    verifyPrediction(historyId, actualResult) {
        const item = this.history.find(h => h.id === historyId);
        if (!item) {
            throw new Error('Prediksi tidak ditemukan');
        }

        if (item.verified) {
            throw new Error('Prediksi sudah diverifikasi sebelumnya');
        }

        const expectedLength = (item.type === '5D' ? 5 : 4);
        if (actualResult.length !== expectedLength) {
            throw new Error(`Hasil result harus ${item.type}`);
        }

        if (!/^\d+$/.test(actualResult)) {
            throw new Error('Hasil result harus berupa angka');
        }

        item.verified = true;
        item.actualResult = actualResult;

        item.predictions.forEach((prediction, idx) => {
            const accuracy = this.calculateAccuracy(prediction.result, actualResult);
            prediction.accuracy = accuracy;

            const metodeIndex = prediction.metodeNum - 1;
            if (metodeIndex >= 0 && metodeIndex < this.metodeStats.length) {
                const stats = this.metodeStats[metodeIndex];
                
                stats.total++;
                stats.totalScore += accuracy;
                stats.avgScore = Math.round(stats.totalScore / stats.total);
                
                if (accuracy >= 50) {
                    stats.hits++;
                }
                
                stats.percentage = Math.round((stats.hits / stats.total) * 100);
            }
        });

        this.saveToLocalStorage('predictorHistory', this.history);
        this.saveToLocalStorage('metodeStats', this.metodeStats);

        return item;
    }

    calculateAccuracy(predicted, actual) {
        let correctPositions = 0;
        const minLength = Math.min(predicted.length, actual.length);

        for (let i = 0; i < minLength; i++) {
            if (predicted[i] === actual[i]) {
                correctPositions++;
            }
        }

        return Math.round((correctPositions / minLength) * 100);
    }

    getHistory() {
        return this.history;
    }

    getMetodeStats() {
        return this.metodeStats;
    }

    clearHistory() {
        this.history = [];
        this.metodeStats = Array(12).fill(0).map(() => ({ 
            hits: 0, 
            total: 0, 
            percentage: 0,
            avgScore: 0,
            totalScore: 0
        }));
        
        this.saveToLocalStorage('predictorHistory', this.history);
        this.saveToLocalStorage('metodeStats', this.metodeStats);
    }

    saveToLocalStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.warn('Gagal menyimpan ke localStorage:', error);
        }
    }

    loadFromLocalStorage(key, defaultValue) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (error) {
            console.warn('Gagal memuat dari localStorage:', error);
            return defaultValue;
        }
    }

    exportData() {
        return {
            history: this.history,
            metodeStats: this.metodeStats,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };
    }

    importData(data) {
        if (!data.history || !data.metodeStats) {
            throw new Error('Format backup tidak valid');
        }
        
        this.history = data.history;
        this.metodeStats = data.metodeStats;
        
        if (this.metodeStats.length < 12) {
            while (this.metodeStats.length < 12) {
                this.metodeStats.push({
                    hits: 0, 
                    total: 0, 
                    percentage: 0,
                    avgScore: 0,
                    totalScore: 0
                });
            }
        }
        
        this.saveToLocalStorage('predictorHistory', this.history);
        this.saveToLocalStorage('metodeStats', this.metodeStats);
        
        return {
            historyCount: this.history.length,
            statsCount: this.metodeStats.filter(s => s.total > 0).length
        };
    }
}

const predictor = new AdvancedTotoPredictor();
let currentSearchResults = [];

function updatePredictButton() {
    const playerName = document.getElementById('playerName').value.trim();
    const numbersInput = document.getElementById('numbersInput').value.trim();
    const button = document.getElementById('predictBtn');
    
    let isValidInput = false;
    let errorMessage = '';
    
    if (numbersInput) {
        try {
            const cleanInput = numbersInput.replace(/[,;]/g, ' ').replace(/\s+/g, ' ').trim();
            const numberStrings = cleanInput.split(' ').filter(num => num.trim() !== '');
            
            if (numberStrings.length >= 3 && numberStrings.length <= 5) {
                const firstLength = numberStrings[0].length;
                
                if ([4, 5].includes(firstLength)) {
                    const allValid = numberStrings.every(numStr => {
                        return /^\d+$/.test(numStr) && numStr.length === firstLength;
                    });
                    
                    if (allValid) {
                        isValidInput = true;
                    } else {
                        errorMessage = `Semua nomor harus ${firstLength}D`;
                    }
                } else {
                    errorMessage = 'Nomor harus 4D atau 5D';
                }
            } else if (numberStrings.length < 3) {
                errorMessage = 'Minimal 3 nomor';
            } else {
                errorMessage = 'Maksimal 5 nomor';
            }
        } catch (error) {
            isValidInput = false;
        }
    }
    
    const isValid = playerName && isValidInput;
    button.disabled = !isValid;
    
    if (isValid) {
        button.textContent = 'Prediksi Sekarang';
    } else if (!playerName) {
        button.textContent = 'Input Nama';
    } else if (!numbersInput) {
        button.textContent = 'Input Nomor';
    } else if (errorMessage) {
        button.textContent = errorMessage;
    } else {
        button.textContent = 'Format Nomor Salah';
    }
}

async function copyToClipboard(text) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
        } else {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'absolute';
            textArea.style.left = '-999999px';
            document.body.prepend(textArea);
            textArea.select();
            document.execCommand('copy');
            textArea.remove();
        }
        
        showCopyFeedback(text);
        
    } catch (error) {
        console.error('Gagal menyalin:', error);
        alert('Gagal menyalin nomor');
    }
}

function showCopyFeedback(text) {
    const existing = document.querySelector('.copy-feedback');
    if (existing) existing.remove();
    
    const feedback = document.createElement('div');
    feedback.className = 'copy-feedback';
    feedback.textContent = `Disalin: ${text}`;
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.remove();
        }
    }, 2000);
}

function searchHistory() {
    const query = document.getElementById('historySearch').value;
    currentSearchResults = predictor.searchHistory(query);
    displayHistory(currentSearchResults);
}

function verifyActualResult(historyId) {
    const input = document.getElementById(`actual-${historyId}`);
    const actualResult = input.value.trim();
    
    if (!actualResult) {
        alert('Masukkan hasil result terlebih dahulu!');
        return;
    }
    
    if (!/^\d+$/.test(actualResult)) {
        alert('Hasil result harus berupa angka!');
        return;
    }
    
    try {
        const verifiedItem = predictor.verifyPrediction(historyId, actualResult);
        displayHistory();
        displayMetodeStats();
        
        const successMsg = document.createElement('div');
        successMsg.innerHTML = `Hasil berhasil diverifikasi: ${actualResult}`;
        successMsg.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(145deg, #68d391, #38a169);
            color: white;
            padding: 6px 25px;
            border-radius: 6px;
            animation: slideInRight 0.9s ease;
            z-index: 10000;
        `;
        document.body.appendChild(successMsg);
        
        setTimeout(() => {
            successMsg.remove();
        }, 3000);
        
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

function predictNumbers() {
    const playerName = document.getElementById('playerName').value.trim();
    const numbersInput = document.getElementById('numbersInput').value.trim();
    
    if (!playerName) {
        showError('Nama wajib diisi!');
        return;
    }
    
    if (!numbersInput) {
        showError('Input nomor tidak boleh kosong!');
        return;
    }
    
    try {
        const inputNumbers = predictor.validateInput(numbersInput);
        const result = predictor.predictNext(inputNumbers);
        
        predictor.addToHistory(inputNumbers, result, playerName);
        
        displayResult(inputNumbers, result, playerName);
        displayHistory();
        displayMetodeStats();
        
    } catch (error) {
        showError(error.message);
    }
}

function displayResult(inputNumbers, result, playerName) {
    const container = document.getElementById('predictionResultSection');
    const type = inputNumbers[0].toString().length === 5 ? '5D' : '4D';
    const badgeClass = type === '5D' ? 'badge-5d' : 'badge-4d';
    const now = new Date();
    
    const dt = {
        jam: now.getHours().toString().padStart(2, '0'),
        menit: now.getMinutes().toString().padStart(2, '0'),
        detik: now.getSeconds().toString().padStart(2, '0'),
        tanggal: now.getDate(),
        bulan: now.getMonth() + 1,
        tahun: now.getFullYear(),
        hari: now.toLocaleDateString('id-ID', { weekday: 'long' })
    };
    
    const html = `
        <div class="neomorph-card result-section">
            <div class="result-header">
                <h2>Hasil Prediksi</h2>
                <span class="type-badge ${badgeClass}">${type}</span>
                <span class="player-name">${playerName}</span>
                <div class="timestamp">
                    ${dt.hari}, ${dt.tanggal}/${dt.bulan}/${dt.tahun} | ${dt.jam}:${dt.menit}:${dt.detik} WIB
                </div>
            </div>
            
            <div class="input-history">
                <h3>Data Input (${inputNumbers.length} nomor terakhir)</h3>
                <div class="history-numbers">
                    ${inputNumbers.map((num, idx) => `
                        <div class="history-item-mini">
                            <span class="history-index">#${idx + 1}</span>
                            <span class="history-number">${num}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="predictions-section">
                <h3>Top 5 Prediksi Terbaik</h3>
                <div class="simple-predictions-list">
                    ${result.predictions.slice(0, 5).map((pred, idx) => `
                        <div class="simple-prediction-item">
                            <span class="prediction-rank">${idx + 1}.</span>
                            <span class="prediction-number" onclick="copyToClipboard('${pred.result}')">${pred.result}</span>
                            <span class="prediction-percentage">${pred.confidence}%</span>
                            <span class="prediction-metode">${metodeNames[pred.metodeNum]}</span>
                        </div>
                        <div class="metode-reason">${pred.reason}</div>
                    `).join('')}
                </div>
            </div>
            
            <div class="all-predictions-section">
                <h3>Semua Prediksi (12 Metode)</h3>
                <div class="all-predictions-simple">
                    ${result.predictions.map((pred, idx) => `
                        <div class="mini-prediction-simple">
                            <span class="mini-rank">${idx + 1}.</span>
                            <span class="mini-number" onclick="copyToClipboard('${pred.result}')">${pred.result}</span>
                            <span class="mini-percentage">${pred.confidence}%</span>
                            <span class="mini-metode">${metodeNames[pred.metodeNum]}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
    container.style.display = 'block';
    
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function displayHistory(filteredHistory = null) {
    const container = document.getElementById('historyContent');
    const history = filteredHistory || predictor.getHistory();
    
    if (history.length === 0) {
        const emptyMessage = filteredHistory ? 'Tidak ada hasil pencarian' : 'Belum Ada History';
        const emptyDesc = filteredHistory ? 'Coba kata kunci lain' : 'Prediksi akan tersimpan otomatis di sini';
        
        container.innerHTML = `
            <div class="section-header">
                <button class="neomorph-button btn-clear-history" onclick="clearAllHistory()">
                    Clear History
                </button>
            </div>
            <div class="search-section">
                <input 
                    type="text" 
                    id="historySearch" 
                    class="search-box"
                    placeholder="Cari nama, nomor, atau tanggal..."
                    onkeyup="searchHistory()"
                />
            </div>
            <div class="empty-state">
                <h3>${emptyMessage}</h3>
                <p>${emptyDesc}</p>
            </div>
        `;
        return;
    }
    
    const html = `
        <div class="section-header">
            <button class="neomorph-button btn-clear-history" onclick="clearAllHistory()">
                Clear History
            </button>
        </div>
        <div class="search-section">
            <input 
                type="text" 
                id="historySearch" 
                class="search-box"
                placeholder="Cari nama, nomor, atau tanggal..."
                onkeyup="searchHistory()"
                value="${document.getElementById('historySearch')?.value || ''}"
            />
        </div>
        ${history.map(item => {
            const allPredictions = item.predictions;
            const dt = item.detailedTimestamp;
            
            return `
                <div class="history-card ${item.verified ? 'verified' : ''}">
                    <div class="history-card-header">
                        <div>
                            <span class="type-badge ${item.type === '5D' ? 'badge-5d' : 'badge-4d'}">${item.type}</span>
                            <span class="history-player-name">${item.playerName}</span>
                            <span class="history-timestamp">
                                ${dt.hari}, ${dt.tanggal}/${dt.bulan}/${dt.tahun} | ${dt.jam}:${dt.menit}:${dt.detik} WIB
                            </span>
                        </div>
                        ${item.verified ? '<span class="verified-badge">Terverifikasi</span>' : ''}
                    </div>
                    
                    <div class="history-input-numbers">
                        <strong>Input:</strong> ${item.inputNumbers.join(' • ')}
                    </div>
                    
                    <div class="history-predictions-mini">
                        <strong>Semua Prediksi (12 Metode):</strong>
                        <div class="mini-predictions">
                            ${allPredictions.map((pred, idx) => {
                                const isGood = item.verified && pred.accuracy && pred.accuracy >= 50;
                                return `
                                    <span class="mini-pred ${isGood ? 'good' : ''}" onclick="copyToClipboard('${pred.result}')">
                                        ${idx + 1}. ${pred.result} 
                                        (${pred.confidence}%)
                                        ${item.verified && pred.accuracy !== undefined ? ` - Akurasi: ${pred.accuracy}%` : ''}
                                        - ${metodeNames[pred.metodeNum]}
                                    </span>
                                `;
                            }).join('')}
                        </div>
                    </div>
                    
                    ${item.verified ? `
                        <div class="actual-result-display">
                            <strong>Hasil result:</strong>
                            <span class="actual-number" onclick="copyToClipboard('${item.actualResult}')">${item.actualResult}</span>
                        </div>
                    ` : `
                        <div class="verify-section">
                            <input 
                                type="text" 
                                class="actual-input" 
                                id="actual-${item.id}" 
                                placeholder="Masukkan hasil result (${item.type})"
                                maxlength="${item.type === '5D' ? '5' : '4'}"
                            />
                            <button 
                                class="neomorph-button btn-verify" 
                                onclick="verifyActualResult(${item.id})"
                            >
                                Verify
                            </button>
                        </div>
                    `}
                </div>
            `;
        }).join('')}
    `;
    
    container.innerHTML = html;
}

function displayMetodeStats() {
    const container = document.getElementById('statsContent');
    const stats = predictor.getMetodeStats();
    
    const hasVerifiedData = stats.some(stat => stat.total > 0);
    
    if (!hasVerifiedData) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>Belum Ada Statistik</h3>
                <p>Verifikasi hasil prediksi untuk melihat statistik</p>
            </div>
        `;
        return;
    }
    
    const sortedStats = stats.map((stat, idx) => ({
        ...stat,
        metodeNum: idx + 1,
        name: metodeNames[idx + 1] || `Metode ${idx + 1}`
    })).sort((a, b) => b.avgScore - a.avgScore);
    
    const html = `
        <div class="stats-grid">
            ${sortedStats.map(stat => {
                if (stat.total === 0) return '';
                
                let fillClass = 'poor';
                let cardClass = 'poor';
                if (stat.avgScore >= 70) {
                    fillClass = 'excellent';
                    cardClass = 'excellent';
                } else if (stat.avgScore >= 50) {
                    fillClass = 'good';
                    cardClass = 'good';
                } else if (stat.avgScore >= 30) {
                    fillClass = 'average';
                    cardClass = 'average';
                }
                
                return `
                    <div class="stat-card ${cardClass}">
                        <div class="stat-metode">${stat.name}</div>
                        <div class="stat-percentage">${stat.avgScore}%</div>
                        <div class="stat-bar">
                            <div class="stat-fill ${fillClass}" style="width: ${stat.avgScore}%"></div>
                        </div>
                        <div class="stat-details">
                            <div><strong>Total Prediksi:</strong> ${stat.total}</div>
                            <div><strong>Akurasi ≥50%:</strong> ${stat.hits}</div>
                            <div><strong>Success Rate:</strong> ${stat.percentage}%</div>
                            <div style="margin-top: 8px; font-style: italic; color: #4a5568;">
                                ${metodeReasons[stat.metodeNum] || 'Metode prediksi lanjutan'}
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
    
    container.innerHTML = html;
}

function showError(message) {
    const container = document.getElementById('predictionResultSection');
    container.innerHTML = `
        <div class="neomorph-card">
            <div class="error-message">
                <h3>Error</h3>
                <p>${message}</p>
            </div>
        </div>
    `;
    container.style.display = 'block';
    
    setTimeout(() => {
        container.style.display = 'none';
    }, 3000);
}

function clearResults() {
    document.getElementById('playerName').value = '';
    document.getElementById('numbersInput').value = '';
    document.getElementById('predictionResultSection').style.display = 'none';
    updatePredictButton();
}

function clearAllHistory() {
    if (confirm('Apakah Anda yakin ingin menghapus semua history dan statistik?')) {
        predictor.clearHistory();
        displayHistory();
        displayMetodeStats();
        
        const successMsg = document.createElement('div');
        successMsg.innerHTML = `Semua history dan statistik berhasil dihapus!`;
        successMsg.style.cssText = `
            position: fixed;
            top: 15px;
            right: 15px;
            background: linear-gradient(145deg, #fc8181, #e53e3e);
            color: white;
            padding: 5px 16px;
            border-radius: 5px;
            animation: slideInRight 0.9s ease;
            z-index: 10000;
        `;
        document.body.appendChild(successMsg);
        
        setTimeout(() => {
            successMsg.remove();
        }, 3000);
    }
}

function backupData() {
    try {
        const data = predictor.exportData();
        const jsonStr = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `predictor-backup-${new Date().getTime()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        const successMsg = document.createElement('div');
        successMsg.innerHTML = `Backup berhasil diunduh!`;
        successMsg.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(145deg, #4299e1, #3182ce);
            color: white;
            padding: 15px 25px;
            border-radius: 15px;
            animation: slideInRight 0.3s ease;
            z-index: 10000;
        `;
        document.body.appendChild(successMsg);
        
        setTimeout(() => {
            successMsg.remove();
        }, 3000);
        
    } catch (error) {
        alert('Gagal membuat backup: ' + error.message);
    }
}

function restoreData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            const result = predictor.importData(data);
            
            displayHistory();
            displayMetodeStats();
            
            const successMsg = document.createElement('div');
            successMsg.innerHTML = `Restore berhasil! ${result.historyCount} history dan ${result.statsCount} statistik dimuat.`;
            successMsg.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(145deg, #48bb78, #38a169);
                color: white;
                padding: 4px 25px;
                border-radius: 4px;
                animation: slideInRight 0.8s ease;
                z-index: 10000;
            `;
            document.body.appendChild(successMsg);
            
            setTimeout(() => {
                successMsg.remove();
            }, 3000);
            
        } catch (error) {
            alert('Gagal restore data: ' + error.message);
        }
    };
    reader.readAsText(file);
    
    event.target.value = '';
}

function fillExample4D() {
    document.getElementById('playerName').value = 'Demo 4D';
    document.getElementById('numbersInput').value = '1122 3344 5566 1234 5678';
    updatePredictButton();
}

function fillExample5D() {
    document.getElementById('playerName').value = 'Demo 5D';
    document.getElementById('numbersInput').value = '12345 67890 00112 11009 16372';
    updatePredictButton();
}

function showInputWarning(message) {
    const existingWarning = document.querySelector('.input-warning');
    if (existingWarning) {
        existingWarning.remove();
    }
    
    const warning = document.createElement('div');
    warning.className = 'input-warning';
    warning.textContent = message;
    warning.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(145deg, #f56565, #e53e3e);
        color: white;
        padding: 8px 20px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 10000;
        animation: slideInDown 0.3s ease;
    `;
    
    document.body.appendChild(warning);
    
    setTimeout(() => {
        if (warning.parentNode) {
            warning.style.animation = 'slideOutUp 0.3s ease';
            setTimeout(() => {
                warning.remove();
            }, 300);
        }
    }, 3000);
}

document.getElementById('playerName').addEventListener('input', updatePredictButton);
document.getElementById('numbersInput').addEventListener('input', function(e) {
    let input = e.target.value.trim();
    let cleanInput = input.replace(/[,;]/g, ' ').replace(/\s+/g, ' ');
    let numberStrings = cleanInput.split(' ').filter(num => num.length > 0);
    
    if (numberStrings.length > 5) {
        numberStrings = numberStrings.slice(0, 5);
        e.target.value = numberStrings.join(' ');
        showInputWarning('Maksimal 5 nomor history terakhir');
    }
    
    updatePredictButton();
});

document.getElementById('numbersInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        predictNumbers();
    }
});

window.addEventListener('DOMContentLoaded', function() {
    displayHistory();
    displayMetodeStats();
    updatePredictButton();
});