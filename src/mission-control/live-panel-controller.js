/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Live Panel Controller
 * File      : live-panel-controller.js
 *
 * Build     : BUILD-000812.1
 * Version   : 1.0.0
 *
 * Mission:
 * Control live operational panels,
 * manage dashboard sections,
 * and provide synchronized views
 * for Mission Control.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class LivePanelController {


    constructor(

        dashboardClient = null,

        options = {}

    ) {


        this.name =
            "Live Panel Controller";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.dashboardClient =
            dashboardClient;


        this.options =
            options;


        this.panels =
            new Map();


        this.activePanels =
            new Set();


        this.lastUpdate =
            null;


        this.history =
            [];

    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordHistory({

            type:
                "LIVE_PANEL_CONTROLLER_INITIALIZED",

            timestamp:
                new Date()

        });


        return true;

    }





    connectClient(

        client

    ) {


        if (!client) {


            throw new Error(

                "Dashboard client required."

            );

        }



        this.dashboardClient =
            client;



        this.status =
            "CONNECTED";



        this.recordHistory({

            type:
                "CLIENT_CONNECTED",

            timestamp:
                new Date()

        });



        return true;

    }





    registerPanel(

        panelId,

        metadata = {}

    ) {


        if (!panelId) {


            throw new Error(

                "Panel id required."

            );

        }



        const panel = {


            id:

                panelId,


            title:

                metadata.title ||
                panelId,


            type:

                metadata.type ||
                "STANDARD",


            enabled:

                true,


            createdAt:

                new Date()


        };



        this.panels.set(

            panelId,

            panel

        );



        return panel;

    }





    activatePanel(

        panelId

    ) {


        if (!this.panels.has(panelId)) {


            throw new Error(

                "Panel not registered."

            );

        }



        this.activePanels.add(

            panelId

        );



        return true;

    }





    deactivatePanel(

        panelId

    ) {


        this.activePanels.delete(

            panelId

        );


        return true;

    }





    getActivePanels() {


        return Array.from(

            this.activePanels

        );

    }





    loadLiveData() {


        if (!this.dashboardClient) {


            throw new Error(

                "Dashboard client not connected."

            );

        }



        const view =

            this.dashboardClient
                .getViewModel();



        if (!view) {


            return null;

        }



        const result = {


            timestamp:

                new Date(),


            panels:

                this.getActivePanels(),


            system:

                view.system,


            health:

                view.health,


            metrics:

                view.metrics,


            alerts:

                view.alerts


        };



        this.lastUpdate =
            result;



        this.recordHistory({

            type:
                "LIVE_DATA_UPDATED",

            timestamp:
                new Date()

        });



        return result;

    }





    refresh() {


        return this.loadLiveData();

    }





    getPanel(

        panelId

    ) {


        return this.panels.get(

            panelId

        );

    }





    getPanels() {


        return Array.from(

            this.panels.values()

        );

    }





    getSnapshot() {


        return this.lastUpdate;

    }





    getHistory() {


        return this.history;

    }





    recordHistory(

        event

    ) {


        this.history.push(

            event

        );

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


            activePanels:

                this.activePanels.size,


            connected:

                Boolean(
                    this.dashboardClient
                )


        };

    }





    shutdown() {


        this.status =
            "SHUTDOWN";


        this.activePanels.clear();



        this.recordHistory({

            type:
                "LIVE_PANEL_CONTROLLER_SHUTDOWN",

            timestamp:
                new Date()

        });



        return true;

    }


}



module.exports =
    LivePanelController;
