/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Intake Engine
 * Module    : Metadata Extractor
 *
 * Build     : BUILD-000007.4
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



export interface ExtractedMetadata {

    title: string;

    language: string;

    paragraphCount: number;

    characterCount: number;

    extractedAt: Date;

}



export class MetadataExtractor implements PipelineStep {



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

            "STEP 05 : Metadata Extraction"

        );



        if (this.monitoring) {

            this.monitoring.recordEvent(

                "INTAKE_STEP_STARTED",

                {

                    step: "MetadataExtractor"

                }

            );

        }



        try {



            const parsed =

                context.parsedDocument;



            if (!parsed) {

                throw new Error(

                    "Parsed document not found."

                );

            }



            const metadata: ExtractedMetadata = {

                title:

                    parsed.paragraphs[0]

                        ?.substring(0, 120)

                    ||

                    "Untitled Document",



                language:

                    context.language ||

                    "unknown",



                paragraphCount:

                    parsed.paragraphs.length,



                characterCount:

                    parsed.raw.length,



                extractedAt:

                    new Date()

            };



            context.metadata = metadata;



            if (this.monitoring) {



                this.monitoring.recordEvent(

                    "INTAKE_METADATA_EXTRACTED",

                    {

                        step:

                            "MetadataExtractor",



                        language:

                            metadata.language,



                        paragraphs:

                            metadata.paragraphCount,



                        characters:

                            metadata.characterCount,



                        duration:

                            new Date().getTime()

                            -

                            startedAt.getTime()

                    }

                );



                this.monitoring.updateMetric(

                    "metadataExtracted"

                );



            }



            console.log(

                metadata

            );



            return context;



        }

        catch (error) {



            const message =

                error instanceof Error

                    ? error.message

                    : String(error);



            if (this.monitoring) {



                this.monitoring.recordEvent(

                    "INTAKE_STEP_FAILED",

                    {

                        step:

                            "MetadataExtractor",



                        error:

                            message

                    }

                );



                this.monitoring.updateMetric(

                    "metadataExtractionFailed"

                );



            }



            throw error;

        }

    }

}
