/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Integration Runtime
 * Module    : Pipeline Orchestrator
 *
 * Build     : BUILD-000186
 * Version   : 1.0.0
 * ==========================================================
 */

import { PipelineContext } from "./pipeline-context";
import {
    PipelineStage,
    PipelineStageState,
    PipelineStageStatus
} from "./pipeline-stage";

export interface PipelineProcessor {

    readonly stage: PipelineStage;

    execute(
        context: PipelineContext
    ): Promise<void>;

}

export class PipelineOrchestrator {

    private readonly processors: PipelineProcessor[] = [];

    private readonly states: PipelineStageState[] = [];

    /**
     * Register a pipeline processor.
     */
    public register(
        processor: PipelineProcessor
    ): void {

        this.processors.push(processor);

    }

    /**
     * Execute the complete pipeline.
     */
    public async execute(
        context: PipelineContext
    ): Promise<void> {

        for (const processor of this.processors) {

            const state: PipelineStageState = {

                stage: processor.stage,

                status: PipelineStageStatus.Running,

                startedAt: new Date()

            };

            this.states.push(state);

            try {

                await processor.execute(context);

                state.status =
                    PipelineStageStatus.Completed;

            } catch (error) {

                state.status =
                    PipelineStageStatus.Failed;

                state.error =
                    error instanceof Error
                        ? error.message
                        : String(error);

                context.errors.push(state.error);

                break;

            } finally {

                state.finishedAt = new Date();

            }

        }

    }

    /**
     * Execution history.
     */
    public getStageStates():
        readonly PipelineStageState[] {

        return this.states;

    }

}
