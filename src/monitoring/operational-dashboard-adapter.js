/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Operational Dashboard Adapter
 * File      : operational-dashboard-adapter.js
 *
 * Build     : BUILD-000810.1
 * Version   : 1.0.0
 *
 * Mission:
 * Transform monitoring snapshots into
 * stable operational dashboard models
 * for Mission Control and future interfaces.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class OperationalDashboardAdapter {


    constructor(

        dashboardBridge = null,

        options = {}

    ) {


        this.name =
            "Operational Dashboard Adapter";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.dashboardBridge =
            dashboardBridge;


        this.options =
            options;


        this.lastModel =
            null;


        this.history =
            [];

    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordHistory({

            type:
                "DASHBOARD_ADAPTER_INITIALIZED",

            timestamp:
                new Date()

        });


        return true;

    }





    connectBridge(

        bridge

    ) {


        if (!bridge) {


            throw new Error(

                "Dashboard bridge is required."

            );

        }



        this.dashboardBridge =
            bridge;



        this.status =
            "CONNECTED";



        this.recordHistory({

            type:
                "BRIDGE_CONNECTED",

            timestamp:
                new Date()

        });



        return true;

    }





    getOperationalModel() {


        if (!this.dashboardBridge) {


            throw new Error(

                "Dashboard bridge not connected."

            );

        }



        const snapshot =

            this.dashboardBridge
                .getDashboardState();



        const model = {


            timestamp:

                snapshot.timestamp,



            systemStatus:

                snapshot.runtime.status,



            runtime:


                {


                    name:

                        snapshot.runtime.name,


                    version:

                        snapshot.runtime.version,


                    monitors:

                        snapshot.runtime.monitors


                },



            health:

                snapshot.health,



            metrics:

                snapshot.metrics,



            alerts:

                snapshot.alerts,



            events:

                snapshot.events



        };



        this.lastModel =
            model;



        this.recordHistory({

            type:
                "OPERATIONAL_MODEL_CREATED",

            timestamp:
                new Date()

        });



        return model;

    }





    getSystemSummary() {


        const model =

            this.lastModel ||

            this.getOperationalModel();



        return {


            status:

                model.systemStatus,



            monitors:

                model.runtime.monitors,



            alerts:

                model.alerts,



            health:

                model.health



        };

    }





    refresh() {


        return this.getOperationalModel();

    }





    getLastModel() {


        return this.lastModel;

    }





    getHistory() {


        return this.history;

    }





    recordHistory(

        event

    ) {


        this.history.push(

            {

                event,


                timestamp:

                    new Date()

            }

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
                    this.dashboardBridge
                ),


            modelAvailable:

                Boolean(
                    this.lastModel
                )


        };

    }





    shutdown() {


        this.status =
            "SHUTDOWN";



        this.recordHistory({

            type:
                "DASHBOARD_ADAPTER_SHUTDOWN",

            timestamp:
                new Date()

        });



        return true;

    }


}



module.exports =
    OperationalDashboardAdapter;
