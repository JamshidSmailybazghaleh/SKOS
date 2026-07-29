/**
 * ============================================================
 * SKOS Mission Workspace
 * Workspace Controller
 * ------------------------------------------------------------
 * File      : workspace-controller.js
 * Version   : 1.0.0
 * Build     : BUILD-000505
 * Purpose   : Coordinate Mission Workspace components
 * ============================================================
 */

class WorkspaceController {

    constructor() {

        this.loader = new DataLoader();

        this.data = null;

        this.status = "OFFLINE";

    }

    async initialize() {

        console.log("Initializing Mission Workspace...");

        await this.loader.initialize();

        this.data = await this.loader.loadAll();

        this.status = "ONLINE";

        await this.execute();

    }

    async execute() {

        this.renderMission();

        this.renderTasks();

        this.renderMilestones();

        this.renderOperations();

        this.renderProgress();

        this.renderHistory();

    }

    renderMission() {

        console.log(this.data.missions);

    }

    renderTasks() {

        console.log(this.data.tasks);

    }

    renderMilestones() {

        console.log(this.data.milestones);

    }

    renderOperations() {

        console.log(this.data.operations);

    }

    renderProgress() {

        console.log(this.data.progress);

    }

    renderHistory() {

        console.log(this.data.history);

    }

    refresh() {

        this.initialize();

    }

    getStatus() {

        return this.status;

    }

    shutdown() {

        this.loader.shutdown();

        this.status = "OFFLINE";

        console.log("Mission Workspace Stopped");

    }

}
