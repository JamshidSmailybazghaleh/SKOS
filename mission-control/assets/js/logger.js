/*
====================================================
SKOS Mission Control

Logger Engine

File:
logger.js

Version:
1.0

Status:
ACTIVE
====================================================
*/

const Logger = {

    history: [],

    write(level, message) {

        const entry = {

            time: new Date().toISOString(),

            level: level,

            message: message

        };

        this.history.push(entry);

        console.log(

            "[" + level + "]",

            message

        );

    },

    info(message) {

        this.write(

            "INFO",

            message

        );

    },

    warning(message) {

        this.write(

            "WARNING",

            message

        );

    },

    error(message) {

        this.write(

            "ERROR",

            message

        );

    },

    critical(message) {

        this.write(

            "CRITICAL",

            message

        );

    },

    getHistory() {

        return this.history;

    },

    clear() {

        this.history = [];

    }

};

window.Logger = Logger;

Object.freeze(Logger);
