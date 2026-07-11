/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Synchronization Engine
 * Module    : Change Detector
 *
 * Build     : BUILD-000194
 * Version   : 1.0.0
 * ==========================================================
 */

import { SyncSource } from "./sync-source";

/**
 * Type of detected change.
 */
export enum ChangeType {

    New = "new",

    Modified = "modified",

    Deleted = "deleted",

    Unchanged = "unchanged"

}

/**
 * One detected change.
 */
export interface DetectedChange {

    /**
     * File identifier.
     */
    id: string;

    /**
     * File path.
     */
    path: string;

    /**
     * Change type.
     */
    type: ChangeType;

    /**
     * Optional checksum.
     */
    checksum?: string;

    /**
     * Detection time.
     */
    detectedAt: Date;

}

/**
 * Change detector.
 */
export class ChangeDetector {

    /**
     * Detect changes.
     *
     * Version 1.0
     * Placeholder implementation.
     */
    public detect(
        source: SyncSource
    ): DetectedChange[] {

        void source;

        /*
         * Future implementation:
         *
         * - Compare SHA-256
         * - Compare timestamps
         * - Compare file size
         * - Compare metadata
         * - Detect deleted files
         */

        return [];

    }

}
