/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : SKOS Kernel
 * File      : skos-kernel.js
 *
 * Build     : BUILD-000446
 * Version   : 1.0.0
 *
 * Mission:
 * Core coordination layer of SKOS.
 *
 * ==========================================================
 */


class SKOSKernel {


    constructor(options = {}) {


        this.name =
            "SKOS Kernel";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.engines =
            new Map();


        this.services =
            new Map();


        this.events =
            [];


        this.context = {

            sdkcConnected:
                false,


            knowledgeReady:
                false,


            autonomousReady:
                false

        };


        this.options =
            options;

    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.emit(

            "KERNEL_INITIALIZED",

            {

                version:
                    this.version

            }

        );


        return true;

    }





    registerEngine(

        engineId,

        engine

    ) {


        if (!engineId) {


            throw new Error(

                "Engine id required."

            );

        }



        this.engines.set(

            engineId,

            engine

        );



        this.emit(

            "ENGINE_REGISTERED",

            {

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



        this.emit(

            "ENGINE_STARTED",

            {

                engineId

            }

        );



        return true;

    }





    registerService(

        serviceId,

        service

    ) {


        this.services.set(

            serviceId,

            service

        );



        return true;

    }





    getService(

        serviceId

    ) {


        return this.services.get(

            serviceId

        );

    }





    getEngine(

        engineId

    ) {


        return this.engines.get(

            engineId

        );

    }





    connectSDKC() {


        this.context.sdkcConnected =
            true;



        this.emit(

            "SDKC_CONNECTED"

        );


        return true;

    }





    activateKnowledgeRuntime() {


        this.context.knowledgeReady =
            true;



        this.emit(

            "KNOWLEDGE_RUNTIME_READY"

        );


        return true;

    }





    activateAutonomousRuntime() {


        this.context.autonomousReady =
            true;



        this.emit(

            "AUTONOMOUS_RUNTIME_READY"

        );


        return true;

    }





    emit(

        event,

        data = {}

    ) {


        const record = {


            event,


            data,


            timestamp:
                new Date()

        };



        this.events.push(

            record

        );



        return record;

    }





    getEvents() {


        return this.events;

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


            services:
                this.services.size,


            context:
                this.context


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



        this.status =
            "SHUTDOWN";



        this.emit(

            "KERNEL_SHUTDOWN"

        );



        return true;

    }


}



module.exports =
    SKOSKernel;
