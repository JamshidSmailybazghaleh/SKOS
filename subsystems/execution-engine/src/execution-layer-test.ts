/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Execution Engine
 *
 * Build     : BUILD-000085
 * Sprint    : Sprint 10
 * Version   : 0.0.1
 *
 * Status    : Integration Test
 * ==========================================================
 */

import {
    ExecutionEngine
} from "./execution-engine";

import {
    WorkflowEngine
} from "./workflow-engine";

import {
    StateManager
} from "./state-manager";

import {
    ExecutionMonitor
} from "./execution-monitor";

export class ExecutionLayerTest {

    public run(): boolean {

        const workflowEngine = new WorkflowEngine();

        const executionEngine = new ExecutionEngine();

        const stateManager = new StateManager();

        const monitor = new ExecutionMonitor();

        const task = {

            id: "TASK-001",

            name: "Execution Test"

        };

        const workflow = workflowEngine.createWorkflow(

            "WF-001",

            "Integration Workflow",

            [task]

        );

        if (!workflow.ready) {

            return false;

        }

        stateManager.setState(

            task.id,

            "RUNNING"

        );

        const execution = executionEngine.execute(task);

        if (!execution.success) {

            return false;

        }

        stateManager.setState(

            task.id,

            "COMPLETED"

        );

        const snapshot = monitor.snapshot(

            stateManager.getAllStates()

        );

        return (

            snapshot.completed === 1 &&

            snapshot.total === 1

        );

    }

}
