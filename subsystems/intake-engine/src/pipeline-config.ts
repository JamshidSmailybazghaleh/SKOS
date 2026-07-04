/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Intake Engine
 * Module    : Pipeline Configuration
 *
 * Build     : BUILD-000033
 * Sprint    : Sprint 02
 * Version   : 0.0.3
 *
 * Status    : Active
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */

import { PipelineStep } from "./pipeline-step";

import { SourceValidator } from "./source-validator";

import { FileTypeDetector } from "./file-type-detector";

import { LanguageDetector } from "./language-detector";

import { DocumentParser } from "./document-parser";

export function buildPipeline(): PipelineStep[] {

    return [

        //--------------------------------------------------
        // STEP 01
        //--------------------------------------------------

        new SourceValidator(),

        //--------------------------------------------------
        // STEP 02
        //--------------------------------------------------

        new FileTypeDetector(),

        //--------------------------------------------------
        // STEP 03
        //--------------------------------------------------

        new LanguageDetector(),

        //--------------------------------------------------
        // STEP 04
        //--------------------------------------------------

        new DocumentParser()

    ];

}
