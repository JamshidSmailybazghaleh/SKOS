/**
 * ============================================================
 * SKOS Mission Workspace
 * Task Renderer
 * ------------------------------------------------------------
 * File      : task-renderer.js
 * Version   : 1.0.0
 * Build     : BUILD-000505
 * Purpose   : Render mission tasks
 * ============================================================
 */

class TaskRenderer {

    constructor(containerId = "task-panel") {

        this.container = document.getElementById(containerId);

    }

    initialize() {

        console.log("Task Renderer Initialized");

    }

    render(taskData) {

        if (!this.container) {

            console.error("Task panel not found.");

            return;

        }

        if (!taskData ||
            !taskData.tasks ||
            taskData.tasks.length === 0) {

            this.container.innerHTML =
                "<p>No tasks available.</p>";

            return;

        }

        let html = "";

        taskData.tasks.forEach(task => {

            html += `

                <div class="task-card">

                    <h3>${task.title}</h3>

                    <p><strong>ID:</strong> ${task.id}</p>

                    <p><strong>Status:</strong> ${task.status}</p>

                    <p><strong>Priority:</strong> ${task.priority}</p>

                    <p><strong>Progress:</strong> ${task.progress}%</p>

                    <p><strong>Owner:</strong> ${task.owner}</p>

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

        console.log("Task Renderer Stopped");

    }

}
