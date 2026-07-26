/*
====================================================
SKOS Mission Control

Autonomous Validator

File:
autonomous-validator.js

Operation:
OP-008

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const AutonomousValidator = {

    initialized: false,

    async initialize() {

        Logger.info(
            "Autonomous Validator Initializing..."
        );

        this.initialized = true;

        Logger.info(
            "Autonomous Validator Ready."
        );

        return true;

    },

    validate(plan) {

        Logger.info(
            "Validating Execution Plan..."
        );

        const result = {

            valid: true,

            errors: []

        };

        if (!plan) {

            result.valid = false;

            result.errors.push(
                "Execution plan is missing."
            );

            return result;

        }

        if (!plan.planId) {

            result.valid = false;

            result.errors.push(
                "Plan ID is missing."
            );

        }

        if (!Array.isArray(plan.actions)) {

            result.valid = false;

            result.errors.push(
                "Actions list is invalid."
            );

        }

        if (
            Array.isArray(plan.actions) &&
            plan.actions.length === 0
        ) {

            result.valid = false;

            result.errors.push(
                "No actions available."
            );

        }

        if (result.valid) {

            Logger.info(
                "Execution Plan Valid."
            );

        } else {

            Logger.warn(
                "Execution Plan Invalid."
            );

        }

        return result;

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(AutonomousValidator);
