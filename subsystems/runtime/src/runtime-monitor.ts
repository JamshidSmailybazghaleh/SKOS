/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Runtime Foundation
 * Module    : Runtime Monitor
 *
 * Build     : BUILD-000195
 * Version   : 1.0.0
 * ==========================================================
 */

import { RuntimeState } from "./runtime-kernel";

/**
 * Runtime metrics.
 */
export interface RuntimeMetrics {

    /**
     * Current runtime state.
     */
    state: RuntimeState;

    /**
     * Number of registered services.
     */
    serviceCount: number;

    /**
     * Number of scheduled tasks.
     */
    taskCount: number;

    /**
     * Runtime start time.
     */
    startedAt: Date;

    /**
     * Last health check.
     */
    lastHealthCheck: Date;

}

/**
 * Runtime monitor.
 */
export class RuntimeMonitor {

    /**
     * Create runtime metrics.
     */
    public collect(

        state: RuntimeState,

        serviceCount: number,

        taskCount: number,

        startedAt: Date

    ): RuntimeMetrics {

        return {

            state,

            serviceCount,

            taskCount,

            startedAt,

            lastHealthCheck:
                new Date()

        };

    }

}
