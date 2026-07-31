/*
==========================================================
SKOS Executive Command Center
Mission Controller
Version : 1.0.0
BUILD : BUILD-000009
==========================================================
*/

import missionService
from "../services/mission-service.js";


class MissionController {

    constructor() {

        this.summary = {};

        this.missions = [];

    }



    async initialize() {

        this.summary =
            await missionService.getSummary();

        this.missions =
            await missionService.getAll();

        console.info(
            "[MissionController] Initialized"
        );

    }



    getSummary() {

        return this.summary;

    }



    getMissions() {

        return this.missions;

    }



    async getMission(id) {

        return await missionService.getById(id);

    }



    async getByStatus(status) {

        return await missionService.getByStatus(status);

    }



    async getByPriority(priority) {

        return await missionService.getByPriority(priority);

    }



    async refresh() {

        await missionService.reload();

        await this.initialize();

        console.info(
            "[MissionController] Refreshed"
        );

    }



    shutdown() {

        this.summary = {};

        this.missions = [];

        console.info(
            "[MissionController] Shutdown"
        );

    }

}


const missionController =
    new MissionController();


export default missionController;
