/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Message Bus
 * File      : message-bus.js
 *
 * Build     : BUILD-000803.1
 * Version   : 1.0.0
 *
 * Mission:
 * Provide internal event communication
 * between SKOS components.
 *
 * ==========================================================
 */


class MessageBus {


    constructor(options = {}) {


        this.name =
            "Message Bus";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.messages =
            [];


        this.subscribers =
            new Map();


        this.history =
            [];


        this.events =
            [];


        this.counter =
            0;


        this.options =
            options;

    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(
            "MESSAGE_BUS_INITIALIZED"
        );


        return true;

    }





    subscribe(

        eventType,

        handler

    ) {


        if (!eventType) {


            throw new Error(
                "Event type required."
            );

        }



        if (
            typeof handler !==
            "function"
        ) {


            throw new Error(
                "Handler must be function."
            );

        }



        if (
            !this.subscribers.has(
                eventType
            )
        ) {


            this.subscribers.set(

                eventType,

                []

            );

        }



        this.subscribers
            .get(eventType)
            .push(handler);



        this.recordEvent(

            "SUBSCRIBER_REGISTERED",

            {
                eventType
            }

        );



        return true;

    }





    publish(

        eventType,

        payload = {},

        source = "UNKNOWN"

    ) {


        this.counter++;



        const message = {


            id:

                `MSG-${String(
                    this.counter
                ).padStart(6,"0")}`,


            type:

                eventType,


            source,


            payload,


            status:

                "PUBLISHED",


            timestamp:

                new Date()

        };



        this.messages.push(

            message

        );



        this.recordEvent(

            "MESSAGE_PUBLISHED",

            message

        );



        this.dispatch(

            message

        );



        return message;

    }





    dispatch(

        message

    ) {


        const handlers =

            this.subscribers.get(

                message.type

            ) || [];



        handlers.forEach(

            handler => {


                try {


                    handler(
                        message
                    );


                }

                catch(error) {


                    this.recordEvent(

                        "MESSAGE_HANDLER_ERROR",

                        {

                            messageId:
                                message.id,


                            error:
                                error.message

                        }

                    );


                }


            }

        );



        return true;

    }





    getMessages() {


        return this.messages;

    }





    getSubscribers() {


        return this.subscribers;

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


            eventTypes:

                this.subscribers.size,


            history:

                this.history.length,


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

            "MESSAGE_BUS_SHUTDOWN"

        );


        return true;

    }


}



module.exports =
    MessageBus;
