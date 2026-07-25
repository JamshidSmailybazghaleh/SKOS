/*
====================================================
SKOS Mission Control

Workflow Orchestrator

File:
workflow-orchestrator.js

Operation:
OP-005

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const WorkflowOrchestrator = {

    version: "1.0",

    initialized: false,

    engines: [],

    async initialize() {

        Logger.info(
            "Workflow Orchestrator Initializing..."
        );

        this.engines = [

            "RegistryEngine",

            "AssetRegistry",

            "ProductPipeline",

            "PublicationEngine",

            "RevenuePipeline"

        ];

        this.initialized = true;

        Logger.info(
            "Workflow Orchestrator Ready."
        );

        return true;

    },

    async execute(workflowName, payload = {}) {

        Logger.info(
            "Workflow Started : " + workflowName
        );

        const workflow =
            await WorkflowEngine.get(workflowName);

        if (!workflow) {

            Logger.error(
                "Workflow Not Found."
            );

            return false;

        }

        for (const step of workflow.steps) {

            Logger.info(
                "Executing : " + step
            );

            const success =
                await WorkflowService.executeStep(
                    step,
                    payload
                );

            if (!success) {

                Logger.error(
                    "Workflow Failed At : " + step
                );

                WorkflowHistory.add(
                    workflowName,
                    step,
                    "FAILED"
                );

                return false;

            }

            WorkflowHistory.add(
                workflowName,
                step,
                "SUCCESS"
            );

        }

        Logger.info(
            "Workflow Completed : " + workflowName
        );

        return true;

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(WorkflowOrchestrator);
