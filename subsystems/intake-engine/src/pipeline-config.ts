/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Intake Engine
 * Module    : Pipeline Configuration
 *
 * Build     : BUILD-000031
 * Sprint    : Sprint 02
 * Version   : 0.0.1
 *
 * Status    : Active
 * ==========================================================
 */

import { PipelineStep } from "./pipeline-step";

import { SourceValidator } from "./source-validator";

import { FileTypeDetector } from "./file-type-detector";

export function buildPipeline(): PipelineStep[] {

    return [

        new SourceValidator(),

        new FileTypeDetector()

    ];

}
