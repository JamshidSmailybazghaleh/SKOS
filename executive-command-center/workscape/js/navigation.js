/* ===========================================================
   SKOS Executive Command Center
   -----------------------------------------------------------
   Module    : WorkScape
   File      : navigation.js
   Version   : 1.0.0
   Build     : BUILD-000514
   Purpose   : Workspace Navigation Manager
=========================================================== */

"use strict";

class NavigationManager {

    constructor() {

        this.currentView = "dashboard";

        this.routes = {};

    }

    register(name, callback) {

        this.routes[name] = callback;

    }

    navigate(name) {

        if (!this.routes[name]) {

            console.warn(
                "Route not found:",
                name
            );

            return;

        }

        this.currentView = name;

        this.routes[name]();

    }

    getCurrentView() {

        return this.currentView;

    }

    initialize() {

        console.log(
            "[Navigation] Ready"
        );

    }

}

window.NavigationManager =
    NavigationManager;
