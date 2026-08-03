/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Health Monitor
 * File      : health-monitor.js
 *
 * Build     : BUILD-000441
 * Version   : 1.0.0
 *
 * Mission:
 * Monitor the operational health of all SKOS
 * components and produce unified health reports.
 *
 * ==========================================================
 */

class HealthMonitor {

    constructor(options = {}) {

        this.name = "Health Monitor";
        this.version = "1.0.0";
        this.status = "CREATED";

        this.components = new Map();

        this.history = [];

        this.options = options;

    }



    initialize() {

        this.status = "INITIALIZED";

        return true;

    }



    registerComponent(

        componentId,

        metadata = {}

    ) {

        if (!componentId) {

            throw new Error(
                "Component id required."
            );

        }

        this.components.set(

            componentId,

            {

                id: componentId,

                name:
                    metadata.name || componentId,

                state: "UNKNOWN",

                lastCheck: null,

                uptime: 0,

                details: {}

            }

        );

        return true;

    }



    updateHealth(

        componentId,

        state,

        details = {}

    ) {

        const component =
            this.components.get(componentId);

        if (!component) {

            throw new Error(
                "Component not registered."
            );

        }

        component.state = state;

        component.details = details;

        component.lastCheck =
            new Date();

        this.history.push({

            componentId,

            state,

            timestamp:
                component.lastCheck

        });

        return component;

    }



    incrementUptime(

        componentId,

        milliseconds

    ) {

        const component =
            this.components.get(componentId);

        if (!component) {

            return false;

        }

        component.uptime += milliseconds;

        return true;

    }



    getComponentHealth(

        componentId

    ) {

        return this.components.get(componentId);

    }



    getAllHealth() {

        return Array.from(

            this.components.values()

        );

    }



    getHealthyComponents() {

        return this.getAllHealth()

            .filter(

                component =>

                    component.state === "HEALTHY"

            );

    }



    getUnhealthyComponents() {

        return this.getAllHealth()

            .filter(

                component =>

                    component.state !== "HEALTHY"

            );

    }



    generateReport() {

        return {

            timestamp:
                new Date(),

            total:
                this.components.size,

            healthy:
                this.getHealthyComponents().length,

            unhealthy:
                this.getUnhealthyComponents().length,

            components:
                this.getAllHealth()

        };

    }



    getStatistics() {

        return {

            registeredComponents:
                this.components.size,

            healthChecks:
                this.history.length,

            healthy:
                this.getHealthyComponents().length,

            unhealthy:
                this.getUnhealthyComponents().length

        };

    }



    getStatus() {

        return {

            name:
                this.name,

            version:
                this.version,

            status:
                this.status,

            components:
                this.components.size

        };

    }



    shutdown() {

        this.status = "SHUTDOWN";

        return true;

    }

}

module.exports = HealthMonitor;
