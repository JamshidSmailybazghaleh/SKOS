/*
==========================================================
SKOS Executive Command Center
Task Controller
Version : 1.0.0
BUILD : BUILD-000010
==========================================================
*/

import taskService
from "../services/task-service.js";

class TaskController {

    constructor() {

        this.summary = {};

        this.tasks = [];

    }

    async initialize() {

        this.summary =
            await taskService.getSummary();

        this.tasks =
            await taskService.getAll();

        console.info(
            "[TaskController] Initialized"
        );

    }

    getSummary() {

        return this.summary;

    }

    getTasks() {

        return this.tasks;

    }

    async getTask(id) {

        return await taskService.getById(id);

    }

    async getByMission(missionId) {

        return await taskService.getByMission(
            missionId
        );

    }

    async getByStatus(status) {

        return await taskService.getByStatus(
            status
        );

    }

    async getByPriority(priority) {

        return await taskService.getByPriority(
            priority
        );

    }

    async refresh() {

        await taskService.reload();

        await this.initialize();

        console.info(
            "[TaskController] Refreshed"
        );

    }

    shutdown() {

        this.summary = {};

        this.tasks = [];

        console.info(
            "[TaskController] Shutdown"
        );

    }

}

const taskController =
    new TaskController();

export default taskController;
