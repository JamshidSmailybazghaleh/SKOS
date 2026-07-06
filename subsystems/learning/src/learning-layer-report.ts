/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Build : BUILD-000132
 * Sprint: Sprint 19
 *
 * Module : Learning Layer Report
 * Version: 0.0.1
 * Status : Foundation
 * ==========================================================
 */

import { LearningMemory } from "./learning-memory";
import { AdaptiveOptimizationEngine } from "./adaptive-optimization-engine";

export interface LearningLayerReport {

    generatedAt: number;

    totalLearningRecords: number;

    optimizationEnabled: boolean;

    recordsProcessed: number;

    status: "HEALTHY" | "WARNING";

}

export class LearningLayerReportGenerator {

    constructor(

        private readonly memory: LearningMemory,

        private readonly optimizer: AdaptiveOptimizationEngine

    ) {}

    /**
     * Generate learning layer report.
     */
    public generate(): LearningLayerReport {

        const optimization =
            this.optimizer.optimize();

        return {

            generatedAt: Date.now(),

            totalLearningRecords:
                this.memory.count(),

            optimizationEnabled:
                optimization.optimized,

            recordsProcessed:
                optimization.recordsProcessed,

            status:
                optimization.optimized
                    ? "HEALTHY"
                    : "WARNING"

        };

    }

}
