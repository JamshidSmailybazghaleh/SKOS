/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Graph
 * Module    : Graph Edge
 *
 * Build     : BUILD-000185
 * Version   : 1.0.0
 * ==========================================================
 */

export enum GraphEdgeType {

    Related = "related",

    Contains = "contains",

    References = "references",

    Parent = "parent",

    Child = "child",

    Similar = "similar"

}

export interface GraphEdge {

    /**
     * Unique edge identifier.
     */
    id: string;

    /**
     * Source node identifier.
     */
    sourceNodeId: string;

    /**
     * Target node identifier.
     */
    targetNodeId: string;

    /**
     * Relationship type.
     */
    type: GraphEdgeType;

    /**
     * Relationship strength (0.0–1.0).
     */
    weight: number;

    /**
     * Creation timestamp.
     */
    createdAt: Date;

    /**
     * Additional metadata.
     */
    metadata?: Record<string, unknown>;

}
