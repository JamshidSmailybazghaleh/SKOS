/*
====================================================
SKOS Mission Control

Workflow Validator

File:
workflow-validator.js

Operation:
OP-005

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const WorkflowValidator = {

    initialized: false,

    async initialize() {

        Logger.info(
            "Workflow Validator Initializing..."
        );

        this.initialized = true;

        Logger.info(
            "Workflow Validator Ready."
        );

        return true;

    },

    validate(workflow) {

        Logger.info(
            "Workflow Validation Started..."
        );

        if (!workflow) {

            Logger.error(
                "Workflow Is Null."
            );

            return false;

        }

        if (!workflow.id) {

            Logger.error(
                "Missing Workflow ID."
            );

            return false;

        }

        if (!workflow.title) {

            Logger.error(
                "Missing Workflow Title."
            );

            return false;

        }

        if (!workflow.steps) {

            Logger.error(
                "Missing Workflow Steps."
            );

            return false;

        }

        if (!Array.isArray(workflow.steps)) {

            Logger.error(
                "Workflow Steps Must Be Array."
            );

            return false;

        }

        if (workflow.steps.length === 0) {

            Logger.error(
                "Workflow Has No Steps."
            );

            return false;

        }

        for (const step of workflow.steps) {

            if (typeof step !== "string") {

                Logger.error(
                    "Invalid Step : " + step
                );

                return false;

            }

        }

        Logger.info(
            "Workflow Validation Passed."
        );

        return true;

    },

    validateStep(step) {

        if (!step) {

            Logger.error(
                "Empty Workflow Step."
            );

            return false;

        }

        if (typeof step !== "string") {

            Logger.error(
                "Step Must Be String."
            );

            return false;

        }

        return true;

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(WorkflowValidator);
