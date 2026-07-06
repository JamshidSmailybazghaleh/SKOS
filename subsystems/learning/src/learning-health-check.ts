/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Build : BUILD-000131
 * Sprint: Sprint 19
 *
 * Module : Learning Health Check
 * Version: 0.0.1
 * Status : Foundation
 * ==========================================================
 */

import { LearningMemory } from "./learning-memory";

export interface LearningHealthStatus {

    healthy: boolean;

    totalRecords: number;

    checkedAt: number;

}

export class LearningHealthCheck {

    constructor(

        private readonly memory: LearningMemory

    ) {}

    /**
     * Execute health check.
     */
    public check(): LearningHealthStatus {

        const totalRecords =
            this.memory.count();

        return {

            healthy:
                totalRecords >= 0,

            totalRecords,

            checkedAt:
                Date.now()

        };

    }

}
