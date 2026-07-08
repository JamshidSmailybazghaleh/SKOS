/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Unified Search Engine
 * Module    : Search Query
 *
 * Build     : BUILD-000172
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import {
    ContentLanguage,
    ContentType
} from "../../content-intelligence/src/content-type";

/**
 * Search scope.
 */
export enum SearchScope {

    All = "all",

    Assets = "assets",

    Graph = "graph",

    Semantic = "semantic",

    Files = "files",

    Versions = "versions"

}

/**
 * Search mode.
 */
export enum SearchMode {

    Exact = "exact",

    Fuzzy = "fuzzy",

    Semantic = "semantic"

}

/**
 * Search filters.
 */
export interface SearchFilters {

    language?: ContentLanguage;

    contentType?: ContentType;

    tags?: string[];

    author?: string;

}

/**
 * Search query.
 */
export interface SearchQuery {

    /**
     * Search text.
     */
    text: string;

    /**
     * Search scope.
     */
    scope: SearchScope;

    /**
     * Search mode.
     */
    mode: SearchMode;

    /**
     * Optional filters.
     */
    filters?: SearchFilters;

    /**
     * Maximum number of results.
     */
    limit?: number;

    /**
     * Query timestamp.
     */
    createdAt: number;

}
