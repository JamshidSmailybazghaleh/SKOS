/*
==========================================================
SKOS Executive Command Center
Operation Renderer
Version : 1.0.0
BUILD : BUILD-000016
==========================================================
*/

import BaseRenderer
from "./base-renderer.js";

import operationController
from "../controllers/operation-controller.js";

class OperationRenderer extends BaseRenderer {

    constructor(containerId) {

        super(containerId);

    }

    async initialize() {

        super.initialize();

        await operationController.initialize();

        await this.render();

    }

    async render() {

        if (!this.container) {

            return;

        }

        this.clear();

        const operations =
            operationController.getOperations();

        operations.forEach(operation => {

            const card =
                document.createElement("div");

            card.className =
                "operation-card";

            card.innerHTML = `
                <div class="operation-title">
                    ${operation.name}
                </div>

                <div class="operation-status">
                    Status :
                    ${operation.status}
                </div>

                <div class="operation-progress">
                    Progress :
                    ${operation.progress}%
                </div>

                <div class="operation-priority">
                    Priority :
                    ${operation.priority}
                </div>
            `;

            this.container.appendChild(card);

        });

    }

    async renderTask(taskId) {

        this.clear();

        const operations =
            await operationController.getByTask(taskId);

        operations.forEach(operation => {

            const card =
                document.createElement("div");

            card.className =
                "operation-card";

            card.innerHTML = `
                <div>
                    ${operation.name}
                </div>
            `;

            this.container.appendChild(card);

        });

    }

    async renderStatus(status) {

        this.clear();

        const operations =
            await operationController.getByStatus(status);

        operations.forEach(operation => {

            const card =
                document.createElement("div");

            card.className =
                "operation-card";

            card.innerHTML = `
                <div>
                    ${operation.name}
                </div>
            `;

            this.container.appendChild(card);

        });

    }

    async refresh() {

        await operationController.refresh();

        await this.render();

    }

    shutdown() {

        super.destroy();

        console.info(
            "[OperationRenderer] Shutdown"
        );

    }

}

const operationRenderer =
    new OperationRenderer(
        "operation-board"
    );

export default operationRenderer;
