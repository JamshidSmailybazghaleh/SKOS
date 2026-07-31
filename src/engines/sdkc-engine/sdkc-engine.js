/**
 * SKOS SDKC Engine
 *
 * File ID: ENG-004
 * Build: BUILD-000001
 * Version: 1.0.0
 */

class SDKCEngine {

    constructor(options = {}) {

        this.logger = options.logger || null;

        this.status = "CREATED";

        this.repository = new Map();

    }

    initialize() {

        this.status = "INITIALIZED";

        this.log("SDKC_ENGINE_INITIALIZED");

        return true;

    }

    store(object) {

        if (!object || !object.id) {

            throw new Error("Knowledge Object must contain a valid id.");

        }

        this.repository.set(object.id, object);

        this.log("OBJECT_STORED", { id: object.id });

        return object;

    }

    retrieve(id) {

        return this.repository.get(id) || null;

    }

    exists(id) {

        return this.repository.has(id);

    }

    list() {

        return Array.from(this.repository.values());

    }

    count() {

        return this.repository.size;

    }

    remove(id) {

        const deleted = this.repository.delete(id);

        if (deleted) {

            this.log("OBJECT_REMOVED", { id });

        }

        return deleted;

    }

    getStatus() {

        return {

            status: this.status,

            totalObjects: this.count()

        };

    }

    log(message, metadata = {}) {

        if (this.logger) {

            this.logger.info(message, metadata);

        }

    }

    shutdown() {

        this.status = "SHUTDOWN";

        this.log("SDKC_ENGINE_SHUTDOWN");

        return true;

    }

}

module.exports = SDKCEngine;
