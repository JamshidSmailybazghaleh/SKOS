/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge
 * Module    : Relationship Engine
 *
 * Build     : BUILD-000108
 * Sprint    : Sprint 15
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import {
    KnowledgeGraph,
    KnowledgeEdge
} from "./knowledge-graph";

export class RelationshipEngine {

    constructor(

        private readonly graph: KnowledgeGraph

    ) {}

    /**
     * Create relationship.
     */
    public connect(

        edge: KnowledgeEdge

    ): void {

        this.graph.addEdge(edge);

    }

    /**
     * Return all relationships.
     */
    public getRelationships(): KnowledgeEdge[] {

        return this.graph.getEdges();

    }

    /**
     * Return all outgoing relationships
     * for one entity.
     */
    public getOutgoing(

        nodeId: string

    ): KnowledgeEdge[] {

        return this.graph

            .getEdges()

            .filter(

                edge =>

                    edge.source === nodeId

            );

    }

    /**
     * Return all incoming relationships
     * for one entity.
     */
    public getIncoming(

        nodeId: string

    ): KnowledgeEdge[] {

        return this.graph

            .getEdges()

            .filter(

                edge =>

                    edge.target === nodeId

            );

    }

}
