/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Workflow Orchestrator
 * Module    : Workflow Result
 *
 * Build     : BUILD-000164
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import {
    WorkflowStage,
    WorkflowState
} from "./workflow-stage";

/**
 * Workflow execution result.
 */
export enum WorkflowResultType {

    Success = "success",

    PartialSuccess = "partial-success",

    Failed = "failed",

    Cancelled = "cancelled"

}

/**
 * Stage execution record.
 */
export interface WorkflowStageResult {

    /**
     * Workflow stage.
     */
    stage: WorkflowStage;

    /**
     * Stage state.
     */
    state: WorkflowState;

    /**
     * Execution message.
     */
    message: string;

    /**
     * Execution started.
     */
    startedAt: number;

    /**
     * Execution completed.
     */
    completedAt: number;

}

/**
 * Final workflow result.
 */
export interface WorkflowResult {

    /**
     * Workflow identifier.
     */
    workflowId: string;

    /**
     * Asset identifier.
     */
    assetId: string;

    /**
     * Overall result.
     */
    result: WorkflowResultType;

    /**
     * Executed stages.
     */
    stages: WorkflowStageResult[];

    /**
     * Total execution time (ms).
     */
    duration: number;

    /**
     * Error count.
     */
    errorCount: number;

    /**
     * Warning count.
     */
    warningCount: number;

    /**
     * Workflow finished at.
     */
    completedAt: number;

}

/**
 * Workflow result builder.
 */
export class WorkflowResultBuilder {

    private readonly stages: WorkflowStageResult[] = [];

    /**
     * Register stage result.
     */
    public addStage(
        result: WorkflowStageResult
    ): void {

        this.stages.push(result);

    }

    /**
     * Build workflow result.
     */
    public build(

        workflowId: string,

        assetId: string,

        result: WorkflowResultType,

        errorCount: number,

        warningCount: number,

        startedAt: number

    ): WorkflowResult {

        const completedAt = Date.now();

        return {

            workflowId,

            assetId,

            result,

            stages: [...this.stages],

            duration: completedAt - startedAt,

            errorCount,

            warningCount,

            completedAt

        };

    }

}
