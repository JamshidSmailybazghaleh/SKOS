/**
 * ============================================================
 * SKOS Mission Workspace
 * Mission Renderer
 * ------------------------------------------------------------
 * File      : mission-renderer.js
 * Version   : 1.0.0
 * Build     : BUILD-000505
 * Purpose   : Render mission information
 * ============================================================
 */

class MissionRenderer {

    constructor(containerId = "mission-panel") {

        this.container = document.getElementById(containerId);

    }

    initialize() {

        console.log("Mission Renderer Initialized");

    }

    render(missionData) {

        if (!this.container) {

            console.error("Mission panel not found.");

            return;

        }

        if (!missionData ||
            !missionData.missions ||
            missionData.missions.length === 0) {

            this.container.innerHTML =
                "<p>No active mission.</p>";

            return;

        }

        const mission = missionData.missions[0];

        this.container.innerHTML = `

            <div class="mission-card">

                <h2>${mission.title}</h2>

                <p><strong>ID:</strong> ${mission.id}</p>

                <p><strong>Status:</strong> ${mission.status}</p>

                <p><strong>Priority:</strong> ${mission.priority}</p>

                <p><strong>Phase:</strong> ${mission.currentPhase}</p>

                <p><strong>Progress:</strong> ${mission.progress}%</p>

                <p><strong>Next Action:</strong> ${mission.nextAction}</p>

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

        console.log("Mission Renderer Stopped");

    }

}
