/*
====================================================
SKOS Mission Control

Execution Manager

File:
execution-manager.js

Operation:
OP-008

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const ExecutionManager = {

    initialized: false,

    async initialize() {

        Logger.info(
            "Execution Manager Initializing..."
        );

        this.initialized = true;

        Logger.info(
            "Execution Manager Ready."
        );

        return true;

    },

    async execute(plan) {

        if (!plan || !Array.isArray(plan.actions)) {

            Logger.error(
                "Invalid Execution Plan."
            );

            return false;

        }

        Logger.info(
            "Execution Started..."
        );

        const results = [];

        for (const action of plan.actions) {

            const result =
                await this.executeAction(action);

            results.push(result);

        }

        Logger.info(
            "Execution Finished."
        );

        return {

            planId:
                plan.planId,

            completedAt:
                new Date().toISOString(),

            results:
                results

        };

    },

    async executeAction(action) {

        Logger.info(
            "Running Action : " +
            action.actionId
        );

        action.status = "RUNNING";

        try {

            action.status = "SUCCESS";

            return {

                actionId:
                    action.actionId,

                status:
                    action.status

            };

        }

        catch (error) {

            action.status = "FAILED";

            Logger.error(
                "Action Failed : " +
                action.actionId
            );

            return {

                actionId:
                    action.actionId,

                status:
                    action.status,

                error:
                    error.message

            };

        }

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(ExecutionManager);
