/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge
 * Module    : Knowledge Graph
 *
 * Build     : BUILD-000106
 * Sprint    : Sprint 15
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

export interface KnowledgeNode {

    id: string;

    label: string;

    type: string;

}

export interface KnowledgeEdge {

    id: string;

    source: string;

    target: string;

    relation: string;

}

export class KnowledgeGraph {

    private readonly nodes =
        new Map<string, KnowledgeNode>();

    private readonly edges =
        new Map<string, KnowledgeEdge>();

    /**
     * Register node.
     */
    public addNode(

        node: KnowledgeNode

    ): void {

        this.nodes.set(node.id, node);

    }

    /**
     * Register edge.
     */
    public addEdge(

        edge: KnowledgeEdge

    ): void {

        this.edges.set(edge.id, edge);

    }

    /**
     * Get node.
     */
    public getNode(

        id: string

    ): KnowledgeNode | undefined {

        return this.nodes.get(id);

    }

    /**
     * List nodes.
     */
    public getNodes(): KnowledgeNode[] {

        return Array.from(this.nodes.values());

    }

    /**
     * List edges.
     */
    public getEdges(): KnowledgeEdge[] {

        return Array.from(this.edges.values());

    }

}
