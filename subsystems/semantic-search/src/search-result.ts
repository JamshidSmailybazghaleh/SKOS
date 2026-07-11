/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Semantic Search
 * Module    : Search Result
 *
 * Build     : BUILD-000189
 * Version   : 1.0.0
 * ==========================================================
 */

/**
 * Search result type.
 */
export enum SearchResultType {

    Knowledge = "knowledge",

    GraphNode = "graph-node",

    VaultRecord = "vault-record",

    Metadata = "metadata"

}

/**
 * One search result.
 */
export interface SearchResult {

    /**
     * Result identifier.
     */
    id: string;

    /**
     * Result type.
     */
    type: SearchResultType;

    /**
     * Display title.
     */
    title: string;

    /**
     * Short description or snippet.
     */
    snippet: string;

    /**
     * Relevance score (0.0–1.0).
     */
    score: number;

    /**
     * Original source identifier.
     */
    sourceId: string;

    /**
     * Optional metadata.
     */
    metadata?: Record<string, unknown>;

}
