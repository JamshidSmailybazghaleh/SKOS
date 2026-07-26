/*
====================================================
SKOS Mission Control

Reasoning Engine

File:
reasoning-engine.js

Operation:
OP-007

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const ReasoningEngine = {

    version: "1.0",

    initialized: false,

    async initialize() {

        Logger.info(
            "Reasoning Engine Initializing..."
        );

        this.initialized = true;

        Logger.info(
            "Reasoning Engine Ready."
        );

        return true;

    },

    async process(context = {}) {

        Logger.info(
            "Reasoning Process Started..."
        );

        const analysis =
            await AnalyticsEngine.analyze();

        const result =
            await ReasoningService.reason(
                analysis,
                context
            );

        Logger.info(
            "Reasoning Process Completed."
        );

        return result;

    },

    async explain(result) {

        if (!result) {

            Logger.warn(
                "No Reasoning Result."
            );

            return null;

        }

        return {

            summary:
                result.summary || "",

            recommendations:
                result.recommendations || [],

            generatedAt:
                new Date().toISOString()

        };

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(ReasoningEngine);
