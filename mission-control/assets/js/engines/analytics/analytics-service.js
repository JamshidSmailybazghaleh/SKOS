/*
====================================================
SKOS Mission Control

Analytics Service

File:
analytics-service.js

Operation:
OP-006

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const AnalyticsService = {

    initialized: false,

    async initialize() {

        Logger.info(
            "Analytics Service Initializing..."
        );

        this.initialized = true;

        Logger.info(
            "Analytics Service Ready."
        );

        return true;

    },

    async collect() {

        Logger.info(
            "Collecting Analytics Data..."
        );

        return {

            registry: this.collectRegistry(),

            assets: this.collectAssets(),

            products: this.collectProducts(),

            publications: this.collectPublications(),

            revenue: this.collectRevenue(),

            workflows: this.collectWorkflows(),

            timestamp: new Date().toISOString()

        };

    },

    collectRegistry() {

        return {
            totalAssets:
                AssetRegistry.count
                    ? AssetRegistry.count()
                    : 0
        };

    },

    collectAssets() {

        return {
            total:
                AssetRegistry.count
                    ? AssetRegistry.count()
                    : 0
        };

    },

    collectProducts() {

        return {
            totalProducts: 0
        };

    },

    collectPublications() {

        return {
            published: 0
        };

    },

    collectRevenue() {

        return {
            sales:
                SalesHistory.count
                    ? SalesHistory.count()
                    : 0
        };

    },

    collectWorkflows() {

        return {
            completed:
                WorkflowHistory.count
                    ? WorkflowHistory.count()
                    : 0
        };

    },

    async export() {

        return await this.collect();

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(AnalyticsService);
