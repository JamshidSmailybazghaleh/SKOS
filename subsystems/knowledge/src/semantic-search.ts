/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge
 * Module    : Semantic Search
 *
 * Build     : BUILD-000109
 * Sprint    : Sprint 15
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import {
    KnowledgeGraph,
    KnowledgeNode
} from "./knowledge-graph";

export class SemanticSearch {

    constructor(

        private readonly graph: KnowledgeGraph

    ) {}

    /**
     * Search entities by label.
     */
    public search(

        query: string

    ): KnowledgeNode[] {

        const normalized =

            query.toLowerCase();

        return this.graph

            .getNodes()

            .filter(

                node =>

                    node.label

                        .toLowerCase()

                        .includes(normalized)

            );

    }

}
