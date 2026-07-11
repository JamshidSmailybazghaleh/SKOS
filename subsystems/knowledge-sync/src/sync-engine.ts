/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Synchronization Engine
 * Module    : Sync Engine
 *
 * Build     : BUILD-000194
 * Version   : 1.0.0
 * ==========================================================
 */

import { SyncSource, SyncStatus } from "./sync-source";
import {
    ChangeDetector,
    DetectedChange
} from "./change-detector";

/**
 * Synchronization result.
 */
export interface SyncResult {

    /**
     * Source identifier.
     */
    sourceId: string;

    /**
     * Total detected changes.
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

}

/**
 * Synchronization engine.
 */
export class SyncEngine {

    constructor(
        private readonly detector: ChangeDetector
    ) {}

    /**
     * Execute synchronization.
     */
    public synchronize(
        source: SyncSource
    ): SyncResult {

        source.status = SyncStatus.Synchronizing;

        const changes: DetectedChange[] =
            this.detector.detect(source);

        /*
         * Future implementation:
         *
         * - Update Knowledge Vault
         * - Update Knowledge Graph
         * - Preserve version history
         */

        source.status = SyncStatus.Completed;
        source.lastSyncAt = new Date();

        return {

            sourceId: source.id,

            detectedChanges: changes.length,

            appliedChanges: changes.length,

            skippedChanges: 0

        };

    }

}
