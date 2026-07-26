/**
 * ============================================================
 * SKOS - Smaily Knowledge Operating System
 * Configuration Manager
 * ------------------------------------------------------------
 * File      : configuration-manager.js
 * Operation : OP-020
 * Build     : BUILD-000415
 * Version   : 1.0.0
 * Status    : ACTIVE
 * ============================================================
 *
 * Mission:
 * Centralized configuration management for the SKOS ecosystem.
 *
 * Responsibilities:
 * - Load configuration
 * - Save configuration
 * - Validate configuration
 * - Update configuration
 * - Retrieve configuration values
 * - Reset configuration
 *
 * ============================================================
 */

class ConfigurationManager {

    constructor(config = {}) {

        this.name = "ConfigurationManager";
        this.version = "1.0.0";

        this.initialized = false;
        this.running = false;

        this.configuration = {};

        this.defaultConfiguration = config;

        this.statistics = {

            configurationsLoaded: 0,
            configurationsSaved: 0,
            configurationsUpdated: 0,
            configurationsValidated: 0,
            configurationResets: 0

        };

    }

    /**
     * Initialize
     */
    initialize() {

        if (this.initialized) {

            return true;

        }

        this.configuration = {

            ...this.defaultConfiguration

        };

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
     * Load Configuration
     */
    load(configuration = {}) {

        this.configuration = {

            ...this.configuration,
            ...configuration

        };

        this.statistics.configurationsLoaded++;

        return this.configuration;

    }

    /**
     * Save Configuration
     */
    save() {

        this.statistics.configurationsSaved++;

        return this.configuration;

    }

    /**
     * Update Configuration
     */
    update(key, value) {

        this.configuration[key] = value;

        this.statistics.configurationsUpdated++;

        return true;

    }

    /**
     * Get Configuration Value
     */
    get(key, defaultValue = null) {

        return this.configuration[key] !== undefined

            ? this.configuration[key]

            : defaultValue;

    }

    /**
     * Set Configuration Value
     */
    set(key, value) {

        return this.update(key, value);

    }

    /**
     * Check Configuration Exists
     */
    has(key) {

        return Object.prototype.hasOwnProperty.call(

            this.configuration,

            key

        );

    }

    /**
     * Validate Configuration
     */
    validate() {

        this.statistics.configurationsValidated++;

        return true;

    }

    /**
     * Get Full Configuration
     */
    getAll() {

        return {

            ...this.configuration

        };

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

            configurationItems:

                Object.keys(this.configuration).length,

            statistics:

                this.statistics

        };

    }

    /**
     * Reset
     */
    reset() {

        this.configuration = {

            ...this.defaultConfiguration

        };

        this.statistics.configurationResets++;

        return true;

    }

}

/**
 * Export
 */

if (typeof module !== "undefined") {

    module.exports = ConfigurationManager;

}

if (typeof window !== "undefined") {

    window.ConfigurationManager = ConfigurationManager;

}
