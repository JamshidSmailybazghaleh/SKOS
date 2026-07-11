/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Agent Framework
 * Module    : Agent Runtime
 *
 * Build     : BUILD-000190
 * Version   : 1.0.0
 * ==========================================================
 */

import { Agent } from "./agent";
import { AgentContext } from "./agent-context";
import { AgentTask } from "./agent-task";
import {
    AgentEngine,
    AgentExecutionResult
} from "./agent-engine";
import {
    AgentReport,
    AgentReportGenerator
} from "./agent-report";

export interface AgentRuntimeResult {

    execution: AgentExecutionResult;

    report: AgentReport;

}

export class AgentRuntime {

    private readonly engine =
        new AgentEngine();

    private readonly reportGenerator =
        new AgentReportGenerator();

    /**
     * Execute one agent runtime.
     */
    public execute(
        agent: Agent,
        context: AgentContext,
        tasks: AgentTask[]
    ): AgentRuntimeResult {

        const execution =
            this.engine.execute(
                agent,
                context,
                tasks
            );

        const report =
            this.reportGenerator.generate(
                execution
            );

        return {

            execution,

            report

        };

    }

}
