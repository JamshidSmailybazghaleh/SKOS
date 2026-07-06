/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Build : BUILD-000133
 * Sprint: Sprint 19
 *
 * Module : Learning Performance Benchmark
 * Version: 0.0.1
 * Status : Foundation
 * ==========================================================
 */

import { LearningMemory } from "./learning-memory";
import { AdaptiveOptimizationEngine } from "./adaptive-optimization-engine";

export interface BenchmarkResult {

    executionTimeMs: number;

    processedRecords: number;

    optimized: boolean;

    timestamp: number;

}

export class LearningPerformanceBenchmark {

    constructor(

        private readonly memory: LearningMemory,

        private readonly optimizer: AdaptiveOptimizationEngine

    ) {}

    /**
     * Execute benchmark.
     */
    public run(): BenchmarkResult {

        const start =
            Date.now();

        const result =
            this.optimizer.optimize();

        const end =
            Date.now();

        return {

            executionTimeMs:
                end - start,

            processedRecords:
                result.recordsProcessed,

            optimized:
                result.optimized,

            timestamp:
                end

        };

    }

}
