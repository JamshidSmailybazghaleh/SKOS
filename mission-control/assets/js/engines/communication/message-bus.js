/**
 * ============================================================
 * SKOS - Smaily Knowledge Operating System
 * Message Bus
 * ------------------------------------------------------------
 * File      : message-bus.js
 * Operation : OP-010
 * Build     : BUILD-000332
 * Version   : 1.0.0
 * Status    : ACTIVE
 * ============================================================
 *
 * Mission:
 * Provides an internal communication backbone for SKOS.
 *
 * Responsibilities:
 * - Queue messages
 * - Publish messages
 * - Subscribe receivers
 * - Route messages
 * - Manage message lifecycle
 *
 * NOTE:
 * Message Bus does not analyze messages.
 * It only transports communication objects.
 * ============================================================
 */


class MessageBus {

    constructor() {

        this.name = "MessageBus";
        this.version = "1.0.0";

        this.initialized = false;
        this.running = false;

        this.queue = [];

        this.subscribers = new Map();

        this.messageHistory = [];

        this.statistics = {

            published: 0,
            delivered: 0,
            consumed: 0,
            failed: 0

        };

    }


    /**
     * Initialize Message Bus
     */
    initialize() {

        if (this.initialized) {

            return true;

        }


        this.initialized = true;

        return true;

    }


    /**
     * Start Message Bus
     */
    start() {

        if (!this.initialized) {

            this.initialize();

        }


        this.running = true;

        return true;

    }


    /**
     * Stop Message Bus
     */
    stop() {

        this.running = false;

        return true;

    }


    /**
     * Subscribe receiver to channel
     */
    subscribe(channel, receiver) {


        if (!this.subscribers.has(channel)) {

            this.subscribers.set(channel, []);

        }


        this.subscribers
            .get(channel)
            .push(receiver);


        return true;

    }



    /**
     * Remove subscriber
     */
    unsubscribe(channel, receiver) {


        if (!this.subscribers.has(channel)) {

            return false;

        }


        const receivers = this.subscribers.get(channel);


        this.subscribers.set(

            channel,

            receivers.filter(

                item => item !== receiver

            )

        );


        return true;

    }



    /**
     * Publish message
     */
    publish(message) {


        if (!this.running) {

            this.statistics.failed++;

            return false;

        }


        this.queue.push(message);


        this.statistics.published++;


        this.record({

            action: "PUBLISH",

            message

        });


        return true;

    }



    /**
     * Process queue
     */
    process() {


        while (this.queue.length > 0) {


            const message = this.queue.shift();


            this.deliver(message);


        }


    }



    /**
     * Deliver message
     */
    deliver(message) {


        const channel = message.destination;


        if (!this.subscribers.has(channel)) {


            this.statistics.failed++;

            return false;

        }



        const receivers = this.subscribers.get(channel);



        receivers.forEach(receiver => {


            try {


                receiver(message);


                this.statistics.delivered++;


            }

            catch(error) {


                this.statistics.failed++;


            }


        });



        this.statistics.consumed++;


        this.record({

            action: "DELIVER",

            message

        });


        return true;

    }




    /**
     * Broadcast message
     */
    broadcast(message) {


        this.subscribers.forEach(

            (receivers, channel) => {


                this.publish({

                    ...message,

                    destination: channel

                });


            }

        );


    }



    /**
     * Get Queue Status
     */
    getQueueStatus() {


        return {

            size: this.queue.length,

            messages: this.queue

        };


    }



    /**
     * Record history
     */
    record(entry) {


        this.messageHistory.push({

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

            channels: this.subscribers.size,

            queueSize: this.queue.length,

            historySize: this.messageHistory.length,

            statistics: this.statistics


        };


    }




    /**
     * Reset Bus
     */
    reset() {


        this.queue = [];

        this.subscribers.clear();

        this.messageHistory = [];


        this.statistics = {


            published: 0,

            delivered: 0,

            consumed: 0,

            failed: 0


        };


    }


}


/**
 * Export
 */

if (typeof module !== "undefined") {

    module.exports = MessageBus;

}


if (typeof window !== "undefined") {

    window.MessageBus = MessageBus;

}
