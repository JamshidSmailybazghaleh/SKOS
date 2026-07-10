/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Integration Runtime
 * Module    : SKOS Runtime
 *
 * Build     : BUILD-000186
 * Version   : 1.0.0
 * ==========================================================
 */

import { PipelineContext } from "./pipeline-context";
import { PipelineOrchestrator } from "./pipeline-orchestrator";
import {
    RuntimeReport,
    RuntimeReportGenerator
} from "./runtime-report";

export class SKOSRuntime {

    private readonly orchestrator =
        new PipelineOrchestrator();

    private readonly reportGenerator =
        new RuntimeReportGenerator();

    /**
     * Register a pipeline processor.
     */
    public register(processor: any): void {

        this.orchestrator.register(processor);

    }

    /**
     * Execute the SKOS pipeline.
     */
    public async run(
        context: PipelineContext
    ): Promise<RuntimeReport> {

        context.startedAt = new Date();

        await this.orchestrator.execute(context);

        context.finishedAt = new Date();

        return this.reportGenerator.generate(context);

    }

    /**
     * Pipeline execution history.
     */
    public getStageStates() {

        return this.orchestrator.getStageStates();

    }

}
