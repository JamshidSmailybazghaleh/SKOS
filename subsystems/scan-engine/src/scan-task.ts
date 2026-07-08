/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Scan Engine
 * Module    : Scan Task
 *
 * Build     : BUILD-000169
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import {
    StorageProvider
} from "../../android-connector/src/storage-access";

/**
 * Scan task status.
 */
export enum ScanTaskStatus {

    Pending = "pending",

    Waiting = "waiting",

    Running = "running",

    Paused = "paused",

    Completed = "completed",

    Cancelled = "cancelled",

    Failed = "failed"

}

/**
 * Scan priority.
 */
export enum ScanPriority {

    Low = 1,

    Normal = 5,

    High = 10,

    Critical = 100

}

/**
 * Scan task definition.
 */
export interface ScanTask {

    /**
     * Unique task identifier.
     */
    id: string;

    /**
     * Source identifier.
     */
    sourceId: string;

    /**
     * Storage provider.
     */
    provider: StorageProvider;

    /**
     * Root URI or path.
     */
    root: string;

    /**
     * Current status.
     */
    status: ScanTaskStatus;

    /**
     * Priority.
     */
    priority: ScanPriority;

    /**
     * Creation time.
     */
    createdAt: number;

    /**
     * Start time.
     */
    startedAt?: number;

    /**
     * Finish time.
     */
    finishedAt?: number;

    /**
     * Optional description.
     */
    description?: string;

}

/**
 * Scan Task Factory.
 */
export class ScanTaskFactory {

    /**
     * Create a new scan task.
     */
    public static create(

        sourceId: string,

        provider: StorageProvider,

        root: string

    ): ScanTask {

        return {

            id: `SCAN-${Date.now()}`,

            sourceId,

            provider,

            root,

            status: ScanTaskStatus.Pending,

            priority: ScanPriority.Normal,

            createdAt: Date.now()

        };

    }

}
