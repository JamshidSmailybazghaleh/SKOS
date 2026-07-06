/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Learning
 * Module    : Adaptive Optimization Engine
 *
 * Build     : BUILD-000129
 * Sprint    : Sprint 19
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import { LearningMemory } from "./learning-memory";

export interface OptimizationResult {

    optimized: boolean;

    recordsProcessed: number;

}

export class AdaptiveOptimizationEngine {

    constructor(

        private readonly memory: LearningMemory

    ) {}

    /**
     * Execute optimization.
     */
    public optimize(): OptimizationResult {

        const records =

            this.memory.getAll();

        return {

            optimized:

                records.length > 0,

            recordsProcessed:

                records.length

        };

    }

}
