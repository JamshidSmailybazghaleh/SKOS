/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Graph
 * Module    : Graph Query Engine
 *
 * Build     : BUILD-000185
 * Version   : 1.0.0
 * ==========================================================
 */

import { GraphStorage } from "./graph-storage";
import { GraphNode } from "./graph-node";
import { GraphEdge } from "./graph-edge";

export class GraphQueryEngine {

    constructor(
        private readonly storage: GraphStorage
    ) {}

    /**
     * Find a node by id.
     */
    public findNodeById(
        id: string
    ): GraphNode | undefined {

        return this.storage.findNodeById(id);

    }

    /**
     * Find all outgoing edges.
     */
    public findOutgoingEdges(
        nodeId: string
    ): GraphEdge[] {

        return this.storage
            .getEdges()
            .filter(
                edge => edge.sourceNodeId === nodeId
            );

    }

    /**
     * Find all incoming edges.
     */
    public findIncomingEdges(
        nodeId: string
    ): GraphEdge[] {

        return this.storage
            .getEdges()
            .filter(
                edge => edge.targetNodeId === nodeId
            );

    }

    /**
     * Find neighboring nodes.
     */
    public findNeighbors(
        nodeId: string
    ): GraphNode[] {

        const edges =
            this.findOutgoingEdges(nodeId);

        return edges
            .map(edge =>
                this.storage.findNodeById(
                    edge.targetNodeId
                )
            )
            .filter(
                (node): node is GraphNode =>
                    node !== undefined
            );

    }

    /**
     * Return all graph nodes.
     */
    public getAllNodes(): readonly GraphNode[] {

        return this.storage.getNodes();

    }

    /**
     * Return all graph edges.
     */
    public getAllEdges(): readonly GraphEdge[] {

        return this.storage.getEdges();

    }

}
