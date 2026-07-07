/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Workflow Orchestrator
 * Module    : Workflow Engine
 *
 * Build     : BUILD-000164
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import {
    DefaultWorkflow,
    WorkflowStage,
    WorkflowState
} from "./workflow-stage";

import {
    WorkflowContext
} from "./workflow-context";

import {
    WorkflowResult,
    WorkflowResultBuilder,
    WorkflowResultType
} from "./workflow-result";

/**
 * Workflow execution engine.
 */
export class WorkflowEngine {

    /**
     * Execute workflow.
     */
    public execute(

        context: WorkflowContext

    ): WorkflowResult {

        const builder =

            new WorkflowResultBuilder();

        const startedAt =

            Date.now();

        context.state =

            WorkflowState.Running;

        let errorCount = 0;

        let warningCount = 0;

        for (const stage of DefaultWorkflow) {

            const stageStarted = Date.now();

            context.currentStage =

                stage.stage;

            context.updatedAt =

                stageStarted;

            try {

                /**
                 * Future:
                 * Execute stage handler.
                 */

                builder.addStage({

                    stage: stage.stage,

                    state: WorkflowState.Completed,

                    message: `${stage.title} completed.`,

                    startedAt: stageStarted,

                    completedAt: Date.now()

                });

            } catch {

                errorCount++;

                context.state =

                    WorkflowState.Failed;

                builder.addStage({

                    stage: stage.stage,

                    state: WorkflowState.Failed,

                    message: `${stage.title} failed.`,

                    startedAt: stageStarted,

                    completedAt: Date.now()

                });

                break;

            }

        }

        if (

            context.state !==

            WorkflowState.Failed

        ) {

            context.state =

                WorkflowState.Completed;

            context.currentStage =

                WorkflowStage.Completed;

        }

        return builder.build(

            context.workflowId,

            context.assetId,

            errorCount === 0

                ? WorkflowResultType.Success

                : WorkflowResultType.Failed,

            errorCount,

            warningCount,

            startedAt

        );

    }

}
