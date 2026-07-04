/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Intake Engine
 * Module    : Pipeline Configuration
 *
 * Build     : BUILD-000034
 * Sprint    : Sprint 02
 * Version   : 0.0.4
 *
 * Status    : Active
 * ==========================================================
 */

import { PipelineStep } from "./pipeline-step";

import { SourceValidator } from "./source-validator";
import { FileTypeDetector } from "./file-type-detector";
import { LanguageDetector } from "./language-detector";
import { DocumentParser } from "./document-parser";

export interface PipelineDescriptor {

    id: string;

    name: string;

    enabled: boolean;

    step: PipelineStep;

}

export function buildPipeline(): PipelineDescriptor[] {

    return [

        {
            id: "STEP-001",
            name: "Source Validator",
            enabled: true,
            step: new SourceValidator()
        },

        {
            id: "STEP-002",
            name: "File Type Detector",
            enabled: true,
            step: new FileTypeDetector()
        },

        {
            id: "STEP-003",
            name: "Language Detector",
            enabled: true,
            step: new LanguageDetector()
        },

        {
            id: "STEP-004",
            name: "Document Parser",
            enabled: true,
            step: new DocumentParser()
        }

    ];

}
