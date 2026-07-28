/*
====================================================
SKOS Mission Control

Health Service

File:
health-service.js

Version:
1.0

Status:
ACTIVE
====================================================
*/

const HealthService = {

    report: null,

    async initialize() {

        Logger.info(
            "Health Service Initializing..."
        );

        this.refresh();

        return true;

    },

    refresh() {

        const runtime =

            RuntimeService.getHealthReport();

        const diagnostic =

            DiagnosticService.getHealthReport();

        this.report = {

            timestamp:

                new Date().toISOString(),

            system:

                runtime.system,

            operational:

                runtime.operational,

            engines:

                runtime.engines,

            diagnostics:

                diagnostic,

            status:

                this.calculateStatus(

                    runtime,

                    diagnostic

                )

        };

        if (window.EventBus) {

            EventBus.publish(

                "health.updated",

                this.report

            );

        }

        Logger.info(

            "Health Report Updated."

        );

    },

    calculateStatus(runtime, diagnostic) {

        if (!runtime.operational) {

            return "OFFLINE";

        }

        if (diagnostic.errors > 0) {

            return "DEGRADED";

        }

        if (diagnostic.warnings > 0) {

            return "WARNING";

        }

        return "HEALTHY";

    },

    getReport() {

        return this.report;

    },

    getStatus() {

        return this.report

            ? this.report.status

            : "UNKNOWN";

    },

    isHealthy() {

        return this.getStatus() ===

            "HEALTHY";

    }

};

window.HealthService = HealthService;

Object.freeze(HealthService);
