/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : SKOS Bootstrap Runtime
 * File      : skos-bootstrap-runtime.js
 *
 * Build     : BUILD-000445
 * Version   : 1.0.0
 *
 * Purpose:
 * Initialize SKOS execution environment,
 * register engines, activate monitoring,
 * manage lifecycle and system shutdown.
 *
 * ==========================================================
 */


const MonitoringEngine =
    require("../monitoring/monitoring-engine");



class SKOSBootstrapRuntime {


    constructor(options = {}) {


        this.name =
            "SKOS Bootstrap Runtime";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.config =
            options.config || {};


        this.engines =
            new Map();


        this.monitoring =
            new MonitoringEngine();


        this.startTime =
            null;

    }



    initialize() {


        this.startTime =
            new Date();



        this.monitoring.initialize();



        this.status =
            "INITIALIZED";



        this.monitoring.recordEvent(

            "SKOS_RUNTIME_INITIALIZED",

            {

                version:
                    this.version,

                timestamp:
                    this.startTime

            }

        );



        return true;

    }




    registerEngine(

        engineId,

        engineInstance

    ) {


        if (!engineId) {


            throw new Error(

                "Engine id required."

            );

        }



        this.engines.set(

            engineId,

            engineInstance

        );



        this.monitoring.registerComponent(

            engineId,

            {

                name:
                    engineId

            }

        );



        return true;

    }




    startEngine(

        engineId

    ) {


        const engine =

            this.engines.get(

                engineId

            );



        if (!engine) {


            throw new Error(

                "Engine not found."

            );

        }



        if (

            typeof engine.initialize ===
            "function"

        ) {


            engine.initialize();


        }



        this.monitoring.updateHealth(

            engineId,

            "HEALTHY"

        );



        return true;

    }





    startAll() {


        for (

            const engineId of

            this.engines.keys()

        ) {


            this.startEngine(

                engineId

            );

        }



        this.status =
            "RUNNING";



        return true;

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

            this.engines.keys()

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


            uptime:

                this.startTime

                    ?

                    Date.now()
                    -
                    this.startTime.getTime()

                    :

                    0


        };

    }





    shutdown() {



        for (

            const engine of

            this.engines.values()

        ) {



            if (

                typeof engine.shutdown ===
                "function"

            ) {


                engine.shutdown();


            }


        }



        this.monitoring.shutdown();



        this.status =
            "SHUTDOWN";



        return true;

    }


}



module.exports =
    SKOSBootstrapRuntime;
