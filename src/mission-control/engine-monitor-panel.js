/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Engine Monitor Panel
 * File      : engine-monitor-panel.js
 *
 * Build     : BUILD-000814.1
 * Version   : 1.0.0
 *
 * Mission:
 * Provide detailed operational visibility
 * of SKOS internal engines, their states,
 * health and execution readiness.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class EngineMonitorPanel {


    constructor(

        liveController = null,

        options = {}

    ) {


        this.name =
            "Engine Monitor Panel";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.liveController =
            liveController;


        this.options =
            options;


        this.engines =
            new Map();


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
                "ENGINE_MONITOR_PANEL_INITIALIZED",

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





    registerEngine(

        engineId,

        metadata = {}

    ) {


        if (!engineId) {


            throw new Error(

                "Engine id required."

            );

        }



        const engine = {


            id:

                engineId,


            name:

                metadata.name ||
                engineId,


            type:

                metadata.type ||
                "CORE",


            status:

                "UNKNOWN",


            version:

                metadata.version ||
                "1.0.0",


            health:

                "UNKNOWN",


            lastExecution:

                null

        };



        this.engines.set(

            engineId,

            engine

        );



        return engine;

    }





    updateEngineStatus(

        engineId,

        status,

        health = "UNKNOWN"

    ) {


        const engine =

            this.engines.get(

                engineId

            );



        if (!engine) {


            throw new Error(

                "Engine not registered."

            );

        }



        engine.status =
            status;


        engine.health =
            health;


        engine.lastExecution =
            new Date();



        return engine;

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



        const view = {


            title:

                this.name,


            totalEngines:

                this.engines.size,



            running:

                Array.from(

                    this.engines.values()

                )
                .filter(

                    engine =>

                        engine.status === "RUNNING"

                )
                .length,



            failed:

                Array.from(

                    this.engines.values()

                )
                .filter(

                    engine =>

                        engine.status === "FAILED"

                )
                .length,



            engines:

                Array.from(

                    this.engines.values()

                ),



            system:

                snapshot
                    ? snapshot.system
                    : null,



            updatedAt:

                new Date()

        };



        this.lastSnapshot =
            view;



        this.recordHistory({

            type:
                "ENGINE_VIEW_GENERATED",

            timestamp:
                new Date()

        });



        return view;

    }





    refresh() {


        return this.generateView();

    }





    getEngine(

        engineId

    ) {


        return this.engines.get(

            engineId

        );

    }





    getEngines() {


        return Array.from(

            this.engines.values()

        );

    }





    getHealthyEngines() {


        return this.getEngines()

            .filter(

                engine =>

                    engine.health === "HEALTHY"

            );

    }





    getFailedEngines() {


        return this.getEngines()

            .filter(

                engine =>

                    engine.status === "FAILED"

            );

    }





    getSnapshot() {


        return this.lastSnapshot;

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


            engines:

                this.engines.size,


            connected:

                Boolean(
                    this.liveController
                )


        };

    }





    shutdown() {


        this.status =
            "SHUTDOWN";



        this.recordHistory({

            type:
                "ENGINE_MONITOR_PANEL_SHUTDOWN",

            timestamp:
                new Date()

        });



        return true;

    }

}



module.exports =
    EngineMonitorPanel;
