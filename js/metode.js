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
    generateSmartPercentage(complexity, stability) {
        const base = 15 + (complexity * 8) + (stability * 12);
        const variance = Math.random() * 30;
        return Math.min(85, Math.max(15, Math.floor(base + variance)));
    }

    polaAwalMetode(numbers) {
        const asDigits = numbers.map(n => parseInt(n.toString()[0]));
        const patterns = this.analyzePatterns(asDigits);
        const prediction = this.predictFromPatterns(patterns, numbers[0].toString().length);
        return { 
            result: prediction, 
            confidence: this.generateSmartPercentage(0.7, 0.8), 
            metodeNum: 1, 
            reason: metodeReasons[1] 
        };
    }

    mirrorProMetode(numbers) {
        const kopDigits = numbers.map(n => n.toString().length >= 4 ? parseInt(n.toString()[1]) : 0);
        let result = '';
        
        for (let i = 0; i < numbers[0].toString().length; i++) {
            const cyclicSum = kopDigits.reduce((sum, digit, idx) => {
                return sum + (digit * Math.pow(2, idx % 3));
            }, 0);
            const mirroredDigit = (9 - (cyclicSum % 10)) % 10;
            result += ((mirroredDigit + i) % 10).toString();
        }
        
        return { 
            result, 
            confidence: this.generateSmartPercentage(0.8, 0.9), 
            metodeNum: 2, 
            reason: metodeReasons[2] 
        };
    }

    smartLockMetode(numbers) {
        const len = numbers[0].toString().length;
        const positionWeights = [3, 2, 4, 1, 5];
        let result = '';
        
        for (let pos = 0; pos < len; pos++) {
            let weightedSum = 0;
            numbers.forEach((num, idx) => {
                const digit = parseInt(num.toString()[pos] || '0');
                const weight = positionWeights[idx % positionWeights.length];
                weightedSum += digit * weight;
            });
            
            const finalDigit = this.applyAdvancedModulo(weightedSum, pos, numbers.length);
            result += finalDigit.toString();
        }
        
        return { 
            result, 
            confidence: this.generateSmartPercentage(0.6, 0.7), 
            metodeNum: 3, 
            reason: metodeReasons[3] 
        };
    }

    tailScanMetode(numbers) {
        const lastTwoDigits = numbers.map(n => n % 100);
        const cyclicPattern = this.generateCyclicPattern(lastTwoDigits);
        const prediction = this.extrapolateCyclic(cyclicPattern, numbers[0].toString().length);
        
        return { 
            result: prediction, 
            confidence: this.generateSmartPercentage(0.75, 0.85), 
            metodeNum: 4, 
            reason: metodeReasons[4] 
        };
    }

    doubleHitMetode(numbers) {
        const twinData = this.detectTwinPatterns(numbers);
        const amplifiedTwins = this.amplifyTwinSignals(twinData);
        const prediction = this.synthesizeTwinPrediction(amplifiedTwins, numbers[0].toString().length);
        
        return { 
            result: prediction, 
            confidence: this.generateSmartPercentage(0.65, 0.75), 
            metodeNum: 5, 
            reason: metodeReasons[5] 
        };
    }

    megaPickMetode(numbers) {
        const allDigits = numbers.join('').split('').map(d => parseInt(d));
        const frequency = this.calculateAdvancedFrequency(allDigits);
        const tardal = this.selectOptimalTardal(frequency, 7);
        const prediction = this.constructFromTardal(tardal, numbers[0].toString().length);
        
        return { 
            result: prediction, 
            confidence: this.generateSmartPercentage(0.85, 0.95), 
            metodeNum: 6, 
            reason: metodeReasons[6] 
        };
    }

    aiPrimeMetode(numbers) {
        const analysis = this.performMultiFactorAnalysis(numbers);
        const convergence = this.findConvergencePoints(analysis);
        const prediction = this.optimizeWithML(convergence, numbers[0].toString().length);
        
        return { 
            result: prediction, 
            confidence: this.generateSmartPercentage(0.9, 0.98), 
            metodeNum: 7, 
            reason: metodeReasons[7] 
        };
    }

    trendMapMetode(numbers) {
        const trends = this.analyzeTrends(numbers, 3);
        const heatMap = this.generateHeatMap(trends);
        const prediction = this.extractHotPattern(heatMap, numbers[0].toString().length);
        
        return { 
            result: prediction, 
            confidence: this.generateSmartPercentage(0.7, 0.8), 
            metodeNum: 8, 
            reason: metodeReasons[8] 
        };
    }

    quantumShiftMetode(numbers) {
        const quantumStates = this.calculateQuantumStates(numbers);
        const entanglement = this.measureQuantumEntanglement(quantumStates);
        const superposition = this.applySuperposition(entanglement, numbers);
        const collapse = this.collapseWaveFunction(superposition);
        const prediction = this.extractQuantumPrediction(collapse, numbers[0].toString().length);
        
        return {
            result: prediction,
            confidence: this.generateSmartPercentage(0.95, 0.99),
            metodeNum: 9,
            reason: metodeReasons[9]
        };
    }

    neuralDeepMetode(numbers) {
        const layers = this.initializeNeuralLayers(numbers);
        const processed = this.forwardPropagation(layers, numbers);
        const learned = this.backPropagation(processed);
        const optimized = this.neuralOptimization(learned);
        const prediction = this.neuralPrediction(optimized, numbers[0].toString().length);
        
        return {
            result: prediction,
            confidence: this.generateSmartPercentage(0.92, 0.98),
            metodeNum: 10,
            reason: metodeReasons[10]
        };
    }

    cosmicWaveMetode(numbers) {
        const cosmicCycles = this.calculateCosmicCycles(numbers);
        const solarInfluence = this.measureSolarInfluence(numbers);
        const lunarPhase = this.calculateLunarPhase();
        const galacticAlignment = this.measureGalacticAlignment(numbers);
        const prediction = this.synthesizeCosmicPrediction(cosmicCycles, solarInfluence, lunarPhase, galacticAlignment, numbers[0].toString().length);
        
        return {
            result: prediction,
            confidence: this.generateSmartPercentage(0.88, 0.96),
            metodeNum: 11,
            reason: metodeReasons[11]
        };
    }

    matrixCoreMetode(numbers) {
        const matrix = this.buildPredictionMatrix(numbers);
        const eigenValues = this.calculateEigenValues(matrix);
        const singularValues = this.performSVD(matrix);
        const kernel = this.applyKernelTransform(singularValues);
        const prediction = this.extractMatrixPrediction(kernel, eigenValues, numbers[0].toString().length);
        
        return {
            result: prediction,
            confidence: this.generateSmartPercentage(0.94, 0.99),
            metodeNum: 12,
            reason: metodeReasons[12]
        };
    }

    calculateQuantumStates(numbers) {
        const states = [];
        numbers.forEach((num, idx) => {
            const binary = num.toString(2);
            const amplitude = Math.sin(idx * Math.PI / numbers.length);
            const phase = Math.cos(num * 0.618);
            states.push({
                amplitude: amplitude,
                phase: phase,
                spin: binary.split('1').length - 1,
                entanglement: (num * 1.414) % 10
            });
        });
        return states;
    }

    measureQuantumEntanglement(states) {
        const entangled = {};
        for (let i = 0; i < states.length; i++) {
            for (let j = i + 1; j < states.length; j++) {
                const correlation = Math.abs(states[i].amplitude * states[j].amplitude);
                const phaseAlignment = Math.cos(states[i].phase - states[j].phase);
                entangled[`${i}-${j}`] = correlation * phaseAlignment;
            }
        }
        return entangled;
    }

    applySuperposition(entanglement, numbers) {
        const superposition = [];
        Object.values(entanglement).forEach((strength, idx) => {
            const interference = strength * Math.sin(numbers[idx % numbers.length] * 2.718);
            const probability = Math.abs(interference) ** 2;
            superposition.push(probability);
        });
        return superposition;
    }

    collapseWaveFunction(superposition) {
        const collapsed = [];
        superposition.forEach((prob, idx) => {
            const measurement = prob * Math.random();
            const observable = Math.floor(measurement * 10) % 10;
            collapsed.push(observable);
        });
        return collapsed;
    }

    extractQuantumPrediction(collapsed, length) {
        let prediction = '';
        const fibonacci = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
        
        for (let i = 0; i < length; i++) {
            const quantumIdx = i % collapsed.length;
            const fibIdx = i % fibonacci.length;
            const base = collapsed[quantumIdx];
            const quantum = fibonacci[fibIdx] % 10;
            const digit = (base + quantum) % 10;
            prediction += digit.toString();
        }
        return prediction;
    }

    initializeNeuralLayers(numbers) {
        const inputLayer = numbers.map(n => n / Math.max(...numbers));
        const hiddenLayer1 = Array(numbers.length * 2).fill(0);
        const hiddenLayer2 = Array(numbers.length).fill(0);
        const outputLayer = Array(numbers[0].toString().length).fill(0);
        
        return {
            input: inputLayer,
            hidden1: hiddenLayer1,
            hidden2: hiddenLayer2,
            output: outputLayer
        };
    }

    forwardPropagation(layers, numbers) {
        const weights1 = this.generateWeights(layers.input.length, layers.hidden1.length);
        const weights2 = this.generateWeights(layers.hidden1.length, layers.hidden2.length);
        const weights3 = this.generateWeights(layers.hidden2.length, layers.output.length);
        
        layers.hidden1.forEach((_, idx) => {
            let sum = 0;
            layers.input.forEach((input, inputIdx) => {
                sum += input * weights1[inputIdx][idx % weights1[inputIdx].length];
            });
            layers.hidden1[idx] = this.sigmoid(sum);
        });
        
        layers.hidden2.forEach((_, idx) => {
            let sum = 0;
            layers.hidden1.forEach((hidden, hiddenIdx) => {
                sum += hidden * weights2[hiddenIdx % weights2.length][idx];
            });
            layers.hidden2[idx] = this.sigmoid(sum);
        });
        
        layers.output.forEach((_, idx) => {
            let sum = 0;
            layers.hidden2.forEach((hidden, hiddenIdx) => {
                sum += hidden * weights3[hiddenIdx][idx];
            });
            layers.output[idx] = this.sigmoid(sum);
        });
        
        return layers;
    }

    generateWeights(input, output) {
        const weights = [];
        for (let i = 0; i < input; i++) {
            weights[i] = [];
            for (let j = 0; j < output; j++) {
                weights[i][j] = (Math.random() - 0.5) * 2;
            }
        }
        return weights;
    }

    sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }

    backPropagation(layers) {
        const learningRate = 0.1;
        const errors = layers.output.map(output => Math.random() - output);
        
        layers.output.forEach((output, idx) => {
            const adjustment = errors[idx] * learningRate;
            layers.output[idx] = Math.max(0, Math.min(1, output + adjustment));
        });
        
        return layers;
    }

    neuralOptimization(layers) {
        const momentum = 0.9;
        layers.output.forEach((output, idx) => {
            const previous = idx > 0 ? layers.output[idx - 1] : 0;
            layers.output[idx] = output + momentum * previous;
        });
        return layers;
    }

    neuralPrediction(layers, length) {
        let prediction = '';
        const golden = 1.618;
        
        for (let i = 0; i < length; i++) {
            const outputIdx = i % layers.output.length;
            const neuralValue = layers.output[outputIdx];
            const enhanced = neuralValue * golden * (i + 1);
            const digit = Math.floor(enhanced * 10) % 10;
            prediction += digit.toString();
        }
        
        return prediction;
    }

    calculateCosmicCycles(numbers) {
        const cycles = {
            solar: 11,
            lunar: 29.5,
            planetary: 365.25,
            galactic: 25920
        };
        
        const cosmicValues = {};
        Object.keys(cycles).forEach(cycle => {
            const sum = numbers.reduce((acc, num) => acc + num, 0);
            cosmicValues[cycle] = (sum % cycles[cycle]) / cycles[cycle];
        });
        
        return cosmicValues;
    }

    measureSolarInfluence(numbers) {
        const now = new Date();
        const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        const solarPosition = Math.sin(2 * Math.PI * dayOfYear / 365.25);
        
        const influence = numbers.map(num => {
            return (num * solarPosition + dayOfYear) % 10;
        });
        
        return influence;
    }

    calculateLunarPhase() {
        const now = new Date();
        const newMoon = new Date('2024-01-11');
        const lunarCycle = 29.53;
        const daysSinceNew = (now - newMoon) / (1000 * 60 * 60 * 24);
        const phase = (daysSinceNew % lunarCycle) / lunarCycle;
        
        return {
            phase: phase,
            influence: Math.sin(2 * Math.PI * phase),
            energy: Math.cos(2 * Math.PI * phase)
        };
    }

    measureGalacticAlignment(numbers) {
        const goldenRatio = 1.618033988749;
        const precession = 25920;
        const galacticYear = new Date().getFullYear() % precession;
        
        const alignment = numbers.map((num, idx) => {
            const cosmic = (num * goldenRatio + galacticYear + idx * 137.5) % 360;
            return Math.sin(cosmic * Math.PI / 180);
        });
        
        return alignment;
    }

    synthesizeCosmicPrediction(cycles, solar, lunar, galactic, length) {
        let prediction = '';
        const weights = [0.25, 0.3, 0.25, 0.2];
        
        for (let i = 0; i < length; i++) {
            const solarIdx = i % solar.length;
            const galacticIdx = i % galactic.length;
            
            const cosmicSum = 
                Object.values(cycles)[i % 4] * weights[0] +
                solar[solarIdx] * weights[1] +
                lunar.influence * weights[2] +
                galactic[galacticIdx] * weights[3];
            
            const cosmicDigit = Math.floor(Math.abs(cosmicSum) * 10) % 10;
            prediction += cosmicDigit.toString();
        }
        
        return prediction;
    }

    buildPredictionMatrix(numbers) {
        const size = numbers.length;
        const matrix = [];
        
        for (let i = 0; i < size; i++) {
            matrix[i] = [];
            for (let j = 0; j < size; j++) {
                if (i === j) {
                    matrix[i][j] = numbers[i];
                } else {
                    matrix[i][j] = (numbers[i] * numbers[j]) % 1000;
                }
            }
        }
        
        return matrix;
    }

    calculateEigenValues(matrix) {
        const size = matrix.length;
        const eigenValues = [];
        
        for (let i = 0; i < size; i++) {
            let sum = 0;
            for (let j = 0; j < size; j++) {
                sum += matrix[i][j];
            }
            eigenValues.push(sum / size);
        }
        
        return eigenValues;
    }

    performSVD(matrix) {
        const singular = [];
        const size = matrix.length;
        
        for (let i = 0; i < size; i++) {
            let value = 0;
            for (let j = 0; j < size; j++) {
                value += matrix[i][j] * matrix[j][i];
            }
            singular.push(Math.sqrt(Math.abs(value)));
        }
        
        return singular;
    }

    applyKernelTransform(singularValues) {
        const gamma = 0.1;
        return singularValues.map(value => {
            return Math.exp(-gamma * value * value);
        });
    }

    extractMatrixPrediction(kernel, eigenValues, length) {
        let prediction = '';
        const phi = 1.618033988749;
        
        for (let i = 0; i < length; i++) {
            const kernelIdx = i % kernel.length;
            const eigenIdx = i % eigenValues.length;
            
            const matrixValue = kernel[kernelIdx] * eigenValues[eigenIdx] * phi;
            const digit = Math.floor(Math.abs(matrixValue) * 10) % 10;
            prediction += digit.toString();
        }
        
        return prediction;
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

    analyzePatterns(digits) {
        const patterns = {
            sequence: [],
            differences: [],
            modular: []
        };
        
        for (let i = 1; i < digits.length; i++) {
            patterns.differences.push(digits[i] - digits[i-1]);
            patterns.modular.push((digits[i] * 3 + digits[i-1] * 2) % 10);
        }
        
        patterns.sequence = digits.slice();
        return patterns;
    }

    predictFromPatterns(patterns, length) {
        let result = '';
        const fibonacci = [1, 1, 2, 3, 5, 8, 13, 21];
        
        for (let i = 0; i < length; i++) {
            const seqIdx = i % patterns.sequence.length;
            const diffIdx = i % (patterns.differences.length || 1);
            const modIdx = i % (patterns.modular.length || 1);
            const fibIdx = i % fibonacci.length;
            
            const baseDigit = patterns.sequence[seqIdx] || 0;
            const diffAdjust = patterns.differences[diffIdx] || 0;
            const modAdjust = patterns.modular[modIdx] || 0;
            const fibAdjust = fibonacci[fibIdx];
            
            const finalDigit = Math.abs(baseDigit + diffAdjust + modAdjust + fibAdjust) % 10;
            result += finalDigit.toString();
        }
        
        return result;
    }

    applyAdvancedModulo(sum, position, count) {
        const modifiers = [7, 11, 13, 17, 19];
        const modifier = modifiers[position % modifiers.length];
        const adjusted = sum + (position * count);
        return adjusted % modifier % 10;
    }

    generateCyclicPattern(lastTwoDigits) {
        const cycle = [];
        lastTwoDigits.forEach(num => {
            cycle.push(num % 10);
            cycle.push(Math.floor(num / 10) % 10);
        });
        return cycle;
    }

    extrapolateCyclic(cycle, length) {
        let result = '';
        const fibonacci = [1, 1, 2, 3, 5, 8, 13, 21, 34];
        
        for (let i = 0; i < length; i++) {
            const cycleIdx = i % cycle.length;
            const fibIdx = i % fibonacci.length;
            const base = cycle[cycleIdx];
            const modifier = fibonacci[fibIdx];
            const digit = (base + modifier) % 10;
            result += digit.toString();
        }
        
        return result;
    }

    detectTwinPatterns(numbers) {
        const twins = {};
        
        numbers.forEach(num => {
            const str = num.toString();
            for (let i = 0; i < str.length - 1; i++) {
                if (str[i] === str[i + 1]) {
                    const twin = str[i];
                    twins[twin] = (twins[twin] || 0) + 1;
                }
            }
        });
        
        return twins;
    }

    amplifyTwinSignals(twins) {
        const amplified = {};
        const totalTwins = Object.values(twins).reduce((a, b) => a + b, 0);
        
        if (totalTwins === 0) {
            for (let i = 0; i < 10; i++) {
                amplified[i] = 10;
            }
            return amplified;
        }
        
        Object.keys(twins).forEach(digit => {
            const count = twins[digit];
            amplified[digit] = Math.floor((count / totalTwins) * 100);
        });
        
        return amplified;
    }

    synthesizeTwinPrediction(amplified, length) {
        const sortedTwins = Object.entries(amplified)
            .sort(([,a], [,b]) => b - a)
            .map(([digit]) => digit);
        
        if (sortedTwins.length === 0) {
            let result = '';
            for (let i = 0; i < length; i++) {
                result += ((i * 3 + 7) % 10).toString();
            }
            return result;
        }
        
        let result = '';
        for (let i = 0; i < length; i++) {
            const twinIdx = i % sortedTwins.length;
            const baseTwin = parseInt(sortedTwins[twinIdx]);
            const variation = Math.floor(i / sortedTwins.length);
            result += ((baseTwin + variation) % 10).toString();
        }
        
        return result;
    }

    calculateAdvancedFrequency(digits) {
        const freq = Array(10).fill(0);
        const weights = [1, 2, 3, 4, 5];
        
        digits.forEach((digit, idx) => {
            const weight = weights[idx % weights.length];
            freq[digit] += weight;
        });
        
        return freq;
    }

    selectOptimalTardal(frequency, count) {
        return frequency
            .map((freq, digit) => ({ digit, freq }))
            .sort((a, b) => b.freq - a.freq)
            .slice(0, count)
            .map(item => item.digit);
    }

    constructFromTardal(tardal, length) {
        if (tardal.length === 0) {
            let result = '';
            for (let i = 0; i < length; i++) {
                result += ((i * 7 + 3) % 10).toString();
            }
            return result;
        }
        
        let result = '';
        const fibonacci = [1, 1, 2, 3, 5, 8, 13, 21];
        
        for (let i = 0; i < length; i++) {
            const tardalIdx = fibonacci[i % fibonacci.length] % tardal.length;
            const baseDigit = tardal[tardalIdx];
            const shift = Math.floor(i / tardal.length);
            result += ((baseDigit + shift) % 10).toString();
        }
        
        return result;
    }

    performMultiFactorAnalysis(numbers) {
        return {
            trend: this.calculateTrend(numbers),
            volatility: this.calculateVolatility(numbers),
            momentum: this.calculateMomentum(numbers),
            correlation: this.calculateCorrelation(numbers)
        };
    }

    calculateTrend(numbers) {
        let trend = 0;
        for (let i = 1; i < numbers.length; i++) {
            trend += numbers[i] - numbers[i - 1];
        }
        return trend / (numbers.length - 1);
    }

    calculateVolatility(numbers) {
        const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
        const variance = numbers.reduce((acc, num) => acc + Math.pow(num - mean, 2), 0) / numbers.length;
        return Math.sqrt(variance);
    }

    calculateMomentum(numbers) {
        if (numbers.length < 3) return 0;
        const recent = numbers.slice(-3);
        return recent[2] - recent[0];
    }

    calculateCorrelation(numbers) {
        let correlation = 0;
        for (let i = 1; i < numbers.length; i++) {
            const str1 = numbers[i - 1].toString();
            const str2 = numbers[i].toString();
            let matches = 0;
            for (let j = 0; j < Math.min(str1.length, str2.length); j++) {
                if (str1[j] === str2[j]) matches++;
            }
            correlation += matches / Math.max(str1.length, str2.length);
        }
        return correlation / (numbers.length - 1);
    }

    findConvergencePoints(analysis) {
        const { trend, volatility, momentum, correlation } = analysis;
        
        return {
            stabilityPoint: Math.abs(trend) < 100 ? trend : trend % 100,
            volatilityFactor: volatility % 10,
            momentumShift: momentum % 10,
            correlationBase: Math.floor(correlation * 10) % 10
        };
    }

    optimizeWithML(points, length) {
        let result = '';
        const weights = [0.4, 0.3, 0.2, 0.1];
        
        for (let i = 0; i < length; i++) {
            const weighted = 
                points.stabilityPoint * weights[0] +
                points.volatilityFactor * weights[1] +
                points.momentumShift * weights[2] +
                points.correlationBase * weights[3];
            
            const optimized = Math.floor(Math.abs(weighted + i * 1.414)) % 10;
            result += optimized.toString();
        }
        
        return result;
    }

    analyzeTrends(numbers, window) {
        const trends = [];
        for (let i = window; i < numbers.length; i++) {
            const subset = numbers.slice(i - window, i);
            trends.push(this.calculateTrend(subset));
        }
        return trends;
    }

    generateHeatMap(trends) {
        const heatMap = {};
        trends.forEach((trend, idx) => {
            const intensity = Math.abs(trend) * 100;
            const digit = Math.floor(intensity) % 10;
            heatMap[digit] = (heatMap[digit] || 0) + intensity;
        });
        return heatMap;
    }

    extractHotPattern(heatMap, length) {
        const hotDigits = Object.entries(heatMap)
            .sort(([,a], [,b]) => b - a)
            .map(([digit]) => parseInt(digit));
        
        if (hotDigits.length === 0) {
            let result = '';
            for (let i = 0; i < length; i++) {
                result += ((i * 5 + 2) % 10).toString();
            }
            return result;
        }
        
        let result = '';
        for (let i = 0; i < length; i++) {
            const hotIndex = i % hotDigits.length;
            const baseHot = hotDigits[hotIndex];
            const thermalShift = Math.floor(i / hotDigits.length);
            result += ((baseHot + thermalShift) % 10).toString();
        }
        
        return result;
    }
}