/**
 * ============================================================
 * SKOS - Smaily Knowledge Operating System
 * Service Manager
 * ------------------------------------------------------------
 * File      : service-manager.js
 * Operation : OP-020
 * Build     : BUILD-000414
 * Version   : 1.0.0
 * Status    : ACTIVE
 * ============================================================
 *
 * Mission:
 * Registers, manages and controls all SKOS services.
 *
 * Responsibilities:
 * - Register services
 * - Remove services
 * - Initialize services
 * - Execute services
 * - Shutdown services
 * - Monitor service health
 * - Provide service discovery
 *
 * ============================================================
 */

class ServiceManager {

    constructor(config = {}) {

        this.name = "ServiceManager";
        this.version = "1.0.0";

        this.config = config;

        this.initialized = false;
        this.running = false;

        this.services = new Map();

        this.statistics = {

            servicesRegistered: 0,
            servicesInitialized: 0,
            servicesExecuted: 0,
            servicesShutdown: 0,
            servicesRemoved: 0

        };

    }

    /**
     * Initialize
     */
    initialize() {

        if (this.initialized) {

            return true;

        }

        this.initialized = true;

        return true;

    }

    /**
     * Execute
     */
    execute() {

        if (!this.initialized) {

            this.initialize();

        }

        this.running = true;

        return true;

    }

    /**
     * Shutdown
     */
    shutdown() {

        this.shutdownAll();

        this.running = false;

        return true;

    }

    /**
     * Register Service
     */
    registerService(name, service) {

        this.services.set(name, service);

        this.statistics.servicesRegistered++;

        return true;

    }

    /**
     * Remove Service
     */
    removeService(name) {

        if (!this.services.has(name)) {

            return false;

        }

        this.services.delete(name);

        this.statistics.servicesRemoved++;

        return true;

    }

    /**
     * Get Service
     */
    getService(name) {

        return this.services.get(name) || null;

    }

    /**
     * Check Service Exists
     */
    hasService(name) {

        return this.services.has(name);

    }

    /**
     * Get All Services
     */
    getAllServices() {

        return Array.from(this.services.keys());

    }

    /**
     * Initialize All Services
     */
    initializeAll() {

        this.services.forEach(service => {

            if (
                service &&
                typeof service.initialize === "function"
            ) {

                service.initialize();

                this.statistics.servicesInitialized++;

            }

        });

        return true;

    }

    /**
     * Execute All Services
     */
    executeAll() {

        this.services.forEach(service => {

            if (
                service &&
                typeof service.execute === "function"
            ) {

                service.execute();

                this.statistics.servicesExecuted++;

            }

        });

        return true;

    }

    /**
     * Shutdown All Services
     */
    shutdownAll() {

        this.services.forEach(service => {

            if (
                service &&
                typeof service.shutdown === "function"
            ) {

                service.shutdown();

                this.statistics.servicesShutdown++;

            }

        });

        return true;

    }

    /**
     * Health Check
     */
    healthCheck() {

        return {

            manager: this.name,

            version: this.version,

            initialized: this.initialized,

            running: this.running,

            totalServices:

                this.services.size,

            services:

                this.getAllServices(),

            statistics:

                this.statistics

        };

    }

    /**
     * Reset
     */
    reset() {

        this.services.clear();

        this.initialized = false;

        this.running = false;

        this.statistics = {

            servicesRegistered: 0,
            servicesInitialized: 0,
            servicesExecuted: 0,
            servicesShutdown: 0,
            servicesRemoved: 0

        };

    }

}

/**
 * Export
 */

if (typeof module !== "undefined") {

    module.exports = ServiceManager;

}

if (typeof window !== "undefined") {

    window.ServiceManager = ServiceManager;

}
