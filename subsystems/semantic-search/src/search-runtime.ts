/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Semantic Search
 * Module    : Search Runtime
 *
 * Build     : BUILD-000189
 * Version   : 1.0.0
 * ==========================================================
 */

import { SearchQuery } from "./search-query";
import { SearchResult } from "./search-result";
import { RankingEngine } from "./ranking-engine";
import { SemanticSearchEngine } from "./semantic-search-engine";
import {
    SearchReport,
    SearchReportGenerator
} from "./search-report";

export interface SearchRuntimeResult {

    report: SearchReport;

    results: readonly SearchResult[];

}

export class SearchRuntime {

    private readonly rankingEngine =
        new RankingEngine();

    private readonly searchEngine =
        new SemanticSearchEngine(
            this.rankingEngine
        );

    private readonly reportGenerator =
        new SearchReportGenerator();

    /**
     * Execute one search request.
     */
    public execute(
        query: SearchQuery,
        candidates: readonly SearchResult[]
    ): SearchRuntimeResult {

        const startedAt = new Date();

        const results =
            this.searchEngine.search(
                query,
                candidates
            );

        const finishedAt = new Date();

        const report =
            this.reportGenerator.generate(
                query,
                startedAt,
                finishedAt,
                candidates,
                results
            );

        return {

            report,

            results

        };

    }

}
