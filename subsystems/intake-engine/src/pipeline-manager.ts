/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Intake Engine
 * Module    : Pipeline Manager
 *
 * Build     : BUILD-000005
 * Sprint    : Sprint 02
 * Version   : 0.1.0
 *
 * Status    : Monitoring Hooks Integrated
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


import {

    PipelineContext,

    PipelineStep

} from "./pipeline-step";


import { SourceValidator }

from "./source-validator";


import { FileTypeDetector }

from "./file-type-detector";



export class PipelineManager {


    private readonly steps: PipelineStep[] = [];


    private monitoring: any;



    constructor(

        monitoring: any = null

    ) {


        this.monitoring = monitoring;


        this.initialize();


    }





    /**
     * Initialize default pipeline steps
     */

    private initialize(): void {


        this.register(

            new SourceValidator()

        );


        this.register(

            new FileTypeDetector()

        );


    }





    /**
     * Register pipeline step
     */

    public register(

        step: PipelineStep

    ): void {


        this.steps.push(step);


    }





    /**
     * Execute pipeline
     */

    public execute(

        context: PipelineContext

    ): PipelineContext {



        console.log(
            "=================================="
        );


        console.log(
            "SKOS Intake Pipeline"
        );


        console.log(
            "=================================="
        );



        if (this.monitoring) {


            this.monitoring.recordEvent(

                "INTAKE_PIPELINE_STARTED",

                {

                    sourcePath:
                        context.sourcePath || null

                }

            );


            this.monitoring.updateMetric(

                "pipelinesStarted"

            );


        }





        let current:

            PipelineContext = context;





        try {


            for (const step of this.steps) {


                console.log(
                    "----------------------------------"
                );


                console.log(

                    "Running:",

                    step.constructor.name

                );



                current =

                    step.execute(

                        current

                    );



            }





            if (this.monitoring) {


                this.monitoring.recordEvent(

                    "INTAKE_PIPELINE_COMPLETED",

                    {

                        sourceType:
                            current.sourceType || null,


                        language:
                            current.language || null

                    }

                );



                this.monitoring.updateMetric(

                    "pipelinesCompleted"

                );


            }





        }

        catch (error) {



            const errorMessage =

                error instanceof Error

                ?

                error.message

                :

                String(error);





            if (this.monitoring) {


                this.monitoring.recordEvent(

                    "INTAKE_PIPELINE_FAILED",

                    {

                        error:

                            errorMessage

                    }

                );



                this.monitoring.updateMetric(

                    "pipelinesFailed"

                );


            }



            throw error;


        }





        console.log(
            "----------------------------------"
        );


        console.log(
            "Pipeline Completed"
        );


        console.log(
            "=================================="
        );



        return current;


    }





    /**
     * Clear pipeline steps
     */

    public clear(): void {


        this.steps.length = 0;


    }





    /**
     * Return pipeline step count
     */

    public count(): number {


        return this.steps.length;


    }





    /**
     * Get registered steps
     */

    public getSteps():

        PipelineStep[] {


        return [

            ...this.steps

        ];


    }


}
