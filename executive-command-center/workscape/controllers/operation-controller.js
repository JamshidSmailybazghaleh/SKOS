/*
==========================================================
SKOS Executive Command Center
Operation Controller
Version : 1.0.0
BUILD : BUILD-000011
==========================================================
*/

import operationService
from "../services/operation-service.js";

class OperationController {

    constructor() {

        this.summary = {};

        this.operations = [];

    }

    async initialize() {

        this.summary =
            await operationService.getSummary();

        this.operations =
            await operationService.getAll();

        console.info(
            "[OperationController] Initialized"
        );

    }

    getSummary() {

        return this.summary;

    }

    getOperations() {

        return this.operations;

    }

    async getOperation(id) {

        return await operationService.getById(id);

    }

    async getByTask(taskId) {

        return await operationService.getByTask(
            taskId
        );

    }

    async getByStatus(status) {

        return await operationService.getByStatus(
            status
        );

    }

    async getRunning() {

        return await operationService.getRunning();

    }

    async getPending() {

        return await operationService.getPending();

    }

    async getCompleted() {

        return await operationService.getCompleted();

    }

    async refresh() {

        await operationService.reload();

        await this.initialize();

        console.info(
            "[OperationController] Refreshed"
        );

    }

    shutdown() {

        this.summary = {};

        this.operations = [];

        console.info(
            "[OperationController] Shutdown"
        );

    }

}

const operationController =
    new OperationController();

export default operationController;
