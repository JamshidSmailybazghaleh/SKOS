/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Android Connector
 * Module    : SD Card
 *
 * Build     : BUILD-000168
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

/**
 * SD Card state.
 */
export enum SDCardState {

    Unknown = "unknown",

    Mounted = "mounted",

    Unmounted = "unmounted",

    ReadOnly = "read-only",

    Removed = "removed",

    Error = "error"

}

/**
 * SD Card information.
 */
export interface SDCardInfo {

    /**
     * Stable source identifier.
     */
    sourceId: string;

    /**
     * Display name.
     */
    name: string;

    /**
     * Root URI.
     */
    uri: string;

    /**
     * Current state.
     */
    state: SDCardState;

    /**
     * Total capacity in bytes.
     */
    totalSpace: number;

    /**
     * Free space in bytes.
     */
    freeSpace: number;

    /**
     * Last successful scan.
     */
    lastScanAt?: number;

    /**
     * Number of indexed files.
     */
    indexedFiles: number;

    /**
     * Whether read access is available.
     */
    readable: boolean;

}

/**
 * SD Card Manager.
 */
export class SDCardManager {

    private readonly cards: SDCardInfo[] = [];

    /**
     * Register one SD Card.
     */
    public register(
        card: SDCardInfo
    ): void {

        this.cards.push(card);

    }

    /**
     * Return all registered cards.
     */
    public list(): SDCardInfo[] {

        return [...this.cards];

    }

    /**
     * Find one card.
     */
    public find(
        sourceId: string
    ): SDCardInfo | undefined {

        return this.cards.find(

            card => card.sourceId === sourceId

        );

    }

    /**
     * Update scan information.
     */
    public updateScan(
        sourceId: string,
        indexedFiles: number
    ): boolean {

        const card = this.find(sourceId);

        if (!card) {

            return false;

        }

        card.indexedFiles = indexedFiles;
        card.lastScanAt = Date.now();

        return true;

    }

    /**
     * Remove one card.
     */
    public remove(
        sourceId: string
    ): boolean {

        const index = this.cards.findIndex(

            card => card.sourceId === sourceId

        );

        if (index < 0) {

            return false;

        }

        this.cards.splice(index, 1);

        return true;

    }

}
