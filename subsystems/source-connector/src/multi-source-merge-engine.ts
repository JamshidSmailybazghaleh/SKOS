/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Source Connector
 * Module    : Multi Source Merge Engine
 *
 * Build     : BUILD-000146
 * Sprint    : Phase 2
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import { UnifiedFileRecord } from "./unified-file-record";

export class MultiSourceMergeEngine {

    private readonly files: UnifiedFileRecord[] = [];

    /**
     * Add discovered file.
     */
    public add(

        file: UnifiedFileRecord

    ): void {

        this.files.push(file);

    }

    /**
     * Add many files.
     */
    public addRange(

        files: UnifiedFileRecord[]

    ): void {

        this.files.push(...files);

    }

    /**
     * All merged files.
     */
    public getAll(): UnifiedFileRecord[] {

        return [...this.files];

    }

    /**
     * Total files.
     */
    public count(): number {

        return this.files.length;

    }

    /**
     * Clear collection.
     */
    public clear(): void {

        this.files.length = 0;

    }

}
