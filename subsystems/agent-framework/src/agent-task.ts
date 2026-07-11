/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Agent Framework
 * Module    : Agent Task
 *
 * Build     : BUILD-000190
 * Version   : 1.0.0
 * ==========================================================
 */

/**
 * Task lifecycle.
 */
export enum AgentTaskStatus {

    Pending = "pending",

    Ready = "ready",

    Running = "running",

    Completed = "completed",

    Failed = "failed",

    Cancelled = "cancelled"

}

/**
 * Task priority.
 */
export enum AgentTaskPriority {

    Low = 10,

    Normal = 50,

    High = 100,

    Critical = 1000

}

/**
 * Agent task definition.
 */
export interface AgentTask {

    /**
     * Task identifier.
     */
    id: string;

    /**
     * Task title.
     */
    name: string;

    /**
     * Task description.
     */
    description?: string;

    /**
     * Current task status.
     */
    status: AgentTaskStatus;

    /**
     * Task priority.
     */
    priority: AgentTaskPriority;

    /**
     * Input parameters.
     */
    input?: Record<string, unknown>;

    /**
     * Output parameters.
     */
    output?: Record<string, unknown>;

    /**
     * Task creation time.
     */
    createdAt: Date;

    /**
     * Completion time.
     */
    completedAt?: Date;

}
