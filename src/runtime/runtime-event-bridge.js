/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Runtime Event Bridge
 * File      : runtime-event-bridge.js
 *
 * ILR       : ILR-002.59-F
 * Version   : 1.0.0
 *
 * Mission:
 * Canonical event propagation path from SKOS runtime
 * components into the Monitoring Runtime.
 *
 * Architecture:
 *
 * Kernel / SDKC / Startup / Bootstrap
 *                |
 *                v
 *       RuntimeEventBridge
 *                |
 *                v
 *       Monitoring Runtime
 *
 * Principles:
 * - Single canonical propagation path
 * - No mocks
 * - No duplicate ownership of events
 * - Bridge does not replace component-local history
 * ==========================================================
 */

class RuntimeEventBridge {

    constructor(options = {}) {

        this.name =
            "SKOS Runtime Event Bridge";

        this.version =
            "1.0.0";

        this.status =
            "CREATED";

        this.monitoring =
            options.monitoring || null;

        this.events =
            [];

        this.forwarded =
            0;

        this.failed =
            0;
    }


    attachMonitoring(monitoring) {

        if (!monitoring) {

            throw new Error(
                "Monitoring Runtime is required."
            );

        }

        if (
            typeof monitoring.processEvent !== "function" &&
            typeof monitoring.recordEvent !== "function"
        ) {

            throw new Error(
                "Monitoring must provide processEvent or recordEvent."
            );

        }

        this.monitoring =
            monitoring;

        return true;
    }


    initialize() {

        if (!this.monitoring) {

            throw new Error(
                "Monitoring Runtime must be attached before initialization."
            );

        }

        this.status =
            "READY";

        return true;
    }


    publish(event) {

        if (!event) {

            throw new Error(
                "Runtime event is required."
            );

        }

        if (
            this.status !== "READY"
        ) {

            throw new Error(
                `Runtime Event Bridge is not ready: ${this.status}`
            );

        }

        this.events.push(
            event
        );

        try {

            if (
                this.monitoring &&
                typeof this.monitoring.processEvent === "function"
            ) {
                this.monitoring.processEvent(event);
            } else if (
                this.monitoring &&
                typeof this.monitoring.recordEvent === "function"
            ) {
                this.monitoring.recordEvent(
                    event.event,
                    {
                        ...event.data,
                        timestamp: event.timestamp
                    }
                );
            } else {
                throw new Error(
                    "Monitoring must provide processEvent or recordEvent."
                );
            }

            this.forwarded++;

            return true;

        } catch (error) {

            this.failed++;

            throw error;

        }

    }

    getEvents() {

        return this.events;

    }


    getStatus() {

        return {

            name:
                this.name,

            version:
                this.version,

            status:
                this.status,

            forwarded:
                this.forwarded,

            failed:
                this.failed,

            eventCount:
                this.events.length

        };
    }


    shutdown() {

        this.status =
            "SHUTDOWN";

        return true;
    }

}


module.exports =
    RuntimeEventBridge;
