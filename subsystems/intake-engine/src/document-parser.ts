/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Intake Engine
 * Module    : Document Parser
 *
 * Build     : BUILD-000007.3
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



export interface ParsedDocument {

    raw: string;

    paragraphs: string[];

}



export class DocumentParser implements PipelineStep {



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

            "STEP 04 : Document Parsing"

        );



        if (this.monitoring) {

            this.monitoring.recordEvent(

                "INTAKE_STEP_STARTED",

                {

                    step: "DocumentParser"

                }

            );

        }



        try {



            const text =

                context.rawContent ?? "";



            const paragraphs =

                text

                    .split(/\n\s*\n/)

                    .map(

                        p => p.trim()

                    )

                    .filter(

                        p => p.length > 0

                    );



            context.parsedDocument = {

                raw: text,

                paragraphs

            };



            if (this.monitoring) {



                this.monitoring.recordEvent(

                    "INTAKE_DOCUMENT_PARSED",

                    {

                        step:

                            "DocumentParser",


                        paragraphs:

                            paragraphs.length,


                        characters:

                            text.length,


                        duration:

                            new Date().getTime()

                            -

                            startedAt.getTime()

                    }

                );



                this.monitoring.updateMetric(

                    "documentsParsed"

                );



                this.monitoring.updateMetric(

                    "paragraphsParsed"

                );



            }



            console.log(

                context.parsedDocument

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

                            "DocumentParser",


                        error:

                            message

                    }

                );



                this.monitoring.updateMetric(

                    "documentParsingFailed"

                );



            }



            throw error;

        }

    }

}
