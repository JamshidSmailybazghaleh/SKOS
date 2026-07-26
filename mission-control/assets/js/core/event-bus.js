/**
 * ============================================================
 * SKOS - Smaily Knowledge Operating System
 * Event Bus
 * ------------------------------------------------------------
 * File      : event-bus.js
 * Operation : OP-020
 * Build     : BUILD-000417
 * Version   : 1.0.0
 * Status    : ACTIVE
 * ============================================================
 *
 * Mission:
 * Provides a central event communication mechanism
 * for all SKOS components.
 *
 * Responsibilities:
 * - Publish events
 * - Subscribe to events
 * - Unsubscribe listeners
 * - Broadcast system notifications
 * - Maintain event history
 *
 * ============================================================
 */

class EventBus {

    constructor(config = {}) {

        this.name = "EventBus";
        this.version = "1.0.0";

        this.config = config;

        this.initialized = false;
        this.running = false;

        this.listeners = new Map();

        this.history = [];

        this.statistics = {

            eventsPublished: 0,
            subscriptions: 0,
            unsubscriptions: 0,
            notificationsDelivered: 0

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
     * Subscribe
     */
    subscribe(eventName, callback) {

        if (!this.listeners.has(eventName)) {

            this.listeners.set(eventName, []);

        }

        this.listeners
            .get(eventName)
            .push(callback);

        this.statistics.subscriptions++;

        return true;

    }

    /**
     * Unsubscribe
     */
    unsubscribe(eventName, callback) {

        if (!this.listeners.has(eventName)) {

            return false;

        }

        const callbacks = this.listeners.get(eventName);

        this.listeners.set(

            eventName,

            callbacks.filter(

                listener => listener !== callback

            )

        );

        this.statistics.unsubscriptions++;

        return true;

    }

    /**
     * Publish Event
     */
    publish(eventName, payload = {}) {

        const event = {

            id: this.generateID(),

            event: eventName,

            payload,

            timestamp: new Date()

        };

        this.history.push(event);

        this.statistics.eventsPublished++;

        if (this.listeners.has(eventName)) {

            this.listeners
                .get(eventName)
                .forEach(listener => {

                    listener(payload);

                    this.statistics.notificationsDelivered++;

                });

        }

        return event;

    }

    /**
     * Broadcast
     */
    broadcast(payload = {}) {

        this.listeners.forEach(

            (callbacks) => {

                callbacks.forEach(callback => {

                    callback(payload);

                    this.statistics.notificationsDelivered++;

                });

            }

        );

    }

    /**
     * Get Event History
     */
    getHistory(limit = 100) {

        return this.history.slice(-limit);

    }

    /**
     * Health Check
     */
    healthCheck() {

        return {

            bus: this.name,

            version: this.version,

            initialized: this.initialized,

            running: this.running,

            registeredEvents:

                this.listeners.size,

            history:

                this.history.length,

            statistics:

                this.statistics

        };

    }

    /**
     * Generate ID
     */
    generateID() {

        return (

            "event-" +

            Date.now() +

            "-" +

            Math.floor(

                Math.random() * 100000

            )

        );

    }

    /**
     * Reset
     */
    reset() {

        this.listeners.clear();

        this.history = [];

        this.statistics = {

            eventsPublished: 0,
            subscriptions: 0,
            unsubscriptions: 0,
            notificationsDelivered: 0

        };

    }

}

/**
 * Export
 */

if (typeof module !== "undefined") {

    module.exports = EventBus;

}

if (typeof window !== "undefined") {

    window.EventBus = EventBus;

}
