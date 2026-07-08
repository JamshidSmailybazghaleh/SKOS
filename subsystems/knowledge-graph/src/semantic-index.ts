/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Graph
 * Module    : Semantic Index
 *
 * Build     : BUILD-000171
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import {
    KnowledgeAssetId
} from "../../knowledge-vault/src/knowledge-asset";

/**
 * Semantic concept.
 */
export interface SemanticConcept {

    /**
     * Stable concept identifier.
     */
    id: string;

    /**
     * Concept label.
     */
    label: string;

    /**
     * Optional description.
     */
    description?: string;

    /**
     * Related assets.
     */
    assetIds: KnowledgeAssetId[];

    /**
     * Optional keywords.
     */
    keywords: string[];

    /**
     * Creation timestamp.
     */
    createdAt: number;

}

/**
 * Semantic Index.
 */
export class SemanticIndex {

    private readonly concepts =
        new Map<string, SemanticConcept>();

    /**
     * Register one concept.
     */
    public register(
        concept: SemanticConcept
    ): void {

        this.concepts.set(
            concept.id,
            concept
        );

    }

    /**
     * Return one concept.
     */
    public get(
        id: string
    ): SemanticConcept | undefined {

        return this.concepts.get(id);

    }

    /**
     * List all concepts.
     */
    public list(): SemanticConcept[] {

        return Array.from(
            this.concepts.values()
        );

    }

    /**
     * Search by keyword.
     */
    public search(
        keyword: string
    ): SemanticConcept[] {

        const normalized =
            keyword.toLowerCase();

        return this.list().filter(

            concept =>

                concept.label
                    .toLowerCase()
                    .includes(normalized) ||

                concept.keywords.some(

                    item =>

                        item
                            .toLowerCase()
                            .includes(normalized)

                )

        );

    }

    /**
     * Remove one concept.
     */
    public remove(
        id: string
    ): boolean {

        return this.concepts.delete(id);

    }

}
