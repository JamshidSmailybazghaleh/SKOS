/*
====================================================
SKOS Mission Control

Decision Service

File:
decision-service.js

Operation:
OP-007

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const DecisionService = {

    initialized: false,

    async initialize() {

        Logger.info(
            "Decision Service Initializing..."
        );

        this.initialized = true;

        Logger.info(
            "Decision Service Ready."
        );

        return true;

    },

    async decide(reasoningResult) {

        Logger.info(
            "Decision Process Started..."
        );

        const decision = {

            decisionId:
                this.generateDecisionId(),

            status: "SUCCESS",

            actions: [],

            generatedAt:
                new Date().toISOString()

        };

        if (
            reasoningResult &&
            Array.isArray(reasoningResult.recommendations)
        ) {

            for (const recommendation of reasoningResult.recommendations) {

                decision.actions.push({

                    type: "RECOMMENDATION",

                    description: recommendation,

                    priority: "NORMAL"

                });

            }

        }

        Logger.info(
            "Decision Process Completed."
        );

        return decision;

    },

    generateDecisionId() {

        return "DEC-" + Date.now();

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(DecisionService);
