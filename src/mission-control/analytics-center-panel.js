/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Analytics Center Panel
 * File      : analytics-center-panel.js
 *
 * Build     : BUILD-000819.1
 * Version   : 1.0.0
 * ==========================================================
 */

class AnalyticsCenterPanel {

    constructor(controller = null, options = {}) {

        this.name = "Analytics Center Panel";
        this.version = "1.0.0";
        this.status = "CREATED";

        this.controller = controller;
        this.options = options;

        this.sources = new Map();

        this.metrics = {};

        this.kpis = {};

        this.history = [];

        this.snapshot = null;

    }

    initialize() {

        this.status = "INITIALIZED";

        this.recordHistory(
            "INITIALIZED"
        );

        return true;

    }

    connectController(controller) {

        if (!controller) {

            throw new Error(
                "Controller required."
            );

        }

        this.controller = controller;

        this.status = "CONNECTED";

        this.recordHistory(
            "CONTROLLER_CONNECTED"
        );

        return true;

    }

    registerSource(

        sourceId,

        source

    ) {

        if (!sourceId) {

            throw new Error(
                "Source id required."
            );

        }

        this.sources.set(

            sourceId,

            source

        );

        return true;

    }

    removeSource(sourceId) {

        return this.sources.delete(sourceId);

    }

    collectMetrics() {

        const metrics = {};

        for (

            const [

                id,

                source

            ]

            of

            this.sources

        ) {

            if (

                source &&

                typeof source.getStatistics

                === "function"

            ) {

                metrics[id] =

                    source.getStatistics();

            }

        }

        this.metrics = metrics;

        return metrics;

    }

    calculateKPIs() {

        const kpis = {

            totalSources:

                this.sources.size,

            activeSources:

                Object.keys(
                    this.metrics
                ).length,

            timestamp:

                new Date()

        };

        this.kpis = kpis;

        return kpis;

    }

    generateExecutiveSummary() {

        return {

            health:

                "READY",

            sources:

                this.sources.size,

            metrics:

                Object.keys(
                    this.metrics
                ).length,

            generatedAt:

                new Date()

        };

    }

    generateSnapshot() {

        const runtime =

            this.controller

                ?

                this.controller
                    .getSnapshot()

                :

                null;

        this.collectMetrics();

        this.calculateKPIs();

        this.snapshot = {

            title:

                this.name,

            runtime,

            metrics:

                this.metrics,

            kpis:

                this.kpis,

            summary:

                this.generateExecutiveSummary(),

            generatedAt:

                new Date()

        };

        this.recordHistory(
            "SNAPSHOT_GENERATED"
        );

        return this.snapshot;

    }

    refresh() {

        return this.generateSnapshot();

    }

    getAnalytics() {

        return {

            metrics:

                this.metrics,

            kpis:

                this.kpis

        };

    }

    getHistory() {

        return this.history;

    }

    getSnapshot() {

        return this.snapshot;

    }

    recordHistory(event) {

        this.history.push({

            event,

            timestamp:

                new Date()

        });

    }

    export() {

        return JSON.stringify(

            this.snapshot,

            null,

            2

        );

    }

    getStatus() {

        return {

            name:

                this.name,

            version:

                this.version,

            status:

                this.status,

            sources:

                this.sources.size

        };

    }

    shutdown() {

        this.status = "SHUTDOWN";

        this.recordHistory(
            "SHUTDOWN"
        );

        return true;

    }

}

module.exports =
    AnalyticsCenterPanel;
