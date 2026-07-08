/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Scan Engine
 * Module    : Scan Engine
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

import {
    FileScanner,
    ScannedFile
} from "./file-scanner";

import {
    HashEngine
} from "./hash-engine";

import {
    ScanProgressManager
} from "./scan-progress";

import {
    IntelligenceEngine
} from "../../content-intelligence/src/intelligence-engine";

/**
 * Scan Engine.
 */
export class ScanEngine {

    private readonly scanner =
        new FileScanner();

    private readonly hashEngine =
        new HashEngine();

    private readonly progress =
        new ScanProgressManager();

    private readonly intelligence =
        new IntelligenceEngine();

    /**
     * Execute one scan task.
     */
    public async execute(
        task: ScanTask
    ): Promise<void> {

        const files: ScannedFile[] =
            await this.scanner.scan(task);

        for (const file of files) {

            await this.hashEngine.calculate(
                file.path,
                file.size
            );

            this.intelligence.analyze(
                file.name,
                file.path,
                file.size
            );

            // Progress updates
            // will be connected here.
        }

    }

    /**
     * Pause scan.
     */
    public pause(
        taskId: string
    ): void {

        // Future implementation.

    }

    /**
     * Resume scan.
     */
    public resume(
        taskId: string
    ): void {

        // Future implementation.

    }

    /**
     * Cancel scan.
     */
    public cancel(
        taskId: string
    ): void {

        // Future implementation.

    }

}
