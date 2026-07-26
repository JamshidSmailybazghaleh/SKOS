/**
 * ============================================================
 * SKOS - Smaily Knowledge Operating System
 * Communication Router
 * ------------------------------------------------------------
 * File      : communication-router.js
 * Operation : OP-021
 * Build     : BUILD-000424
 * Version   : 1.0.0
 * Status    : ACTIVE
 * ============================================================
 *
 * Mission:
 * Routes messages and requests between SKOS components.
 *
 * Responsibilities:
 * - Register communication routes
 * - Route messages
 * - Broadcast messages
 * - Remove routes
 * - Monitor routing activity
 *
 * ============================================================
 */

class CommunicationRouter {

    constructor(config = {}) {

        this.name = "CommunicationRouter";
        this.version = "1.0.0";

        this.config = config;

        this.initialized = false;
        this.running = false;

        this.routes = new Map();

        this.history = [];

        this.statistics = {

            routesRegistered: 0,
            routesRemoved: 0,
            messagesRouted: 0,
            broadcastsSent: 0,
            routingErrors: 0

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
     * Register Route
     */
    registerRoute(source, target, handler) {

        const key = `${source}->${target}`;

        this.routes.set(key, {

            source,

            target,

            handler

        });

        this.statistics.routesRegistered++;

        return true;

    }

    /**
     * Remove Route
     */
    removeRoute(source, target) {

        const key = `${source}->${target}`;

        if (!this.routes.has(key)) {

            return false;

        }

        this.routes.delete(key);

        this.statistics.routesRemoved++;

        return true;

    }

    /**
     * Route Message
     */
    route(source, target, message = {}) {

        const key = `${source}->${target}`;

        const route = this.routes.get(key);

        if (!route) {

            this.statistics.routingErrors++;

            return false;

        }

        const record = {

            source,

            target,

            message,

            timestamp: new Date()

        };

        this.history.push(record);

        this.statistics.messagesRouted++;

        if (typeof route.handler === "function") {

            route.handler(message);

        }

        return true;

    }

    /**
     * Broadcast Message
     */
    broadcast(message = {}) {

        this.routes.forEach(route => {

            if (typeof route.handler === "function") {

                route.handler(message);

            }

        });

        this.statistics.broadcastsSent++;

        return true;

    }

    /**
     * Get Routes
     */
    getRoutes() {

        return Array.from(this.routes.keys());

    }

    /**
     * Health Check
     */
    healthCheck() {

        return {

            router: this.name,

            version: this.version,

            initialized: this.initialized,

            running: this.running,

            routes: this.routes.size,

            history: this.history.length,

            statistics: this.statistics

        };

    }

    /**
     * Reset
     */
    reset() {

        this.routes.clear();

        this.history = [];

        this.initialized = false;

        this.running = false;

        this.statistics = {

            routesRegistered: 0,
            routesRemoved: 0,
            messagesRouted: 0,
            broadcastsSent: 0,
            routingErrors: 0

        };

    }

}

/**
 * Export
 */

if (typeof module !== "undefined") {

    module.exports = CommunicationRouter;

}

if (typeof window !== "undefined") {

    window.CommunicationRouter = CommunicationRouter;

}
