/*
====================================================
SKOS Mission Control

Service Manager

File:
service-manager.js

Version:
1.0

Status:
ACTIVE
====================================================
*/

const ServiceManager = {

    initialized: false,

    async initialize() {

        Logger.info(
            "Service Manager Initializing..."
        );

        await ServiceRegistry.initializeAll();

        this.initialized = true;

        Logger.info(
            "Service Manager Ready."
        );

        return true;

    },

    async restart(serviceName) {

        const service =

            ServiceRegistry.get(serviceName);

        if (!service) {

            Logger.error(

                "Service not found: " +

                serviceName

            );

            return false;

        }

        if (

            typeof service.shutdown ===

            "function"

        ) {

            await service.shutdown();

        }

        if (

            typeof service.initialize ===

            "function"

        ) {

            await service.initialize();

        }

        Logger.info(

            "Service Restarted: " +

            serviceName

        );

        return true;

    },

    async shutdown(serviceName) {

        const service =

            ServiceRegistry.get(serviceName);

        if (!service) {

            return false;

        }

        if (

            typeof service.shutdown ===

            "function"

        ) {

            await service.shutdown();

        }

        Logger.info(

            "Service Shutdown: " +

            serviceName

        );

        return true;

    },

    get(serviceName) {

        return ServiceRegistry.get(

            serviceName

        );

    },

    list() {

        return ServiceRegistry.list();

    },

    isInitialized() {

        return this.initialized;

    }

};

window.ServiceManager = ServiceManager;

Object.freeze(ServiceManager);
