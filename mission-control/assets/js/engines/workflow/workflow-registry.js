/*
====================================================
SKOS Mission Control

Workflow Registry

File:
workflow-registry.js

Operation:
OP-005

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const WorkflowRegistry = {

    initialized: false,

    registry: new Map(),

    async initialize() {

        Logger.info(
            "Workflow Registry Initializing..."
        );

        this.registry.clear();

        this.initialized = true;

        Logger.info(
            "Workflow Registry Ready."
        );

        return true;

    },

    register(workflow) {

        if (!workflow || !workflow.id) {

            Logger.error(
                "Invalid Workflow Registration."
            );

            return false;

        }

        this.registry.set(
            workflow.id,
            workflow
        );

        Logger.info(
            "Workflow Registered : " +
            workflow.id
        );

        return true;

    },

    get(workflowId) {

        return this.registry.get(workflowId) || null;

    },

    exists(workflowId) {

        return this.registry.has(workflowId);

    },

    remove(workflowId) {

        if (!this.registry.has(workflowId)) {

            Logger.warn(
                "Workflow Not Found : " +
                workflowId
            );

            return false;

        }

        this.registry.delete(workflowId);

        Logger.info(
            "Workflow Removed : " +
            workflowId
        );

        return true;

    },

    getAll() {

        return Array.from(
            this.registry.values()
        );

    },

    count() {

        return this.registry.size;

    },

    clear() {

        this.registry.clear();

        Logger.info(
            "Workflow Registry Cleared."
        );

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(WorkflowRegistry);
