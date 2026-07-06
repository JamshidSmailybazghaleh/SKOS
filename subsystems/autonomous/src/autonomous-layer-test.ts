/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Build : BUILD-000120
 * Sprint: Sprint 17
 *
 * Autonomous Layer Integration Test
 * ==========================================================
 */

import { GoalManager } from "./goal-manager";
import { TaskScheduler } from "./task-scheduler";
import { AgentMemoryCoordinator } from "./agent-memory-coordinator";
import { AutonomousWorkflowEngine } from "./autonomous-workflow-engine";
import { Planner } from "../../reasoning/src/planner";

export class AutonomousLayerIntegrationTest {

    public run(): boolean {

        const goals = new GoalManager();

        goals.add({

            id: "goal-001",

            title: "Build SKOS",

            priority: 100,

            completed: false

        });

        const tasks = new TaskScheduler();

        tasks.schedule({

            id: "task-001",

            goalId: "goal-001",

            title: "Initialize project",

            priority: 100,

            completed: false

        });

        const memory =

            new AgentMemoryCoordinator();

        memory.save({

            agentId: "agent-001",

            goalId: "goal-001",

            context: [

                "Initialization"

            ]

        });

        const planner = new Planner();

        const workflow =

            new AutonomousWorkflowEngine(

                goals,

                tasks,

                memory,

                planner

            );

        const result =

            workflow.execute();

        return (

            result.success &&

            goals.getAll().length === 1 &&

            tasks.getTasks().length === 1 &&

            memory.getAll().length === 1

        );

    }

}
