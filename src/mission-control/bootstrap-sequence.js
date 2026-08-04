/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Bootstrap Sequence
 * File      : bootstrap-sequence.js
 *
 * Build     : BUILD-000900.4
 * Version   : 1.0.0
 *
 * ==========================================================
 */


class BootstrapSequence {


    constructor(options = {}) {


        this.name =
            "SKOS Bootstrap Sequence";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.options =
            options;


        this.steps =
            [];


        this.history =
            [];


        this.currentStep =
            null;


    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordHistory(

            "BOOTSTRAP_INITIALIZED"

        );


        return true;

    }





    registerStep(

        name,

        executor,

        priority = 100

    ) {


        if (!name) {


            throw new Error(

                "Step name required."

            );

        }



        if (

            typeof executor !==

            "function"

        ) {


            throw new Error(

                "Step executor required."

            );

        }



        this.steps.push({

            name,

            executor,

            priority,

            status:
                "REGISTERED"

        });



        return true;

    }





    removeStep(

        stepName

    ) {


        this.steps =

            this.steps.filter(

                step =>

                    step.name !== stepName

            );


        return true;

    }





    getSteps() {


        return [

            ...this.steps

        ]

        .sort(

            (a,b)=>

                a.priority -

                b.priority

        );

    }





    async executeStep(

        step

    ) {


        this.currentStep =
            step.name;



        step.status =
            "RUNNING";



        this.recordHistory({

            event:
                "STEP_STARTED",

            step:
                step.name

        });



        try {


            await step.executor();



            step.status =
                "COMPLETED";



            this.recordHistory({

                event:
                    "STEP_COMPLETED",

                step:
                    step.name

            });



            return true;



        }

        catch(error) {


            step.status =
                "FAILED";



            this.recordHistory({

                event:
                    "STEP_FAILED",

                step:
                    step.name,

                error:
                    error.message

            });



            throw error;

        }

    }





    async executeAll() {


        this.status =
            "BOOTING";



        const steps =

            this.getSteps();



        for (

            const step

            of

            steps

        ) {


            await this.executeStep(

                step

            );

        }



        this.status =
            "READY";



        this.recordHistory(

            {

                event:
                    "BOOT_SUCCESSFUL"

            }

        );



        return true;

    }





    getBootStatus() {


        return {


            status:

                this.status,


            currentStep:

                this.currentStep,


            steps:

                this.steps.map(

                    step => ({

                        name:
                            step.name,

                        status:
                            step.status

                    })

                )

        };

    }





    getHistory() {


        return this.history;

    }





    recordHistory(data) {


        this.history.push({

            data,

            timestamp:

                new Date()

        });

    }





    reset() {


        this.steps = [];

        this.history = [];

        this.status =
            "RESET";

        return true;

    }





    shutdown() {


        this.status =
            "SHUTDOWN";


        this.recordHistory(

            {

                event:
                    "BOOTSTRAP_SHUTDOWN"

            }

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


            steps:

                this.steps.length

        };

    }


}


module.exports =
BootstrapSequence;
