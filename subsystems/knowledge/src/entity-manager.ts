/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge
 * Module    : Entity Manager
 *
 * Build     : BUILD-000107
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

export class EntityManager {

    constructor(

        private readonly graph: KnowledgeGraph

    ) {}

    /**
     * Create entity.
     */
    public create(

        node: KnowledgeNode

    ): void {

        this.graph.addNode(node);

    }

    /**
     * Retrieve entity.
     */
    public get(

        id: string

    ): KnowledgeNode | undefined {

        return this.graph.getNode(id);

    }

    /**
     * List all entities.
     */
    public getAll(): KnowledgeNode[] {

        return this.graph.getNodes();

    }

}
