/*
==========================================================
SKOS Executive Command Center
Workspace Controller
Version : 1.0.0
BUILD : BUILD-000007
==========================================================
*/

import dashboardService from "../services/dashboard-service.js";
import missionService from "../services/mission-service.js";
import taskService from "../services/task-service.js";
import operationService from "../services/operation-service.js";
import analyticsService from "../services/analytics-service.js";

class WorkspaceController {

    constructor() {

        this.initialized = false;

    }

    async initialize() {

        console.info(
            "[WorkspaceController] Initializing..."
        );

        await dashboardService.initialize();

        await missionService.initialize();

        await taskService.initialize();

        await operationService.initialize();

        await analyticsService.initialize();

        this.initialized = true;

        console.info(
            "[WorkspaceController] Ready"
        );

    }

    async refresh() {

        await dashboardService.reload();

        await missionService.reload();

        await taskService.reload();

        await operationService.reload();

        await analyticsService.reload();

        console.info(
            "[WorkspaceController] Refreshed"
        );

    }

    isReady() {

        return this.initialized;

    }

    shutdown() {

        dashboardService.shutdown();

        missionService.shutdown();

        taskService.shutdown();

        operationService.shutdown();

        analyticsService.shutdown();

        this.initialized = false;

        console.info(
            "[WorkspaceController] Shutdown"
        );

    }

}

const workspaceController =
    new WorkspaceController();

document.addEventListener(

    "DOMContentLoaded",

    async ()=>{

        await workspaceController.initialize();

    }

);

export default workspaceController;
