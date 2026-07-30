/* ===========================================================
   SKOS Executive Command Center
   -----------------------------------------------------------
   Module    : WorkScape
   File      : state-manager.js
   Version   : 1.0.0
   Build     : BUILD-000516
   Purpose   : Global State Manager
=========================================================== */

"use strict";

class StateManager {

    constructor() {

        this.state = {};

    }

    initialize(initialState = {}) {

        this.state = { ...initialState };

    }

    set(key, value) {

        this.state[key] = value;

    }

    get(key) {

        return this.state[key];

    }

    has(key) {

        return Object.prototype.hasOwnProperty.call(
            this.state,
            key
        );

    }

    remove(key) {

        delete this.state[key];

    }

    clear() {

        this.state = {};

    }

    getState() {

        return { ...this.state };

    }

    replace(newState = {}) {

        this.state = { ...newState };

    }

}

window.StateManager = StateManager;
