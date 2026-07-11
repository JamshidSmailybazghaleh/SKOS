/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Semantic Search
 * Module    : Search Report
 *
 * Build     : BUILD-000189
 * Version   : 1.0.0
 * ==========================================================
 */

import { SearchQuery } from "./search-query";
import { SearchResult } from "./search-result";

export interface SearchReport {

    query: string;

    mode: string;

    scope: string;

    startedAt: Date;

    finishedAt: Date;

    durationMs: number;

    candidateCount: number;

    returnedCount: number;

    highestScore: number;

    averageScore: number;

}

export class SearchReportGenerator {

    /**
     * Generate search report.
     */
    public generate(
        query: SearchQuery,
        startedAt: Date,
        finishedAt: Date,
        candidates: readonly SearchResult[],
        results: readonly SearchResult[]
    ): SearchReport {

        const highestScore =
            results.length === 0
                ? 0
                : results[0].score;

        const averageScore =
            results.length === 0
                ? 0
                : results.reduce(
                    (sum, result) =>
                        sum + result.score,
                    0
                ) / results.length;

        return {

            query: query.text,

            mode: query.mode,

            scope: query.scope,

            startedAt,

            finishedAt,

            durationMs:
                finishedAt.getTime() -
                startedAt.getTime(),

            candidateCount:
                candidates.length,

            returnedCount:
                results.length,

            highestScore,

            averageScore

        };

    }

}
