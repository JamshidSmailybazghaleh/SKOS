/*
====================================================
SKOS Mission Control

Workflow Engine

BUILD-000369

Version:
1.0.0

Status:
ACTIVE
====================================================
*/

const WorkflowEngine = {

    workflows: new Map(),

    running: new Map(),

    async initialize() {

        Logger.info(
            "Workflow Engine Initializing..."
        );

        return true;

    },

    register(workflow) {

        if (!workflow.id) {

            throw new Error(
                "Workflow ID Required."
            );

        }

        this.workflows.set(

            workflow.id,

            workflow

        );

    },

    async start(workflowId) {

        const workflow =

            this.workflows.get(workflowId);

        if (!workflow) {

            throw new Error(
                "Workflow Not Found."
            );

        }

        this.running.set(

            workflowId,

            "RUNNING"

        );

        Logger.info(

            "Workflow Started: " +

            workflowId

        );

        for (const task of workflow.tasks) {

            await TaskOrchestratorEngine.submit(task);

        }

        await TaskOrchestratorEngine.execute();

        this.running.set(

            workflowId,

            "COMPLETED"

        );

        AuditService.record(

            "WORKFLOW_COMPLETED",

            workflow

        );

        return true;

    },

    status(workflowId) {

        return this.running.get(

            workflowId

        );

    }

};

window.WorkflowEngine =
    WorkflowEngine;

Object.freeze(
    WorkflowEngine
);
