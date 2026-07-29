/**
 * ============================================================
 * SKOS Mission Workspace
 * Progress Renderer
 * ------------------------------------------------------------
 * File      : progress-renderer.js
 * Version   : 1.0.0
 * Build     : BUILD-000505
 * Purpose   : Render mission progress summary
 * ============================================================
 */

class ProgressRenderer {

    constructor(containerId = "progress-panel") {

        this.container = document.getElementById(containerId);

    }

    initialize() {

        console.log("Progress Renderer Initialized");

    }

    render(progressData) {

        if (!this.container) {

            console.error("Progress panel not found.");

            return;

        }

        if (!progressData || !progressData.summary) {

            this.container.innerHTML =
                "<p>No progress information available.</p>";

            return;

        }

        const summary = progressData.summary;

        this.container.innerHTML = `

            <div class="progress-card">

                <h2>Mission Progress</h2>

                <p><strong>Overall Progress:</strong>
                ${summary.overallProgress}%</p>

                <p><strong>Active Missions:</strong>
                ${summary.activeMissions}</p>

                <p><strong>Completed Missions:</strong>
                ${summary.completedMissions}</p>

                <p><strong>Active Tasks:</strong>
                ${summary.activeTasks}</p>

                <p><strong>Completed Tasks:</strong>
                ${summary.completedTasks}</p>

                <p><strong>Completed Milestones:</strong>
                ${summary.completedMilestones}
                / ${summary.totalMilestones}</p>

            </div>

        `;

    }

    clear() {

        if (this.container) {

            this.container.innerHTML = "";

        }

    }

    shutdown() {

        this.clear();

        console.log("Progress Renderer Stopped");

    }

}
