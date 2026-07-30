/*
==========================================================
SKOS Executive Command Center
Mission Board Component
Version : 1.0.0
Component : Mission Board
==========================================================
*/

class MissionBoard {

    constructor() {

        this.summary = {};

        this.list = null;

        this.missions = [];

    }

    initialize() {

        this.summary = {

            active:
                document.getElementById(
                    "active-missions"
                ),

            completed:
                document.getElementById(
                    "completed-missions"
                ),

            priority:
                document.getElementById(
                    "priority-missions"
                )

        };

        this.list =
            document.getElementById(
                "mission-list"
            );

        this.render();

        this.registerEvents();

        console.info(
            "[Mission Board] Initialized"
        );

    }

    registerEvents() {

        /*
        Future

        Mission Selection
        Drag & Drop
        Context Menu
        */

    }

    render() {

        this.renderSummary();

        this.renderMissionList();

    }

    renderSummary() {

        this.summary.active.innerHTML = `

            <h3>Active</h3>

            <p>0 Missions</p>

        `;

        this.summary.completed.innerHTML = `

            <h3>Completed</h3>

            <p>0 Missions</p>

        `;

        this.summary.priority.innerHTML = `

            <h3>Priority</h3>

            <p>No Priority Mission</p>

        `;

    }

    renderMissionList() {

        this.list.innerHTML = `

            <div class="mission-item">

                <div>

                    <strong>
                        No Mission Loaded
                    </strong>

                    <p>
                        Waiting for mission data...
                    </p>

                </div>

            </div>

        `;

    }

    load(missions) {

        this.missions = missions;

        this.refresh();

    }

    refresh() {

        console.info(
            "[Mission Board] Refresh"
        );

        this.render();

    }

    shutdown() {

        console.info(
            "[Mission Board] Shutdown"
        );

    }

}

/* ==========================================
   Bootstrap
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        const missionBoard =
            new MissionBoard();

        missionBoard.initialize();

    }

);
