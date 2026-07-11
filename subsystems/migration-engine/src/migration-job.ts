/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Migration Engine
 * Module    : Migration Job
 *
 * Build     : BUILD-000191
 * Version   : 1.0.0
 * ==========================================================
 */

import { MigrationSource } from "./migration-source";

/**
 * Migration job status.
 */
export enum MigrationJobStatus {

    Pending = "pending",

    Running = "running",

    Paused = "paused",

    Completed = "completed",

    Failed = "failed",

    Cancelled = "cancelled"

}

/**
 * Migration job definition.
 */
export interface MigrationJob {

    /**
     * Job identifier.
     */
    id: string;

    /**
     * Job name.
     */
    name: string;

    /**
     * Migration source.
     */
    source: MigrationSource;

    /**
     * Current status.
     */
    status: MigrationJobStatus;

    /**
     * Recursive scan.
     */
    recursive: boolean;

    /**
     * Include hidden files.
     */
    includeHiddenFiles: boolean;

    /**
     * File filters.
     */
    filters?: string[];

    /**
     * Creation time.
     */
    createdAt: Date;

    /**
     * Start time.
     */
    startedAt?: Date;

    /**
     * Completion time.
     */
    completedAt?: Date;

}
