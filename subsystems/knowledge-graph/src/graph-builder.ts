/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Graph
 * Module    : Graph Builder
 *
 * Build     : BUILD-000185
 * Version   : 1.0.0
 * ==========================================================
 */

import { VaultRecord } from "../../knowledge-vault/src/vault-record";
import { GraphNode, GraphNodeType } from "./graph-node";
import { GraphEdge, GraphEdgeType } from "./graph-edge";
import { GraphStorage } from "./graph-storage";

export class GraphBuilder {

    constructor(
        private readonly storage: GraphStorage
    ) {}

    /**
     * Build graph from vault records.
     */
    public build(
        records: readonly VaultRecord[]
    ): void {

        let previousNode: GraphNode | undefined;

        for (const record of records) {

            const node: GraphNode = {

                id: record.id,

                type: GraphNodeType.Knowledge,

                record,

                label: record.knowledge.value,

                createdAt: record.createdAt

            };

            this.storage.addNode(node);

            if (previousNode) {

                const edge: GraphEdge = {

                    id: `${previousNode.id}-${node.id}`,

                    sourceNodeId: previousNode.id,

                    targetNodeId: node.id,

                    type: GraphEdgeType.Related,

                    weight: 1.0,

                    createdAt: new Date()

                };

                this.storage.addEdge(edge);

            }

            previousNode = node;

        }

    }

}
