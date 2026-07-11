/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Synchronization Engine
 * Module    : Sync Runtime
 *
 * Build     : BUILD-000194
 * Version   : 1.0.0
 * ==========================================================
 */

import { SyncSource } from "./sync-source";
import {
    ChangeDetector
} from "./change-detector";
import {
    SyncEngine,
    SyncResult
} from "./sync-engine";
import {
    SyncReport,
    SyncReportGenerator
} from "./sync-report";

export interface SyncRuntimeResult {

    result: SyncResult;

    report: SyncReport;

}

export class SyncRuntime {

    private readonly detector =
        new ChangeDetector();

    private readonly engine =
        new SyncEngine(this.detector);

    private readonly reportGenerator =
        new SyncReportGenerator();

    /**
     * Execute synchronization runtime.
     */
    public execute(
        source: SyncSource
    ): SyncRuntimeResult {

        const startedAt = new Date();

        const result =
            this.engine.synchronize(source);

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
