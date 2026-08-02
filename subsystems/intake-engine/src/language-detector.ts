/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Intake Engine
 * Module    : Language Detector
 *
 * Build     : BUILD-000007.2
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

export enum LanguageCode {

    FA = "fa",

    EN = "en",

    AR = "ar",

    UNKNOWN = "unknown"

}

export class LanguageDetector implements PipelineStep {

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
            "STEP 03 : Language Detection"
        );

        if (this.monitoring) {

            this.monitoring.recordEvent(

                "INTAKE_STEP_STARTED",

                {

                    step: "LanguageDetector",

                    sourcePath:
                        context.sourcePath || null

                }

            );

        }

        try {

            const value =
                context.rawContent ??
                context.sourcePath ??
                "";

            if (
                value.trim().length === 0
            ) {

                context.language =
                    LanguageCode.UNKNOWN;

            }

            else if (/[آ-ی]/.test(value)) {

                context.language =
                    LanguageCode.FA;

            }

            else if (/[A-Za-z]/.test(value)) {

                context.language =
                    LanguageCode.EN;

            }

            else if (/[\u0600-\u06FF]/.test(value)) {

                context.language =
                    LanguageCode.AR;

            }

            else {

                context.language =
                    LanguageCode.UNKNOWN;

            }

            if (this.monitoring) {

                this.monitoring.recordEvent(

                    "INTAKE_LANGUAGE_DETECTION_COMPLETED",

                    {

                        step:
                            "LanguageDetector",

                        language:
                            context.language,

                        duration:
                            new Date().getTime()
                            -
                            startedAt.getTime()

                    }

                );

                this.monitoring.updateMetric(
                    "languagesDetected"
                );

            }

            console.log(
                "Detected Language:",
                context.language
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
                            "LanguageDetector",

                        error:
                            message

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
