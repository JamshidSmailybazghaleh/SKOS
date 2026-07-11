/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Semantic Search
 * Module    : Ranking Engine
 *
 * Build     : BUILD-000189
 * Version   : 1.0.0
 * ==========================================================
 */

import { SearchQuery } from "./search-query";
import { SearchResult } from "./search-result";

export class RankingEngine {

    /**
     * Rank search results.
     */
    public rank(
        query: SearchQuery,
        results: readonly SearchResult[]
    ): SearchResult[] {

        return results
            .filter(
                result =>
                    result.score >=
                    query.minimumScore
            )
            .sort(
                (a, b) =>
                    b.score - a.score
            )
            .slice(0, query.limit);

    }

}
