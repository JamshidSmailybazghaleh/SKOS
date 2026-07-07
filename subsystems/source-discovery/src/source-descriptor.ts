/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Source Discovery
 * Module    : Source Descriptor
 *
 * Build     : BUILD-000165
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import {
    SourceStatus,
    SourceType
} from "./source-type";

/**
 * Source descriptor.
 */
export interface SourceDescriptor {

    /**
     * Unique source identifier.
     */
    id: string;

    /**
     * Display name.
     */
    name: string;

    /**
     * Source type.
     */
    type: SourceType;

    /**
     * Root path or provider identifier.
     */
    location: string;

    /**
     * Indicates whether the source is enabled.
     */
    enabled: boolean;

    /**
     * Current status.
     */
    status: SourceStatus;

    /**
     * Total discovered files.
     */
    discoveredFiles: number;

    /**
     * Total imported files.
     */
    importedFiles: number;

    /**
     * Last scan timestamp.
     */
    lastScan: number | null;

    /**
     * Last synchronization timestamp.
     */
    lastSynchronization: number | null;

    /**
     * Optional description.
     */
    description?: string;

}

/**
 * Source descriptor factory.
 */
export class SourceDescriptorFactory {

    /**
     * Create source descriptor.
     */
    public static create(

        id: string,

        name: string,

        type: SourceType,

        location: string

    ): SourceDescriptor {

        return {

            id,

            name,

            type,

            location,

            enabled: true,

            status: SourceStatus.PermissionRequired,

            discoveredFiles: 0,

            importedFiles: 0,

            lastScan: null,

            lastSynchronization: null

        };

    }

}
