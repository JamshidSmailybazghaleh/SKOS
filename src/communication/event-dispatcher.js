/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Event Dispatcher
 * File      : event-dispatcher.js
 *
 * Build     : BUILD-000803.3
 * Version   : 1.0.0
 *
 * Mission:
 * Route and execute internal SKOS events.
 *
 * ==========================================================
 */


class EventDispatcher {


    constructor(options = {}) {


        this.name =
            "Event Dispatcher";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.routes =
            new Map();


        this.history =
            [];


        this.events =
            [];


        this.options =
            options;


    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "EVENT_DISPATCHER_INITIALIZED"

        );


        return true;

    }





    registerRoute(

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



        this.routes.set(

            eventType,

            handler

        );



        this.recordEvent(

            "ROUTE_REGISTERED",

            {

                eventType

            }

        );



        return true;

    }





    dispatch(

        eventType,

        payload = {}

    ) {


        const handler =
            this.routes.get(

                eventType

            );



        const event = {


            type:

                eventType,


            payload,


            timestamp:

                new Date()


        };



        this.events.push(

            event

        );



        this.recordEvent(

            "EVENT_RECEIVED",

            event

        );



        if (!handler) {


            this.recordEvent(

                "NO_ROUTE_FOUND",

                event

            );


            return {

                dispatched:
                    false,

                event

            };

        }



        const result =
            handler(

                payload

            );



        this.recordEvent(

            "EVENT_DISPATCHED",

            {

                eventType,

                result

            }

        );



        return {


            dispatched:
                true,


            result


        };

    }





    hasRoute(

        eventType

    ) {


        return this.routes.has(

            eventType

        );

    }





    getRoutes() {


        return this.routes;

    }





    getEvents() {


        return this.events;

    }





    getHistory() {


        return this.history;

    }





    getStatistics() {


        return {


            routes:

                this.routes.size,


            events:

                this.events.length,


            history:

                this.history.length


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


            routes:

                this.routes.size


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


        this.recordHistory(

            event,

            data

        );

    }





    shutdown() {


        this.status =
            "SHUTDOWN";


        this.recordEvent(

            "EVENT_DISPATCHER_SHUTDOWN"

        );


        return true;

    }


}



module.exports =
    EventDispatcher;
