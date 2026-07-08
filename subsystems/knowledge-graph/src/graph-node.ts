/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Graph
 * Module    : Graph Node
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
 * Supported graph node types.
 */
export enum GraphNodeType {

    Asset = "asset",

    Author = "author",

    Topic = "topic",

    Language = "language",

    Tag = "tag",

    Collection = "collection",

    Project = "project",

    Organization = "organization",

    Person = "person"

}

/**
 * Graph node definition.
 */
export interface GraphNode {

    /**
     * Stable node identifier.
     */
    id: string;

    /**
     * Node type.
     */
    type: GraphNodeType;

    /**
     * Display label.
     */
    label: string;

    /**
     * Optional Knowledge Asset reference.
     */
    assetId?: KnowledgeAssetId;

    /**
     * Optional metadata.
     */
    metadata?: Record<string, unknown>;

    /**
     * Creation timestamp.
     */
    createdAt: number;

    /**
     * Last update timestamp.
     */
    updatedAt: number;

}

/**
 * Graph Node Registry.
 */
export class GraphNodeRegistry {

    private readonly nodes =
        new Map<string, GraphNode>();

    /**
     * Register one node.
     */
    public register(
        node: GraphNode
    ): void {

        this.nodes.set(
            node.id,
            node
        );

    }

    /**
     * Find one node.
     */
    public get(
        id: string
    ): GraphNode | undefined {

        return this.nodes.get(id);

    }

    /**
     * Return all nodes.
     */
    public list(): GraphNode[] {

        return Array.from(
            this.nodes.values()
        );

    }

    /**
     * Remove one node.
     */
    public remove(
        id: string
    ): boolean {

        return this.nodes.delete(id);

    }

}
