/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Unified Search Engine
 * Module    : Search Result
 *
 * Build     : BUILD-000172
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import {
    KnowledgeAssetId
} from "../../knowledge-vault/src/knowledge-asset";

/**
 * Search result source.
 */
export enum SearchResultSource {

    Asset = "asset",

    Graph = "graph",

    Semantic = "semantic",

    File = "file",

    Version = "version"

}

/**
 * Search result.
 */
export interface SearchResult {

    /**
     * Stable result identifier.
     */
    id: string;

    /**
     * Related Knowledge Asset.
     */
    assetId?: KnowledgeAssetId;

    /**
     * Display title.
     */
    title: string;

    /**
     * Optional description.
     */
    description?: string;

    /**
     * Result source.
     */
    source: SearchResultSource;

    /**
     * Relevance score.
     */
    score: number;

    /**
     * Optional matched terms.
     */
    matchedTerms?: string[];

    /**
     * Optional metadata.
     */
    metadata?: Record<string, unknown>;

}

/**
 * Search result collection.
 */
export class SearchResultSet {

    private readonly results: SearchResult[] = [];

    /**
     * Add one result.
     */
    public add(
        result: SearchResult
    ): void {

        this.results.push(result);

    }

    /**
     * Return all results.
     */
    public list(): SearchResult[] {

        return [...this.results];

    }

    /**
     * Return results sorted
     * by relevance score.
     */
    public ranked(): SearchResult[] {

        return [...this.results].sort(

            (a, b) => b.score - a.score

        );

    }

    /**
     * Clear all results.
     */
    public clear(): void {

        this.results.length = 0;

    }

}
