/*
====================================================
SKOS Mission Control

Event Bus Service

BUILD-000381

Version:
1.0.0

Status:
ACTIVE
====================================================
*/

class EventBusService {


    constructor() {

        this.subscribers = new Map();

        this.events = [];

        this.initialized = false;

    }


    async initialize() {

        Logger.info(
            "Event Bus Service Initializing..."
        );

        this.initialized = true;

        return true;

    }


    subscribe(
        eventType,
        handler
    ) {


        if (!this.subscribers.has(eventType)) {

            this.subscribers.set(

                eventType,

                []

            );

        }


        this.subscribers

            .get(eventType)

            .push(handler);


    }


    async publish(

        eventType,

        payload,

        source = "SYSTEM"

    ) {


        const event = {

            eventId:

                "EVT-" + Date.now(),

            type:

                eventType,

            source,

            payload,

            timestamp:

                new Date().toISOString()

        };


        this.events.push(event);


        const handlers =

            this.subscribers.get(

                eventType

            ) || [];


        for (const handler of handlers) {

            await handler(event);

        }


        AuditService.record(

            "EVENT_PUBLISHED",

            event

        );


        return event;

    }


    getEvents() {

        return this.events;

    }


    getEventsByType(type) {

        return this.events.filter(

            event =>

            event.type === type

        );

    }


    status() {

        return {

            initialized:

                this.initialized,

            events:

                this.events.length,

            subscriptions:

                this.subscribers.size

        };

    }

}


window.EventBusService =

    new EventBusService();


Object.freeze(

    window.EventBusService

);
