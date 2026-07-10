/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Graph
 * Module    : Knowledge Graph Runtime
 *
 * Build     : BUILD-000185
 * Version   : 1.0.0
 * ==========================================================
 */

import { VaultRecord } from "../../knowledge-vault/src/vault-record";
import { GraphStorage } from "./graph-storage";
import { GraphBuilder } from "./graph-builder";
import { GraphQueryEngine } from "./graph-query-engine";

export class KnowledgeGraphRuntime {

    private readonly storage = new GraphStorage();

    private readonly builder =
        new GraphBuilder(this.storage);

    private readonly queryEngine =
        new GraphQueryEngine(this.storage);

    /**
     * Build graph from vault records.
     */
    public build(
        records: readonly VaultRecord[]
    ): void {

        this.storage.clear();

        this.builder.build(records);

    }

    /**
     * Access query engine.
     */
    public query(): GraphQueryEngine {

        return this.queryEngine;

    }

    /**
     * Number of graph nodes.
     */
    public nodeCount(): number {

        return this.storage.nodeCount();

    }

    /**
     * Number of graph edges.
     */
    public edgeCount(): number {

        return this.storage.edgeCount();

    }

    /**
     * Clear graph.
     */
    public clear(): void {

        this.storage.clear();

    }

}
