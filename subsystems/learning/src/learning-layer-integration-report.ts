/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Build : BUILD-000135
 * Sprint: Sprint 19
 *
 * Module : Learning Layer Integration Report
 * Version: 0.0.1
 * Status : Integration
 * ==========================================================
 */

import { LearningMemory } from "./learning-memory";
import { AdaptiveOptimizationEngine } from "./adaptive-optimization-engine";

export interface IntegrationReport {

    passed: boolean;

    generatedAt: number;

    totalLearningRecords: number;

    optimizationReady: boolean;

    remarks: string[];

}

export class LearningLayerIntegrationReport {

    constructor(

        private readonly memory: LearningMemory,

        private readonly optimizer: AdaptiveOptimizationEngine

    ) {}

    /**
     * Generate integration report.
     */
    public generate(): IntegrationReport {

        const optimization =
            this.optimizer.optimize();

        const remarks: string[] = [];

        if (this.memory.count() === 0) {

            remarks.push(
                "Learning Memory contains no records."
            );

        }

        if (!optimization.optimized) {

            remarks.push(
                "Adaptive Optimization has no processed records."
            );

        }

        return {

            passed:
                remarks.length === 0,

            generatedAt:
                Date.now(),

            totalLearningRecords:
                this.memory.count(),

            optimizationReady:
                optimization.optimized,

            remarks

        };

    }

}
