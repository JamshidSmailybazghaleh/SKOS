/*
==========================================================
SKOS Executive Command Center
Task Service
Version : 1.0.0
BUILD : BUILD-000004
==========================================================
*/

import dataLoader from "./data-loader.js";

class TaskService {

    constructor() {

        this.tasks = null;

    }

    async initialize() {

        this.tasks =
            await dataLoader.loadTasks();

        console.info(
            "[TaskService] Initialized"
        );

        return this.tasks;

    }

    async getAll() {

        if (!this.tasks) {

            await this.initialize();

        }

        return this.tasks?.tasks?.items || [];

    }

    async getSummary() {

        if (!this.tasks) {

            await this.initialize();

        }

        return this.tasks?.tasks?.summary || {};

    }

    async getById(id) {

        const items = await this.getAll();

        return items.find(
            task => task.id === id
        ) || null;

    }

    async getByMission(missionId) {

        const items = await this.getAll();

        return items.filter(
            task => task.missionId === missionId
        );

    }

    async getByStatus(status) {

        const items = await this.getAll();

        return items.filter(
            task => task.status === status
        );

    }

    async getByPriority(priority) {

        const items = await this.getAll();

        return items.filter(
            task => task.priority === priority
        );

    }

    async reload() {

        dataLoader.remove(
            "tasks.json"
        );

        this.tasks = null;

        return await this.initialize();

    }

    shutdown() {

        this.tasks = null;

        console.info(
            "[TaskService] Shutdown"
        );

    }

}

const taskService =
    new TaskService();

export default taskService;
