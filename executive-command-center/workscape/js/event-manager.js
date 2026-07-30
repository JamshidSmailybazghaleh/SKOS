/* ===========================================================
   SKOS Executive Command Center
   -----------------------------------------------------------
   Module    : WorkScape
   File      : event-manager.js
   Version   : 1.0.0
   Build     : BUILD-000515
   Purpose   : Global Event Manager
=========================================================== */

"use strict";

class EventManager {

    constructor() {

        this.events = {};

    }

    subscribe(eventName, listener) {

        if (!this.events[eventName]) {

            this.events[eventName] = [];

        }

        this.events[eventName].push(listener);

    }

    unsubscribe(eventName, listener) {

        if (!this.events[eventName]) {

            return;

        }

        this.events[eventName] =
            this.events[eventName].filter(
                item => item !== listener
            );

    }

    publish(eventName, payload = {}) {

        if (!this.events[eventName]) {

            return;

        }

        this.events[eventName].forEach(listener => {

            listener(payload);

        });

    }

    clear(eventName) {

        if (this.events[eventName]) {

            delete this.events[eventName];

        }

    }

    clearAll() {

        this.events = {};

    }

}

window.EventManager = EventManager;
