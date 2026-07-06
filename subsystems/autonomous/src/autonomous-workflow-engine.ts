/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Autonomous
 * Module    : Autonomous Workflow Engine
 *
 * Build     : BUILD-000119
 * Sprint    : Sprint 17
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import { GoalManager } from "./goal-manager";
import { TaskScheduler } from "./task-scheduler";
import { AgentMemoryCoordinator } from "./agent-memory-coordinator";
import { Planner } from "../../reasoning/src/planner";

export interface WorkflowResult {

    success: boolean;

    message: string;

}

export class AutonomousWorkflowEngine {

    constructor(

        private readonly goals: GoalManager,

        private readonly tasks: TaskScheduler,

        private readonly memory: AgentMemoryCoordinator,

        private readonly planner: Planner

    ) {}

    /**
     * Execute workflow.
     */
    public execute(): WorkflowResult {

        const goal = this.goals.getAll()[0];

        if (!goal) {

            return {

                success: false,

                message: "No goal available."

            };

        }

        const plan = this.planner.createPlan(

            goal.title

        );

        return {

            success: true,

            message:

                `Workflow initialized for goal: ${plan.goal}`

        };

    }

}
