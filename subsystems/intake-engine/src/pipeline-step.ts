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
 * Version   : 0.0.2
 *
 * Status    : Active
 * ==========================================================
 */


export interface PipelineContext {

    /**
     * Original source location
     */
    sourcePath?: string;


    /**
     * Raw incoming content
     */
    rawContent?: string;


    /**
     * Detected source type
     */
    sourceType?: string;


    /**
     * Detected language
     */
    language?: string;


    /**
     * Extracted metadata
     */
    metadata?: any;


    /**
     * Parsed document
     */
    parsedDocument?: any;


    /**
     * Final SKOS Knowledge Object
     */
    knowledgeObject?: any;

}



export interface PipelineStep {

    execute(
        context: PipelineContext
    ): PipelineContext;

}
