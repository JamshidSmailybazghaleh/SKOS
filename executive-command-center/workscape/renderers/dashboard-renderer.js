/*
==========================================================
SKOS Executive Command Center
Dashboard Renderer
Version : 1.0.0
BUILD : BUILD-000012
==========================================================
*/

import dashboardController
from "../controllers/dashboard-controller.js";

class DashboardRenderer {

    constructor() {

        this.container = null;

    }

    async initialize(containerId) {

        this.container =
            document.getElementById(containerId);

        await dashboardController.initialize();

        await this.render();

    }

    async render() {

        if (!this.container) {

            return;

        }

        const widgets =
            dashboardController.getWidgets();

        const metrics =
            dashboardController.getMetrics();

        this.container.innerHTML = "";

        this.renderMetrics(metrics);

        this.renderWidgets(widgets);

    }

    renderMetrics(metrics) {

        console.info(
            "[DashboardRenderer] Metrics",
            metrics
        );

    }

    renderWidgets(widgets) {

        widgets.forEach(widget=>{

            const card =
                document.createElement("div");

            card.className =
                "dashboard-widget";

            card.innerHTML =

            `
            <div class="widget-title">

            ${widget.title}

            </div>

            <div class="widget-body">

            ${widget.description}

            </div>
            `;

            this.container.appendChild(card);

        });

    }

    async refresh() {

        await dashboardController.refresh();

        await this.render();

    }

    clear() {

        if(this.container){

            this.container.innerHTML="";

        }

    }

    shutdown() {

        this.clear();

        console.info(
            "[DashboardRenderer] Shutdown"
        );

    }

}

const dashboardRenderer =
    new DashboardRenderer();

export default dashboardRenderer;
