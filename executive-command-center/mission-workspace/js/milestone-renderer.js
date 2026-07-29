/**
 * ============================================================
 * SKOS Mission Workspace
 * Milestone Renderer
 * ------------------------------------------------------------
 * File      : milestone-renderer.js
 * Version   : 1.0.0
 * Build     : BUILD-000505
 * Purpose   : Render mission milestones
 * ============================================================
 */

class MilestoneRenderer {

    constructor(containerId = "milestone-panel") {

        this.container = document.getElementById(containerId);

    }

    initialize() {

        console.log("Milestone Renderer Initialized");

    }

    render(milestoneData) {

        if (!this.container) {

            console.error("Milestone panel not found.");

            return;

        }

        if (!milestoneData ||
            !milestoneData.milestones ||
            milestoneData.milestones.length === 0) {

            this.container.innerHTML =
                "<p>No milestones available.</p>";

            return;

        }

        let html = "";

        milestoneData.milestones.forEach(milestone => {

            html += `

                <div class="milestone-card">

                    <h3>${milestone.title}</h3>

                    <p><strong>ID:</strong> ${milestone.id}</p>

                    <p><strong>Order:</strong> ${milestone.order}</p>

                    <p><strong>Status:</strong> ${milestone.status}</p>

                    <p><strong>Progress:</strong> ${milestone.progress}%</p>

                    <p>${milestone.description}</p>

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

        console.log("Milestone Renderer Stopped");

    }

}
