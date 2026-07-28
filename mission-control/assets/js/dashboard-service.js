/*
====================================================
SKOS Mission Control

Dashboard Service

File:
dashboard-service.js

Version:
1.0

Status:
ACTIVE
====================================================
*/

const DashboardService = {

    async initialize() {

        Logger.info(
            "Dashboard Service Initializing..."
        );

        this.render();

        return true;

    },

    render() {

        this.renderSystemStatus();

        this.renderBuild();

        this.renderModules();

        this.renderHealth();

    },

    renderSystemStatus() {

        const element = document.getElementById(
            "system-status"
        );

        if (!element) {

            return;

        }

        element.textContent =

            RuntimeService.getSystemStatus();

    },

    renderBuild() {

        const element = document.getElementById(
            "current-build"
        );

        if (!element) {

            return;

        }

        const build =

            BuildService.getLatestBuild();

        element.textContent =

            build ?

            build.id :

            "-";

    },

    renderModules() {

        const element = document.getElementById(
            "loaded-modules"
        );

        if (!element) {

            return;

        }

        const modules =

            ModuleService.listModules();

        element.textContent =

            modules.length;

    },

    renderHealth() {

        const element = document.getElementById(
            "system-health"
        );

        if (!element) {

            return;

        }

        element.textContent =

            RuntimeService.isOperational()

            ? "HEALTHY"

            : "DEGRADED";

    },

    refresh() {

        Logger.info(

            "Dashboard Refreshed."

        );

        this.render();

    }

};

window.DashboardService = DashboardService;

Object.freeze(DashboardService);
