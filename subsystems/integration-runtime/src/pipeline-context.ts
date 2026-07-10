/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Integration Runtime
 * Module    : Pipeline Context
 *
 * Build     : BUILD-000186
 * Version   : 1.0.0
 * ==========================================================
 */

import { MetadataRecord } from "../../metadata-engine/src/metadata-record";
import { ContentRecord } from "../../content-engine/src/content-record";
import { KnowledgeUnit } from "../../knowledge-engine/src/knowledge-unit";
import { VaultRecord } from "../../knowledge-vault/src/vault-record";
import { GraphNode } from "../../knowledge-graph/src/graph-node";
import { GraphEdge } from "../../knowledge-graph/src/graph-edge";

export interface PipelineContext {

    /**
     * Current file path.
     */
    currentFile?: string;

    /**
     * Metadata extracted from the file.
     */
    metadata: MetadataRecord[];

    /**
     * Extracted content.
     */
    contents: ContentRecord[];

    /**
     * Knowledge units.
     */
    knowledgeUnits: KnowledgeUnit[];

    /**
     * Stored vault records.
     */
    vaultRecords: VaultRecord[];

    /**
     * Graph nodes.
     */
    graphNodes: GraphNode[];

    /**
     * Graph edges.
     */
    graphEdges: GraphEdge[];

    /**
     * Processing start time.
     */
    startedAt: Date;

    /**
     * Processing end time.
     */
    finishedAt?: Date;

    /**
     * Runtime warnings.
     */
    warnings: string[];

    /**
     * Runtime errors.
     */
    errors: string[];

}
