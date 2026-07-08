/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Unified Search Engine
 * Module    : Search History
 *
 * Build     : BUILD-000172
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import {
    SearchQuery
} from "./search-query";

/**
 * Search history entry.
 */
export interface SearchHistoryEntry {

    /**
     * Stable history identifier.
     */
    id: string;

    /**
     * Executed search query.
     */
    query: SearchQuery;

    /**
     * Number of returned results.
     */
    resultCount: number;

    /**
     * Execution timestamp.
     */
    executedAt: number;

}

/**
 * Search History Manager.
 */
export class SearchHistory {

    private readonly entries: SearchHistoryEntry[] = [];

    /**
     * Record one search.
     */
    public record(
        entry: SearchHistoryEntry
    ): void {

        this.entries.push(entry);

    }

    /**
     * Return all history entries.
     */
    public list(): SearchHistoryEntry[] {

        return [...this.entries];

    }

    /**
     * Return the latest entries.
     */
    public latest(
        limit: number = 10
    ): SearchHistoryEntry[] {

        return this.entries
            .slice(-limit)
            .reverse();

    }

    /**
     * Clear all history.
     */
    public clear(): void {

        this.entries.length = 0;

    }

}
