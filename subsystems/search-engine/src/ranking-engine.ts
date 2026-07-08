/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Unified Search Engine
 * Module    : Ranking Engine
 *
 * Build     : BUILD-000172
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import {
    SearchResult
} from "./search-result";

/**
 * Ranking configuration.
 */
export interface RankingProfile {

    /**
     * Weight of semantic relevance.
     */
    semanticWeight: number;

    /**
     * Weight of textual relevance.
     */
    textWeight: number;

    /**
     * Weight of popularity.
     */
    popularityWeight: number;

    /**
     * Weight of quality.
     */
    qualityWeight: number;

}

/**
 * Ranking Engine.
 */
export class RankingEngine {

    /**
     * Default ranking profile.
     */
    private readonly profile: RankingProfile = {

        semanticWeight: 0.40,

        textWeight: 0.30,

        popularityWeight: 0.15,

        qualityWeight: 0.15

    };

    /**
     * Rank search results.
     */
    public rank(
        results: SearchResult[]
    ): SearchResult[] {

        return [...results].sort(

            (left, right) =>

                this.calculateScore(right) -

                this.calculateScore(left)

        );

    }

    /**
     * Calculate total score.
     *
     * Foundation implementation.
     */
    private calculateScore(
        result: SearchResult
    ): number {

        return result.score;

    }

    /**
     * Return ranking profile.
     */
    public getProfile(): RankingProfile {

        return this.profile;

    }

}
