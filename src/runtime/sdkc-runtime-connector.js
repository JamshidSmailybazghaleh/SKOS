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

        this.eventBridge =
            options.eventBridge || null;

        this.options = options;
    }



    attachRepository(repository) {

        this.repository = repository;

        return true;
    }




    initialize() {

        if (!this.repository) {

            throw new Error(
                "SDKC repository must be attached before initialization."
            );

        }

        return this.connect();

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



    existsKnowledgeObject(id) {
        if (!this.isConnected()) {
            throw new Error(
                "SDKC not connected."
            );
        }

        if (
            this.repository &&
            typeof this.repository.exists === "function"
        ) {
            return this.repository.exists(id);
        }

        return false;
    }

    updateKnowledgeObject(id, object) {

        if (!this.isConnected()) {

            throw new Error(
                "SDKC not connected."
            );

        }


        if (
            this.repository &&
            typeof this.repository.update ===
                "function"
        ) {

            return this.repository.update(
                id,
                object
            );

        }


        return null;

    }



    loadKnowledgeObjectContent(id) {
        if (!this.isConnected()) {
            throw new Error(
                "SDKC not connected."
            );
        }

        if (
            this.repository &&
            typeof this.repository.loadContent === "function"
        ) {
            return this.repository.loadContent(id);
        }

        return null;
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



    removeKnowledgeObject(id) {
        if (!this.isConnected()) {
            throw new Error(
                "SDKC not connected."
            );
        }

        if (
            this.repository &&
            typeof this.repository.remove === "function"
        ) {
            return this.repository.remove(id);
        }

        return false;
    }

    emit(event, data = {}) {

        const record = {
            event,
            data,
            timestamp:
                new Date()
        };

        this.events.push(
            record
        );

        if (this.eventBridge) {
            this.eventBridge.publish(
                record
            );
        }

        return record;

    }


    resolveAsset(relativePath, rootName) {
        if (!this.isConnected()) {
            throw new Error("SDKC not connected.");
        }

        if (
            this.repository &&
            typeof this.repository.resolveAsset === "function"
        ) {
            return this.repository.resolveAsset(relativePath, rootName);
        }

        throw new Error("Repository asset resolver unavailable.");
    }

    listAssets() {
        if (!this.isConnected()) {
            throw new Error("SDKC not connected.");
        }

        if (
            this.repository &&
            typeof this.repository.listAssets === "function"
        ) {
            return this.repository.listAssets();
        }

        return [];
    }


    synchronizeRepository() {
        if (!this.isConnected()) {
            throw new Error(
                "SDKC not connected."
            );
        }

        if (
            this.repository &&
            typeof this.repository.synchronize === "function"
        ) {
            return this.repository.synchronize();
        }

        return false;
    }

    shutdown() {

        return this.disconnect();

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
