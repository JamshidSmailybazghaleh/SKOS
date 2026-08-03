/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Monitoring Dashboard
 * File      : monitoring-dashboard.js
 *
 * Build     : BUILD-000448.2
 *
 * ==========================================================
 */

class MonitoringDashboard {

    constructor(api) {

        this.api = api;

        this.refreshInterval = 2000;

        this.timer = null;

    }



    initialize() {

        this.render();

        this.start();

    }



    start() {

        this.timer = setInterval(() => {

            this.render();

        }, this.refreshInterval);

    }



    stop() {

        if (this.timer)

            clearInterval(this.timer);

    }



    render() {

        const data =

            this.api.exportObject();



        this.renderRuntime(

            data.runtime

        );



        this.renderHealth(

            data.health

        );



        this.renderMetrics(

            data.metrics

        );



        this.renderPerformance(

            data.performance

        );



        this.renderAlerts(

            data.alerts

        );



        this.renderEvents(

            data.events

        );

    }



    renderRuntime(runtime) {

        document.getElementById("runtime-status").innerText =
            runtime.runtime;

        document.getElementById("runtime-version").innerText =
            runtime.version;

        document.getElementById("runtime-uptime").innerText =
            runtime.uptime;

    }



    renderHealth(list) {

        const container =

            document.getElementById("health-list");

        container.innerHTML = "";



        list.forEach(item => {

            const div =

                document.createElement("div");

            div.innerText =
                `${item.componentId} : ${item.state}`;

            container.appendChild(div);

        });

    }



    renderMetrics(list) {

        const container =

            document.getElementById("metrics-list");

        container.innerHTML = "";



        list.forEach(metric => {

            const div =

                document.createElement("div");

            div.innerText =
                `${metric.name} = ${metric.value}`;

            container.appendChild(div);

        });

    }



    renderPerformance(list) {

        const container =

            document.getElementById("performance-list");

        container.innerHTML = "";



        list.forEach(item => {

            const div =

                document.createElement("div");

            div.innerText =
                `${item.operationId} : ${item.durationMs} ms`;

            container.appendChild(div);

        });

    }



    renderAlerts(list) {

        const container =

            document.getElementById("alert-list");

        container.innerHTML = "";



        list.forEach(alert => {

            const div =

                document.createElement("div");

            div.innerText =
                `[${alert.severity}] ${alert.message}`;

            container.appendChild(div);

        });

    }



    renderEvents(list) {

        const container =

            document.getElementById("event-list");

        container.innerHTML = "";



        list.slice(0,20).forEach(event => {

            const div =

                document.createElement("div");

            div.innerText =
                event.event;

            container.appendChild(div);

        });

    }

}
