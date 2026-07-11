/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Migration Engine
 * Module    : Migration Report
 *
 * Build     : BUILD-000191
 * Version   : 1.0.0
 * ==========================================================
 */

import { MigrationResult } from "./migration-engine";

export interface MigrationReport {

    jobId: string;

    startedAt: Date;

    finishedAt: Date;

    durationMs: number;

    scannedFiles: number;

    preparedFiles: number;

    skippedFiles: number;

    successRate: number;

}

export class MigrationReportGenerator {

    /**
     * Generate migration report.
     */
    public generate(
        result: MigrationResult,
        startedAt: Date,
        finishedAt: Date
    ): MigrationReport {

        const durationMs =
            finishedAt.getTime() -
            startedAt.getTime();

        const successRate =
            result.scannedFiles === 0
                ? 0
                : result.preparedFiles /
                  result.scannedFiles;

        return {

            jobId: result.jobId,

            startedAt,

            finishedAt,

            durationMs,

            scannedFiles:
                result.scannedFiles,

            preparedFiles:
                result.preparedFiles,

            skippedFiles:
                result.skippedFiles,

            successRate

        };

    }

}
