/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Semantic Search
 * Module    : Semantic Search Engine
 *
 * Build     : BUILD-000189
 * Version   : 1.0.0
 * ==========================================================
 */

import { SearchQuery } from "./search-query";
import { SearchResult } from "./search-result";
import { RankingEngine } from "./ranking-engine";

export class SemanticSearchEngine {

    constructor(
        private readonly rankingEngine: RankingEngine
    ) {}

    /**
     * Execute semantic search.
     */
    public search(
        query: SearchQuery,
        candidates: readonly SearchResult[]
    ): SearchResult[] {

        /*
         * Version 1.0
         * Candidate retrieval is provided by the caller.
         * Future versions will retrieve candidates directly
         * from the Knowledge Graph and Knowledge Vault.
         */

        return this.rankingEngine.rank(
            query,
            candidates
        );

    }

}
