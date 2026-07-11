/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Migration Engine
 * Module    : Migration Scanner
 *
 * Build     : BUILD-000191
 * Version   : 1.0.0
 * ==========================================================
 */

import { MigrationJob } from "./migration-job";

/**
 * Scanned file metadata.
 */
export interface ScannedFile {

    /**
     * Full file path.
     */
    path: string;

    /**
     * File name.
     */
    name: string;

    /**
     * File size in bytes.
     */
    size: number;

    /**
     * Last modification date.
     */
    modifiedAt: Date;

    /**
     * MIME type (if available).
     */
    mimeType?: string;

}

/**
 * Migration scanner.
 */
export class MigrationScanner {

    /**
     * Scan one migration job.
     *
     * Version 1.0:
     * Placeholder implementation.
     */
    public scan(
        job: MigrationJob
    ): ScannedFile[] {

        void job;

        /*
         * Future implementation:
         *
         * - Traverse directories
         * - Read metadata
         * - Detect duplicates
         * - Compute SHA-256
         * - Classify file types
         */

        return [];

    }

  }
