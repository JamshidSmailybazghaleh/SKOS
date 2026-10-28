/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Monitoring Dashboard
 * File      : monitoring-dashboard.js
 *
 * Build     : BUILD-000448.4
 *
 * Purpose:
 *   Stable monitoring presentation layer.
 *
 * Design Rules:
 *   - Never assume the monitoring API exists.
 *   - Never fabricate runtime data.
 *   - Never allow one rendering failure to stop the dashboard.
 *   - Preserve a clean API injection point for the real runtime.
 *   - Unknown remains UNKNOWN.
 *
 * ==========================================================
 */

(function (global) {

    "use strict";


    class MonitoringDashboard {

        constructor(api = null, options = {}) {

            this.name = "SKOS Monitoring Dashboard";

            this.version = "1.0.0";

            this.build = "BUILD-000448.4";

            this.api = api || null;

            this.refreshInterval =
                Number(options.refreshInterval) > 0
                    ? Number(options.refreshInterval)
                    : 2000;

            this.timer = null;

            this.running = false;

            this.initialized = false;

            this.lastData = null;

            this.lastError = null;
        }


        /**
         * ------------------------------------------------------
         * INITIALIZE
         * ------------------------------------------------------
         */

        initialize(api = null) {

            if (api) {

                this.api = api;

            }

            if (this.initialized) {

                return this;

            }

            this.initialized = true;

            this.render();

            this.start();

            return this;
        }


        /**
         * ------------------------------------------------------
         * START
         * ------------------------------------------------------
         */

        start() {

            if (this.running) {

                return this;

            }

            this.running = true;

            this.render();

            this.timer = setInterval(

                () => {

                    this.render();

                },

                this.refreshInterval

            );

            return this;
        }


        /**
         * ------------------------------------------------------
         * STOP
         * ------------------------------------------------------
         */

        stop() {

            if (this.timer !== null) {

                clearInterval(this.timer);

                this.timer = null;

            }

            this.running = false;

            return this;
        }


        /**
         * ------------------------------------------------------
         * DESTROY
         * ------------------------------------------------------
         */

        destroy() {

            this.stop();

            this.initialized = false;

            this.lastData = null;

            this.lastError = null;

            return this;
        }


        /**
         * ------------------------------------------------------
         * DATA ACQUISITION
         * ------------------------------------------------------
         */

        getData() {

            /*
             * The dashboard MUST NOT invent data.
             *
             * The actual monitoring API must provide:
             *
             * {
             *   runtime,
             *   health,
             *   metrics,
             *   performance,
             *   alerts,
             *   events
             * }
             */

            if (!this.api) {

                throw new Error(
                    "Monitoring API is not connected."
                );

            }


            if (
                typeof this.api.exportObject !==
                "function"
            ) {

                throw new Error(
                    "Monitoring API does not provide exportObject()."
                );

            }


            const data =
                this.api.exportObject();


            if (!data || typeof data !== "object") {

                throw new Error(
                    "Monitoring API returned invalid data."
                );

            }


            return data;
        }


        /**
         * ------------------------------------------------------
         * RENDER
         * ------------------------------------------------------
         */

        render() {

            let data;

            try {

                data = this.getData();

                this.lastData = data;

                this.lastError = null;

                this.setConnectionState(
                    "CONNECTED"
                );

            }

            catch (error) {

                this.lastError = error;

                this.lastData = null;

                this.setConnectionState(
                    "API UNAVAILABLE"
                );

                this.renderUnavailable();

                return;

            }


            this.safeRender(
                () => this.renderRuntime(
                    data.runtime
                )
            );

            this.safeRender(
                () => this.renderHealth(
                    data.health
                )
            );

            this.safeRender(
                () => this.renderMetrics(
                    data.metrics
                )
            );

            this.safeRender(
                () => this.renderPerformance(
                    data.performance
                )
            );

            this.safeRender(
                () => this.renderAlerts(
                    data.alerts
                )
            );

            this.safeRender(
                () => this.renderEvents(
                    data.events
                )
            );
        }


        /**
         * ------------------------------------------------------
         * SAFE RENDER
         * ------------------------------------------------------
         */

        safeRender(callback) {

            try {

                callback();

            }

            catch (error) {

                /*
                 * A rendering failure must never
                 * stop the monitoring cycle.
                 */

                this.lastError = error;

                console.error(
                    "SKOS Monitoring Dashboard:",
                    error
                );
            }
        }


        /**
         * ------------------------------------------------------
         * CONNECTION STATE
         * ------------------------------------------------------
         */

        setConnectionState(state) {

            const element =
                document.getElementById(
                    "monitoring-api-status"
                );

            if (!element) {

                return;

            }

            element.innerText = state;
        }


        /**
         * ------------------------------------------------------
         * UNAVAILABLE STATE
         * ------------------------------------------------------
         */

        renderUnavailable() {

            this.setText(
                "runtime-status",
                "UNKNOWN"
            );

            this.setText(
                "runtime-version",
                "UNKNOWN"
            );

            this.setText(
                "runtime-uptime",
                "UNKNOWN"
            );


            this.renderMessage(
                "health-list",
                "Monitoring API unavailable — health data UNKNOWN."
            );

            this.renderMessage(
                "metrics-list",
                "Monitoring API unavailable — metrics UNKNOWN."
            );

            this.renderMessage(
                "performance-list",
                "Monitoring API unavailable — performance UNKNOWN."
            );

            this.renderMessage(
                "alert-list",
                "Monitoring API unavailable — alerts UNKNOWN."
            );

            this.renderMessage(
                "event-list",
                "Monitoring API unavailable — events UNKNOWN."
            );
        }


        /**
         * ------------------------------------------------------
         * RUNTIME
         * ------------------------------------------------------
         */

        renderRuntime(runtime) {

            runtime = runtime || {};

            this.setText(
                "runtime-status",
                this.valueOrUnknown(
                    runtime.runtime
                )
            );

            this.setText(
                "runtime-version",
                this.valueOrUnknown(
                    runtime.version
                )
            );

            this.setText(
                "runtime-uptime",
                this.valueOrUnknown(
                    runtime.uptime
                )
            );
        }


        /**
         * ------------------------------------------------------
         * HEALTH
         * ------------------------------------------------------
         */

        renderHealth(list) {

            this.renderList(

                "health-list",

                Array.isArray(list)
                    ? list
                    : [],

                item => {

                    const id =
                        this.valueOrUnknown(
                            item.componentId
                        );

                    const state =
                        this.valueOrUnknown(
                            item.state
                        );

                    return `${id} : ${state}`;
                },

                "No health data available."
            );
        }


        /**
         * ------------------------------------------------------
         * METRICS
         * ------------------------------------------------------
         */

        renderMetrics(list) {

            this.renderList(

                "metrics-list",

                Array.isArray(list)
                    ? list
                    : [],

                metric => {

                    const name =
                        this.valueOrUnknown(
                            metric.name
                        );

                    const value =
                        this.valueOrUnknown(
                            metric.value
                        );

                    return `${name} = ${value}`;
                },

                "No metrics available."
            );
        }


        /**
         * ------------------------------------------------------
         * PERFORMANCE
         * ------------------------------------------------------
         */

        renderPerformance(list) {

            this.renderList(

                "performance-list",

                Array.isArray(list)
                    ? list
                    : [],

                item => {

                    const operationId =
                        this.valueOrUnknown(
                            item.operationId
                        );

                    const duration =
                        this.valueOrUnknown(
                            item.durationMs
                        );

                    return (
                        `${operationId} : ` +
                        `${duration} ms`
                    );
                },

                "No performance data available."
            );
        }


        /**
         * ------------------------------------------------------
         * ALERTS
         * ------------------------------------------------------
         */

        renderAlerts(list) {

            this.renderList(

                "alert-list",

                Array.isArray(list)
                    ? list
                    : [],

                alert => {

                    const severity =
                        this.valueOrUnknown(
                            alert.severity
                        );

                    const message =
                        this.valueOrUnknown(
                            alert.message
                        );

                    return (
                        `[${severity}] ${message}`
                    );
                },

                "No alerts available."
            );
        }


        /**
         * ------------------------------------------------------
         * EVENTS
         * ------------------------------------------------------
         */

        renderEvents(list) {

            const events =
                Array.isArray(list)
                    ? list.slice(0, 20)
                    : [];

            this.renderList(

                "event-list",

                events,

                event => {

                    return this.valueOrUnknown(
                        event.event
                    );
                },

                "No events available."
            );
        }


        /**
         * ------------------------------------------------------
         * GENERIC LIST RENDERER
         * ------------------------------------------------------
         */

        renderList(
            elementId,
            list,
            formatter,
            emptyMessage
        ) {

            const container =
                document.getElementById(
                    elementId
                );

            if (!container) {

                return;

            }

            container.innerHTML = "";


            if (!Array.isArray(list) ||
                list.length === 0) {

                this.renderMessageElement(
                    container,
                    emptyMessage
                );

                return;

            }


            list.forEach(item => {

                const div =
                    document.createElement(
                        "div"
                    );

                try {

                    div.innerText =
                        formatter(item);

                }

                catch (error) {

                    div.innerText =
                        "UNKNOWN";

                }

                container.appendChild(div);

            });
        }


        /**
         * ------------------------------------------------------
         * MESSAGE
         * ------------------------------------------------------
         */

        renderMessage(
            elementId,
            message
        ) {

            const container =
                document.getElementById(
                    elementId
                );

            if (!container) {

                return;

            }

            this.renderMessageElement(
                container,
                message
            );
        }


        renderMessageElement(
            container,
            message
        ) {

            container.innerHTML = "";

            const div =
                document.createElement(
                    "div"
                );

            div.innerText = message;

            container.appendChild(div);
        }


        /**
         * ------------------------------------------------------
         * SAFE TEXT
         * ------------------------------------------------------
         */

        setText(
            elementId,
            value
        ) {

            const element =
                document.getElementById(
                    elementId
                );

            if (!element) {

                return;

            }

            element.innerText =
                this.valueOrUnknown(value);
        }


        /**
         * ------------------------------------------------------
         * VALUE NORMALIZATION
         * ------------------------------------------------------
         */

        valueOrUnknown(value) {

            if (
                value === undefined ||
                value === null ||
                value === ""
            ) {

                return "UNKNOWN";

            }

            return String(value);
        }


        /**
         * ------------------------------------------------------
         * STATUS
         * ------------------------------------------------------
         */

        getStatus() {

            return {

                name: this.name,

                version: this.version,

                build: this.build,

                initialized:
                    this.initialized,

                running:
                    this.running,

                apiConnected:
                    !!this.api,

                refreshInterval:
                    this.refreshInterval,

                lastError:
                    this.lastError
                        ? this.lastError.message
                        : null

            };
        }
    }


    /**
     * --------------------------------------------------------
     * PUBLIC EXPORT
     * --------------------------------------------------------
     */

    global.SKOSMonitoringDashboard =
        MonitoringDashboard;


    /**
     * --------------------------------------------------------
     * SAFE BOOTSTRAP
     * --------------------------------------------------------
     *
     * The dashboard does NOT invent or construct a fake API.
     *
     * If another runtime component has already exposed:
     *
     *   window.SKOSMonitoringAPI
     *
     * it will be connected automatically.
     *
     * Otherwise the dashboard enters a safe
     * API UNAVAILABLE state.
     *
     * --------------------------------------------------------
     */

    function bootstrap() {

        try {

            const api =
                global.SKOSMonitoringAPI ||
                null;

            const dashboard =
                new MonitoringDashboard(api);

            dashboard.initialize();

            global.SKOSMonitoringDashboardInstance =
                dashboard;

        }

        catch (error) {

            console.error(
                "SKOS Monitoring Dashboard bootstrap failed:",
                error
            );

        }
    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            bootstrap,
            { once: true }
        );

    }

    else {

        bootstrap();

    }


})(window);
