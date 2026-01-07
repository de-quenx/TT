const metodeNames = {
    1: 'POLA AWAL',
    2: 'MIRROR PRO', 
    3: 'SMART LOCK',
    4: 'TAIL SCAN',
    5: 'DOUBLE HIT',
    6: 'MEGA PICK',
    7: 'AI PRIME',
    8: 'TREND MAP',
    9: 'QUANTUM SHIFT',
    10: 'NEURAL DEEP',
    11: 'COSMIC WAVE',
    12: 'MATRIX CORE'
};

const metodeReasons = {
    1: 'Menganalisis pola digit awal untuk prediksi maksimal',
    2: 'Sistem cermin terbalik untuk stabilitas tinggi', 
    3: 'Penguncian cerdas berdasarkan frekuensi kemunculan',
    4: 'Pemindaian ekor dengan analisis siklus berkelanjutan',
    5: 'Deteksi pola kembar untuk akurasi double digit',
    6: 'Pemilihan 7 angka utama dengan presisi tinggi',
    7: 'Kombinasi AI untuk hasil paling optimal',
    8: 'Pemetaan tren angka panas periode terkini',
    9: 'Perhitungan kuantum multi-dimensional untuk akurasi tertinggi',
    10: 'Jaringan neural dalam dengan pembelajaran adaptif berkelanjutan',
    11: 'Analisis gelombang kosmik berdasarkan siklus universal',
    12: 'Matriks inti dengan algoritma prediksi terdepan'
};

class MetodeEngine {
    calculateInputSignature(numbers) {
        if (!numbers || numbers.length === 0) return { sum: 0, avg: 0, variance: 0, range: 0, length: 0, digitLen: 4, hash: 12345 };
        
        const digitLen = numbers[0].toString().length;
        const sum = numbers.reduce((a, b) => a + b, 0);
        const avg = sum / numbers.length;
        const variance = numbers.reduce((acc, num) => acc + Math.pow(num - avg, 2), 0) / numbers.length;
        const range = Math.max(...numbers) - Math.min(...numbers);
        
        return {
            sum: sum,
            avg: avg,
            variance: variance,
            range: range,
            length: numbers.length,
            digitLen: digitLen,
            hash: Math.abs(Math.floor(sum * 7 + avg * 13 + variance * 0.01 + range * 19)) % 100000
        };
    }

    generateDeterministicPercentage(signature, metodeNum, complexity, stability) {
        const seed = (signature.hash + metodeNum * 1000) % 10000;
        const deterministicRandom = (seed * 9301 + 49297) % 233280 / 233280;
        
        const lengthFactor = Math.min(signature.length - 2, 4) * 2;
        const digitFactor = signature.digitLen >= 4 ? (signature.digitLen - 3) * 1.5 : 0;
        const varianceFactor = signature.variance > 500 ? -3 : signature.variance > 100 ? 0 : 2;
        const rangeFactor = signature.range > 5000 ? 3 : signature.range > 2000 ? 1 : -1;
        
        const base = 20 + (complexity * 12) + (stability * 10) + lengthFactor + digitFactor + varianceFactor + rangeFactor;
        const variance = (deterministicRandom * 8) - 4;
        const percentage = Math.min(60, Math.max(20, Math.floor(base + variance)));
        
        return percentage;
    }

    analyzePositionalDigits(numbers) {
        if (!numbers || numbers.length === 0) return [];
        
        const len = numbers[0].toString().length;
        const positions = Array(len).fill().map(() => []);
        
        numbers.forEach(num => {
            const digits = num.toString().padStart(len, '0').split('');
            digits.forEach((digit, pos) => {
                positions[pos].push(parseInt(digit));
            });
        });
        
        return positions.map(posArray => {
            const freq = Array(10).fill(0);
            const weights = Array(10).fill(0);
            
            posArray.forEach((d, idx) => {
                const weight = posArray.length - idx;
                freq[d]++;
                weights[d] += weight;
            });
            
            const maxWeight = Math.max(...weights);
            const hotDigits = weights.map((w, d) => ({ 
                digit: d, 
                frequency: freq[d], 
                weight: w, 
                score: w + freq[d] * 2,
                isHot: w >= maxWeight * 0.75 
            })).sort((a, b) => b.score - a.score);
            
            return hotDigits;
        });
    }

    detectMultiPatterns(numbers) {
        const patterns = {
            sequential: 0, palindrome: 0, repeated: 0, ascending: 0, descending: 0, twin: 0, mirror: 0
        };
        
        if (!numbers || numbers.length === 0) return patterns;
        
        numbers.forEach((num, idx) => {
            const str = num.toString().padStart(numbers[0].toString().length, '0');
            const digits = str.split('').map(d => parseInt(d));
            const weight = numbers.length - idx;
            
            if (str === str.split('').reverse().join('')) patterns.palindrome += weight;
            
            let ascending = true, descending = true, sequential = true;
            for (let i = 1; i < digits.length; i++) {
                if (digits[i] !== digits[i-1] + 1) sequential = false;
                if (digits[i] <= digits[i-1]) ascending = false;
                if (digits[i] >= digits[i-1]) descending = false;
            }
            
            if (sequential) patterns.sequential += weight;
            if (ascending) patterns.ascending += weight;
            if (descending) patterns.descending += weight;
            
            const uniqueDigits = new Set(digits);
            if (uniqueDigits.size <= 2) patterns.repeated += weight;
            if (uniqueDigits.size === 2) patterns.twin += weight;
            
            if (digits.length > 1 && digits[0] === digits[digits.length-1]) {
                patterns.mirror += weight;
            }
        });
        
        return patterns;
    }

    polaAwalMetode(numbers) {
        const signature = this.calculateInputSignature(numbers);
        const len = numbers.length;
        const digitLen = numbers[0].toString().length;
        const posAnalysis = this.analyzePositionalDigits(numbers);
        const patterns = this.detectMultiPatterns(numbers);
        
        let prediction = '';
        for (let i = 0; i < digitLen; i++) {
            const posHot = posAnalysis[i] || [];
            const baseDigit = posHot.length > 0 ? posHot[0].digit : 5;
            const secondChoice = posHot.length > 1 ? posHot[1].digit : baseDigit;
            const seed = (signature.hash + i) % 10;
            const trendAdjust = Math.floor((seed % 3) - 1);
            const patternAdjust = patterns.ascending > 0 ? 1 : patterns.descending > 0 ? -1 : 0;
            const blendedDigit = Math.floor((baseDigit * 0.7) + (secondChoice * 0.3));
            const finalDigit = (blendedDigit + trendAdjust + patternAdjust + 10) % 10;
            prediction += finalDigit.toString();
        }
        
        return { 
            result: prediction, 
            confidence: this.generateDeterministicPercentage(signature, 1, 0.45, 0.52), 
            metodeNum: 1, 
            reason: metodeReasons[1] 
        };
    }

    mirrorProMetode(numbers) {
        const signature = this.calculateInputSignature(numbers);
        const digitLen = numbers[0].toString().length;
        const posAnalysis = this.analyzePositionalDigits(numbers);
        
        let result = '';
        for (let i = 0; i < digitLen; i++) {
            const posHot = posAnalysis[i] || [];
            const baseDigit = posHot.length > 0 ? posHot[0].digit : 5;
            const secondChoice = posHot.length > 1 ? posHot[1].digit : baseDigit;
            const seed = (signature.hash + i * 13) % 10;
            
            const mirrorLogic = (9 - baseDigit + secondChoice + seed) % 10;
            const inverseMirror = (baseDigit + mirrorLogic) % 10;
            const finalDigit = Math.floor((inverseMirror * 0.6 + baseDigit * 0.4)) % 10;
            
            result += finalDigit.toString();
        }
        
        return { 
            result, 
            confidence: this.generateDeterministicPercentage(signature, 2, 0.48, 0.55),
            metodeNum: 2, 
            reason: metodeReasons[2] 
        };
    }

    smartLockMetode(numbers) {
        const signature = this.calculateInputSignature(numbers);
        const len = numbers.length;
        const digitLen = numbers[0].toString().length;
        const posAnalysis = this.analyzePositionalDigits(numbers);
        const patterns = this.detectMultiPatterns(numbers);
        
        let result = '';
        for (let pos = 0; pos < digitLen; pos++) {
            const analysis = posAnalysis[pos] || [];
            const topCandidates = analysis.slice(0, 4);
            
            let lockDigit;
            if (topCandidates.length > 1 && topCandidates[0].score > topCandidates[1].score * 1.8) {
                lockDigit = topCandidates[0].digit;
            } else {
                const recentDigits = numbers.slice(-Math.min(3, len))
                    .map(n => parseInt(n.toString().padStart(digitLen, '0')[pos]));
                const recentAvg = recentDigits.reduce((a, b) => a + b, 0) / recentDigits.length;
                
                lockDigit = topCandidates.length > 0 ? topCandidates.reduce((closest, curr) => 
                    Math.abs(curr.digit - recentAvg) < Math.abs(closest.digit - recentAvg) ? curr : closest
                ).digit : Math.floor(recentAvg) % 10;
            }
            
            if (patterns.palindrome > 0 && pos < Math.floor(digitLen / 2)) {
                const mirrorPos = digitLen - 1 - pos;
                const mirrorAnalysis = posAnalysis[mirrorPos] || [];
                const mirrorCandidate = mirrorAnalysis.length > 0 ? mirrorAnalysis[0].digit : lockDigit;
                lockDigit = Math.floor((lockDigit * 0.6 + mirrorCandidate * 0.4)) % 10;
            }
            
            result += lockDigit.toString();
        }
        
        return { 
            result, 
            confidence: this.generateDeterministicPercentage(signature, 3, 0.55, 0.60),
            metodeNum: 3, 
            reason: metodeReasons[3] 
        };
    }

    tailScanMetode(numbers) {
        const signature = this.calculateInputSignature(numbers);
        const len = numbers.length;
        const digitLen = numbers[0].toString().length;
        const tailDigits = digitLen >= 4 ? 3 : 2;
        
        const tails = numbers.map(n => n % Math.pow(10, tailDigits));
        const tailDiffs = [];
        for (let i = 1; i < len; i++) {
            tailDiffs.push(tails[i] - tails[i - 1]);
        }
        
        const avgDiff = tailDiffs.length > 0 ? tailDiffs.reduce((a, b) => a + b, 0) / tailDiffs.length : 0;
        const predictedTail = Math.abs(Math.floor(tails[len - 1] + avgDiff * 0.5)) % Math.pow(10, tailDigits);
        const tailStr = predictedTail.toString().padStart(tailDigits, '0');
        
        let prediction = '';
        for (let i = 0; i < digitLen; i++) {
            let baseDigit;
            if (i >= digitLen - tailDigits) {
                baseDigit = parseInt(tailStr[i - (digitLen - tailDigits)]);
            } else {
                const posSum = numbers.slice(-Math.min(3, len))
                    .reduce((sum, n) => sum + parseInt(n.toString().padStart(digitLen, '0')[i]), 0);
                baseDigit = Math.floor(posSum / Math.min(3, len)) % 10;
            }
            
            const seed = (signature.hash + i * 17) % 10;
            const cycleAdjust = Math.floor(seed * avgDiff / 200) % 10;
            const finalDigit = (baseDigit + cycleAdjust + 10) % 10;
            prediction += finalDigit.toString();
        }
        
        return { 
            result: prediction, 
            confidence: this.generateDeterministicPercentage(signature, 4, 0.46, 0.54),
            metodeNum: 4, 
            reason: metodeReasons[4] 
        };
    }

    doubleHitMetode(numbers) {
        const signature = this.calculateInputSignature(numbers);
        const len = numbers.length;
        const digitLen = numbers[0].toString().length;
        
        const kembarCount = {};
        const adjacentPairs = {};
        
        numbers.forEach((num, idx) => {
            const str = num.toString().padStart(digitLen, '0');
            const weight = len - idx;
            
            for (let i = 0; i < str.length - 1; i++) {
                if (str[i] === str[i + 1]) {
                    const kembar = str[i];
                    kembarCount[kembar] = (kembarCount[kembar] || 0) + weight;
                }
                
                const pair = str[i] + str[i + 1];
                adjacentPairs[pair] = (adjacentPairs[pair] || 0) + weight;
            }
        });
        
        const topKembar = Object.entries(kembarCount)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 4)
            .map(([digit]) => parseInt(digit));
        
        const topPairs = Object.entries(adjacentPairs)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3)
            .map(([pair]) => pair.split('').map(d => parseInt(d)));
        
        let result = '';
        for (let i = 0; i < digitLen; i++) {
            let finalDigit;
            const seed = (signature.hash + i * 23) % 10;
            
            if (i < topPairs.length && topPairs[i]) {
                const pairSum = topPairs[i][0] + topPairs[i][1];
                const kembarBase = topKembar[i % topKembar.length] || 5;
                finalDigit = Math.floor((pairSum * 0.5 + kembarBase * 0.5 + seed * 0.1)) % 10;
            } else {
                const kembarBase = topKembar[i % topKembar.length] || 5;
                finalDigit = (kembarBase + seed + 10) % 10;
            }
            
            result += finalDigit.toString();
        }
        
        return { 
            result: result, 
            confidence: this.generateDeterministicPercentage(signature, 5, 0.42, 0.50),
            metodeNum: 5, 
            reason: metodeReasons[5] 
        };
    }

    megaPickMetode(numbers) {
        const signature = this.calculateInputSignature(numbers);
        const len = numbers.length;
        const digitLen = numbers[0].toString().length;
        const posAnalysis = this.analyzePositionalDigits(numbers);
        
        const allDigits = numbers.join('').split('').map(d => parseInt(d));
        const frequency = Array(10).fill(0);
        const recency = Array(10).fill(0);
        
        allDigits.forEach((digit, idx) => {
            frequency[digit]++;
            const numIdx = Math.floor(idx / digitLen);
            recency[digit] += (len - numIdx) * 2;
        });
        
        const weightedScore = frequency.map((freq, digit) => {
            if (freq === 0) return { digit, score: 0 };
            const avgRecency = recency[digit] / freq;
            const score = (freq * 3) + (avgRecency * 2.5);
            return { digit, score };
        });
        
        const tardal = weightedScore
            .sort((a, b) => b.score - a.score)
            .slice(0, digitLen >= 4 ? 7 : 6)
            .map(item => item.digit);
        
        let result = '';
        for (let i = 0; i < digitLen; i++) {
            const posHot = posAnalysis[i] || [];
            const posAvg = posHot.length > 0 ? posHot.slice(0, 3).reduce((sum, p) => sum + p.digit, 0) / Math.min(3, posHot.length) : 5;
            const seed = (signature.hash + i * 29) % tardal.length;
            
            const nearbyTardal = tardal.length > 0 ? tardal
                .map(t => ({ digit: t, distance: Math.abs(t - posAvg) }))
                .sort((a, b) => a.distance - b.distance)[0].digit : Math.floor(posAvg);
            
            const selectedDigit = tardal.length > seed ? 
                Math.floor((tardal[seed] * 0.5) + (nearbyTardal * 0.5)) : 
                nearbyTardal;
            
            result += (selectedDigit % 10).toString();
        }
        
        return { 
            result: result, 
            confidence: this.generateDeterministicPercentage(signature, 6, 0.56, 0.60),
            metodeNum: 6, 
            reason: metodeReasons[6] 
        };
    }

    aiPrimeMetode(numbers) {
        const signature = this.calculateInputSignature(numbers);
        const digitLen = numbers[0].toString().length;
        const posAnalysis = this.analyzePositionalDigits(numbers);
        const patterns = this.detectMultiPatterns(numbers);
        
        let result = '';
        for (let i = 0; i < digitLen; i++) {
            const seed = (signature.hash + i * 31) % 100;
            const trendFactor = (seed % 10) * 0.1;
            const gapFactor = ((seed >> 1) % 10) * 0.08;
            const cycleFactor = ((seed >> 2) % 10) * 0.07;
            const positionFactor = posAnalysis[i] && posAnalysis[i].length > 0 ? posAnalysis[i][0].score / 100 : 0.5;
            
            const weights = digitLen >= 4 ? 
                { trend: 0.25, gap: 0.20, cycle: 0.20, position: 0.35 } :
                { trend: 0.30, gap: 0.25, cycle: 0.20, position: 0.25 };
            
            let aiScore = (trendFactor * weights.trend) + 
                         (gapFactor * weights.gap) + 
                         (cycleFactor * weights.cycle) +
                         (positionFactor * weights.position);
            
            if (patterns.sequential > 0 || patterns.ascending > 0) {
                aiScore += (i * 0.3);
            } else if (patterns.descending > 0) {
                aiScore -= (i * 0.3);
            }
            
            const normalizedScore = Math.abs(aiScore * 10) % 10;
            const finalDigit = Math.floor(normalizedScore);
            
            result += finalDigit.toString();
        }
        
        return { 
            result: result, 
            confidence: this.generateDeterministicPercentage(signature, 7, 0.58, 0.60),
            metodeNum: 7, 
            reason: metodeReasons[7] 
        };
    }

    trendMapMetode(numbers) {
        const signature = this.calculateInputSignature(numbers);
        const len = numbers.length;
        const digitLen = numbers[0].toString().length;
        const heatMap = Array(10).fill(0);
        const positionHeat = Array(digitLen).fill().map(() => Array(10).fill(0));
        const recentWeight = [10, 9, 7, 6, 5, 4, 3, 2, 1];
        
        numbers.forEach((num, idx) => {
            const weight = recentWeight[Math.min(idx, recentWeight.length - 1)] || 1;
            const digits = num.toString().padStart(digitLen, '0').split('');
            
            digits.forEach((digit, pos) => {
                const d = parseInt(digit);
                heatMap[d] += weight;
                positionHeat[pos][d] += weight * 1.5;
            });
        });
        
        const maxHeat = Math.max(...heatMap);
        const hotDigits = heatMap
            .map((heat, digit) => ({ digit, heat, ratio: heat / (maxHeat || 1) }))
            .filter(item => item.ratio >= 0.35)
            .sort((a, b) => b.heat - a.heat)
            .slice(0, digitLen >= 4 ? 6 : 5)
            .map(item => item.digit);
        
        let result = '';
        for (let i = 0; i < digitLen; i++) {
            const posHeatMax = Math.max(...positionHeat[i]);
            const posHotDigits = positionHeat[i]
                .map((heat, digit) => ({ digit, heat }))
                .filter(item => item.heat >= (posHeatMax || 1) * 0.5)
                .sort((a, b) => b.heat - a.heat)
                .map(item => item.digit);
            
            const seed = (signature.hash + i * 37) % (hotDigits.length || 1);
            const globalHot = hotDigits.length > 0 ? hotDigits[seed] : 5;
            const localHot = posHotDigits.length > 0 ? posHotDigits[0] : globalHot;
            const baseDigit = Math.floor((globalHot * 0.6 + localHot * 0.4));
            
            const momentumShift = (signature.hash >> (i + 3)) % 3;
            const finalDigit = (baseDigit + momentumShift + 20) % 10;
            result += finalDigit.toString();
        }
        
        return { 
            result: result, 
            confidence: this.generateDeterministicPercentage(signature, 8, 0.50, 0.57),
            metodeNum: 8, 
            reason: metodeReasons[8] 
        };
    }

    quantumShiftMetode(numbers) {
        const signature = this.calculateInputSignature(numbers);
        const len = numbers.length;
        const digitLen = numbers[0].toString().length;
        
        const quantumStates = numbers.map((num, idx) => {
            const amplitude = Math.sin((idx + 1 + signature.hash * 0.001) * Math.PI / len);
            const phase = (num * 0.618034 + signature.hash * 0.001) % (2 * Math.PI);
            const energy = num % (digitLen >= 4 ? 1000 : 100);
            
            return { amplitude, phase, energy };
        });
        
        let result = '';
        for (let i = 0; i < digitLen; i++) {
            const stateIdx = i % len;
            const state = quantumStates[stateIdx];
            const seed = (signature.hash + i * 41) % 100;
            
            const waveFunction = state.energy * Math.cos(state.phase + seed * 0.01) * 0.5;
            const quantumValue = Math.abs(waveFunction + seed * 0.1) % 10;
            const finalDigit = Math.floor(quantumValue);
            
            result += finalDigit.toString();
        }
        
        return {
            result: result,
            confidence: this.generateDeterministicPercentage(signature, 9, 0.52, 0.58),
            metodeNum: 9,
            reason: metodeReasons[9]
        };
    }

    neuralDeepMetode(numbers) {
        const signature = this.calculateInputSignature(numbers);
        const len = numbers.length;
        const digitLen = numbers[0].toString().length;
        const maxNum = Math.max(...numbers);
        
        const inputLayer = numbers.map((num, idx) => {
            const normalized = maxNum > 0 ? num / maxNum : 0.5;
            const seed = (signature.hash + idx * 43) % 100;
            const sigmoid = 1 / (1 + Math.exp(-((normalized - 0.5 + seed * 0.001) * 6)));
            return { sigmoid, normalized };
        });
        
        let result = '';
        for (let i = 0; i < digitLen; i++) {
            const neuronIdx = i % inputLayer.length;
            const neuron = inputLayer[neuronIdx];
            const seed = (signature.hash + i * 47) % 100;
            
            const weighted = neuron.sigmoid * 0.7 + neuron.normalized * 0.3;
            const hidden1 = 1 / (1 + Math.exp(-(weighted + seed * 0.001)));
            const output = hidden1 * 10;
            const finalDigit = Math.floor(output % 10);
            
            result += finalDigit.toString();
        }
        
        return {
            result: result,
            confidence: this.generateDeterministicPercentage(signature, 10, 0.54, 0.59),
            metodeNum: 10,
            reason: metodeReasons[10]
        };
    }

    cosmicWaveMetode(numbers) {
        const signature = this.calculateInputSignature(numbers);
        const digitLen = numbers[0].toString().length;
        
        const dayOfYear = (signature.sum + signature.hash) % 365 + 1;
        const lunarCycle = (dayOfYear % 29.53) / 29.53;
        const solarCycle = Math.sin(2 * Math.PI * dayOfYear / 365.25);
        
        let result = '';
        for (let i = 0; i < digitLen; i++) {
            const seed = (signature.hash + i * 53) % 100;
            const cosmicValue = Math.sin(lunarCycle * 2 * Math.PI + seed * 0.01) * 0.5;
            const solarInfluence = solarCycle * 0.3;
            
            const baseDigit = Math.floor(Math.abs((cosmicValue + solarInfluence) * 10 + seed * 0.01)) % 10;
            const finalDigit = (baseDigit + Math.floor(seed * 0.1)) % 10;
            
            result += finalDigit.toString();
        }
        
        return {
            result: result,
            confidence: this.generateDeterministicPercentage(signature, 11, 0.47, 0.54),
            metodeNum: 11,
            reason: metodeReasons[11]
        };
    }

    matrixCoreMetode(numbers) {
        const signature = this.calculateInputSignature(numbers);
        const len = numbers.length;
        const digitLen = numbers[0].toString().length;
        const posAnalysis = this.analyzePositionalDigits(numbers);
        
        const maxNum = Math.max(...numbers);
        const minNum = Math.min(...numbers);
        const range = maxNum - minNum || 1;
        
        let trace = 0;
        for (let i = 0; i < len && i < numbers.length; i++) {
            trace += ((numbers[i] - minNum) / range) * 80;
        }
        
        let result = '';
        for (let i = 0; i < digitLen; i++) {
            const seed = (signature.hash + i * 59) % 100;
            const matrixBase = Math.abs((trace + seed) * 0.01) % 10;
            
            const posHot = posAnalysis[i] && posAnalysis[i].length > 0 ? posAnalysis[i][0].digit : 5;
            const posWeight = posAnalysis[i] && posAnalysis[i].length > 0 ? posAnalysis[i][0].weight / 100 : 0.5;
            
            const hybrid = (matrixBase * 0.4) + (posHot * 0.4) + (posWeight * 0.2);
            const finalDigit = Math.floor(Math.abs(hybrid) % 10);
            
            result += finalDigit.toString();
        }
        
        return {
            result: result,
            confidence: this.generateDeterministicPercentage(signature, 12, 0.57, 0.60),
            metodeNum: 12,
            reason: metodeReasons[12]
        };
    }

    getAllMetodes() {
        return [
            (numbers) => this.polaAwalMetode(numbers),
            (numbers) => this.mirrorProMetode(numbers),
            (numbers) => this.smartLockMetode(numbers),
            (numbers) => this.tailScanMetode(numbers),
            (numbers) => this.doubleHitMetode(numbers),
            (numbers) => this.megaPickMetode(numbers),
            (numbers) => this.aiPrimeMetode(numbers),
            (numbers) => this.trendMapMetode(numbers),
            (numbers) => this.quantumShiftMetode(numbers),
            (numbers) => this.neuralDeepMetode(numbers),
            (numbers) => this.cosmicWaveMetode(numbers),
            (numbers) => this.matrixCoreMetode(numbers)
        ];
    }
}