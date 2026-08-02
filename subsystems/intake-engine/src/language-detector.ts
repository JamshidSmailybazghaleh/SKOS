/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Intake Engine
 * Module    : Language Detector
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



export enum LanguageCode {

    FA = "fa",

    EN = "en",

    AR = "ar",

    UNKNOWN = "unknown"

}





export class LanguageDetector implements PipelineStep {



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
            "STEP 03 : Language Detection"
        );



        if (this.monitoring) {


            this.monitoring.recordEvent(

                "INTAKE_LANGUAGE_DETECTION_STARTED",

                {

                    sourcePath:
                        context.sourcePath || null

                }

            );


        }



        try {


            const value =

                context.sourcePath || "";



            let detectedLanguage =

                LanguageCode.UNKNOWN;





            if (

                !value ||

                value.trim().length === 0

            ) {


                detectedLanguage =

                    LanguageCode.UNKNOWN;


            }



            else if (

                /[آ-ی]/.test(value)

            ) {


                detectedLanguage =

                    LanguageCode.FA;


            }



            else if (

                /[A-Za-z]/.test(value)

            ) {


                detectedLanguage =

                    LanguageCode.EN;


            }



            else if (

                /[\u0600-\u06FF]/.test(value)

            ) {


                detectedLanguage =

                    LanguageCode.AR;


            }





            context.language =

                detectedLanguage;





            if (this.monitoring) {


                this.monitoring.recordEvent(

                    "INTAKE_LANGUAGE_DETECTED",

                    {

                        language:

                            detectedLanguage

                    }

                );



                this.monitoring.updateMetric(

                    "languagesDetected"

                );



                if (

                    detectedLanguage ===

                    LanguageCode.UNKNOWN

                ) {


                    this.monitoring.updateMetric(

                        "unknownLanguages"

                    );


                }


            }





            console.log(

                "Detected Language:",

                context.language

            );



            return context;



        }



        catch(error) {


            if (this.monitoring) {


                this.monitoring.recordEvent(

                    "INTAKE_LANGUAGE_DETECTION_FAILED",

                    {

                        error:

                            error.message

                    }

                );



                this.monitoring.updateMetric(

                    "languageDetectionFailed"

                );


            }



            throw error;


        }


    }


}
