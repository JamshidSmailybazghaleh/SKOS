/*
====================================================
SKOS Mission Control

Dashboard Service

File:
dashboard-service.js

Operation:
OP-006

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const DashboardService = {

    initialized: false,

    dashboard: {},

    async initialize() {

        Logger.info(
            "Dashboard Service Initializing..."
        );

        this.dashboard = {};

        this.initialized = true;

        Logger.info(
            "Dashboard Service Ready."
        );

        return true;

    },

    async build() {

        Logger.info(
            "Building Dashboard..."
        );

        const analytics =
            await AnalyticsService.collect();

        this.dashboard = {

            summary: {

                assets:
                    analytics.assets.total,

                products:
                    analytics.products.totalProducts,

                publications:
                    analytics.publications.published,

                sales:
                    analytics.revenue.sales,

                workflows:
                    analytics.workflows.completed

            },

            generatedAt:
                new Date().toISOString()

        };

        Logger.info(
            "Dashboard Built."
        );

        return this.dashboard;

    },

    getDashboard() {

        return this.dashboard;

    },

    clear() {

        this.dashboard = {};

        Logger.info(
            "Dashboard Cleared."
        );

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(DashboardService);
