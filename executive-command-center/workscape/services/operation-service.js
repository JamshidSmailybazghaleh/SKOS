/*
==========================================================
SKOS Executive Command Center
Operation Service
Version : 1.0.0
BUILD : BUILD-000005
==========================================================
*/

import dataLoader from "./data-loader.js";

class OperationService {

    constructor() {

        this.operations = null;

    }

    async initialize() {

        this.operations =
            await dataLoader.loadOperations();

        console.info(
            "[OperationService] Initialized"
        );

        return this.operations;

    }

    async getAll() {

        if (!this.operations) {

            await this.initialize();

        }

        return this.operations?.operations?.items || [];

    }

    async getSummary() {

        if (!this.operations) {

            await this.initialize();

        }

        return this.operations?.operations?.summary || {};

    }

    async getById(id) {

        const items = await this.getAll();

        return items.find(
            operation => operation.id === id
        ) || null;

    }

    async getByTask(taskId) {

        const items = await this.getAll();

        return items.filter(
            operation => operation.taskId === taskId
        );

    }

    async getByStatus(status) {

        const items = await this.getAll();

        return items.filter(
            operation => operation.status === status
        );

    }

    async getRunning() {

        return await this.getByStatus(
            "running"
        );

    }

    async getPending() {

        return await this.getByStatus(
            "pending"
        );

    }

    async getCompleted() {

        return await this.getByStatus(
            "completed"
        );

    }

    async reload() {

        dataLoader.remove(
            "operations.json"
        );

        this.operations = null;

        return await this.initialize();

    }

    shutdown() {

        this.operations = null;

        console.info(
            "[OperationService] Shutdown"
        );

    }

}

const operationService =
    new OperationService();

export default operationService;
