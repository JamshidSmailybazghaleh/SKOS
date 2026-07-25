/*
====================================================
SKOS Mission Control

Runtime Engine

File:
runtime.js

Version:
1.0

Status:
ACTIVE
====================================================
*/

const Runtime = {

    state: "BOOT",

    build: "",

    release: "",

    sprint: "",

    modulesLoaded: 0,

    errors: 0,

    initialize() {

        Logger.info(
            "Runtime Initialized"
        );

    },

    setState(state) {

        this.state = state;

        Logger.info(
            "State -> " + state
        );

    },

    getState() {

        return this.state;

    },

    incrementModules() {

        this.modulesLoaded++;

    },

    incrementErrors() {

        this.errors++;

    }

};

window.Runtime = Runtime;

Object.freeze(Runtime);
