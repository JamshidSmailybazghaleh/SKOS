/*
====================================================
SKOS Mission Control

Workflow Engine

File:
workflow-engine.js

Operation:
OP-005

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const WorkflowEngine = {

    initialized: false,

    workflows: {},

    async initialize() {

        Logger.info(
            "Workflow Engine Initializing..."
        );

        this.registerDefaults();

        this.initialized = true;

        Logger.info(
            "Workflow Engine Ready."
        );

        return true;

    },

    registerDefaults() {

        this.workflows["NEW_KNOWLEDGE"] = {

            id: "NEW_KNOWLEDGE",

            title: "New Knowledge Workflow",

            steps: [

                "RegistryEngine",

                "AssetRegistry",

                "ProductPipeline",

                "PublicationEngine",

                "RevenuePipeline"

            ]

        };

    },

    register(workflow) {

        if (!workflow || !workflow.id) {

            Logger.error(
                "Invalid Workflow."
            );

            return false;

        }

        this.workflows[workflow.id] = workflow;

        Logger.info(
            "Workflow Registered : " +
            workflow.id
        );

        return true;

    },

    async get(workflowId) {

        return this.workflows[workflowId] || null;

    },

    getAll() {

        return Object.values(this.workflows);

    },

    remove(workflowId) {

        delete this.workflows[workflowId];

        Logger.info(
            "Workflow Removed : " +
            workflowId
        );

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(WorkflowEngine);
