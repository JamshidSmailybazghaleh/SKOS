/*
==========================================================
SKOS Executive Command Center
Mission Renderer
Version : 1.0.0
BUILD : BUILD-000014
==========================================================
*/

import BaseRenderer
from "./base-renderer.js";

import missionController
from "../controllers/mission-controller.js";


class MissionRenderer
extends BaseRenderer {

    constructor(containerId) {

        super(containerId);

    }



    async initialize() {

        super.initialize();

        await missionController.initialize();

        await this.render();

    }



    async render() {

        if (!this.container) {

            return;

        }

        this.clear();

        const missions =
            missionController.getMissions();

        missions.forEach(

            mission=>{

                const card =
                    document.createElement("div");

                card.className =
                    "mission-card";

                card.innerHTML =

                `
                <div class="mission-title">

                    ${mission.name}

                </div>

                <div class="mission-status">

                    Status :

                    ${mission.status}

                </div>

                <div class="mission-progress">

                    Progress :

                    ${mission.progress}%

                </div>

                <div class="mission-priority">

                    Priority :

                    ${mission.priority}

                </div>
                `;

                this.container.appendChild(card);

            }

        );

    }



    async renderByStatus(status) {

        this.clear();

        const missions =
            await missionController.getByStatus(status);

        missions.forEach(

            mission=>{

                const card =
                    document.createElement("div");

                card.className =
                    "mission-card";

                card.innerHTML =

                `
                <div>

                    ${mission.name}

                </div>
                `;

                this.container.appendChild(card);

            }

        );

    }



    async refresh() {

        await missionController.refresh();

        await this.render();

    }



    shutdown() {

        super.destroy();

        console.info(

            "[MissionRenderer] Shutdown"

        );

    }

}


const missionRenderer =
    new MissionRenderer(

        "mission-board"

    );


export default missionRenderer;
