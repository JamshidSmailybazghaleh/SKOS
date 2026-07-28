/*
====================================================
SKOS Mission Control

Service Registry

File:
service-registry.js

Version:
1.0

Status:
ACTIVE
====================================================
*/

const ServiceRegistry = {

    services: {},

    register(name, service) {

        if (this.services[name]) {

            Logger.warning(
                "Service already registered: " + name
            );

            return false;

        }

        this.services[name] = service;

        Logger.info(
            "Service Registered: " + name
        );

        return true;

    },

    get(name) {

        return this.services[name] || null;

    },

    exists(name) {

        return this.services.hasOwnProperty(name);

    },

    list() {

        return Object.keys(this.services);

    },

    remove(name) {

        if (!this.exists(name)) {

            return false;

        }

        delete this.services[name];

        Logger.info(
            "Service Removed: " + name
        );

        return true;

    },

    clear() {

        this.services = {};

        Logger.info(
            "Service Registry Cleared."
        );

    },

    async initializeAll() {

        Logger.info(
            "Initializing Registered Services..."
        );

        for (const name of this.list()) {

            const service = this.services[name];

            if (

                service &&

                typeof service.initialize === "function"

            ) {

                await service.initialize();

            }

        }

        Logger.info(
            "All Services Initialized."
        );

    }

};

window.ServiceRegistry = ServiceRegistry;

Object.freeze(ServiceRegistry);
