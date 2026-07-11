/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Synchronization Engine
 * Module    : Sync Report
 *
 * Build     : BUILD-000194
 * Version   : 1.0.0
 * ==========================================================
 */

import { SyncResult } from "./sync-engine";

/**
 * Synchronization report.
 */
export interface SyncReport {

    /**
     * Source identifier.
     */
    sourceId: string;

    /**
     * Synchronization start time.
     */
    startedAt: Date;

    /**
     * Synchronization finish time.
     */
    finishedAt: Date;

    /**
     * Execution duration (ms).
     */
    durationMs: number;

    /**
     * Detected changes.
     */
    detectedChanges: number;

    /**
     * Applied changes.
     */
    appliedChanges: number;

    /**
     * Skipped changes.
     */
    skippedChanges: number;

    /**
     * Success rate.
     */
    successRate: number;

}

/**
 * Synchronization report generator.
 */
export class SyncReportGenerator {

    /**
     * Generate report.
     */
    public generate(
        result: SyncResult,
        startedAt: Date,
        finishedAt: Date
    ): SyncReport {

        const durationMs =
            finishedAt.getTime() -
            startedAt.getTime();

        const successRate =
            result.detectedChanges === 0
                ? 1
                : result.appliedChanges /
                  result.detectedChanges;

        return {

            sourceId: result.sourceId,

            startedAt,

            finishedAt,

            durationMs,

            detectedChanges:
                result.detectedChanges,

            appliedChanges:
                result.appliedChanges,

            skippedChanges:
                result.skippedChanges,

            successRate

        };

    }

}
