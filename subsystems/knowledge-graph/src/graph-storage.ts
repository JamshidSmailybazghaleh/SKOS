/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Graph
 * Module    : Graph Storage
 *
 * Build     : BUILD-000185
 * Version   : 1.0.0
 * ==========================================================
 */

import { GraphNode } from "./graph-node";
import { GraphEdge } from "./graph-edge";

export class GraphStorage {

    private readonly nodes =
        new Map<string, GraphNode>();

    private readonly edges =
        new Map<string, GraphEdge>();

    /**
     * Add or update a node.
     */
    public addNode(node: GraphNode): void {

        this.nodes.set(node.id, node);

    }

    /**
     * Add or update an edge.
     */
    public addEdge(edge: GraphEdge): void {

        this.edges.set(edge.id, edge);

    }

    /**
     * Find a node by id.
     */
    public findNodeById(
        id: string
    ): GraphNode | undefined {

        return this.nodes.get(id);

    }

    /**
     * Find an edge by id.
     */
    public findEdgeById(
        id: string
    ): GraphEdge | undefined {

        return this.edges.get(id);

    }

    /**
     * Return all nodes.
     */
    public getNodes(): readonly GraphNode[] {

        return [...this.nodes.values()];

    }

    /**
     * Return all edges.
     */
    public getEdges(): readonly GraphEdge[] {

        return [...this.edges.values()];

    }

    /**
     * Number of nodes.
     */
    public nodeCount(): number {

        return this.nodes.size;

    }

    /**
     * Number of edges.
     */
    public edgeCount(): number {

        return this.edges.size;

    }

    /**
     * Remove all graph data.
     */
    public clear(): void {

        this.nodes.clear();

        this.edges.clear();

    }

}
