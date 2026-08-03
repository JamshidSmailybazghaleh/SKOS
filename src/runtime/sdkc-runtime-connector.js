/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : SDKC Runtime Connector
 * File      : sdkc-runtime-connector.js
 *
 * Build     : BUILD-000450
 * Version   : 1.0.0
 *
 * Mission:
 * Runtime bridge between SKOS Core and SDKC Repository.
 * ==========================================================
 */

class SDKCRuntimeConnector {

    constructor(options = {}) {

        this.name = "SDKC Runtime Connector";
        this.version = "1.0.0";
        this.status = "DISCONNECTED";

        this.repository = null;
        this.session = null;

        this.events = [];

        this.options = options;
    }



    attachRepository(repository) {

        this.repository = repository;

        return true;
    }



    connect() {

        if (!this.repository) {

            throw new Error(
                "SDKC repository not attached."
            );

        }

        this.session = {

            connectedAt:
                new Date(),

            active:
                true

        };

        this.status = "CONNECTED";

        this.emit(
            "SDKC_CONNECTED"
        );

        return true;
    }



    disconnect() {

        if (this.session) {

            this.session.active = false;

        }

        this.status = "DISCONNECTED";

        this.emit(
            "SDKC_DISCONNECTED"
        );

        return true;
    }



    isConnected() {

        return this.status === "CONNECTED";

    }



    saveKnowledgeObject(object) {

        if (!this.isConnected()) {

            throw new Error(
                "SDKC not connected."
            );

        }

        if (
            this.repository &&
            typeof this.repository.save === "function"
        ) {

            return this.repository.save(object);

        }

        return true;
    }



    loadKnowledgeObject(id) {

        if (!this.isConnected()) {

            throw new Error(
                "SDKC not connected."
            );

        }

        if (
            this.repository &&
            typeof this.repository.load === "function"
        ) {

            return this.repository.load(id);

        }

        return null;
    }



    listKnowledgeObjects() {

        if (!this.isConnected()) {

            throw new Error(
                "SDKC not connected."
            );

        }

        if (
            this.repository &&
            typeof this.repository.list === "function"
        ) {

            return this.repository.list();

        }

        return [];
    }



    emit(event, data = {}) {

        this.events.push({

            event,

            data,

            timestamp:
                new Date()

        });

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

            session:
                this.session

        };

    }

}

module.exports = SDKCRuntimeConnector;
