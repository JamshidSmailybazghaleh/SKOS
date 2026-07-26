/**
 * ============================================================
 * SKOS - Smaily Knowledge Operating System
 * Lifecycle Manager
 * ------------------------------------------------------------
 * File      : lifecycle-manager.js
 * Operation : OP-020
 * Build     : BUILD-000416
 * Version   : 1.0.0
 * Status    : ACTIVE
 * ============================================================
 *
 * Mission:
 * Controls the lifecycle of all SKOS components.
 *
 * Responsibilities:
 * - Register components
 * - Initialize components
 * - Start components
 * - Stop components
 * - Restart components
 * - Shutdown components
 * - Track lifecycle states
 *
 * ============================================================
 */

class LifecycleManager {

    constructor(config = {}) {

        this.name = "LifecycleManager";
        this.version = "1.0.0";

        this.config = config;

        this.initialized = false;
        this.running = false;

        this.components = new Map();

        this.statistics = {

            componentsRegistered: 0,
            componentsInitialized: 0,
            componentsStarted: 0,
            componentsStopped: 0,
            componentsRestarted: 0,
            componentsShutdown: 0

        };

    }

    /**
     * Initialize Manager
     */
    initialize() {

        if (this.initialized) {

            return true;

        }

        this.initialized = true;

        return true;

    }

    /**
     * Execute Manager
     */
    execute() {

        if (!this.initialized) {

            this.initialize();

        }

        this.running = true;

        return true;

    }

    /**
     * Shutdown Manager
     */
    shutdown() {

        this.shutdownAll();

        this.running = false;

        return true;

    }

    /**
     * Register Component
     */
    registerComponent(name, component) {

        this.components.set(name, {

            instance: component,
            state: "REGISTERED"

        });

        this.statistics.componentsRegistered++;

        return true;

    }

    /**
     * Initialize Component
     */
    initializeComponent(name) {

        const component = this.components.get(name);

        if (!component) {

            return false;

        }

        if (typeof component.instance.initialize === "function") {

            component.instance.initialize();

        }

        component.state = "INITIALIZED";

        this.statistics.componentsInitialized++;

        return true;

    }

    /**
     * Start Component
     */
    startComponent(name) {

        const component = this.components.get(name);

        if (!component) {

            return false;

        }

        if (typeof component.instance.execute === "function") {

            component.instance.execute();

        }

        component.state = "RUNNING";

        this.statistics.componentsStarted++;

        return true;

    }

    /**
     * Stop Component
     */
    stopComponent(name) {

        const component = this.components.get(name);

        if (!component) {

            return false;

        }

        if (typeof component.instance.shutdown === "function") {

            component.instance.shutdown();

        }

        component.state = "STOPPED";

        this.statistics.componentsStopped++;

        return true;

    }

    /**
     * Restart Component
     */
    restartComponent(name) {

        this.stopComponent(name);

        this.initializeComponent(name);

        this.startComponent(name);

        this.statistics.componentsRestarted++;

        return true;

    }

    /**
     * Shutdown All Components
     */
    shutdownAll() {

        this.components.forEach((component) => {

            if (typeof component.instance.shutdown === "function") {

                component.instance.shutdown();

            }

            component.state = "SHUTDOWN";

            this.statistics.componentsShutdown++;

        });

    }

    /**
     * Get Component State
     */
    getComponentState(name) {

        const component = this.components.get(name);

        return component
            ? component.state
            : null;

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

            components:

                this.components.size,

            statistics:

                this.statistics

        };

    }

    /**
     * Reset
     */
    reset() {

        this.components.clear();

        this.initialized = false;

        this.running = false;

        this.statistics = {

            componentsRegistered: 0,
            componentsInitialized: 0,
            componentsStarted: 0,
            componentsStopped: 0,
            componentsRestarted: 0,
            componentsShutdown: 0

        };

    }

}

/**
 * Export
 */

if (typeof module !== "undefined") {

    module.exports = LifecycleManager;

}

if (typeof window !== "undefined") {

    window.LifecycleManager = LifecycleManager;

}
