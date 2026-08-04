/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Executive Status Panel
 * File      : executive-status-panel.js
 *
 * Build     : BUILD-000813.1
 * Version   : 1.0.0
 *
 * Mission:
 * Provide executive-level visibility
 * of SKOS operational status,
 * build state, engine health,
 * alerts and release information.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class ExecutiveStatusPanel {


    constructor(

        liveController = null,

        options = {}

    ) {


        this.name =
            "Executive Status Panel";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.liveController =
            liveController;


        this.options =
            options;


        this.lastSnapshot =
            null;


        this.history =
            [];

    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordHistory({

            type:
                "EXECUTIVE_PANEL_INITIALIZED",

            timestamp:
                new Date()

        });


        return true;

    }





    connectController(

        controller

    ) {


        if (!controller) {


            throw new Error(

                "Live controller required."

            );

        }



        this.liveController =
            controller;



        this.status =
            "CONNECTED";



        this.recordHistory({

            type:
                "CONTROLLER_CONNECTED",

            timestamp:
                new Date()

        });



        return true;

    }





    generateView() {


        if (!this.liveController) {


            throw new Error(

                "Live controller not connected."

            );

        }



        const snapshot =

            this.liveController
                .getSnapshot();



        if (!snapshot) {


            return null;

        }



        const view = {


            title:

                this.name,



            systemStatus:

                snapshot.system.status,



            runtime:

                {


                    name:

                        snapshot.system.runtime
                            .name,


                    monitors:

                        snapshot.system.runtime
                            .monitors

                },



            health:

                {


                    healthy:

                        snapshot.health.healthy,


                    unhealthy:

                        snapshot.health.unhealthy

                },



            metrics:

                snapshot.metrics,



            alerts:

                snapshot.alerts,



            lastUpdate:

                new Date()



        };



        this.lastSnapshot =
            view;



        this.recordHistory({

            type:
                "EXECUTIVE_VIEW_GENERATED",

            timestamp:
                new Date()

        });



        return view;

    }





    refresh() {


        return this.generateView();

    }





    getSnapshot() {


        return this.lastSnapshot;

    }





    getHealthSummary() {


        if (!this.lastSnapshot) {


            return null;

        }



        return this.lastSnapshot.health;

    }





    getAlertSummary() {


        if (!this.lastSnapshot) {


            return null;

        }



        return this.lastSnapshot.alerts;

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


            connected:

                Boolean(
                    this.liveController
                ),


            snapshotAvailable:

                Boolean(
                    this.lastSnapshot
                )


        };

    }





    shutdown() {


        this.status =
            "SHUTDOWN";



        this.recordHistory({

            type:
                "EXECUTIVE_PANEL_SHUTDOWN",

            timestamp:
                new Date()

        });



        return true;

    }

}



module.exports =
    ExecutiveStatusPanel;
