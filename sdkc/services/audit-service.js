/*
====================================================
SKOS Mission Control

Audit Service

File:
audit-service.js

Version:
1.0

Status:
ACTIVE
====================================================
*/


const AuditService = {


    logs: [],


    async initialize() {

        Logger.info(
            "Audit Service Initializing..."
        );

        return true;

    },


    record(
        action,
        object,
        details = {}
    ) {


        const entry = {


            id:

                this.generateAuditID(),


            action:

                action,


            objectID:

                object
                    ? object.id
                    : null,


            objectType:

                object
                    ? object.type
                    : null,


            timestamp:

                new Date()
                .toISOString(),


            details:

                details


        };


        this.logs.push(entry);


        Logger.info(

            "Audit Recorded: " +

            action

        );


        if (window.EventBus) {

            EventBus.publish(

                "audit.recorded",

                entry

            );

        }


        return entry;

    },


    generateAuditID() {


        return (

            "AUDIT-" +

            Date.now()

        );

    },


    getLogs() {


        return this.logs;

    },


    getObjectHistory(id) {


        return this.logs.filter(

            log =>

            log.objectID === id

        );

    },


    clear() {


        this.logs = [];

    },


    status() {

        return "READY";

    }

};


window.AuditService =

    AuditService;


Object.freeze(
    AuditService
);
