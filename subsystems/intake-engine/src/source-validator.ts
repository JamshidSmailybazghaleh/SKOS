/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Intake Engine
 * Module    : Source Validator
 *
 * Build     : BUILD-000007.1
 * Sprint    : Sprint 02
 * Version   : 0.2.0
 *
 * Status    : Monitoring Hook Integrated
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


import {

    PipelineContext,

    PipelineStep

} from "./pipeline-step";




export class SourceValidator implements PipelineStep {



    private monitoring: any = null;



    constructor(

        monitoring: any = null

    ) {


        this.monitoring =
            monitoring;


    }





    public execute(

        context: PipelineContext

    ): PipelineContext {



        const startedAt =
            new Date();



        console.log(

            "STEP 01 : Source Validation"

        );




        if (this.monitoring) {


            this.monitoring.recordEvent(

                "INTAKE_STEP_STARTED",

                {

                    step:
                        "SourceValidator",


                    sourcePath:
                        context.sourcePath || null


                }

            );


        }





        try {



            if (

                !context.sourcePath

            ) {


                throw new Error(

                    "Source path is empty."

                );


            }





            if (

                context.sourcePath
                    .trim()
                    .length === 0

            ) {


                throw new Error(

                    "Source path is invalid."

                );


            }





            if (this.monitoring) {


                this.monitoring.recordEvent(

                    "INTAKE_SOURCE_VALIDATION_COMPLETED",

                    {

                        step:
                            "SourceValidator",


                        sourcePath:
                            context.sourcePath,


                        duration:

                            new Date().getTime()
                            -
                            startedAt.getTime()


                    }

                );



                this.monitoring.updateMetric(

                    "sourcesValidated"

                );


            }





            console.log(

                "Source validation passed."

            );



            return context;



        }


        catch(error) {



            const message =

                error instanceof Error

                ?

                error.message

                :

                String(error);




            if (this.monitoring) {


                this.monitoring.recordEvent(

                    "INTAKE_STEP_FAILED",

                    {

                        step:
                            "SourceValidator",


                        error:
                            message


                    }

                );



                this.monitoring.updateMetric(

                    "sourceValidationFailed"

                );


            }



            throw error;


        }



    }



}
