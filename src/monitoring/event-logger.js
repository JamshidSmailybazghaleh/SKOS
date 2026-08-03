/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component   : Event Logger
 * File        : event-logger.js
 *
 * Build       : BUILD-000439
 * Version     : 1.0.0
 *
 * Mission:
 * Centralized recording, classification, querying,
 * filtering and exporting of system events.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */

class EventLogger {

    constructor(options = {}) {

        this.name = "Event Logger";
        this.version = "1.0.0";
        this.status = "CREATED";

        this.maxEvents =
            options.maxEvents || 100000;

        this.events = [];
    }



    initialize() {

        this.status = "INITIALIZED";

        this.log(
            "LOGGER_INITIALIZED",
            "SYSTEM",
            {}
        );

        return true;
    }



    log(
        event,
        source,
        metadata = {}
    ) {

        const record = {

            id:
                `EVT-${Date.now()}-${this.events.length + 1}`,

            event,

            source,

            metadata,

            timestamp:
                new Date()

        };

        this.events.push(record);

        if (
            this.events.length >
            this.maxEvents
        ) {

            this.events.shift();

        }

        return record;
    }



    getAll() {

        return this.events;

    }



    getById(id) {

        return this.events.find(
            item => item.id === id
        );

    }



    getByEvent(event) {

        return this.events.filter(
            item => item.event === event
        );

    }



    getBySource(source) {

        return this.events.filter(
            item => item.source === source
        );

    }



    getBetween(
        from,
        to
    ) {

        return this.events.filter(

            item =>

                item.timestamp >= from &&

                item.timestamp <= to

        );

    }



    search(predicate) {

        return this.events.filter(
            predicate
        );

    }



    export() {

        return JSON.stringify(

            this.events,

            null,

            2

        );

    }



    clear() {

        this.events = [];

        return true;

    }



    getStatistics() {

        const byEvent = {};

        const bySource = {};

        for (const item of this.events) {

            byEvent[item.event] =
                (byEvent[item.event] || 0) + 1;

            bySource[item.source] =
                (bySource[item.source] || 0) + 1;
        }

        return {

            totalEvents:
                this.events.length,

            events:
                byEvent,

            sources:
                bySource

        };

    }



    getStatus() {

        return {

            name:
                this.name,

            version:
                this.version,

            status:
                this.status,

            totalEvents:
                this.events.length

        };

    }



    shutdown() {

        this.log(
            "LOGGER_SHUTDOWN",
            "SYSTEM",
            {}
        );

        this.status = "SHUTDOWN";

        return true;

    }

}

module.exports = EventLogger;
