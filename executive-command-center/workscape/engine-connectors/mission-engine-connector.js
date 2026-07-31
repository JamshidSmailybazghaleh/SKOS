/*
==========================================================
SKOS Executive Command Center
Mission Engine Connector
Version : 1.0.0
BUILD : BUILD-000018
==========================================================
*/

import missionController
from "../controllers/mission-controller.js";

import stateManager
from "../state/state-manager.js";


class MissionEngineConnector {

    constructor() {

        this.connected = false;

        this.engine = null;

    }



    async initialize(engine) {

        this.engine = engine;

        this.connected = true;

        console.info(

            "[MissionEngineConnector] Connected"

        );

    }



    isConnected() {

        return this.connected;

    }



    async executeMission(id) {

        if (!this.connected) {

            throw new Error(

                "Mission Engine is not connected."

            );

        }

        const mission =

            await missionController.getMission(id);

        if (!mission) {

            return false;

        }

        stateManager.set(

            "currentMission",

            mission

        );

        await this.engine.execute(

            mission

        );

        return true;

    }



    async pauseMission(id) {

        if (!this.connected) {

            return;

        }

        await this.engine.pause(id);

    }



    async resumeMission(id) {

        if (!this.connected) {

            return;

        }

        await this.engine.resume(id);

    }



    async cancelMission(id) {

        if (!this.connected) {

            return;

        }

        await this.engine.cancel(id);

    }



    async synchronize() {

        if (!this.connected) {

            return;

        }

        await this.engine.sync();

    }



    shutdown() {

        this.engine = null;

        this.connected = false;

        console.info(

            "[MissionEngineConnector] Shutdown"

        );

    }

}


const missionEngineConnector =

    new MissionEngineConnector();


export default missionEngineConnector;
