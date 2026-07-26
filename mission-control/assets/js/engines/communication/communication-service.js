/**
 * ============================================================
 * SKOS - Smaily Knowledge Operating System
 * Communication Service
 * ------------------------------------------------------------
 * File      : communication-service.js
 * Operation : OP-010
 * Build     : BUILD-000331
 * Version   : 1.0.0
 * Status    : ACTIVE
 * ============================================================
 *
 * Mission:
 * Provides communication services for the Communication Engine.
 * Responsible for message validation, routing and delivery.
 *
 * NOTE:
 * This service does NOT make decisions.
 * It only processes communication requests.
 * ============================================================
 */

class CommunicationService {

    constructor(engine = null) {

        this.name = "CommunicationService";
        this.version = "1.0.0";

        this.engine = engine;

        this.initialized = false;

        this.routes = new Map();

        this.statistics = {

            validated: 0,
            delivered: 0,
            failed: 0,
            dropped: 0

        };

    }

    /**
     * Initialize service
     */
    initialize() {

        if (this.initialized) {
            return true;
        }

        this.initialized = true;

        return true;

    }

    /**
     * Attach Communication Engine
     */
    attachEngine(engine) {

        this.engine = engine;

    }

    /**
     * Register Route
     */
    registerRoute(source, destination) {

        const key = `${source}->${destination}`;

        this.routes.set(key, {

            source,
            destination,
            active: true,
            createdAt: new Date()

        });

    }

    /**
     * Check whether route exists
     */
    hasRoute(source, destination) {

        return this.routes.has(`${source}->${destination}`);

    }

    /**
     * Validate message
     */
    validateMessage(message) {

        if (!message) {

            this.statistics.failed++;

            return false;

        }

        const requiredFields = [

            "id",
            "source",
            "destination",
            "type",
            "payload"

        ];

        for (const field of requiredFields) {

            if (!(field in message)) {

                this.statistics.failed++;

                return false;

            }

        }

        this.statistics.validated++;

        return true;

    }

    /**
     * Deliver message
     */
    deliver(message) {

        if (!this.validateMessage(message)) {

            return false;

        }

        if (!this.engine) {

            this.statistics.failed++;

            return false;

        }

        this.engine.send(message);

        this.statistics.delivered++;

        return true;

    }

    /**
     * Receive message
     */
    receive(message) {

        if (!this.engine) {
            return false;
        }

        return this.engine.receive(message);

    }

    /**
     * Broadcast message
     */
    broadcast(message) {

        if (!this.engine) {
            return false;
        }

        return this.engine.broadcast(message);

    }

    /**
     * Drop invalid message
     */
    drop(message) {

        this.statistics.dropped++;

        if (this.engine) {

            this.engine.record({

                action: "DROP",
                message

            });

        }

    }

    /**
     * Get registered routes
     */
    getRoutes() {

        return Array.from(this.routes.values());

    }

    /**
     * Health Check
     */
    healthCheck() {

        return {

            service: this.name,
            version: this.version,
            initialized: this.initialized,
            engineAttached: this.engine !== null,
            routes: this.routes.size,
            statistics: this.statistics

        };

    }

    /**
     * Reset Service
     */
    reset() {

        this.routes.clear();

        this.statistics = {

            validated: 0,
            delivered: 0,
            failed: 0,
            dropped: 0

        };

    }

}

/**
 * Export
 */

if (typeof module !== "undefined") {
    module.exports = CommunicationService;
}

if (typeof window !== "undefined") {
    window.CommunicationService = CommunicationService;
}
