/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Monitoring Dashboard Client
 * File      : monitoring-dashboard-client.js
 *
 * Build     : BUILD-000811.1
 * Version   : 1.0.0
 *
 * Mission:
 * Provide a controlled client layer for
 * Mission Control to consume operational
 * monitoring data from SKOS services.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class MonitoringDashboardClient {


    constructor(

        adapter = null,

        options = {}

    ) {


        this.name =
            "Monitoring Dashboard Client";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.adapter =
            adapter;


        this.options =
            options;


        this.lastViewModel =
            null;


        this.refreshInterval =
            null;


        this.history =
            [];

    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent({

            type:
                "DASHBOARD_CLIENT_INITIALIZED",

            timestamp:
                new Date()

        });


        return true;

    }





    connectAdapter(

        adapter

    ) {


        if (!adapter) {


            throw new Error(

                "Dashboard adapter required."

            );

        }



        this.adapter =
            adapter;



        this.status =
            "CONNECTED";



        this.recordEvent({

            type:
                "ADAPTER_CONNECTED",

            timestamp:
                new Date()

        });



        return true;

    }





    loadDashboard() {


        if (!this.adapter) {


            throw new Error(

                "Dashboard adapter not connected."

            );

        }



        const model =

            this.adapter
                .getOperationalModel();



        const viewModel = {


            system:

                {


                    status:
                        model.systemStatus,


                    runtime:
                        model.runtime

                },



            health:

                model.health,



            metrics:

                model.metrics,



            alerts:

                model.alerts,



            events:

                model.events,



            updatedAt:

                new Date()

        };



        this.lastViewModel =
            viewModel;



        this.recordEvent({

            type:
                "DASHBOARD_LOADED",

            timestamp:
                new Date()

        });



        return viewModel;

    }





    refresh() {


        return this.loadDashboard();

    }





    startAutoRefresh(

        interval = 5000

    ) {


        if (this.refreshInterval) {

            return false;

        }



        this.refreshInterval =

            setInterval(

                () => {

                    this.refresh();

                },

                interval

            );



        return true;

    }





    stopAutoRefresh() {


        if (

            this.refreshInterval

        ) {


            clearInterval(

                this.refreshInterval

            );


            this.refreshInterval =
                null;

        }



        return true;

    }





    getViewModel() {


        return this.lastViewModel;

    }





    getHistory() {


        return this.history;

    }





    recordEvent(

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
                    this.adapter
                ),


            viewAvailable:

                Boolean(
                    this.lastViewModel
                )

        };

    }





    shutdown() {


        this.stopAutoRefresh();



        this.status =
            "SHUTDOWN";



        this.recordEvent({

            type:
                "DASHBOARD_CLIENT_SHUTDOWN",

            timestamp:
                new Date()

        });



        return true;

    }

}



module.exports =
    MonitoringDashboardClient;
