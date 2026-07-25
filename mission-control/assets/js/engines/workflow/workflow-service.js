/*
====================================================
SKOS Mission Control

Workflow Service

File:
workflow-service.js

Operation:
OP-005

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const WorkflowService = {

    initialized: false,

    async initialize() {

        Logger.info(
            "Workflow Service Initializing..."
        );

        this.initialized = true;

        Logger.info(
            "Workflow Service Ready."
        );

        return true;

    },

    async executeStep(step, payload = {}) {

        Logger.info(
            "Executing Step : " + step
        );

        switch (step) {

            case "RegistryEngine":
                return await RegistryEngine.initialize();

            case "AssetRegistry":
                return await AssetRegistry.initialize();

            case "ProductPipeline":
                return await ProductPipeline.initialize();

            case "PublicationEngine":
                return await PublicationEngine.initialize();

            case "RevenuePipeline":
                return await RevenuePipeline.initialize();

            default:

                Logger.error(
                    "Unknown Workflow Step : " + step
                );

                return false;

        }

    },

    async executeWorkflow(workflow) {

        if (!workflow || !workflow.steps) {

            Logger.error(
                "Invalid Workflow."
            );

            return false;

        }

        for (const step of workflow.steps) {

            const result =
                await this.executeStep(step);

            if (!result) {

                return false;

            }

        }

        return true;

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(WorkflowService);
