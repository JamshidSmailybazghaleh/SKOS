/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Intake Engine
 * Module    : Source Validator
 *
 * Build     : BUILD-000029
 * Sprint    : Sprint 02
 * Version   : 0.0.2
 *
 * Status    : Active
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */

import {
    PipelineContext,
    PipelineStep
} from "./pipeline-step";

export class SourceValidator implements PipelineStep {

    public execute(
        context: PipelineContext
    ): PipelineContext {

        console.log("STEP 01 : Source Validation");

        if (!context.sourcePath) {

            throw new Error("Source path is empty.");

        }

        if (context.sourcePath.trim().length === 0) {

            throw new Error("Source path is invalid.");

        }

        console.log("Source validation passed.");

        return context;

    }

}
