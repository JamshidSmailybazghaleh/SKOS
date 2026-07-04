/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Intake Engine
 * Module    : Language Detector
 *
 * Build     : BUILD-000032
 * Sprint    : Sprint 02
 * Version   : 0.0.2
 *
 * Status    : Active
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

    public execute(
        context: PipelineContext
    ): PipelineContext {

        console.log("STEP 03 : Language Detection");

        const value = context.sourcePath;

        if (!value || value.trim().length === 0) {

            context.language = LanguageCode.UNKNOWN;

            return context;

        }

        if (/[آ-ی]/.test(value)) {

            context.language = LanguageCode.FA;

        }

        else if (/[A-Za-z]/.test(value)) {

            context.language = LanguageCode.EN;

        }

        else if (/[\u0600-\u06FF]/.test(value)) {

            context.language = LanguageCode.AR;

        }

        else {

            context.language = LanguageCode.UNKNOWN;

        }

        console.log(
            "Detected Language:",
            context.language
        );

        return context;

    }

}
