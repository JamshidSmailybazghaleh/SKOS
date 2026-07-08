/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Graph
 * Module    : Graph Edge
 *
 * Build     : BUILD-000171
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import {
    GraphNode
} from "./graph-node";

/**
 * Supported edge types.
 */
export enum GraphEdgeType {

    References = "references",

    Translates = "translates",

    DependsOn = "depends-on",

    Contains = "contains",

    BelongsTo = "belongs-to",

    RelatedTo = "related-to",

    AuthoredBy = "authored-by",

    TaggedWith = "tagged-with",

    WrittenIn = "written-in",

    MemberOf = "member-of"

}

/**
 * Graph Edge.
 */
export interface GraphEdge {

    /**
     * Stable edge identifier.
     */
    id: string;

    /**
     * Source node.
     */
    from: string;

    /**
     * Destination node.
     */
    to: string;

    /**
     * Edge type.
     */
    type: GraphEdgeType;

    /**
     * Relation weight.
     */
    weight: number;

    /**
     * Optional metadata.
     */
    metadata?: Record<string, unknown>;

    /**
     * Creation timestamp.
     */
    createdAt: number;

}

/**
 * Graph Edge Registry.
 */
export class GraphEdgeRegistry {

    private readonly edges: GraphEdge[] = [];

    /**
     * Register edge.
     */
    public register(
        edge: GraphEdge
    ): void {

        this.edges.push(edge);

    }

    /**
     * Return all edges.
     */
    public list(): GraphEdge[] {

        return [...this.edges];

    }

    /**
     * Return all outgoing edges.
     */
    public outgoing(
        node: GraphNode
    ): GraphEdge[] {

        return this.edges.filter(

            edge => edge.from === node.id

        );

    }

    /**
     * Return all incoming edges.
     */
    public incoming(
        node: GraphNode
    ): GraphEdge[] {

        return this.edges.filter(

            edge => edge.to === node.id

        );

    }

    /**
     * Remove edge.
     */
    public remove(
        edgeId: string
    ): boolean {

        const index = this.edges.findIndex(

            edge => edge.id === edgeId

        );

        if (index < 0) {

            return false;

        }

        this.edges.splice(index, 1);

        return true;

    }

}
