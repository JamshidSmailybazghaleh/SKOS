/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Monitoring Communication Bridge
 * File      : monitoring-communication-bridge.js
 *
 * Build     : BUILD-000802.1
 * Version   : 1.0.0
 *
 * Mission:
 * Bridge monitoring events between SKOS
 * monitoring layer and communication layer.
 *
 * Responsibilities:
 * - Receive monitoring events
 * - Normalize operational messages
 * - Dispatch notifications
 * - Maintain communication history
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class MonitoringCommunicationBridge {


    constructor(options = {}) {


        this.name =
            "Monitoring Communication Bridge";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.messages =
            [];


        this.history =
            [];


        this.events =
            [];


        this.options =
            options;


        this.counter =
            0;


    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "MONITORING_BRIDGE_INITIALIZED"

        );


        return true;

    }





    activate() {


        if (
            this.status !==
            "INITIALIZED"
        ) {

            throw new Error(
                "Bridge must be initialized first."
            );

        }



        this.status =
            "ACTIVE";



        this.recordEvent(

            "MONITORING_BRIDGE_ACTIVATED"

        );



        return true;

    }





    createMessage(

        source,

        target,

        type,

        payload = {}

    ) {


        this.counter++;



        const message = {


            id:

                `MSG-${String(this.counter)
                .padStart(6, "0")}`,


            source,


            target,


            type,


            payload,


            status:

                "CREATED",


            createdAt:

                new Date(),


            sentAt:

                null


        };



        this.messages.push(

            message

        );



        this.recordEvent(

            "MESSAGE_CREATED",

            message

        );



        return message;

    }





    receiveAlert(

        alert

    ) {


        if (!alert) {


            throw new Error(

                "Alert required."

            );

        }



        return this.createMessage(

            "Alert Manager",

            "Communication Engine",

            "ALERT_NOTIFICATION",

            alert

        );

    }





    sendMessage(

        messageId

    ) {


        const message =
            this.messages.find(

                item =>
                    item.id === messageId

            );



        if (!message) {


            throw new Error(

                "Message not found."

            );

        }



        message.status =
            "SENT";


        message.sentAt =
            new Date();



        this.recordEvent(

            "MESSAGE_SENT",

            message

        );



        return message;

    }





    failMessage(

        messageId,

        reason

    ) {


        const message =
            this.messages.find(

                item =>
                    item.id === messageId

            );



        if (!message) {


            throw new Error(

                "Message not found."

            );

        }



        message.status =
            "FAILED";



        message.failureReason =
            reason || "Unknown";



        this.recordEvent(

            "MESSAGE_FAILED",

            message

        );



        return message;

    }





    getMessages() {


        return this.messages;

    }





    getSentMessages() {


        return this.messages.filter(

            message =>
                message.status === "SENT"

        );

    }





    getFailedMessages() {


        return this.messages.filter(

            message =>
                message.status === "FAILED"

        );

    }





    getHistory() {


        return this.history;

    }





    getEvents() {


        return this.events;

    }





    getStatistics() {


        return {


            totalMessages:

                this.messages.length,


            sentMessages:

                this.getSentMessages()
                .length,


            failedMessages:

                this.getFailedMessages()
                .length,


            events:

                this.events.length

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


            messages:

                this.messages.length


        };

    }





    recordHistory(

        event,

        data = {}

    ) {


        this.history.push({

            event,


            data,


            timestamp:

                new Date()

        });

    }





    recordEvent(

        event,

        data = {}

    ) {


        this.events.push({

            event,


            data,


            timestamp:

                new Date()

        });



        this.recordHistory(

            event,

            data

        );

    }





    shutdown() {


        this.status =
            "SHUTDOWN";



        this.recordEvent(

            "MONITORING_BRIDGE_SHUTDOWN"

        );



        return true;

    }


}



module.exports =
    MonitoringCommunicationBridge;
