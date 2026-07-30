/* ===========================================================
   SKOS Executive Command Center
   -----------------------------------------------------------
   Module    : WorkScape
   File      : dashboard-renderer.js
   Version   : 1.0.0
   Build     : BUILD-000513
   Purpose   : Dashboard Renderer
=========================================================== */

"use strict";

class DashboardRenderer {

    constructor(containerId = "workspace-dashboard") {

        this.container =
            document.getElementById(containerId);

    }

    clear() {

        if(this.container){

            this.container.innerHTML = "";

        }

    }

    render(workspaceData) {

        if(!this.container){

            console.error(
                "Dashboard container not found."
            );

            return;

        }

        this.clear();

        if(!workspaceData){

            this.container.innerHTML =
                "<p>No workspace data available.</p>";

            return;

        }

        const card =
            document.createElement("div");

        card.className =
            "card card-primary";

        card.innerHTML = `

            <div class="card-header">

                <div class="card-title">

                    ${workspaceData.title || "WorkScape"}

                </div>

            </div>

            <div class="card-body">

                <p>

                    ${workspaceData.description || ""}

                </p>

            </div>

        `;

        this.container.appendChild(card);

    }

}

window.DashboardRenderer =
    DashboardRenderer;
