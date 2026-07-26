/*
====================================================
SKOS Mission Control

Analytics Engine

File:
analytics-engine.js

Operation:
OP-006

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const AnalyticsEngine = {

    version: "1.0",

    initialized: false,

    async initialize() {

        Logger.info(
            "Analytics Engine Initializing..."
        );

        this.initialized = true;

        Logger.info(
            "Analytics Engine Ready."
        );

        return true;

    },

    async analyze() {

        Logger.info(
            "Analytics Started..."
        );

        const report = {

            assets:
                AssetRegistry.count
                    ? AssetRegistry.count()
                    : 0,

            workflows:
                WorkflowHistory.count
                    ? WorkflowHistory.count()
                    : 0,

            sales:
                SalesHistory.count
                    ? SalesHistory.count()
                    : 0,

            timestamp:
                new Date().toISOString()

        };

        Logger.info(
            "Analytics Completed."
        );

        return report;

    },

    async export() {

        const report =
            await this.analyze();

        Logger.info(
            "Analytics Export Ready."
        );

        return report;

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(AnalyticsEngine);
