/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Source Discovery
 * Module    : Scan Result
 *
 * Build     : BUILD-000165
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import { SourceType } from "./source-type";

/**
 * Scan execution result.
 */
export enum ScanStatus {

    Pending = "pending",

    Running = "running",

    Completed = "completed",

    Cancelled = "cancelled",

    Failed = "failed"

}

/**
 * File candidate discovered during scan.
 */
export interface ScanCandidate {

    /**
     * File name.
     */
    name: string;

    /**
     * Absolute file path.
     */
    path: string;

    /**
     * File extension.
     */
    extension: string;

    /**
     * File size (bytes).
     */
    size: number;

    /**
     * SHA-256 checksum (optional).
     */
    checksum?: string;

    /**
     * Candidate selected for import.
     */
    selected: boolean;

}

/**
 * Scan summary.
 */
export interface ScanResult {

    /**
     * Scan identifier.
     */
    scanId: string;

    /**
     * Source type.
     */
    source: SourceType;

    /**
     * Current status.
     */
    status: ScanStatus;

    /**
     * Scan start time.
     */
    startedAt: number;

    /**
     * Scan completion time.
     */
    completedAt: number | null;

    /**
     * Total discovered files.
     */
    discoveredFiles: number;

    /**
     * Import candidates.
     */
    candidateFiles: number;

    /**
     * Duplicate files.
     */
    duplicateFiles: number;

    /**
     * Ignored files.
     */
    ignoredFiles: number;

    /**
     * Error count.
     */
    errors: number;

    /**
     * Warning count.
     */
    warnings: number;

    /**
     * Candidate list.
     */
    candidates: ScanCandidate[];

}

/**
 * Scan result builder.
 */
export class ScanResultBuilder {

    private readonly candidates: ScanCandidate[] = [];

    /**
     * Add discovered file.
     */
    public addCandidate(
        candidate: ScanCandidate
    ): void {

        this.candidates.push(candidate);

    }

    /**
     * Build final scan result.
     */
    public build(

        scanId: string,

        source: SourceType,

        status: ScanStatus,

        duplicates: number,

        ignored: number,

        errors: number,

        warnings: number,

        startedAt: number

    ): ScanResult {

        return {

            scanId,

            source,

            status,

            startedAt,

            completedAt: Date.now(),

            discoveredFiles:
                this.candidates.length,

            candidateFiles:
                this.candidates.filter(
                    file => file.selected
                ).length,

            duplicateFiles:
                duplicates,

            ignoredFiles:
                ignored,

            errors,

            warnings,

            candidates: [
                ...this.candidates
            ]

        };

    }

}
