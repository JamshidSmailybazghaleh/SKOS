/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Intake Engine
 * Module    : Pipeline Step Interface
 *
 * Build     : BUILD-000027
 * Sprint    : Sprint 02
 * Version   : 0.0.1
 *
 * Status    : Active
 * ==========================================================
 */

export interface PipelineContext {

    sourcePath: string;

    sourceType?: string;

    language?: string;

    metadata?: any;

    parsedDocument?: any;

    knowledgeObject?: any;

}

export interface PipelineStep {

    execute(
        context: PipelineContext
    ): PipelineContext;

}
