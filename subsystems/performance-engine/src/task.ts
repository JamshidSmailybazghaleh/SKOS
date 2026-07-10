/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Performance Engine
 * Module    : Task Model
 *
 * Build     : BUILD-000183
 * Version   : 1.0.0
 * ==========================================================
 */

/**
 * Supported task types.
 */
export enum TaskType {

    FileEnumeration = "file-enumeration",

    MetadataExtraction = "metadata-extraction",

    ContentExtraction = "content-extraction",

    ContentIntelligence = "content-intelligence",

    KnowledgeExtraction = "knowledge-extraction",

    KnowledgeStorage = "knowledge-storage",

    KnowledgeGraph = "knowledge-graph"

}

/**
 * Task execution status.
 */
export enum TaskStatus {

    Pending = "pending",

    Running = "running",

    Completed = "completed",

    Failed = "failed",

    Cancelled = "cancelled"

}

/**
 * Task priority.
 */
export enum TaskPriority {

    Low = 1,

    Normal = 5,

    High = 10,

    Critical = 20

}

/**
 * Runtime task model.
 */
export interface Task {

    /**
     * Unique task identifier.
     */
    id: string;

    /**
     * Task type.
     */
    type: TaskType;

    /**
     * Current task status.
     */
    status: TaskStatus;

    /**
     * Task priority.
     */
    priority: TaskPriority;

    /**
     * Task creation timestamp.
     */
    createdAt: Date;

    /**
     * Execution start time.
     */
    startedAt?: Date;

    /**
     * Execution finish time.
     */
    completedAt?: Date;

    /**
     * Optional error message.
     */
    error?: string;

    /**
     * Additional task data.
     */
    payload?: Record<string, unknown>;

}
