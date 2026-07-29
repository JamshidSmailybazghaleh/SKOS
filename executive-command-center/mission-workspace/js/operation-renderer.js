/**
 * ============================================================
 * SKOS Mission Workspace
 * Operation Renderer
 * ------------------------------------------------------------
 * File      : operation-renderer.js
 * Version   : 1.0.0
 * Build     : BUILD-000505
 * Purpose   : Render active operations
 * ============================================================
 */

class OperationRenderer {

    constructor(containerId = "operation-panel") {

        this.container = document.getElementById(containerId);

    }

    initialize() {

        console.log("Operation Renderer Initialized");

    }

    render(operationData) {

        if (!this.container) {

            console.error("Operation panel not found.");

            return;

        }

        if (!operationData ||
            !operationData.operations ||
            operationData.operations.length === 0) {

            this.container.innerHTML =
                "<p>No active operations.</p>";

            return;

        }

        let html = "";

        operationData.operations.forEach(operation => {

            html += `

                <div class="operation-card">

                    <h3>${operation.name}</h3>

                    <p><strong>ID:</strong> ${operation.id}</p>

                    <p><strong>Category:</strong> ${operation.category}</p>

                    <p><strong>Status:</strong> ${operation.status}</p>

                    <p><strong>Priority:</strong> ${operation.priority}</p>

                    <p><strong>Progress:</strong> ${operation.progress}%</p>

                </div>

            `;

        });

        this.container.innerHTML = html;

    }

    clear() {

        if (this.container) {

            this.container.innerHTML = "";

        }

    }

    shutdown() {

        this.clear();

        console.log("Operation Renderer Stopped");

    }

}
