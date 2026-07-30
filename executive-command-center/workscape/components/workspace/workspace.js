/*
==========================================================
SKOS Executive Command Center
WorkScape Component
Version : 1.0.0
Component : Workspace
==========================================================
*/

class Workspace {

    constructor() {

        this.dashboard = null;
        this.mission = null;
        this.task = null;
        this.operation = null;

    }

    initialize() {

        this.dashboard =
            document.getElementById(
                "dashboard-container"
            );

        this.mission =
            document.getElementById(
                "mission-container"
            );

        this.task =
            document.getElementById(
                "task-container"
            );

        this.operation =
            document.getElementById(
                "operation-container"
            );

        this.render();

        console.info(
            "[Workspace] Initialized"
        );

    }

    render() {

        this.renderDashboard();

        this.renderMission();

        this.renderTask();

        this.renderOperation();

    }

    renderDashboard() {

        this.dashboard.innerHTML = `
            <h3>Dashboard</h3>
            <p>Dashboard Renderer Ready.</p>
        `;

    }

    renderMission() {

        this.mission.innerHTML = `
            <h3>Mission Board</h3>
            <p>Mission Module Ready.</p>
        `;

    }

    renderTask() {

        this.task.innerHTML = `
            <h3>Task Board</h3>
            <p>Task Module Ready.</p>
        `;

    }

    renderOperation() {

        this.operation.innerHTML = `
            <h3>Operation Board</h3>
            <p>Operation Module Ready.</p>
        `;

    }

    refresh() {

        console.info(
            "[Workspace] Refresh"
        );

        this.render();

    }

    shutdown() {

        console.info(
            "[Workspace] Shutdown"
        );

    }

}

/* ==========================================
   Bootstrap
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        const workspace =
            new Workspace();

        workspace.initialize();

    }

);
