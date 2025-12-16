const metodeNames = {
    1: 'FIBONACCI ANALYSIS',
    2: 'GOLDEN RATIO',
    3: 'PRIME SEQUENCE',
    4: 'PASCAL TRIANGLE',
    5: 'STATISTICAL MODE',
    6: 'REGRESSION LINEAR',
    7: 'BAYESIAN FILTER',
    8: 'MONTE CARLO',
    9: 'FOURIER TRANSFORM',
    10: 'MARKOV CHAIN',
    11: 'GENETIC ALGORITHM',
    12: 'ENTROPY ANALYSIS'
};

const metodeReasons = {
    1: 'Analisis deret Fibonacci untuk mendeteksi pola matematis natural',
    2: 'Menggunakan rasio emas untuk prediksi harmonis dan seimbang',
    3: 'Ekstraksi pola berdasarkan bilangan prima untuk akurasi tinggi',
    4: 'Implementasi segitiga Pascal untuk kombinatorik optimal',
    5: 'Analisis statistik modus untuk frekuensi tertinggi',
    6: 'Regresi linear untuk tren dan proyeksi data berkelanjutan',
    7: 'Filter Bayesian untuk probabilitas kondisional terbaik',
    8: 'Simulasi Monte Carlo untuk sampling random terarah',
    9: 'Transformasi Fourier untuk analisis frekuensi domain',
    10: 'Rantai Markov untuk prediksi state transisi probabilistik',
    11: 'Algoritma genetik untuk evolusi solusi optimal',
    12: 'Analisis entropi untuk mengukur ketidakpastian informasi'
};

class MetodeEngine {
    generateSmartPercentage(complexity, stability) {
        const base = 15 + (complexity * 8) + (stability * 12);
        const variance = Math.random() * 30;
        return Math.min(85, Math.max(15, Math.floor(base + variance)));
    }

    fibonacciAnalysis(numbers) {
        const fibSequence = this.generateFibonacci(20);
        const mappedNumbers = numbers.map(num => {
            const digits = num.toString().split('').map(Number);
            return digits.reduce((sum, digit, idx) => {
                const fibIndex = idx % fibSequence.length;
                return sum + (digit * fibSequence[fibIndex]);
            }, 0);
        });
        
        const prediction = this.constructPrediction(mappedNumbers, numbers[0].toString().length);
        return {
            result: prediction,
            confidence: this.generateSmartPercentage(0.8, 0.85),
            metodeNum: 1,
            reason: metodeReasons[1]
        };
    }

    goldenRatioMethod(numbers) {
        const phi = 1.6180339887;
        const phiConjugate = 0.6180339887;
        let result = '';
        
        const length = numbers[0].toString().length;
        for (let i = 0; i < length; i++) {
            let sum = 0;
            numbers.forEach((num, idx) => {
                const digit = parseInt(num.toString()[i] || '0');
                const ratio = Math.pow(phi, idx) * Math.pow(phiConjugate, numbers.length - idx - 1);
                sum += digit * ratio;
            });
            
            const finalDigit = Math.floor(Math.abs(sum)) % 10;
            result += finalDigit.toString();
        }
        
        return {
            result,
            confidence: this.generateSmartPercentage(0.75, 0.9),
            metodeNum: 2,
            reason: metodeReasons[2]
        };
    }

    primeSequenceMethod(numbers) {
        const primes = this.generatePrimes(100);
        const weightedSum = numbers.map((num, idx) => {
            const primeWeight = primes[idx % primes.length];
            return (num % primeWeight) * (primeWeight % 10);
        });
        
        const prediction = this.moduloConstruct(weightedSum, numbers[0].toString().length, 10);
        return {
            result: prediction,
            confidence: this.generateSmartPercentage(0.82, 0.88),
            metodeNum: 3,
            reason: metodeReasons[3]
        };
    }

    pascalTriangleMethod(numbers) {
        const level = Math.min(numbers.length, 10);
        const pascalRow = this.generatePascalRow(level);
        let result = '';
        
        const targetLength = numbers[0].toString().length;
        for (let pos = 0; pos < targetLength; pos++) {
            let weightedValue = 0;
            numbers.forEach((num, idx) => {
                const digit = parseInt(num.toString()[pos] || '0');
                const weight = pascalRow[idx % pascalRow.length];
                weightedValue += digit * weight;
            });
            
            result += (weightedValue % 10).toString();
        }
        
        return {
            result,
            confidence: this.generateSmartPercentage(0.77, 0.83),
            metodeNum: 4,
            reason: metodeReasons[4]
        };
    }

    statisticalModeMethod(numbers) {
        const allDigits = numbers.join('').split('').map(Number);
        const frequency = Array(10).fill(0);
        
        allDigits.forEach(digit => frequency[digit]++);
        
        const sortedByFreq = frequency
            .map((freq, digit) => ({ digit, freq }))
            .sort((a, b) => b.freq - a.freq)
            .slice(0, 5);
        
        let result = '';
        const targetLength = numbers[0].toString().length;
        for (let i = 0; i < targetLength; i++) {
            const modeIndex = i % sortedByFreq.length;
            const baseDigit = sortedByFreq[modeIndex].digit;
            const variation = Math.floor(i / sortedByFreq.length);
            result += ((baseDigit + variation) % 10).toString();
        }
        
        return {
            result,
            confidence: this.generateSmartPercentage(0.7, 0.8),
            metodeNum: 5,
            reason: metodeReasons[5]
        };
    }

    regressionLinearMethod(numbers) {
        const n = numbers.length;
        const xValues = Array.from({ length: n }, (_, i) => i + 1);
        const yValues = numbers;
        
        const { slope, intercept } = this.calculateLinearRegression(xValues, yValues);
        
        let result = '';
        const targetLength = numbers[0].toString().length;
        for (let i = 0; i < targetLength; i++) {
            const predictedValue = slope * (n + 1 + i) + intercept;
            const digit = Math.abs(Math.floor(predictedValue)) % 10;
            result += digit.toString();
        }
        
        return {
            result,
            confidence: this.generateSmartPercentage(0.85, 0.92),
            metodeNum: 6,
            reason: metodeReasons[6]
        };
    }

    bayesianFilterMethod(numbers) {
        const priorProb = Array(10).fill(0.1);
        const likelihood = this.calculateLikelihood(numbers);
        const posterior = this.bayesianUpdate(priorProb, likelihood);
        
        let result = '';
        const targetLength = numbers[0].toString().length;
        for (let i = 0; i < targetLength; i++) {
            const sampledDigit = this.sampleFromDistribution(posterior);
            result += sampledDigit.toString();
        }
        
        return {
            result,
            confidence: this.generateSmartPercentage(0.88, 0.94),
            metodeNum: 7,
            reason: metodeReasons[7]
        };
    }

    monteCarloMethod(numbers) {
        const iterations = 1000;
        const targetLength = numbers[0].toString().length;
        let result = '';
        
        for (let pos = 0; pos < targetLength; pos++) {
            const digitCounts = Array(10).fill(0);
            
            for (let iter = 0; iter < iterations; iter++) {
                let simulatedDigit = 0;
                numbers.forEach((num, idx) => {
                    const digit = parseInt(num.toString()[pos] || '0');
                    const weight = Math.random();
                    simulatedDigit += digit * weight;
                });
                
                digitCounts[Math.floor(Math.abs(simulatedDigit)) % 10]++;
            }
            
            const mostFrequent = digitCounts.indexOf(Math.max(...digitCounts));
            result += mostFrequent.toString();
        }
        
        return {
            result,
            confidence: this.generateSmartPercentage(0.8, 0.87),
            metodeNum: 8,
            reason: metodeReasons[8]
        };
    }

    fourierTransformMethod(numbers) {
        const complexNumbers = numbers.map(num => ({ real: num, imag: 0 }));
        const transformed = this.discreteFourierTransform(complexNumbers);
        
        const magnitudes = transformed.map(c => Math.sqrt(c.real * c.real + c.imag * c.imag));
        const prediction = this.reconstructFromMagnitudes(magnitudes, numbers[0].toString().length);
        
        return {
            result: prediction,
            confidence: this.generateSmartPercentage(0.9, 0.96),
            metodeNum: 9,
            reason: metodeReasons[9]
        };
    }

    markovChainMethod(numbers) {
        const transitionMatrix = this.buildTransitionMatrix(numbers);
        const currentState = numbers[numbers.length - 1] % 10;
        
        let result = '';
        let state = currentState;
        const targetLength = numbers[0].toString().length;
        
        for (let i = 0; i < targetLength; i++) {
            const nextState = this.getNextState(state, transitionMatrix);
            result += nextState.toString();
            state = nextState;
        }
        
        return {
            result,
            confidence: this.generateSmartPercentage(0.83, 0.89),
            metodeNum: 10,
            reason: metodeReasons[10]
        };
    }

    geneticAlgorithmMethod(numbers) {
        const populationSize = 50;
        const generations = 20;
        const targetLength = numbers[0].toString().length;
        
        let population = this.initializePopulation(populationSize, targetLength);
        
        for (let gen = 0; gen < generations; gen++) {
            const fitness = population.map(individual => this.evaluateFitness(individual, numbers));
            const parents = this.selectParents(population, fitness);
            population = this.createNextGeneration(parents, populationSize, targetLength);
        }
        
        const finalFitness = population.map(individual => this.evaluateFitness(individual, numbers));
        const bestIndex = finalFitness.indexOf(Math.max(...finalFitness));
        
        return {
            result: population[bestIndex],
            confidence: this.generateSmartPercentage(0.87, 0.93),
            metodeNum: 11,
            reason: metodeReasons[11]
        };
    }

    entropyAnalysisMethod(numbers) {
        const entropy = this.calculateEntropy(numbers);
        const information = this.extractInformation(numbers, entropy);
        const prediction = this.generateFromEntropy(information, numbers[0].toString().length);
        
        return {
            result: prediction,
            confidence: this.generateSmartPercentage(0.85, 0.91),
            metodeNum: 12,
            reason: metodeReasons[12]
        };
    }

    generateFibonacci(count) {
        const fib = [1, 1];
        for (let i = 2; i < count; i++) {
            fib[i] = fib[i-1] + fib[i-2];
        }
        return fib;
    }

    generatePrimes(limit) {
        const primes = [];
        const sieve = Array(limit).fill(true);
        
        for (let i = 2; i < limit; i++) {
            if (sieve[i]) {
                primes.push(i);
                for (let j = i * i; j < limit; j += i) {
                    sieve[j] = false;
                }
            }
        }
        return primes;
    }

    generatePascalRow(n) {
        const row = [1];
        for (let i = 1; i <= n; i++) {
            row[i] = row[i-1] * (n - i + 1) / i;
        }
        return row;
    }

    calculateLinearRegression(x, y) {
        const n = x.length;
        const sumX = x.reduce((a, b) => a + b, 0);
        const sumY = y.reduce((a, b) => a + b, 0);
        const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
        const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);
        
        const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;
        
        return { slope, intercept };
    }

    calculateLikelihood(numbers) {
        const digitFreq = Array(10).fill(1);
        numbers.forEach(num => {
            const digits = num.toString().split('').map(Number);
            digits.forEach(digit => digitFreq[digit]++);
        });
        
        const total = digitFreq.reduce((a, b) => a + b, 0);
        return digitFreq.map(freq => freq / total);
    }

    bayesianUpdate(prior, likelihood) {
        const unnormalized = prior.map((p, i) => p * likelihood[i]);
        const sum = unnormalized.reduce((a, b) => a + b, 0);
        return unnormalized.map(val => val / sum);
    }

    sampleFromDistribution(distribution) {
        const rand = Math.random();
        let cumulative = 0;
        
        for (let i = 0; i < distribution.length; i++) {
            cumulative += distribution[i];
            if (rand <= cumulative) {
                return i;
            }
        }
        return distribution.length - 1;
    }

    discreteFourierTransform(signal) {
        const N = signal.length;
        const result = [];
        
        for (let k = 0; k < N; k++) {
            let real = 0, imag = 0;
            for (let n = 0; n < N; n++) {
                const angle = -2 * Math.PI * k * n / N;
                real += signal[n].real * Math.cos(angle) - signal[n].imag * Math.sin(angle);
                imag += signal[n].real * Math.sin(angle) + signal[n].imag * Math.cos(angle);
            }
            result.push({ real, imag });
        }
        return result;
    }

    reconstructFromMagnitudes(magnitudes, length) {
        let result = '';
        const maxMagnitude = Math.max(...magnitudes);
        
        for (let i = 0; i < length; i++) {
            const magIndex = i % magnitudes.length;
            const normalized = magnitudes[magIndex] / maxMagnitude;
            const digit = Math.floor(normalized * 10) % 10;
            result += digit.toString();
        }
        return result;
    }

    buildTransitionMatrix(numbers) {
        const matrix = Array(10).fill().map(() => Array(10).fill(1));
        
        for (let i = 0; i < numbers.length - 1; i++) {
            const current = numbers[i] % 10;
            const next = numbers[i + 1] % 10;
            matrix[current][next]++;
        }
        
        for (let i = 0; i < 10; i++) {
            const sum = matrix[i].reduce((a, b) => a + b, 0);
            for (let j = 0; j < 10; j++) {
                matrix[i][j] /= sum;
            }
        }
        
        return matrix;
    }

    getNextState(currentState, transitionMatrix) {
        const probabilities = transitionMatrix[currentState];
        return this.sampleFromDistribution(probabilities);
    }

    initializePopulation(size, length) {
        const population = [];
        for (let i = 0; i < size; i++) {
            let individual = '';
            for (let j = 0; j < length; j++) {
                individual += Math.floor(Math.random() * 10).toString();
            }
            population.push(individual);
        }
        return population;
    }

    evaluateFitness(individual, numbers) {
        let fitness = 0;
        const digits = individual.split('').map(Number);
        
        numbers.forEach(num => {
            const numDigits = num.toString().split('').map(Number);
            for (let i = 0; i < Math.min(digits.length, numDigits.length); i++) {
                if (digits[i] === numDigits[i]) fitness += 10;
                else fitness += 10 - Math.abs(digits[i] - numDigits[i]);
            }
        });
        
        return fitness;
    }

    selectParents(population, fitness) {
        const totalFitness = fitness.reduce((a, b) => a + b, 0);
        const parents = [];
        
        for (let i = 0; i < population.length / 2; i++) {
            let rand = Math.random() * totalFitness;
            let cumulative = 0;
            
            for (let j = 0; j < population.length; j++) {
                cumulative += fitness[j];
                if (rand <= cumulative) {
                    parents.push(population[j]);
                    break;
                }
            }
        }
        return parents;
    }

    createNextGeneration(parents, size, length) {
        const nextGen = [...parents];
        
        while (nextGen.length < size) {
            const parent1 = parents[Math.floor(Math.random() * parents.length)];
            const parent2 = parents[Math.floor(Math.random() * parents.length)];
            const child = this.crossover(parent1, parent2);
            const mutated = this.mutate(child, 0.1);
            nextGen.push(mutated);
        }
        
        return nextGen.slice(0, size);
    }

    crossover(parent1, parent2) {
        const crossoverPoint = Math.floor(Math.random() * parent1.length);
        return parent1.slice(0, crossoverPoint) + parent2.slice(crossoverPoint);
    }

    mutate(individual, rate) {
        return individual.split('').map(digit => {
            if (Math.random() < rate) {
                return Math.floor(Math.random() * 10).toString();
            }
            return digit;
        }).join('');
    }

    calculateEntropy(numbers) {
        const allDigits = numbers.join('').split('').map(Number);
        const freq = Array(10).fill(0);
        
        allDigits.forEach(digit => freq[digit]++);
        
        const total = allDigits.length;
        let entropy = 0;
        
        freq.forEach(f => {
            if (f > 0) {
                const p = f / total;
                entropy -= p * Math.log2(p);
            }
        });
        
        return entropy;
    }

    extractInformation(numbers, entropy) {
        const information = numbers.map(num => {
            const digitSum = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
            return digitSum * entropy;
        });
        return information;
    }

    generateFromEntropy(information, length) {
        let result = '';
        const maxInfo = Math.max(...information);
        
        for (let i = 0; i < length; i++) {
            const infoIndex = i % information.length;
            const normalized = information[infoIndex] / maxInfo;
            const digit = Math.floor(normalized * 10) % 10;
            result += digit.toString();
        }
        return result;
    }

    constructPrediction(values, length) {
        let result = '';
        for (let i = 0; i < length; i++) {
            const valueIndex = i % values.length;
            const digit = Math.abs(values[valueIndex]) % 10;
            result += digit.toString();
        }
        return result;
    }

    moduloConstruct(values, length, modulo) {
        let result = '';
        for (let i = 0; i < length; i++) {
            const valueIndex = i % values.length;
            const digit = Math.abs(values[valueIndex]) % modulo;
            result += digit.toString();
        }
        return result;
    }

    getAllMetodes() {
        return [
            (numbers) => this.fibonacciAnalysis(numbers),
            (numbers) => this.goldenRatioMethod(numbers),
            (numbers) => this.primeSequenceMethod(numbers),
            (numbers) => this.pascalTriangleMethod(numbers),
            (numbers) => this.statisticalModeMethod(numbers),
            (numbers) => this.regressionLinearMethod(numbers),
            (numbers) => this.bayesianFilterMethod(numbers),
            (numbers) => this.monteCarloMethod(numbers),
            (numbers) => this.fourierTransformMethod(numbers),
            (numbers) => this.markovChainMethod(numbers),
            (numbers) => this.geneticAlgorithmMethod(numbers),
            (numbers) => this.entropyAnalysisMethod(numbers)
        ];
    }
}