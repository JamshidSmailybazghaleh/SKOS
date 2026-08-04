/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Boot Manager
 * File      : boot-manager.js
 *
 * Build     : BUILD-000901.1
 * Version   : 1.0.0
 *
 * Mission:
 * Manage SKOS lifecycle operations.
 *
 * ==========================================================
 */


class BootManager {


    constructor(options = {}) {


        this.name =
            "SKOS Boot Manager";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.options =
            options;


        this.bootstrap =
            null;


        this.history =
            [];


        this.bootCount =
            0;


        this.lastBoot =
            null;


    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.record(

            "BOOT_MANAGER_INITIALIZED"

        );


        return true;

    }






    attachBootstrap(

        bootstrap

    ) {


        if (!bootstrap) {


            throw new Error(

                "Bootstrap sequence required."

            );

        }


        this.bootstrap =
            bootstrap;



        this.record(

            "BOOTSTRAP_ATTACHED"

        );



        return true;

    }






    async boot() {


        if (!this.bootstrap) {


            throw new Error(

                "Bootstrap not attached."

            );

        }




        this.status =
            "BOOTING";




        const result =

            await this.bootstrap
            .executeAll();





        if (result) {


            this.status =
                "READY";


            this.bootCount++;


            this.lastBoot =
                new Date();



            this.record(

                "BOOT_SUCCESS"

            );


        }



        return result;

    }






    async restart() {


        this.status =
            "RESTARTING";



        this.record(

            "RESTART_STARTED"

        );



        await this.shutdown();



        return await this.boot();

    }






    async recover() {


        this.status =
            "RECOVERING";



        this.record(

            "RECOVERY_STARTED"

        );



        return await this.boot();

    }






    async healthCheck() {


        return {


            status:

                this.status,


            bootCount:

                this.bootCount,


            healthy:

                this.status === "READY"

        };


    }






    async shutdown() {


        this.status =
            "SHUTTING_DOWN";



        if (

            this.bootstrap &&

            typeof this.bootstrap.shutdown ===

            "function"

        ) {


            await this.bootstrap
            .shutdown();


        }



        this.status =
            "STOPPED";



        this.record(

            "SHUTDOWN_COMPLETE"

        );



        return true;

    }






    getState() {


        return {


            name:

                this.name,


            version:

                this.version,


            status:

                this.status,


            bootCount:

                this.bootCount,


            lastBoot:

                this.lastBoot

        };


    }






    getHistory() {


        return this.history;

    }






    record(

        event

    ) {


        this.history.push({

            event,

            timestamp:

                new Date()

        });


    }






    reset() {


        this.status =
            "RESET";


        this.bootCount =
            0;


        this.lastBoot =
            null;


        this.history =
            [];


        return true;

    }

}



module.exports =
BootManager;
