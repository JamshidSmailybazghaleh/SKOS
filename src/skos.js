/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : SKOS Core Entry Point
 * File      : skos.js
 *
 * Build     : BUILD-000908.2
 * Version   : 1.0.0
 *
 * ==========================================================
 */


const OperationalBootSequence =
require(
    "./mission-control/operational-boot-sequence"
);


const BootstrapSequence =
require(
    "./mission-control/bootstrap-sequence"
);


const BootManager =
require(
    "./mission-control/boot-manager"
);


const RuntimeOrchestrator =
require(
    "./mission-control/runtime-orchestrator"
);


const BootVerificationEngine =
require(
    "./mission-control/boot-verification-engine"
);


const OperationalStateManager =
require(
    "./mission-control/operational-state-manager"
);





class SKOS {


    constructor() {


        this.name =
            "Smaily Knowledge Operating System";


        this.version =
            "1.0.0";


        this.build =
            "BUILD-000908.2";


        this.status =
            "CREATED";



        /*
         * Main boot lifecycle
         */

        this.bootSequence =
            new OperationalBootSequence();



        /*
         * Low level bootstrap executor
         */

        this.bootstrap =
            new BootstrapSequence();




        /*
         * Boot controller
         */

        this.bootManager =
            new BootManager();




        /*
         * Runtime layer
         */

        this.orchestrator =
            new RuntimeOrchestrator();




        /*
         * Verification
         */

        this.verifier =
            new BootVerificationEngine();




        /*
         * Operational state
         */

        this.state =
            new OperationalStateManager();


    }






    async initialize() {


        this.status =
            "INITIALIZING";



        this.bootSequence.initialize();



        this.bootstrap.initialize();



        this.bootManager.initialize();



        this.orchestrator.initialize();



        this.verifier.initialize();



        this.state.initialize();




        /*
         * Connect bootstrap lifecycle
         */


        this.bootManager.attachBootstrap(
            this.bootstrap
        );




        /*
         * Connect boot manager
         */


        this.bootSequence.attachBootManager(
            this.bootManager
        );




        /*
         * Connect runtime
         */


        this.bootSequence.attachOrchestrator(
            this.orchestrator
        );




        /*
         * Connect verifier
         */


        this.bootSequence.attachVerifier(
            this.verifier
        );



        return true;

    }







    async start() {


        await this.initialize();



        /*
         * Verification components
         */


        this.verifier.attachComponent(

            "kernel",

            {
                status:
                    "READY"
            }

        );



        this.verifier.attachComponent(

            "runtime",

            {
                status:
                    "OPERATIONAL"
            }

        );



        this.verifier.attachComponent(

            "state",

            {
                readiness:
                    true
            }

        );





        /*
         * Execute operational boot
         */


        const report =
            await this.bootSequence.execute();






        this.state.setState(

            "system",

            report.success
                ?
                "OPERATIONAL"
                :
                "FAILED"

        );





        this.state.setState(

            "readiness",

            report.success

        );






        this.status =
            report.success

            ?

            "RUNNING"

            :

            "FAILED";





        return report;


    }







    async shutdown() {


        this.status =
            "SHUTTING_DOWN";




        await this.orchestrator.shutdown();




        this.state.shutdown();




        this.status =
            "STOPPED";



        return true;


    }







    getStatus() {


        return {


            system:
                this.name,


            version:
                this.version,


            build:
                this.build,


            status:
                this.status


        };


    }



}





module.exports =
    new SKOS();
