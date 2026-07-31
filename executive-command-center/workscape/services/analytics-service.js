/*
==========================================================
SKOS Executive Command Center
Analytics Service
Version : 1.0.0
BUILD : BUILD-000006
==========================================================
*/

import dataLoader from "./data-loader.js";

class AnalyticsService {

    constructor() {

        this.analytics = null;

    }

    async initialize() {

        this.analytics =
            await dataLoader.loadAnalytics();

        console.info(
            "[AnalyticsService] Initialized"
        );

        return this.analytics;

    }

    async getAnalytics() {

        if (!this.analytics) {

            await this.initialize();

        }

        return this.analytics;

    }

    async getOverview() {

        const analytics =
            await this.getAnalytics();

        return analytics?.analytics?.overview || {};

    }

    async getKPIs() {

        const analytics =
            await this.getAnalytics();

        return analytics?.analytics?.kpis || [];

    }

    async getPerformance() {

        const analytics =
            await this.getAnalytics();

        return analytics?.analytics?.performance || {};

    }

    async getTimeline() {

        const analytics =
            await this.getAnalytics();

        return analytics?.analytics?.timeline || [];

    }

    async getAlerts() {

        const analytics =
            await this.getAnalytics();

        return analytics?.analytics?.alerts || [];

    }

    async getKPI(id) {

        const list = await this.getKPIs();

        return list.find(
            kpi => kpi.id === id
        ) || null;

    }

    async reload() {

        dataLoader.remove(
            "analytics.json"
        );

        this.analytics = null;

        return await this.initialize();

    }

    shutdown() {

        this.analytics = null;

        console.info(
            "[AnalyticsService] Shutdown"
        );

    }

}

const analyticsService =
    new AnalyticsService();

export default analyticsService;
