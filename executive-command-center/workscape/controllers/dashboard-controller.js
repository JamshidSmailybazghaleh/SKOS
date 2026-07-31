/*
==========================================================
SKOS Executive Command Center
Dashboard Controller
Version : 1.0.0
BUILD : BUILD-000008
==========================================================
*/

import dashboardService
from "../services/dashboard-service.js";


class DashboardController {

    constructor() {

        this.dashboard = null;

        this.widgets = [];

        this.metrics = {};

        this.sections = {};

    }



    async initialize() {

        this.dashboard =
            await dashboardService.getDashboard();

        this.widgets =
            await dashboardService.getWidgets();

        this.metrics =
            await dashboardService.getMetrics();

        this.sections =
            await dashboardService.getSections();

        console.info(
            "[DashboardController] Initialized"
        );

    }



    getDashboard() {

        return this.dashboard;

    }



    getWidgets() {

        return this.widgets;

    }



    getMetrics() {

        return this.metrics;

    }



    getSections() {

        return this.sections;

    }



    async refresh() {

        await dashboardService.reload();

        await this.initialize();

        console.info(
            "[DashboardController] Refreshed"
        );

    }



    shutdown() {

        this.dashboard = null;

        this.widgets = [];

        this.metrics = {};

        this.sections = {};

        console.info(
            "[DashboardController] Shutdown"
        );

    }

}


const dashboardController =
    new DashboardController();


export default dashboardController;
