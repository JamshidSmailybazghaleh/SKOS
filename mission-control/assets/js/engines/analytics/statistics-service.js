/*
====================================================
SKOS Mission Control

Analytics Service

File:
analytics-service.js

Operation:
OP-006

Version:
1.1

Status:
DEVELOPMENT
====================================================
*/

const AnalyticsService = {

    initialized: false,

    cache: null,

    async initialize() {

        Logger.info(
            "Analytics Service Initializing..."
        );

        this.cache = {};

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

        const analytics = {

            system: await this.collectSystem(),

            registry: await this.collectRegistry(),

            assets: await this.collectAssets(),

            products: await this.collectProducts(),

            publications: await this.collectPublications(),

            revenue: await this.collectRevenue(),

            workflows: await this.collectWorkflows(),

            timestamp: new Date().toISOString()

        };

        this.cache = analytics;

        return analytics;

    },

    async collectSystem() {

        return {

            version: "1.0",

            initialized: true,

            generatedAt:
                new Date().toISOString()

        };

    },

    async collectRegistry() {

        return {

            total:

                (typeof RegistryEngine !== "undefined"
                && RegistryEngine.count)

                ? RegistryEngine.count()

                : 0

        };

    },

    async collectAssets() {

        return {

            total:

                (typeof AssetRegistry !== "undefined"
                && AssetRegistry.count)

                ? AssetRegistry.count()

                : 0

        };

    },

    async collectProducts() {

        return {

            total:

                (typeof ProductPipeline !== "undefined"
                && ProductPipeline.count)

                ? ProductPipeline.count()

                : 0

        };

    },

    async collectPublications() {

        return {

            total:

                (typeof PublicationEngine !== "undefined"
                && PublicationEngine.count)

                ? PublicationEngine.count()

                : 0

        };

    },

    async collectRevenue() {

        return {

            sales:

                (typeof SalesHistory !== "undefined"
                && SalesHistory.count)

                ? SalesHistory.count()

                : 0

        };

    },

    async collectWorkflows() {

        return {

            executions:

                (typeof WorkflowHistory !== "undefined"
                && WorkflowHistory.count)

                ? WorkflowHistory.count()

                : 0

        };

    },

    async refresh() {

        return await this.collect();

    },

    getCache() {

        return this.cache;

    },

    clearCache() {

        this.cache = {};

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(AnalyticsService);
