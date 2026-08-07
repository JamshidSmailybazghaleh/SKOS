"use strict";

/**
 * ==========================================================
 * SKOS Module Contract
 * ----------------------------------------------------------
 * BUILD        : BUILD-000909.3
 * VERSION      : 1.0.0
 * AUTHOR       : SKOS Architecture Team
 * LICENSE      : SKOS Internal
 * ==========================================================
 *
 * Base contract for every SKOS engine/module.
 *
 * Every module MUST inherit from this class.
 *
 * Required lifecycle:
 *
 * Constructor
 * Initialize
 * Execute
 * Shutdown
 *
 * ==========================================================
 */

class SKOSModule {

    constructor(options = {}) {

        this.id =
            options.id ||
            null;

        this.name =
            options.name ||
            "Unnamed Module";

        this.version =
            options.version ||
            "1.0.0";

        this.description =
            options.description ||
            "";

        this.author =
            options.author ||
            "SKOS";

        this.category =
            options.category ||
            "GENERAL";

        this.dependencies =
            Array.isArray(options.dependencies)
                ? [...options.dependencies]
                : [];

        this.capabilities =
            Array.isArray(options.capabilities)
                ? [...options.capabilities]
                : [];

        this.configuration =
            Object.freeze({
                ...(options.configuration || {})
            });

        this.metadata = {
            createdAt: new Date(),
            initializedAt: null,
            shutdownAt: null,
            executionCount: 0,
            lastExecution: null
        };

        this.status =
            "CREATED";

        this.enabled =
            true;

    }

    /**
     * ------------------------------------------------------
     * Lifecycle
     * ------------------------------------------------------
     */

    initialize() {

        this.metadata.initializedAt =
            new Date();

        this.status =
            "INITIALIZED";

        return true;

    }

    execute(context = {}) {

        throw new Error(
            `${this.name}: execute() must be implemented.`
        );

    }

    shutdown() {

        this.metadata.shutdownAt =
            new Date();

        this.status =
            "SHUTDOWN";

        return true;

    }

    /**
     * ------------------------------------------------------
     * Enable / Disable
     * ------------------------------------------------------
     */

    enable() {

        this.enabled = true;

        return this;

    }

    disable() {

        this.enabled = false;

        return this;

    }

    /**
     * ------------------------------------------------------
     * Statistics
     * ------------------------------------------------------
     */

    markExecution() {

        this.metadata.executionCount++;

        this.metadata.lastExecution =
            new Date();

    }

    /**
     * ------------------------------------------------------
     * Information
     * ------------------------------------------------------
     */

    getStatus() {

        return {

            id:
                this.id,

            name:
                this.name,

            version:
                this.version,

            category:
                this.category,

            status:
                this.status,

            enabled:
                this.enabled

        };

    }

    getMetadata() {

        return {

            ...this.metadata

        };

    }

    getCapabilities() {

        return [

            ...this.capabilities

        ];

    }

    getDependencies() {

        return [

            ...this.dependencies

        ];

    }

    /**
     * ------------------------------------------------------
     * Health Check
     * ------------------------------------------------------
     */

    health() {

        return {

            module:
                this.name,

            status:
                this.status,

            healthy:
                this.enabled &&
                this.status !== "SHUTDOWN",

            timestamp:
                new Date()

        };

    }

}

module.exports = SKOSModule;
