/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Agent Framework
 * Module    : Agent Report
 *
 * Build     : BUILD-000190
 * Version   : 1.0.0
 * ==========================================================
 */

import { AgentExecutionResult } from "./agent-engine";

export interface AgentReport {

    agentId: string;

    startedAt: Date;

    finishedAt: Date;

    durationMs: number;

    executedTasks: number;

    completedTasks: number;

    failedTasks: number;

    successRate: number;

}

export class AgentReportGenerator {

    /**
     * Generate execution report.
     */
    public generate(
        execution: AgentExecutionResult
    ): AgentReport {

        const durationMs =
            execution.finishedAt.getTime() -
            execution.startedAt.getTime();

        const successRate =
            execution.executedTasks === 0
                ? 0
                : execution.completedTasks /
                  execution.executedTasks;

        return {

            agentId: execution.agentId,

            startedAt: execution.startedAt,

            finishedAt: execution.finishedAt,

            durationMs,

            executedTasks:
                execution.executedTasks,

            completedTasks:
                execution.completedTasks,

            failedTasks:
                execution.failedTasks,

            successRate

        };

    }

}
