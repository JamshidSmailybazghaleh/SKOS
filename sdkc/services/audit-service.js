/*
====================================================
SKOS Mission Control

Audit Service

BUILD-000378

Version:
1.0.0

Status:
ACTIVE
====================================================
*/

class AuditService {

    constructor() {

        this.logs = [];

        this.initialized = false;

    }


    async initialize() {

        Logger.info(
            "Audit Service Initializing..."
        );

        this.initialized = true;

        return true;

    }


    record(
        eventType,
        data = {}
    ) {

        const event = {

            eventId:

                "AUD-" + Date.now(),

            eventType,

            actor:

                data.actor || "SYSTEM",

            resource:

                data.resource || null,

            details:

                data,

            timestamp:

                new Date().toISOString(),

            status:

                "SUCCESS"

        };


        this.logs.push(event);


        Logger.info(

            "Audit Event: " +

            eventType

        );


        return event;

    }


    getAll() {

        return this.logs;

    }


    findByType(eventType) {

        return this.logs.filter(

            log =>

            log.eventType === eventType

        );

    }


    findByActor(actor) {

        return this.logs.filter(

            log =>

            log.actor === actor

        );

    }


    latest(limit = 10) {

        return this.logs.slice(

            -limit

        );

    }


    clear() {

        this.logs = [];

    }


    status() {

        return {

            initialized:

                this.initialized,

            records:

                this.logs.length

        };

    }

}


window.AuditService =

    new AuditService();


Object.freeze(

    window.AuditService

);
