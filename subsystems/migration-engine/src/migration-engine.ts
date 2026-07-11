/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Migration Engine
 * Module    : Migration Engine
 *
 * Build     : BUILD-000191
 * Version   : 1.0.0
 * ==========================================================
 */

import { MigrationJob, MigrationJobStatus } from "./migration-job";
import { MigrationScanner, ScannedFile } from "./migration-scanner";

export interface MigrationResult {

    /**
     * Job identifier.
     */
    jobId: string;

    /**
     * Number of scanned files.
     */
    scannedFiles: number;

    /**
     * Files prepared for import.
     */
    preparedFiles: number;

    /**
     * Files skipped.
     */
    skippedFiles: number;

}

export class MigrationEngine {

    constructor(
        private readonly scanner: MigrationScanner
    ) {}

    /**
     * Execute one migration job.
     */
    public execute(
        job: MigrationJob
    ): MigrationResult {

        job.status = MigrationJobStatus.Running;
        job.startedAt = new Date();

        const scannedFiles: ScannedFile[] =
            this.scanner.scan(job);

        /*
         * Version 1.0
         * Placeholder for:
         * - Validation
         * - Duplicate detection
         * - Import preparation
         */

        job.status = MigrationJobStatus.Completed;
        job.completedAt = new Date();

        return {

            jobId: job.id,

            scannedFiles: scannedFiles.length,

            preparedFiles: scannedFiles.length,

            skippedFiles: 0

        };

    }

}
