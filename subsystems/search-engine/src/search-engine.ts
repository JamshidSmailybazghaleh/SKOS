/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Unified Search Engine
 * Module    : Search Engine
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

import {
    SearchResult,
    SearchResultSet
} from "./search-result";

import {
    RankingEngine
} from "./ranking-engine";

import {
    SearchHistory,
    SearchHistoryEntry
} from "./search-history";

/**
 * Unified Search Engine.
 */
export class SearchEngine {

    /**
     * Ranking engine.
     */
    private readonly ranking =
        new RankingEngine();

    /**
     * Search history.
     */
    private readonly history =
        new SearchHistory();

    /**
     * Execute a search.
     *
     * Foundation implementation.
     */
    public search(
        query: SearchQuery
    ): SearchResult[] {

        const results =
            new SearchResultSet();

        /**
         * Future integrations:
         *
         * - Knowledge Vault
         * - Knowledge Graph
         * - Semantic Index
         * - File Scanner
         * - Version History
         */

        const ranked =
            this.ranking.rank(
                results.list()
            );

        const historyEntry: SearchHistoryEntry = {

            id: crypto.randomUUID(),

            query,

            resultCount: ranked.length,

            executedAt: Date.now()

        };

        this.history.record(
            historyEntry
        );

        return ranked;

    }

    /**
     * Return search history.
     */
    public getHistory() {

        return this.history.list();

    }

    /**
     * Clear search history.
     */
    public clearHistory(): void {

        this.history.clear();

    }

}
