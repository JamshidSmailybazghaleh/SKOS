/*
==========================================================
SKOS Executive Command Center
Dashboard Service
Version : 1.0.0
BUILD : BUILD-000002
==========================================================
*/

import dataLoader from "./data-loader.js";

class DashboardService {

    constructor() {

        this.dashboard = null;

    }

    async initialize() {

        this.dashboard =
            await dataLoader.loadDashboard();

        console.info(
            "[DashboardService] Initialized"
        );

        return this.dashboard;

    }

    async getDashboard() {

        if (!this.dashboard) {

            await this.initialize();

        }

        return this.dashboard;

    }

    async getWidgets() {

        const dashboard =
            await this.getDashboard();

        return dashboard?.dashboard?.widgets || [];

    }

    async getSections() {

        const dashboard =
            await this.getDashboard();

        return dashboard?.dashboard?.sections || {};

    }

    async getMetrics() {

        const dashboard =
            await this.getDashboard();

        return dashboard?.dashboard?.metrics || {};

    }

    async getRefreshPolicy() {

        const dashboard =
            await this.getDashboard();

        return dashboard?.dashboard?.refresh || {};

    }

    async reload() {

        dataLoader.remove(
            "dashboard.json"
        );

        this.dashboard = null;

        return await this.initialize();

    }

    shutdown() {

        this.dashboard = null;

        console.info(
            "[DashboardService] Shutdown"
        );

    }

}

const dashboardService =
    new DashboardService();

export default dashboardService;
