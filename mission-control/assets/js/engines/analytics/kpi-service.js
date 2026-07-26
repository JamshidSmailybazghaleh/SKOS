/*
====================================================
SKOS Mission Control

KPI Service

File:
kpi-service.js

Operation:
OP-006

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const KPIService = {

    initialized: false,

    async initialize() {

        Logger.info(
            "KPI Service Initializing..."
        );

        this.initialized = true;

        Logger.info(
            "KPI Service Ready."
        );

        return true;

    },

    async calculate() {

        Logger.info(
            "Calculating KPIs..."
        );

        const kpi = {

            assets:
                AssetRegistry.count
                    ? AssetRegistry.count()
                    : 0,

            products: 0,

            publications: 0,

            workflows:
                WorkflowHistory.count
                    ? WorkflowHistory.count()
                    : 0,

            sales:
                SalesHistory.count
                    ? SalesHistory.count()
                    : 0,

            successRate:
                this.calculateSuccessRate(),

            generatedAt:
                new Date().toISOString()

        };

        Logger.info(
            "KPI Calculation Completed."
        );

        return kpi;

    },

    calculateSuccessRate() {

        const total =
            WorkflowHistory.count
                ? WorkflowHistory.count()
                : 0;

        if (total === 0) {

            return 0;

        }

        const success =
            WorkflowHistory
                .getAll()
                .filter(
                    record =>
                        record.status === "SUCCESS"
                )
                .length;

        return Number(
            (
                success / total
            ) * 100
        ).toFixed(2);

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(KPIService);
