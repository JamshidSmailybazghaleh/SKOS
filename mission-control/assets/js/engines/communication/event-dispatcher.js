/**
 * ============================================================
 * SKOS - Smaily Knowledge Operating System
 * Event Dispatcher
 * ------------------------------------------------------------
 * File      : event-dispatcher.js
 * Operation : OP-010
 * Build     : BUILD-000333
 * Version   : 1.0.0
 * Status    : ACTIVE
 * ============================================================
 *
 * Mission:
 * Manages event distribution inside SKOS.
 *
 * Responsibilities:
 * - Create events
 * - Register event listeners
 * - Dispatch events
 * - Manage event lifecycle
 * - Record event history
 *
 * NOTE:
 * Event Dispatcher does not interpret events.
 * It only distributes signals between components.
 * ============================================================
 */


class EventDispatcher {


    constructor() {


        this.name = "EventDispatcher";

        this.version = "1.0.0";


        this.initialized = false;

        this.running = false;


        this.listeners = new Map();


        this.eventQueue = [];


        this.history = [];



        this.statistics = {


            created: 0,

            dispatched: 0,

            delivered: 0,

            failed: 0


        };


    }





    /**
     * Initialize Dispatcher
     */
    initialize() {


        if (this.initialized) {

            return true;

        }


        this.initialized = true;


        return true;


    }





    /**
     * Start Dispatcher
     */
    start() {


        if (!this.initialized) {

            this.initialize();

        }


        this.running = true;


        return true;


    }





    /**
     * Shutdown Dispatcher
     */
    shutdown() {


        this.running = false;


        return true;


    }






    /**
     * Register event listener
     */
    subscribe(eventType, listener) {


        if (!this.listeners.has(eventType)) {


            this.listeners.set(

                eventType,

                []

            );


        }



        this.listeners

            .get(eventType)

            .push(listener);



        return true;


    }





    /**
     * Remove listener
     */
    unsubscribe(eventType, listener) {


        if (!this.listeners.has(eventType)) {


            return false;


        }



        const handlers = this.listeners.get(eventType);



        this.listeners.set(

            eventType,

            handlers.filter(

                item => item !== listener

            )

        );



        return true;


    }





    /**
     * Create Event
     */
    create(type, payload = {}) {



        const event = {


            id: this.generateID(),


            type,


            payload,


            timestamp: new Date(),


            status: "CREATED"


        };



        this.statistics.created++;


        return event;


    }





    /**
     * Dispatch Event
     */
    dispatch(event) {



        if (!this.running) {


            this.statistics.failed++;


            return false;


        }



        this.eventQueue.push(event);



        this.statistics.dispatched++;



        this.process();



        return true;


    }





    /**
     * Process Event Queue
     */
    process() {



        while (this.eventQueue.length > 0) {



            const event = this.eventQueue.shift();



            this.deliver(event);



        }


    }







    /**
     * Deliver Event
     */
    deliver(event) {



        const handlers = this.listeners.get(event.type);



        if (!handlers) {


            this.record({

                action: "NO_HANDLER",

                event

            });


            return false;


        }





        handlers.forEach(handler => {



            try {


                handler(event);



                this.statistics.delivered++;



            }

            catch(error) {



                this.statistics.failed++;


            }



        });




        event.status = "DELIVERED";



        this.record({

            action: "DELIVER",

            event

        });



        return true;


    }





    /**
     * Broadcast Event
     */
    broadcast(event) {



        this.listeners.forEach(

            handlers => {



                handlers.forEach(

                    handler => {


                        handler(event);


                    }

                );


            }

        );



        return true;


    }





    /**
     * Generate Event ID
     */
    generateID() {



        return (

            "evt-" +

            Date.now() +

            "-" +

            Math.floor(

                Math.random() * 10000

            )

        );


    }






    /**
     * Record Event History
     */
    record(entry) {



        this.history.push({


            timestamp: new Date(),


            ...entry



        });



    }







    /**
     * Health Check
     */
    healthCheck() {



        return {


            component: this.name,


            version: this.version,


            initialized: this.initialized,


            running: this.running,


            eventTypes: this.listeners.size,


            queueSize: this.eventQueue.length,


            historySize: this.history.length,


            statistics: this.statistics



        };


    }





    /**
     * Reset Dispatcher
     */
    reset() {



        this.listeners.clear();


        this.eventQueue = [];


        this.history = [];



        this.statistics = {



            created: 0,


            dispatched: 0,


            delivered: 0,


            failed: 0



        };


    }


}





/**
 * Export
 */


if (typeof module !== "undefined") {


    module.exports = EventDispatcher;


}



if (typeof window !== "undefined") {


    window.EventDispatcher = EventDispatcher;


}
