/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Intake Engine
 * Module    : Document Parser
 *
 * Build     : BUILD-000005
 * Sprint    : Sprint 02
 * Version   : 0.1.0
 *
 * Status    : Monitoring Integrated
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



    private monitoring: any;



    constructor(

        monitoring: any = null

    ) {


        this.monitoring =
            monitoring;


    }





    public execute(

        context: PipelineContext

    ): PipelineContext {


        console.log(
            "STEP 04 : Document Parsing"
        );



        if (this.monitoring) {


            this.monitoring.recordEvent(

                "INTAKE_DOCUMENT_PARSING_STARTED",

                {

                    sourcePath:
                        context.sourcePath || null

                }

            );


        }



        try {


            const text =

                context.rawContent ?? "";



            const paragraphs = text

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

                        paragraphs:

                            paragraphs.length

                    }

                );



                this.monitoring.updateMetric(

                    "documentsParsed"

                );


            }





            console.log(

                context.parsedDocument

            );



            return context;



        }


        catch(error) {


            if (this.monitoring) {


                this.monitoring.recordEvent(

                    "INTAKE_DOCUMENT_PARSING_FAILED",

                    {

                        error:
                            error.message

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
