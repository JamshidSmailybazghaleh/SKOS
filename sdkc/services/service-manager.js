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

    services: new Map(),

    async initialize() {

        Logger.info(
            "Service Manager Initializing..."
        );

        return true;

    },

    register(name, service) {

        if (!name || !service) {

            Logger.error(
                "Invalid Service Registration."
            );

            return false;

        }

        this.services.set(

            name,

            {

                instance: service,

                status: "REGISTERED",

                startedAt: null

            }

        );

        Logger.info(

            "Service Registered: " +

            name

        );

        return true;

    },

    async start(name) {

        const service =

            this.services.get(name);

        if (!service) {

            Logger.error(

                "Service Not Found: " +

                name

            );

            return false;

        }

        if (

            typeof service.instance.initialize ===

            "function"

        ) {

            await service.instance.initialize();

        }

        service.status = "RUNNING";

        service.startedAt =

            new Date().toISOString();

        Logger.info(

            "Service Started: " +

            name

        );

        return true;

    },

    stop(name) {

        const service =

            this.services.get(name);

        if (!service) {

            return false;

        }

        if (

            typeof service.instance.shutdown ===

            "function"

        ) {

            service.instance.shutdown();

        }

        service.status = "STOPPED";

        Logger.info(

            "Service Stopped: " +

            name

        );

        return true;

    },

    async restart(name) {

        this.stop(name);

        return await this.start(name);

    },

    get(name) {

        return this.services.get(name);

    },

    getStatus(name) {

        const service =

            this.services.get(name);

        if (!service) {

            return "UNKNOWN";

        }

        return service.status;

    },

    list() {

        return Array.from(

            this.services.entries()

        ).map(

            ([name, service]) => ({

                name,

                status: service.status,

                startedAt:

                    service.startedAt

            })

        );

    },

    statistics() {

        const stats = {

            total:

                this.services.size,

            running: 0,

            stopped: 0,

            registered: 0

        };

        this.services.forEach(

            service => {

                switch (service.status) {

                    case "RUNNING":
                        stats.running++;
                        break;

                    case "STOPPED":
                        stats.stopped++;
                        break;

                    case "REGISTERED":
                        stats.registered++;
                        break;

                }

            }

        );

        return stats;

    },

    status() {

        return "READY";

    }

};

window.ServiceManager =
    ServiceManager;

Object.freeze(
    ServiceManager
);
