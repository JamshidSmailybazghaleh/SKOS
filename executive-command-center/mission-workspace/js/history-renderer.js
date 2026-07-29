/**
 * ============================================================
 * SKOS Mission Workspace
 * History Renderer
 * ------------------------------------------------------------
 * File      : history-renderer.js
 * Version   : 1.0.0
 * Build     : BUILD-000505
 * Purpose   : Render mission history
 * ============================================================
 */

class HistoryRenderer {

    constructor(containerId = "history-panel") {

        this.container = document.getElementById(containerId);

    }

    initialize() {

        console.log("History Renderer Initialized");

    }

    render(historyData) {

        if (!this.container) {

            console.error("History panel not found.");

            return;

        }

        if (!historyData ||
            !historyData.history ||
            historyData.history.length === 0) {

            this.container.innerHTML =
                "<p>No history available.</p>";

            return;

        }

        let html = "";

        historyData.history.forEach(event => {

            html += `

                <div class="history-card">

                    <h3>${event.title}</h3>

                    <p><strong>ID:</strong> ${event.eventId}</p>

                    <p><strong>Time:</strong> ${event.timestamp}</p>

                    <p><strong>Type:</strong> ${event.eventType}</p>

                    <p><strong>Status:</strong> ${event.status}</p>

                    <p>${event.description}</p>

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

        console.log("History Renderer Stopped");

    }

}
