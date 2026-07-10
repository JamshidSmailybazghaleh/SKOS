/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Integration Runtime
 * Module    : Pipeline Stage
 *
 * Build     : BUILD-000186
 * Version   : 1.0.0
 * ==========================================================
 */

/**
 * Standard execution stages of the SKOS pipeline.
 */
export enum PipelineStage {

    /**
     * File discovery.
     */
    FileEnumeration = "file-enumeration",

    /**
     * Metadata extraction.
     */
    MetadataExtraction = "metadata-extraction",

    /**
     * Content extraction.
     */
    ContentExtraction = "content-extraction",

    /**
     * Content analysis.
     */
    ContentIntelligence = "content-intelligence",

    /**
     * Knowledge extraction.
     */
    KnowledgeExtraction = "knowledge-extraction",

    /**
     * Persistent storage.
     */
    KnowledgeVault = "knowledge-vault",

    /**
     * Knowledge graph construction.
     */
    KnowledgeGraph = "knowledge-graph",

    /**
     * Runtime report generation.
     */
    RuntimeReport = "runtime-report",

    /**
     * Pipeline completed.
     */
    Completed = "completed"

}

/**
 * Stage execution status.
 */
export enum PipelineStageStatus {

    Pending = "pending",

    Running = "running",

    Completed = "completed",

    Failed = "failed",

    Skipped = "skipped"

}

/**
 * Runtime information for one stage.
 */
export interface PipelineStageState {

    stage: PipelineStage;

    status: PipelineStageStatus;

    startedAt?: Date;

    finishedAt?: Date;

    error?: string;

}
