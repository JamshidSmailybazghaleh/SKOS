/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Learning Engine
 * Module    : Knowledge Evolution Engine
 *
 * Build     : BUILD-000060
 * Sprint    : Sprint 05
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import { LearningPattern } from "./pattern-detector";

export interface EvolutionSuggestion {

    id: string;

    description: string;

    priority: number;

}

export class KnowledgeEvolutionEngine {

    /**
     * Generate evolution suggestions from patterns.
     */
    public evolve(

        patterns: LearningPattern[]

    ): EvolutionSuggestion[] {

        return patterns.map(pattern => ({

            id: `EVOLVE-${pattern.id}`,

            description:
                `Review knowledge related to category "${pattern.category}"`,

            priority: pattern.occurrences

        }));

    }

}
