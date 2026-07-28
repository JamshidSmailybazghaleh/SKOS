/*
====================================================
SKOS Mission Control

Event Bus Engine

File:
event-bus.js

Version:
1.0

Status:
ACTIVE
====================================================
*/

const EventBus = {

    events: {},

    subscribe(eventName, handler) {

        if (!this.events[eventName]) {

            this.events[eventName] = [];

        }

        this.events[eventName].push(handler);

        Logger.info(
            "Subscribed: " + eventName
        );

    },

    unsubscribe(eventName, handler) {

        if (!this.events[eventName]) {

            return;

        }

        this.events[eventName] =
            this.events[eventName].filter(

                item => item !== handler

            );

        Logger.info(
            "Unsubscribed: " + eventName
        );

    },

    publish(eventName, payload = null) {

        Logger.info(
            "Event: " + eventName
        );

        if (!this.events[eventName]) {

            return;

        }

        this.events[eventName].forEach(handler => {

            try {

                handler(payload);

            }

            catch (error) {

                Logger.error(

                    "Event Error: " +

                    eventName

                );

                console.error(error);

            }

        });

    },

    clear(eventName) {

        if (this.events[eventName]) {

            delete this.events[eventName];

        }

    },

    clearAll() {

        this.events = {};

    },

    list() {

        return Object.keys(

            this.events

        );

    }

};

window.EventBus = EventBus;

Object.freeze(EventBus);
