/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Workflow Orchestrator
 * Module    : Workflow Stage
 *
 * Build     : BUILD-000164
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

/**
 * Standard workflow stages.
 */
export enum WorkflowStage {

    /**
     * File imported from source.
     */
    Import = "import",

    /**
     * File identification.
     */
    Identification = "identification",

    /**
     * File validation.
     */
    Validation = "validation",

    /**
     * File normalization.
     */
    Normalization = "normalization",

    /**
     * Duplicate detection.
     */
    Deduplication = "deduplication",

    /**
     * Metadata extraction.
     */
    MetadataExtraction = "metadata-extraction",

    /**
     * Integrity verification.
     */
    IntegrityVerification = "integrity-verification",

    /**
     * Asset registration.
     */
    AssetRegistration = "asset-registration",

    /**
     * Knowledge Vault storage.
     */
    KnowledgeVaultStorage = "knowledge-vault-storage",

    /**
     * Knowledge Graph update.
     */
    KnowledgeGraphUpdate = "knowledge-graph-update",

    /**
     * Publication queue.
     */
    PublicationQueue = "publication-queue",

    /**
     * Monitoring and reporting.
     */
    Monitoring = "monitoring",

    /**
     * Workflow completed.
     */
    Completed = "completed"

}

/**
 * Workflow execution state.
 */
export enum WorkflowState {

    Pending = "pending",

    Running = "running",

    Paused = "paused",

    Completed = "completed",

    Failed = "failed",

    Cancelled = "cancelled"

}

/**
 * Stage definition.
 */
export interface WorkflowStageDefinition {

    /**
     * Stage identifier.
     */
    stage: WorkflowStage;

    /**
     * Human-readable name.
     */
    title: string;

    /**
     * Execution order.
     */
    order: number;

    /**
     * Indicates whether this stage is mandatory.
     */
    required: boolean;

}

/**
 * Default workflow definition.
 */
export const DefaultWorkflow: WorkflowStageDefinition[] = [

    {
        stage: WorkflowStage.Import,
        title: "Import",
        order: 1,
        required: true
    },

    {
        stage: WorkflowStage.Identification,
        title: "Identification",
        order: 2,
        required: true
    },

    {
        stage: WorkflowStage.Validation,
        title: "Validation",
        order: 3,
        required: true
    },

    {
        stage: WorkflowStage.Normalization,
        title: "Normalization",
        order: 4,
        required: true
    },

    {
        stage: WorkflowStage.Deduplication,
        title: "Deduplication",
        order: 5,
        required: true
    },

    {
        stage: WorkflowStage.MetadataExtraction,
        title: "Metadata Extraction",
        order: 6,
        required: true
    },

    {
        stage: WorkflowStage.IntegrityVerification,
        title: "Integrity Verification",
        order: 7,
        required: true
    },

    {
        stage: WorkflowStage.AssetRegistration,
        title: "Asset Registration",
        order: 8,
        required: true
    },

    {
        stage: WorkflowStage.KnowledgeVaultStorage,
        title: "Knowledge Vault Storage",
        order: 9,
        required: true
    },

    {
        stage: WorkflowStage.KnowledgeGraphUpdate,
        title: "Knowledge Graph Update",
        order: 10,
        required: true
    },

    {
        stage: WorkflowStage.PublicationQueue,
        title: "Publication Queue",
        order: 11,
        required: false
    },

    {
        stage: WorkflowStage.Monitoring,
        title: "Monitoring",
        order: 12,
        required: true
    }

];
