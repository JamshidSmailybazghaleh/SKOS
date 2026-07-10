/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Graph
 * Module    : Graph Node
 *
 * Build     : BUILD-000185
 * Version   : 1.0.0
 * ==========================================================
 */

import { VaultRecord } from "../../knowledge-vault/src/vault-record";

/**
 * Supported graph node types.
 */
export enum GraphNodeType {

    Knowledge = "knowledge",

    Keyword = "keyword",

    Entity = "entity",

    Concept = "concept",

    Document = "document"

}

/**
 * Graph node.
 */
export interface GraphNode {

    /**
     * Unique node identifier.
     */
    id: string;

    /**
     * Node type.
     */
    type: GraphNodeType;

    /**
     * Source vault record.
     */
    record: VaultRecord;

    /**
     * Human-readable label.
     */
    label: string;

    /**
     * Optional description.
     */
    description?: string;

    /**
     * Node creation timestamp.
     */
    createdAt: Date;

    /**
     * Additional metadata.
     */
    metadata?: Record<string, unknown>;

}
