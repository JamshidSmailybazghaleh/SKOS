/*
==========================================================
SKOS Framework
Base Manager
Version : 1.0.0
BUILD : BUILD-000027
==========================================================
*/

import BaseEvent
from "./base-event.js";

class BaseManager {

    constructor(name = "Base Manager") {

        this.name = name;

        this.initialized = false;

        this.components = new Map();

        this.listeners = new Map();

    }

    async initialize() {

        this.initialized = true;

        console.info(

            "[" + this.name + "] Initialized"

        );

    }

    isReady() {

        return this.initialized;

    }

    register(id, component) {

        this.components.set(id, component);

    }

    unregister(id) {

        this.components.delete(id);

    }

    get(id) {

        return this.components.get(id);

    }

    getAll() {

        return Array.from(

            this.components.values()

        );

    }

    on(eventName, callback) {

        if (!this.listeners.has(eventName)) {

            this.listeners.set(eventName, []);

        }

        this.listeners
            .get(eventName)
            .push(callback);

    }

    emit(eventName, payload = {}) {

        const event =

            new BaseEvent(

                eventName,

                payload

            );

        if (!this.listeners.has(eventName)) {

            return;

        }

        this.listeners
            .get(eventName)
            .forEach(

                callback => {

                    if (

                        !event.isPropagationStopped()

                    ) {

                        callback(event);

                    }

                }

            );

    }

    async refresh() {

        console.info(

            "[" + this.name + "] Refresh"

        );

    }

    async shutdown() {

        this.components.clear();

        this.listeners.clear();

        this.initialized = false;

        console.info(

            "[" + this.name + "] Shutdown"

        );

    }

}

export default BaseManager;
