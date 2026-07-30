/* ===========================================================
   SKOS Executive Command Center
   -----------------------------------------------------------
   Module    : WorkScape
   File      : logger.js
   Version   : 1.0.0
   Build     : BUILD-000517
   Purpose   : Logging Service
=========================================================== */

"use strict";

class Logger {

    constructor() {

        this.enabled = true;

    }

    timestamp() {

        return new Date().toISOString();

    }

    info(message, data = null) {

        if (!this.enabled) return;

        console.log(
            `[INFO] ${this.timestamp()} | ${message}`,
            data ?? ""
        );

    }

    warn(message, data = null) {

        if (!this.enabled) return;

        console.warn(
            `[WARN] ${this.timestamp()} | ${message}`,
            data ?? ""
        );

    }

    error(message, data = null) {

        if (!this.enabled) return;

        console.error(
            `[ERROR] ${this.timestamp()} | ${message}`,
            data ?? ""
        );

    }

    debug(message, data = null) {

        if (!this.enabled) return;

        console.debug(
            `[DEBUG] ${this.timestamp()} | ${message}`,
            data ?? ""
        );

    }

    enable() {

        this.enabled = true;

    }

    disable() {

        this.enabled = false;

    }

}

window.Logger = Logger;
