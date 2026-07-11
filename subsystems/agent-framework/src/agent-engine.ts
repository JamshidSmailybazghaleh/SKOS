/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Agent Framework
 * Module    : Agent Engine
 *
 * Build     : BUILD-000190
 * Version   : 1.0.0
 * ==========================================================
 */

import { Agent, AgentStatus } from "./agent";
import {
    AgentTask,
    AgentTaskStatus
} from "./agent-task";
import { AgentContext } from "./agent-context";

export interface AgentExecutionResult {

    agentId: string;

    executedTasks: number;

    completedTasks: number;

    failedTasks: number;

    startedAt: Date;

    finishedAt: Date;

}

export class AgentEngine {

    /**
     * Execute tasks for one agent.
     */
    public execute(
        agent: Agent,
        context: AgentContext,
        tasks: AgentTask[]
    ): AgentExecutionResult {

        const startedAt = new Date();

        agent.status = AgentStatus.Running;

        let completedTasks = 0;
        let failedTasks = 0;

        for (const task of tasks) {

            try {

                task.status = AgentTaskStatus.Running;

                /*
                 * Version 1.0
                 * Placeholder for task execution.
                 * Future versions will dispatch
                 * the task to specialized executors.
                 */

                void context;

                task.status = AgentTaskStatus.Completed;
                task.completedAt = new Date();

                completedTasks++;

            } catch {

                task.status = AgentTaskStatus.Failed;

                failedTasks++;

            }

        }

        agent.status =
            failedTasks === 0
                ? AgentStatus.Completed
                : AgentStatus.Failed;

        return {

            agentId: agent.id,

            executedTasks: tasks.length,

            completedTasks,

            failedTasks,

            startedAt,

            finishedAt: new Date()

        };

    }

}
