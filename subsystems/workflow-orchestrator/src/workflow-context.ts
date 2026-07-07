/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Workflow Orchestrator
 * Module    : Workflow Context
 *
 * Build     : BUILD-000164
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import {

    WorkflowStage,
    WorkflowState

} from "./workflow-stage";

/**
 * Workflow source.
 */
export enum WorkflowSource {

    InternalStorage = "internal-storage",

    SDCard = "sd-card",

    CloudStorage = "cloud-storage",

    ExternalDrive = "external-drive",

    ManualImport = "manual-import"

}

/**
 * Workflow context.
 */
export interface WorkflowContext {

    /**
     * Unique workflow identifier.
     */
    workflowId: string;

    /**
     * Asset identifier.
     */
    assetId: string;

    /**
     * Original file name.
     */
    fileName: string;

    /**
     * Source location.
     */
    source: WorkflowSource;

    /**
     * Original file path.
     */
    sourcePath: string;

    /**
     * Current processing stage.
     */
    currentStage: WorkflowStage;

    /**
     * Current workflow state.
     */
    state: WorkflowState;

    /**
     * File size in bytes.
     */
    fileSize: number;

    /**
     * SHA-256 checksum.
     */
    checksum?: string;

    /**
     * Workflow creation time.
     */
    createdAt: number;

    /**
     * Last update time.
     */
    updatedAt: number;

    /**
     * Optional metadata.
     */
    metadata: Record<string, unknown>;

}

/**
 * Workflow context factory.
 */
export class WorkflowContextFactory {

    public static create(

        workflowId: string,

        assetId: string,

        fileName: string,

        source: WorkflowSource,

        sourcePath: string,

        fileSize: number

    ): WorkflowContext {

        const now = Date.now();

        return {

            workflowId,

            assetId,

            fileName,

            source,

            sourcePath,

            currentStage: WorkflowStage.Import,

            state: WorkflowState.Pending,

            fileSize,

            metadata: {},

            createdAt: now,

            updatedAt: now

        };

    }

}
