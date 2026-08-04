/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Runtime Orchestrator
 * File      : runtime-orchestrator.js
 *
 * Build     : BUILD-000903.1
 * Version   : 1.0.0
 *
 * Mission:
 * Coordinate SKOS runtime lifecycle.
 *
 * ==========================================================
 */


class RuntimeOrchestrator {


    constructor(options = {}) {


        this.name =
            "SKOS Runtime Orchestrator";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.options =
            options;


        this.bootManager =
            null;


        this.supervisor =
            null;


        this.history =
            [];


        this.startedAt =
            null;


    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.record(

            "ORCHESTRATOR_INITIALIZED"

        );


        return true;

    }





    attachBootManager(

        manager

    ) {


        if (!manager) {


            throw new Error(

                "Boot Manager required."

            );

        }



        this.bootManager =
            manager;



        this.record(

            "BOOT_MANAGER_ATTACHED"

        );



        return true;

    }





    attachSupervisor(

        supervisor

    ) {


        if (!supervisor) {


            throw new Error(

                "Runtime Supervisor required."

            );

        }



        this.supervisor =
            supervisor;



        this.record(

            "SUPERVISOR_ATTACHED"

        );



        return true;

    }





    async start() {


        this.status =
            "STARTING";


        this.startedAt =
            new Date();



        if (

            this.bootManager

            &&

            typeof this.bootManager.boot ===

            "function"

        ) {


            await this.bootManager.boot();


        }



        if (

            this.supervisor

            &&

            typeof this.supervisor.start ===

            "function"

        ) {


            await this.supervisor.start();


        }




        this.status =
            "OPERATIONAL";



        this.record(

            "RUNTIME_STARTED"

        );



        return true;

    }





    async verify() {


        const result = {


            operational:

                this.status ===
                "OPERATIONAL",


            boot:

                null,


            runtime:

                null

        };




        if (

            this.bootManager

            &&

            typeof this.bootManager.getState ===

            "function"

        ) {


            result.boot =

                this.bootManager.getState();

        }





        if (

            this.supervisor

            &&

            typeof this.supervisor.getRuntimeState ===

            "function"

        ) {


            result.runtime =

                this.supervisor.getRuntimeState();

        }



        return result;

    }





    async restart() {


        this.status =
            "RESTARTING";



        this.record(

            "RESTART_REQUESTED"

        );



        if (

            this.bootManager

            &&

            typeof this.bootManager.restart ===

            "function"

        ) {


            await this.bootManager.restart();

        }



        if (

            this.supervisor

            &&

            typeof this.supervisor.start ===

            "function"

        ) {


            await this.supervisor.start();

        }



        this.status =
            "OPERATIONAL";



        return true;

    }





    async shutdown() {


        this.status =
            "SHUTTING_DOWN";



        if (

            this.supervisor

            &&

            typeof this.supervisor.shutdown ===

            "function"

        ) {


            await this.supervisor.shutdown();

        }




        if (

            this.bootManager

            &&

            typeof this.bootManager.shutdown ===

            "function"

        ) {


            await this.bootManager.shutdown();

        }




        this.status =
            "STOPPED";



        this.record(

            "RUNTIME_STOPPED"

        );



        return true;

    }





    getStatus() {


        return {


            name:

                this.name,


            version:

                this.version,


            status:

                this.status,


            startedAt:

                this.startedAt

        };

    }





    getHistory() {


        return this.history;

    }





    record(event) {


        this.history.push({

            event,

            timestamp:

                new Date()

        });

    }


}


module.exports =
RuntimeOrchestrator;
