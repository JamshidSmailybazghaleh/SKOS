/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Intake Engine
 * Module    : File Type Detector
 *
 * Build     : BUILD-000005
 * Sprint    : Sprint 02
 * Version   : 0.1.0
 *
 * Status    : Monitoring Enabled
 * ==========================================================
 */


import {

    PipelineContext,

    PipelineStep

} from "./pipeline-step";



export enum SourceType {

    PDF = "pdf",

    IMAGE = "image",

    AUDIO = "audio",

    VIDEO = "video",

    TEXT = "text",

    HTML = "html",

    UNKNOWN = "unknown"

}



export class FileTypeDetector implements PipelineStep {


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



        console.log(
            "STEP 02 : File Type Detection"
        );



        if (this.monitoring) {


            this.monitoring.recordEvent(

                "INTAKE_FILE_TYPE_DETECTION_STARTED",

                {

                    sourcePath:
                        context.sourcePath || null

                }

            );


        }



        /**
         * Safety check:
         * Pipeline may receive rawContent
         * without sourcePath.
         */


        if (!context.sourcePath) {


            context.sourceType =
                SourceType.UNKNOWN;



            if (this.monitoring) {


                this.monitoring.recordEvent(

                    "INTAKE_FILE_TYPE_UNKNOWN",

                    {

                        reason:
                            "NO_SOURCE_PATH"

                    }

                );


                this.monitoring.updateMetric(

                    "fileTypesUnknown"

                );


            }



            console.log(

                "No source path provided."

            );



            return context;


        }




        const filePath =

            context.sourcePath
                .toLowerCase();



        let detectedType =
            SourceType.UNKNOWN;



        if (filePath.endsWith(".pdf")) {


            detectedType =
                SourceType.PDF;


        }


        else if (


            filePath.endsWith(".jpg") ||

            filePath.endsWith(".jpeg") ||

            filePath.endsWith(".png") ||

            filePath.endsWith(".webp")


        ) {


            detectedType =
                SourceType.IMAGE;


        }


        else if (


            filePath.endsWith(".mp3") ||

            filePath.endsWith(".wav")


        ) {


            detectedType =
                SourceType.AUDIO;


        }


        else if (


            filePath.endsWith(".mp4") ||

            filePath.endsWith(".mkv")


        ) {


            detectedType =
                SourceType.VIDEO;


        }


        else if (


            filePath.endsWith(".txt") ||

            filePath.endsWith(".md")


        ) {


            detectedType =
                SourceType.TEXT;


        }


        else if (


            filePath.endsWith(".html") ||

            filePath.endsWith(".htm")


        ) {


            detectedType =
                SourceType.HTML;


        }




        context.sourceType =
            detectedType;



        if (this.monitoring) {


            this.monitoring.recordEvent(

                "INTAKE_FILE_TYPE_DETECTED",

                {

                    sourceType:
                        detectedType,

                    sourcePath:
                        context.sourcePath

                }

            );


            this.monitoring.updateMetric(

                "fileTypesDetected"

            );



            if (

                detectedType ===
                SourceType.UNKNOWN

            ) {


                this.monitoring.updateMetric(

                    "fileTypesUnknown"

                );


            }


        }




        console.log(

            "Detected:",

            context.sourceType

        );



        return context;


    }


}
