/*
==========================================================
SKOS Executive Command Center
Task Renderer
Version : 1.0.0
BUILD : BUILD-000015
==========================================================
*/

import BaseRenderer
from "./base-renderer.js";

import taskController
from "../controllers/task-controller.js";


class TaskRenderer
extends BaseRenderer {

    constructor(containerId) {

        super(containerId);

    }


    async initialize() {

        super.initialize();

        await taskController.initialize();

        await this.render();

    }


    async render() {

        if (!this.container) {

            return;

        }

        this.clear();

        const tasks =
            taskController.getTasks();

        tasks.forEach(task=>{

            const card =
                document.createElement("div");

            card.className =
                "task-card";

            card.innerHTML =

            `
            <div class="task-title">

                ${task.name}

            </div>

            <div class="task-status">

                Status :

                ${task.status}

            </div>

            <div class="task-progress">

                Progress :

                ${task.progress}%

            </div>

            <div class="task-priority">

                Priority :

                ${task.priority}

            </div>
            `;

            this.container.appendChild(card);

        });

    }


    async renderMission(missionId) {

        this.clear();

        const tasks =
            await taskController.getByMission(
                missionId
            );

        tasks.forEach(task=>{

            const card =
                document.createElement("div");

            card.className =
                "task-card";

            card.innerHTML =

            `
            <div>

                ${task.name}

            </div>
            `;

            this.container.appendChild(card);

        });

    }


    async renderStatus(status) {

        this.clear();

        const tasks =
            await taskController.getByStatus(
                status
            );

        tasks.forEach(task=>{

            const card =
                document.createElement("div");

            card.className =
                "task-card";

            card.innerHTML =

            `
            <div>

                ${task.name}

            </div>
            `;

            this.container.appendChild(card);

        });

    }


    async refresh() {

        await taskController.refresh();

        await this.render();

    }


    shutdown() {

        super.destroy();

        console.info(

            "[TaskRenderer] Shutdown"

        );

    }

}

const taskRenderer =
    new TaskRenderer(

        "task-board"

    );

export default taskRenderer;
