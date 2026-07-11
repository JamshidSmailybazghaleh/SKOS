/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Agent Framework
 * Module    : Agent
 *
 * Build     : BUILD-000190
 * Version   : 1.0.0
 * ==========================================================
 */

/**
 * Agent lifecycle status.
 */
export enum AgentStatus {

    Idle = "idle",

    Ready = "ready",

    Running = "running",

    Paused = "paused",

    Completed = "completed",

    Failed = "failed"

}

/**
 * Agent capabilities.
 */
export interface AgentCapabilities {

    canSearch: boolean;

    canInfer: boolean;

    canReadKnowledge: boolean;

    canWriteKnowledge: boolean;

    canExecuteTasks: boolean;

}

/**
 * Base agent definition.
 */
export interface Agent {

    /**
     * Agent identifier.
     */
    id: string;

    /**
     * Agent name.
     */
    name: string;

    /**
     * Agent description.
     */
    description?: string;

    /**
     * Current lifecycle status.
     */
    status: AgentStatus;

    /**
     * Agent capabilities.
     */
    capabilities: AgentCapabilities;

}
