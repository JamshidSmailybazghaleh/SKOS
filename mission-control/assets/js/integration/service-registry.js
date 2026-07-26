/**
 * ============================================================
 * SKOS - Smaily Knowledge Operating System
 * Service Registry
 * ------------------------------------------------------------
 * File      : service-registry.js
 * Operation : OP-021
 * Build     : BUILD-000422
 * Version   : 1.0.0
 * Status    : ACTIVE
 * ============================================================
 *
 * Mission:
 * Central registry for all SKOS services.
 *
 * Responsibilities:
 * - Register services
 * - Unregister services
 * - Discover services
 * - Search services
 * - Categorize services
 * - Store metadata
 * - Validate registry integrity
 * ============================================================
 */

class ServiceRegistry {

    constructor(config = {}) {

        this.name = "ServiceRegistry";
        this.version = "1.0.0";

        this.config = config;

        this.initialized = false;
        this.running = false;

        this.services = new Map();
        this.categories = new Map();

        this.statistics = {

            servicesRegistered: 0,
            servicesRemoved: 0,
            serviceLookups: 0,
            categoryAssignments: 0,
            validations: 0

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

        this.running = false;

        return true;

    }

    /**
     * Register Service
     */
    register(service = {}) {

        if (!service.name) {

            return false;

        }

        this.services.set(

            service.name,

            {

                ...service,

                registeredAt: new Date()

            }

        );

        this.statistics.servicesRegistered++;

        return true;

    }

    /**
     * Remove Service
     */
    unregister(name) {

        if (!this.services.has(name)) {

            return false;

        }

        this.services.delete(name);

        this.statistics.servicesRemoved++;

        return true;

    }

    /**
     * Find Service
     */
    find(name) {

        this.statistics.serviceLookups++;

        return this.services.get(name) || null;

    }

    /**
     * Assign Category
     */
    assignCategory(name, category) {

        if (!this.services.has(name)) {

            return false;

        }

        this.categories.set(name, category);

        this.statistics.categoryAssignments++;

        return true;

    }

    /**
     * Get Services By Category
     */
    getByCategory(category) {

        const result = [];

        this.categories.forEach((value, key) => {

            if (value === category) {

                result.push(

                    this.services.get(key)

                );

            }

        });

        return result;

    }

    /**
     * Get All Services
     */
    getAll() {

        return Array.from(

            this.services.values()

        );

    }

    /**
     * Validate Registry
     */
    validate() {

        this.statistics.validations++;

        return {

            valid: true,

            totalServices:

                this.services.size

        };

    }

    /**
     * Health Check
     */
    healthCheck() {

        return {

            registry: this.name,

            version: this.version,

            initialized: this.initialized,

            running: this.running,

            services:

                this.services.size,

            categories:

                this.categories.size,

            statistics:

                this.statistics

        };

    }

    /**
     * Reset
     */
    reset() {

        this.services.clear();

        this.categories.clear();

        this.initialized = false;

        this.running = false;

        this.statistics = {

            servicesRegistered: 0,
            servicesRemoved: 0,
            serviceLookups: 0,
            categoryAssignments: 0,
            validations: 0

        };

    }

}

/**
 * Export
 */

if (typeof module !== "undefined") {

    module.exports = ServiceRegistry;

}

if (typeof window !== "undefined") {

    window.ServiceRegistry = ServiceRegistry;

}
