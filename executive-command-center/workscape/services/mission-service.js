/*
==========================================================
SKOS Executive Command Center
Mission Service
Version : 1.0.0
BUILD : BUILD-000003
==========================================================
*/

import dataLoader from "./data-loader.js";

class MissionService {

    constructor() {

        this.missions = null;

    }

    async initialize() {

        this.missions =
            await dataLoader.loadMissions();

        console.info(
            "[MissionService] Initialized"
        );

        return this.missions;

    }

    async getAll() {

        if (!this.missions) {

            await this.initialize();

        }

        return this.missions?.missions?.items || [];

    }

    async getSummary() {

        if (!this.missions) {

            await this.initialize();

        }

        return this.missions?.missions?.summary || {};

    }

    async getById(id) {

        const items = await this.getAll();

        return items.find(
            mission => mission.id === id
        ) || null;

    }

    async getByStatus(status) {

        const items = await this.getAll();

        return items.filter(
            mission => mission.status === status
        );

    }

    async getByPriority(priority) {

        const items = await this.getAll();

        return items.filter(
            mission => mission.priority === priority
        );

    }

    async reload() {

        dataLoader.remove(
            "missions.json"
        );

        this.missions = null;

        return await this.initialize();

    }

    shutdown() {

        this.missions = null;

        console.info(
            "[MissionService] Shutdown"
        );

    }

}

const missionService =
    new MissionService();

export default missionService;
