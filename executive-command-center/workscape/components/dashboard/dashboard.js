/*
==========================================================
SKOS Executive Command Center
Dashboard Component
Version : 1.0.0
Component : Dashboard
==========================================================
*/

class Dashboard {

    constructor() {

        this.summary = {};

        this.leftColumn = null;

        this.rightColumn = null;

    }

    initialize() {

        this.summary = {

            mission:
                document.getElementById(
                    "mission-summary"
                ),

            task:
                document.getElementById(
                    "task-summary"
                ),

            operation:
                document.getElementById(
                    "operation-summary"
                ),

            analytics:
                document.getElementById(
                    "analytics-summary"
                )

        };

        this.leftColumn =
            document.getElementById(
                "dashboard-left"
            );

        this.rightColumn =
            document.getElementById(
                "dashboard-right"
            );

        this.render();

        this.registerEvents();

        console.info(
            "[Dashboard] Initialized"
        );

    }

    registerEvents() {

        /*
        Future

        Card Events
        Widget Events
        Context Menu
        */

    }

    render() {

        this.renderSummary();

        this.renderWorkspace();

    }

    renderSummary() {

        this.summary.mission.innerHTML = `

            <h3>Mission</h3>

            <p>No data loaded.</p>

        `;

        this.summary.task.innerHTML = `

            <h3>Task</h3>

            <p>No data loaded.</p>

        `;

        this.summary.operation.innerHTML = `

            <h3>Operation</h3>

            <p>No data loaded.</p>

        `;

        this.summary.analytics.innerHTML = `

            <h3>Analytics</h3>

            <p>No data loaded.</p>

        `;

    }

    renderWorkspace() {

        this.leftColumn.innerHTML = `

            <section class="dashboard-widget">

                <h3>Executive Overview</h3>

                <p>
                    Dashboard Renderer Ready.
                </p>

            </section>

        `;

        this.rightColumn.innerHTML = `

            <section class="dashboard-widget">

                <h3>System Status</h3>

                <p>
                    Waiting for data...
                </p>

            </section>

        `;

    }

    refresh() {

        console.info(
            "[Dashboard] Refresh"
        );

        this.render();

    }

    shutdown() {

        console.info(
            "[Dashboard] Shutdown"
        );

    }

}

/* ==========================================
   Bootstrap
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        const dashboard =
            new Dashboard();

        dashboard.initialize();

    }

);
