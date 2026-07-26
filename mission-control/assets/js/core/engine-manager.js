/**
 * ============================================================
 * SKOS - Smaily Knowledge Operating System
 * Engine Manager
 * ------------------------------------------------------------
 * File      : engine-manager.js
 * Operation : OP-020
 * Build     : BUILD-000413
 * Version   : 1.0.0
 * Status    : ACTIVE
 * ============================================================
 *
 * Mission:
 * Registers, manages and controls all SKOS engines.
 *
 * Responsibilities:
 * - Register engines
 * - Remove engines
 * - Initialize engines
 * - Execute engines
 * - Shutdown engines
 * - Monitor engine status
 * - Provide engine information
 *
 * ============================================================
 */

class EngineManager {

    constructor(config = {}) {

        this.name = "EngineManager";
        this.version = "1.0.0";

        this.config = config;

        this.initialized = false;
        this.running = false;

        this.engines = new Map();

        this.statistics = {

            enginesRegistered: 0,
            enginesInitialized: 0,
            enginesExecuted: 0,
            enginesShutdown: 0,
            enginesRemoved: 0

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
     * Register Engine
     */
    registerEngine(name, engine) {

        this.engines.set(name, engine);

        this.statistics.enginesRegistered++;

        return true;

    }

    /**
     * Remove Engine
     */
    removeEngine(name) {

        if (!this.engines.has(name)) {

            return false;

        }

        this.engines.delete(name);

        this.statistics.enginesRemoved++;

        return true;

    }

    /**
     * Get Engine
     */
    getEngine(name) {

        return this.engines.get(name) || null;

    }

    /**
     * Get All Engines
     */
    getAllEngines() {

        return Array.from(this.engines.keys());

    }

    /**
     * Initialize All Engines
     */
    initializeAll() {

        this.engines.forEach(engine => {

            if (
                engine &&
                typeof engine.initialize === "function"
            ) {

                engine.initialize();

                this.statistics.enginesInitialized++;

            }

        });

        return true;

    }

    /**
     * Execute All Engines
     */
    executeAll() {

        this.engines.forEach(engine => {

            if (
                engine &&
                typeof engine.execute === "function"
            ) {

                engine.execute();

                this.statistics.enginesExecuted++;

            }

        });

        return true;

    }

    /**
     * Shutdown All Engines
     */
    shutdownAll() {

        this.engines.forEach(engine => {

            if (
                engine &&
                typeof engine.shutdown === "function"
            ) {

                engine.shutdown();

                this.statistics.enginesShutdown++;

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

            totalEngines:

                this.engines.size,

            engines:

                this.getAllEngines(),

            statistics:

                this.statistics

        };

    }

    /**
     * Reset
     */
    reset() {

        this.engines.clear();

        this.initialized = false;

        this.running = false;

        this.statistics = {

            enginesRegistered: 0,
            enginesInitialized: 0,
            enginesExecuted: 0,
            enginesShutdown: 0,
            enginesRemoved: 0

        };

    }

}

/**
 * Export
 */

if (typeof module !== "undefined") {

    module.exports = EngineManager;

}

if (typeof window !== "undefined") {

    window.EngineManager = EngineManager;

}
