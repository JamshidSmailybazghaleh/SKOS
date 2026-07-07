/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Workflow Orchestrator
 * Module    : Workflow Orchestrator
 *
 * Build     : BUILD-000164
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import {
    WorkflowEngine
} from "./workflow-engine";

import {
    WorkflowContext
} from "./workflow-context";

import {
    WorkflowResult
} from "./workflow-result";

/**
 * Workflow Orchestrator.
 */
export class WorkflowOrchestrator {

    /**
     * Workflow execution engine.
     */
    private readonly engine =
        new WorkflowEngine();

    /**
     * Active workflow registry.
     */
    private readonly activeWorkflows =
        new Map<string, WorkflowContext>();

    /**
     * Completed workflow history.
     */
    private readonly completedResults:
        WorkflowResult[] = [];

    /**
     * Register a workflow.
     */
    public register(
        context: WorkflowContext
    ): void {

        this.activeWorkflows.set(
            context.workflowId,
            context
        );

    }

    /**
     * Execute one workflow.
     */
    public execute(
        workflowId: string
    ): WorkflowResult | undefined {

        const context =
            this.activeWorkflows.get(workflowId);

        if (!context) {

            return undefined;

        }

        const result =
            this.engine.execute(context);

        this.completedResults.push(result);

        this.activeWorkflows.delete(workflowId);

        return result;

    }

    /**
     * Execute every pending workflow.
     */
    public executeAll(): WorkflowResult[] {

        const results: WorkflowResult[] = [];

        const ids = Array.from(
            this.activeWorkflows.keys()
        );

        for (const workflowId of ids) {

            const result =
                this.execute(workflowId);

            if (result) {

                results.push(result);

            }

        }

        return results;

    }

    /**
     * Get active workflows.
     */
    public active(): WorkflowContext[] {

        return Array.from(
            this.activeWorkflows.values()
        );

    }

    /**
     * Get completed workflows.
     */
    public history(): WorkflowResult[] {

        return [
            ...this.completedResults
        ];

    }

    /**
     * Find workflow.
     */
    public find(
        workflowId: string
    ): WorkflowContext | undefined {

        return this.activeWorkflows.get(
            workflowId
        );

    }

    /**
     * Remove workflow.
     */
    public remove(
        workflowId: string
    ): boolean {

        return this.activeWorkflows.delete(
            workflowId
        );

    }

    /**
     * Clear execution history.
     */
    public clearHistory(): void {

        this.completedResults.length = 0;

    }

}
