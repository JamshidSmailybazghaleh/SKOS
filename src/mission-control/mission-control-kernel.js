/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Mission Control Kernel
 * File      : mission-control-kernel.js
 *
 * Build     : BUILD-000900.1
 * Version   : 1.0.0
 *
 * ==========================================================
 */

class MissionControlKernel {

    constructor(options = {}) {

        this.name =
            "Mission Control Kernel";

        this.version =
            "1.0.0";

        this.status =
            "CREATED";

        this.options =
            options;

        this.panels =
            new Map();

        this.history =
            [];

        this.snapshot =
            null;

        this.startedAt =
            null;

    }


    initialize() {

        this.status =
            "INITIALIZED";

        this.recordHistory(
            "INITIALIZED"
        );

        return true;

    }


    registerPanel(panel) {

        if (!panel) {

            throw new Error(
                "Panel required."
            );

        }

        const id =
            panel.name ||
            `PANEL-${this.panels.size}`;

        this.panels.set(
            id,
            panel
        );

        this.recordHistory(
            `REGISTERED:${id}`
        );

        return true;

    }


    unregisterPanel(panelName) {

        return this.panels.delete(
            panelName
        );

    }


    async start() {

        this.status =
            "STARTING";

        this.startedAt =
            new Date();

        for (const panel of this.panels.values()) {

            if (

                typeof panel.initialize ===
                "function"

            ) {

                await panel.initialize();

            }

        }

        this.status =
            "READY";

        this.recordHistory(
            "STARTED"
        );

        return true;

    }


    async refresh() {

        const result = {};

        for (

            const [

                name,

                panel

            ]

            of

            this.panels

        ) {

            if (

                typeof panel.refresh ===
                "function"

            ) {

                result[name] =
                    await panel.refresh();

            }

        }

        this.snapshot = {

            generatedAt:
                new Date(),

            panels:
                result

        };

        this.recordHistory(
            "REFRESH"
        );

        return this.snapshot;

    }


    getSnapshot() {

        return this.snapshot;

    }


    getPanels() {

        return Array.from(

            this.panels.keys()

        );

    }


    getPanel(panelName) {

        return this.panels.get(
            panelName
        );

    }


    getPanelCount() {

        return this.panels.size;

    }


    async shutdown() {

        this.status =
            "STOPPING";

        for (

            const panel

            of

            this.panels.values()

        ) {

            if (

                typeof panel.shutdown ===
                "function"

            ) {

                await panel.shutdown();

            }

        }

        this.status =
            "SHUTDOWN";

        this.recordHistory(
            "SHUTDOWN"
        );

        return true;

    }


    recordHistory(event) {

        this.history.push({

            event,

            timestamp:
                new Date()

        });

    }


    getHistory() {

        return this.history;

    }


    getStatus() {

        return {

            name:
                this.name,

            version:
                this.version,

            status:
                this.status,

            panels:
                this.panels.size,

            startedAt:
                this.startedAt

        };

    }

}

module.exports =
MissionControlKernel;
