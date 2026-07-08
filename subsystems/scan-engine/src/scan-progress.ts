/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Scan Engine
 * Module    : Scan Progress
 *
 * Build     : BUILD-000169
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import {
    ScanTaskStatus
} from "./scan-task";

/**
 * Scan progress information.
 */
export interface ScanProgress {

    /**
     * Scan task identifier.
     */
    taskId: string;

    /**
     * Current task status.
     */
    status: ScanTaskStatus;

    /**
     * Total discovered files.
     */
    totalFiles: number;

    /**
     * Processed files.
     */
    processedFiles: number;

    /**
     * Current file URI or path.
     */
    currentItem?: string;

    /**
     * Last completed checkpoint.
     */
    checkpoint?: string;

    /**
     * Progress percentage.
     */
    percentage: number;

    /**
     * Last update time.
     */
    updatedAt: number;

}

/**
 * Progress Manager.
 */
export class ScanProgressManager {

    private readonly progressMap =
        new Map<string, ScanProgress>();

    /**
     * Register progress.
     */
    public register(
        progress: ScanProgress
    ): void {

        this.progressMap.set(

            progress.taskId,

            progress

        );

    }

    /**
     * Return progress.
     */
    public get(
        taskId: string
    ): ScanProgress | undefined {

        return this.progressMap.get(taskId);

    }

    /**
     * Update progress.
     */
    public update(

        taskId: string,

        processedFiles: number,

        currentItem?: string,

        checkpoint?: string

    ): boolean {

        const progress =

            this.progressMap.get(taskId);

        if (!progress) {

            return false;

        }

        progress.processedFiles =
            processedFiles;

        progress.currentItem =
            currentItem;

        progress.checkpoint =
            checkpoint;

        progress.updatedAt =
            Date.now();

        if (progress.totalFiles > 0) {

            progress.percentage =

                Math.min(

                    100,

                    (processedFiles /
                        progress.totalFiles) * 100

                );

        }

        return true;

    }

    /**
     * Mark task completed.
     */
    public complete(
        taskId: string
    ): boolean {

        const progress =

            this.progressMap.get(taskId);

        if (!progress) {

            return false;

        }

        progress.status =
            ScanTaskStatus.Completed;

        progress.percentage = 100;

        progress.updatedAt =
            Date.now();

        return true;

    }

    /**
     * Remove progress.
     */
    public remove(
        taskId: string
    ): boolean {

        return this.progressMap.delete(taskId);

    }

}
