/*
====================================================
SKOS Mission Control

Learning Engine

File:
learning-engine.js

Operation:
OP-009

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const LearningEngine = {

    version: "1.0",

    initialized: false,

    async initialize() {

        Logger.info(
            "Learning Engine Initializing..."
        );

        this.initialized = true;

        Logger.info(
            "Learning Engine Ready."
        );

        return true;

    },

    async learn(context = {}) {

        Logger.info(
            "Learning Process Started..."
        );

        const experience =
            await ExperienceRegistry.collect(
                context
            );

        const learningResult =
            await LearningService.process(
                experience
            );

        Logger.info(
            "Learning Process Completed."
        );

        return learningResult;

    },

    async improve(result) {

        if (!result) {

            Logger.warn(
                "No Learning Result."
            );

            return null;

        }

        return {

            improvements:
                result.improvements || [],

            patterns:
                result.patterns || [],

            generatedAt:
                new Date().toISOString()

        };

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(LearningEngine);
