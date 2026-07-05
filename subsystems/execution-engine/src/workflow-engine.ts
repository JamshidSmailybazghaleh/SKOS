/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Execution Engine
 * Module    : Workflow Engine
 *
 * Build     : BUILD-000082
 * Sprint    : Sprint 10
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import { ExecutionTask } from "./execution-engine";

export interface Workflow {

    id: string;

    name: string;

    tasks: ExecutionTask[];

}

export interface WorkflowResult {

    workflowId: string;

    totalTasks: number;

    ready: boolean;

}

export class WorkflowEngine {

    /**
     * Build an executable workflow.
     */
    public createWorkflow(

        id: string,

        name: string,

        tasks: ExecutionTask[]

    ): WorkflowResult {

        const orderedTasks = [...tasks].sort((a, b) =>
            a.id.localeCompare(b.id)
        );

        return {

            workflowId: id,

            totalTasks: orderedTasks.length,

            ready: orderedTasks.length > 0

        };

    }

}
