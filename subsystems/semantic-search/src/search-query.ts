/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Semantic Search
 * Module    : Search Query
 *
 * Build     : BUILD-000189
 * Version   : 1.0.0
 * ==========================================================
 */

/**
 * Search execution mode.
 */
export enum SearchMode {

    Keyword = "keyword",

    Semantic = "semantic",

    Hybrid = "hybrid"

}

/**
 * Search scope.
 */
export enum SearchScope {

    All = "all",

    Knowledge = "knowledge",

    Graph = "graph",

    Vault = "vault",

    Metadata = "metadata"

}

/**
 * Search query.
 */
export interface SearchQuery {

    /**
     * Original user query.
     */
    text: string;

    /**
     * Search mode.
     */
    mode: SearchMode;

    /**
     * Search scope.
     */
    scope: SearchScope;

    /**
     * Maximum number of results.
     */
    limit: number;

    /**
     * Minimum accepted score.
     */
    minimumScore: number;

    /**
     * Optional filters.
     */
    filters?: Record<string, unknown>;

}
