/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Agent Orchestrator
 * Module    : Task Dispatcher
 *
 * Build     : BUILD-000077
 * Sprint    : Sprint 09
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import { AgentTask } from "./agent-orchestrator";

export type TargetEngine =
    | "intake"
    | "knowledge"
    | "reasoning"
    | "learning"
    | "memory"
    | "planning"
    | "decision";

export interface DispatchResult {

    success: boolean;

    target: TargetEngine;

    taskId: string;

}

export class TaskDispatcher {

    /**
     * Dispatch a task to a target engine.
     */
    public dispatch(

        task: AgentTask,

        target: TargetEngine

    ): DispatchResult {

        return {

            success: true,

            target,

            taskId: task.id

        };

    }

}
