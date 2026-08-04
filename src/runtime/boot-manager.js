/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Boot Manager
 * File      : boot-manager.js
 *
 * Build     : BUILD-000800.1
 * Version   : 1.0.0
 * ==========================================================
 */

class BootManager {

    constructor() {

        this.name = "SKOS Boot Manager";

        this.version = "1.0.0";

        this.build = "BUILD-000800.1";

        this.status = "INITIALIZED";

        this.components = [];

        this.logs = [];

    }


    register(component) {

        if (!component) {
            throw new Error("Component required.");
        }

        this.components.push(component);

        return true;

    }


    async initialize() {

        this.status = "INITIALIZING";

        this.logs.push("Boot sequence started.");

        for (const component of this.components) {

            if (typeof component.initialize === "function") {

                await component.initialize();

                this.logs.push(
                    `${component.name} initialized.`
                );

            }

        }

        return true;

    }


    async verify() {

        this.logs.push("Verifying components.");

        for (const component of this.components) {

            if (typeof component.getStatus === "function") {

                const status =
                    component.getStatus();

                if (
                    status.status &&
                    status.status !== "READY"
                ) {

                    throw new Error(
                        `${component.name} not ready.`
                    );

                }

            }

        }

        this.logs.push("Verification completed.");

        return true;

    }


    async start() {

        this.status = "STARTING";

        this.logs.push("Starting runtime.");

        for (const component of this.components) {

            if (typeof component.start === "function") {

                await component.start();

                this.logs.push(
                    `${component.name} started.`
                );

            }

        }

        this.status = "READY";

        this.logs.push("SKOS Runtime READY.");

        return true;

    }


    async shutdown() {

        this.logs.push("Shutdown started.");

        for (const component of [...this.components].reverse()) {

            if (typeof component.shutdown === "function") {

                await component.shutdown();

                this.logs.push(
                    `${component.name} stopped.`
                );

            }

        }

        this.status = "STOPPED";

        return true;

    }


    getLogs() {

        return this.logs;

    }


    getStatus() {

        return {

            name: this.name,

            version: this.version,

            build: this.build,

            status: this.status,

            registeredComponents:
                this.components.length

        };

    }

}

module.exports = BootManager;
