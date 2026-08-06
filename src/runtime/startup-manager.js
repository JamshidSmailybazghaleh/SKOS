/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Startup Manager
 * File      : startup-manager.js
 *
 * Build     : BUILD-000449
 * Version   : 1.0.1
 *
 * Mission:
 * Complete operational startup sequence of SKOS.
 *
 * Architecture:
 * Bootstrap Runtime
 *        |
 * SKOS Kernel
 *        |
 * SDKC Runtime Connector
 *        |
 * Engine Orchestrator
 *
 * ==========================================================
 */


class StartupManager {


    constructor(options = {}) {

        this.name = "Startup Manager";

        this.version = "1.0.1";

        this.status = "CREATED";


        this.bootstrap = null;

        this.kernel = null;

        this.sdkc = null;

        this.orchestrator = null;


        this.steps = [];

        this.startTime = null;


        this.options = options;

    }



    attachBootstrap(runtime) {

        this.bootstrap = runtime;

    }



    attachKernel(kernel) {

        this.kernel = kernel;

    }



    attachSDKC(sdkc) {

        this.sdkc = sdkc;

    }



    attachOrchestrator(orchestrator) {

        this.orchestrator = orchestrator;

    }



    run() {


        this.startTime = new Date();


        this.status = "STARTING";


        this.steps = [];



        this.executeStep(

            "BOOTSTRAP_RUNTIME",

            () => {

                if (!this.bootstrap) {

                    throw new Error(
                        "Bootstrap runtime is not attached"
                    );

                }


                return this.bootstrap.initialize();

            }

        );



        this.executeStep(

            "KERNEL_INITIALIZATION",

            () => {

                if (!this.kernel) {

                    throw new Error(
                        "Kernel is not attached"
                    );

                }


                return this.kernel.initialize();

            }

        );



        this.executeStep(

            "SDKC_CONNECTION",

            () => {

                if (!this.sdkc) {

                    throw new Error(
                        "SDKC runtime connector is not attached"
                    );

                }


                return this.sdkc.initialize();

            }

        );



        this.executeStep(

            "KNOWLEDGE_RUNTIME",

            () => {


                if (
                    typeof this.kernel.activateKnowledgeRuntime
                    === "function"
                ) {

                    return this.kernel
                        .activateKnowledgeRuntime();

                }


                return true;

            }

        );



        this.executeStep(

            "AUTONOMOUS_RUNTIME",

            () => {


                if (
                    typeof this.kernel.activateAutonomousRuntime
                    === "function"
                ) {

                    return this.kernel
                        .activateAutonomousRuntime();

                }


                return true;

            }

        );



        this.executeStep(

            "ENGINE_ORCHESTRATION",

            () => {

                if (!this.orchestrator) {

                    throw new Error(
                        "Engine orchestrator is not attached"
                    );

                }


                return this.orchestrator.startAll();

            }

        );



        this.status = "READY";


        return true;

    }





    executeStep(name, callback) {


        const record = {


            name,


            status: "RUNNING",


            started: new Date()


        };



        this.steps.push(record);



        try {


            const result = callback();


            record.status = "SUCCESS";


            record.result = result;



        } catch (error) {


            record.status = "FAILED";


            record.error = error.message;


            record.finished = new Date();



            this.status = "FAILED";



            throw error;


        }



        record.finished = new Date();



        return true;


    }





    getSteps() {


        return this.steps;


    }





    getStatus() {


        return {


            name: this.name,


            version: this.version,


            status: this.status,


            startedAt: this.startTime,


            completedSteps:

                this.steps.filter(

                    step =>
                        step.status === "SUCCESS"

                ).length,


            failedSteps:

                this.steps.filter(

                    step =>
                        step.status === "FAILED"

                ).length,


            totalSteps:

                this.steps.length


        };


    }





    shutdown() {


        this.status = "SHUTTING_DOWN";



        try {



            if (this.orchestrator) {


                if (
                    typeof this.orchestrator.shutdownAll
                    === "function"
                ) {

                    this.orchestrator.shutdownAll();

                }

            }





            if (this.sdkc) {


                if (
                    typeof this.sdkc.shutdown
                    === "function"
                ) {

                    this.sdkc.shutdown();

                }

            }





            if (this.kernel) {


                if (
                    typeof this.kernel.shutdown
                    === "function"
                ) {

                    this.kernel.shutdown();

                }

            }





            if (this.bootstrap) {


                if (
                    typeof this.bootstrap.shutdown
                    === "function"
                ) {

                    this.bootstrap.shutdown();

                }

            }



            this.status = "SHUTDOWN";



            return true;



        } catch (error) {


            this.status = "FAILED";


            throw error;


        }


    }


}



module.exports = StartupManager;
