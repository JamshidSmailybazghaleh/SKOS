/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Operational Boot Sequence
 * File      : operational-boot-sequence.js
 *
 * Build     : BUILD-000906.1
 * Version   : 1.0.0
 *
 * Mission:
 * Execute complete operational boot lifecycle.
 *
 * ==========================================================
 */


class OperationalBootSequence {


    constructor(options = {}) {


        this.name =
            "SKOS Operational Boot Sequence";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.options =
            options;



        this.bootManager =
            null;


        this.orchestrator =
            null;


        this.verifier =
            null;



        this.history =
            [];


        this.lastReport =
            null;


    }







    initialize() {


        this.status =
            "INITIALIZED";


        this.record(
            "BOOT_SEQUENCE_INITIALIZED"
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



        return true;

    }









    attachOrchestrator(

        orchestrator

    ) {


        if (!orchestrator) {


            throw new Error(
                "Runtime Orchestrator required."
            );

        }



        this.orchestrator =
            orchestrator;



        return true;

    }









    attachVerifier(

        verifier

    ) {


        if (!verifier) {


            throw new Error(
                "Verifier required."
            );

        }



        this.verifier =
            verifier;



        return true;

    }









    async execute() {


        this.status =
            "BOOTING";



        const report = {


            started:

                new Date(),


            steps:
                [],


            success:
                false

        };





        try {


            if (

                this.bootManager

                &&

                typeof this.bootManager.boot ===
                "function"

            ) {


                await this.bootManager.boot();



                report.steps.push(
                    "BOOT_MANAGER_STARTED"
                );

            }







            if (

                this.orchestrator

                &&

                typeof this.orchestrator.start ===
                "function"

            ) {


                await this.orchestrator.start();



                report.steps.push(
                    "RUNTIME_STARTED"
                );

            }








            if (

                this.verifier

                &&

                typeof this.verifier.verify ===
                "function"

            ) {


                const result =

                    this.verifier.verify();



                report.verification =
                    result;



                report.steps.push(
                    "BOOT_VERIFIED"
                );



                report.success =
                    result.success;

            }







            this.status =

                report.success

                ?

                "BOOT_SUCCESSFUL"

                :

                "BOOT_FAILED";







        }

        catch(error) {


            this.status =
                "BOOT_FAILED";



            report.error =
                error.message;


        }






        report.completed =
            new Date();



        this.lastReport =
            report;



        this.record({

            event:
                this.status,

            report

        });





        return report;

    }









    getReport() {


        return this.lastReport;

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









    reset() {


        this.status =
            "RESET";


        this.history =
            [];


        this.lastReport =
            null;



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


            history:
                this.history.length

        };

    }


}



module.exports =
OperationalBootSequence;
