/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Scan Engine
 * Module    : File Scanner
 *
 * Build     : BUILD-000169
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import {
    ScanTask
} from "./scan-task";

/**
 * Discovered file.
 */
export interface ScannedFile {

    /**
     * Source identifier.
     */
    sourceId: string;

    /**
     * Full file URI or path.
     */
    path: string;

    /**
     * File name.
     */
    name: string;

    /**
     * File size.
     */
    size: number;

    /**
     * Last modified timestamp.
     */
    modifiedAt: number;

}

/**
 * File Scanner.
 */
export class FileScanner {

    /**
     * Internal scan queue.
     */
    private readonly queue: ScanTask[] = [];

    /**
     * Register one scan task.
     */
    public enqueue(
        task: ScanTask
    ): void {

        this.queue.push(task);

    }

    /**
     * Return next task.
     */
    public dequeue():
        ScanTask | undefined {

        return this.queue.shift();

    }

    /**
     * Queue size.
     */
    public size(): number {

        return this.queue.length;

    }

    /**
     * Scan one source.
     *
     * Foundation implementation.
     */
    public async scan(

        task: ScanTask

    ): Promise<ScannedFile[]> {

        /**
         * Android implementation
         * will enumerate files here.
         */

        return [];

    }

    /**
     * Clear queue.
     */
    public clear(): void {

        this.queue.length = 0;

    }

}
