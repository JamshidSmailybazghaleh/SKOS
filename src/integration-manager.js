/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Integration Manager
 * File      : integration-manager.js
 *
 * Build     : BUILD-000500.2
 * Version   : 1.0.0
 *
 * Mission:
 * Validate complete runtime integration.
 * ==========================================================
 */

class IntegrationManager {

    constructor() {

        this.name = "Integration Manager";
        this.version = "1.0.0";
        this.status = "CREATED";

        this.components = new Map();
        this.results = [];
        this.startedAt = null;

    }



    register(id, component) {

        this.components.set(
            id,
            component
        );

        return true;

    }



    initialize() {

        this.startedAt =
            new Date();

        this.status =
            "INITIALIZED";

        return true;

    }



    validate() {

        this.results = [];

        for (const [id, component] of this.components) {

            const state = {

                component: id,

                status:
                    this.check(component)

            };

            this.results.push(state);

        }

        const failed =
            this.results.filter(
                r => r.status !== "READY"
            );

        if (failed.length === 0) {

            this.status =
                "SYSTEM_READY";

        } else {

            this.status =
                "FAILED";

        }

        return this.status;

    }



    check(component) {

        if (!component)
            return "MISSING";

        if (
            typeof component.getStatus === "function"
        ) {

            const state =
                component.getStatus();

            if (
                state.status === "RUNNING" ||
                state.status === "READY" ||
                state.status === "CONNECTED"
            ) {

                return "READY";

            }

            return state.status;

        }

        return "UNKNOWN";

    }



    getResults() {

        return this.results;

    }



    getSummary() {

        return {

            name:
                this.name,

            version:
                this.version,

            status:
                this.status,

            checked:
                this.results.length,

            ready:
                this.results.filter(
                    r => r.status === "READY"
                ).length

        };

    }



    printSummary() {

        console.log("");

        console.log(
            "===================================="
        );

        console.log(
            "SKOS Integration Summary"
        );

        console.log(
            "Status :",
            this.status
        );

        console.log(
            "===================================="
        );

        this.results.forEach(r => {

            console.log(
                r.component,
                " -> ",
                r.status
            );

        });

        console.log(
            "===================================="
        );

    }

}

module.exports = IntegrationManager;
