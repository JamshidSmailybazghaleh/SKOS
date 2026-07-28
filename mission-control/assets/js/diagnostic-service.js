/*
====================================================
SKOS Mission Control

Diagnostic Service

File:
diagnostic-service.js

Version:
1.0

Status:
ACTIVE
====================================================
*/

const DiagnosticService = {

    errors: [],

    warnings: [],

    infos: [],

    async initialize() {

        Logger.info(
            "Diagnostic Service Initializing..."
        );

        return true;

    },

    info(message) {

        const item = {

            type: "INFO",

            message,

            time: new Date().toISOString()

        };

        this.infos.push(item);

        Logger.info(message);

        if (window.EventBus) {

            EventBus.publish(
                "diagnostic.info",
                item
            );

        }

    },

    warning(message) {

        const item = {

            type: "WARNING",

            message,

            time: new Date().toISOString()

        };

        this.warnings.push(item);

        Logger.warning(message);

        if (window.EventBus) {

            EventBus.publish(
                "diagnostic.warning",
                item
            );

        }

    },

    error(message) {

        const item = {

            type: "ERROR",

            message,

            time: new Date().toISOString()

        };

        this.errors.push(item);

        Logger.error(message);

        if (window.EventBus) {

            EventBus.publish(
                "diagnostic.error",
                item
            );

        }

    },

    getHealthReport() {

        return {

            status:

                this.errors.length === 0

                    ? "HEALTHY"

                    : "DEGRADED",

            errors:

                this.errors.length,

            warnings:

                this.warnings.length,

            infos:

                this.infos.length,

            lastError:

                this.errors.length

                    ? this.errors[
                        this.errors.length - 1
                    ]

                    : null

        };

    },

    clear() {

        this.errors = [];

        this.warnings = [];

        this.infos = [];

    }

};

window.DiagnosticService = DiagnosticService;

Object.freeze(DiagnosticService);
