/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Migration Engine
 * Module    : Migration Runtime
 *
 * Build     : BUILD-000191
 * Version   : 1.0.0
 * ==========================================================
 */

import { MigrationJob } from "./migration-job";
import { MigrationScanner } from "./migration-scanner";
import {
    MigrationEngine,
    MigrationResult
} from "./migration-engine";
import {
    MigrationReport,
    MigrationReportGenerator
} from "./migration-report";

export interface MigrationRuntimeResult {

    result: MigrationResult;

    report: MigrationReport;

}

export class MigrationRuntime {

    private readonly scanner =
        new MigrationScanner();

    private readonly engine =
        new MigrationEngine(this.scanner);

    private readonly reportGenerator =
        new MigrationReportGenerator();

    /**
     * Execute one migration job.
     */
    public execute(
        job: MigrationJob
    ): MigrationRuntimeResult {

        const startedAt = new Date();

        const result =
            this.engine.execute(job);

        const finishedAt = new Date();

        const report =
            this.reportGenerator.generate(
                result,
                startedAt,
                finishedAt
            );

        return {

            result,

            report

        };

    }

              }
