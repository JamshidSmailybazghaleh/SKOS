/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Build : BUILD-000134
 * Sprint: Sprint 19
 *
 * Module : Learning Layer Stress Test
 * Version: 0.0.1
 * Status : Foundation
 * ==========================================================
 */

import { LearningMemory } from "./learning-memory";

export interface StressTestResult {

    success: boolean;

    recordsCreated: number;

    durationMs: number;

}

export class LearningLayerStressTest {

    constructor(

        private readonly memory: LearningMemory

    ) {}

    /**
     * Execute stress test.
     */
    public run(
        iterations: number = 1000
    ): StressTestResult {

        const startedAt = Date.now();

        for (let i = 0; i < iterations; i++) {

            this.memory.store({

                id: `lr-${i}`,

                category: "stress",

                content: `Stress Record ${i}`,

                confidence: 1.0,

                timestamp: Date.now()

            });

        }

        const finishedAt = Date.now();

        return {

            success:
                this.memory.count() === iterations,

            recordsCreated:
                this.memory.count(),

            durationMs:
                finishedAt - startedAt

        };

    }

}
