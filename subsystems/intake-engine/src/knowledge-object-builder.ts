/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Intake Engine
 * Module    : Knowledge Object Builder
 *
 * Build     : BUILD-000007.5
 * Sprint    : Sprint 02
 * Version   : 0.3.0
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



export interface KnowledgeObject {

    id: string;

    metadata: any;

    content: any;

    createdAt: Date;

}



export class KnowledgeObjectBuilder

implements PipelineStep {



    private monitoring: any = null;



    constructor(

        monitoring: any = null

    ) {

        this.monitoring = monitoring;

    }



    public execute(

        context: PipelineContext

    ): PipelineContext {



        const startedAt = new Date();



        console.log(

            "STEP 06 : Knowledge Object Builder"

        );



        if (this.monitoring) {

            this.monitoring.recordEvent(

                "INTAKE_STEP_STARTED",

                {

                    step:

                        "KnowledgeObjectBuilder"

                }

            );

        }



        try {



            if (

                !context.metadata ||

                !context.parsedDocument

            ) {

                throw new Error(

                    "Metadata or Parsed Document is missing."

                );

            }



            const object: KnowledgeObject = {

                id:

                    "KO-"

                    +

                    Date.now()

                    +

                    "-"

                    +

                    Math.floor(

                        Math.random() * 10000

                    ),



                metadata:

                    context.metadata,



                content:

                    context.parsedDocument,



                createdAt:

                    new Date()

            };



            context.knowledgeObject =

                object;



            if (this.monitoring) {



                this.monitoring.recordEvent(

                    "INTAKE_KNOWLEDGE_OBJECT_CREATED",

                    {

                        step:

                            "KnowledgeObjectBuilder",



                        objectId:

                            object.id,



                        language:

                            object.metadata.language,



                        duration:

                            new Date().getTime()

                            -

                            startedAt.getTime()

                    }

                );



                this.monitoring.updateMetric(

                    "knowledgeObjectsCreated"

                );



            }



            console.log(

                object

            );



            return context;



        }

        catch (error) {



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

                            "KnowledgeObjectBuilder",



                        error:

                            message

                    }

                );



                this.monitoring.updateMetric(

                    "knowledgeObjectBuildFailed"

                );



            }



            throw error;

        }

    }

}
