/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Import Pipeline
 * Module    : Import Report
 *
 * Build     : BUILD-000193
 * Version   : 1.0.0
 * ==========================================================
 */

export interface ImportReport {

    /**
     * Import job identifier.
     */
    jobId: string;

    /**
     * Number of processed files.
     */
    processedFiles: number;

    /**
     * Successfully imported knowledge objects.
     */
    importedObjects: number;

    /**
     * Skipped files.
     */
    skippedFiles: number;

    /**
     * Failed files.
     */
    failedFiles: number;

    /**
     * Success rate.
     */
    successRate: number;

    /**
     * Start time.
     */
    startedAt: Date;

    /**
     * Finish time.
     */
    finishedAt: Date;

    /**
     * Execution duration.
     */
    durationMs: number;

}

/**
 * Import report generator.
 */
export class ImportReportGenerator {

    public generate(

        jobId: string,

        processedFiles: number,

        importedObjects: number,

        skippedFiles: number,

        failedFiles: number,

        startedAt: Date,

        finishedAt: Date

    ): ImportReport {

        const durationMs =
            finishedAt.getTime() -
            startedAt.getTime();

        const successRate =
            processedFiles === 0
                ? 0
                : importedObjects /
                  processedFiles;

        return {

            jobId,

            processedFiles,

            importedObjects,

            skippedFiles,

            failedFiles,

            successRate,

            startedAt,

            finishedAt,

            durationMs

        };

    }

}
