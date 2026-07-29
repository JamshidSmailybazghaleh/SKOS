/**
 * ============================================================
 * SKOS Mission Workspace
 * Workspace Controller
 * ------------------------------------------------------------
 * File      : workspace-controller.js
 * Version   : 2.0.0
 * Build     : BUILD-000505
 * Purpose   : Coordinate all Mission Workspace components
 * ============================================================
 */

class WorkspaceController {

    constructor() {

        this.loader = new DataLoader();

        this.data = null;

        this.status = "OFFLINE";

        this.renderers = {};

    }

    async initialize() {

        console.log("Initializing Mission Workspace...");

        await this.loader.initialize();

        this.data = await this.loader.loadAll();

        this.initializeRenderers();

        this.status = "ONLINE";

        this.execute();

    }

    initializeRenderers() {

        this.renderers.mission =
            new MissionRenderer();

        this.renderers.task =
            new TaskRenderer();

        this.renderers.milestone =
            new MilestoneRenderer();

        this.renderers.operation =
            new OperationRenderer();

        this.renderers.progress =
            new ProgressRenderer();

        this.renderers.history =
            new HistoryRenderer();

        Object.values(this.renderers).forEach(renderer => {

            renderer.initialize();

        });

    }

    execute() {

        this.renderers.mission.render(this.data);

        this.renderers.task.render(this.data);

        this.renderers.milestone.render(this.data);

        this.renderers.operation.render(this.data);

        this.renderers.progress.render(this.data.progress);

        this.renderers.history.render(this.data);

    }

    async refresh() {

        this.data = await this.loader.loadAll();

        this.execute();

    }

    getStatus() {

        return this.status;

    }

    shutdown() {

        Object.values(this.renderers).forEach(renderer => {

            renderer.shutdown();

        });

        this.loader.shutdown();

        this.status = "OFFLINE";

        console.log("Mission Workspace Stopped");

    }

}
