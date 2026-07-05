/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Engine
 * Module    : Graph Index
 *
 * Build     : BUILD-000043
 * Sprint    : Sprint 03
 * Version   : 0.0.1
 *
 * Status    : Active
 * ==========================================================
 */

import { GraphNode } from "./knowledge-graph";

export class GraphIndex {

    private readonly nodeIndex: Map<string, GraphNode>;

    constructor() {

        this.nodeIndex = new Map<string, GraphNode>();

    }

    /**
     * Add node to index
     */

    public add(node: GraphNode): void {

        this.nodeIndex.set(node.id, node);

    }

    /**
     * Find node by id
     */

    public find(id: string): GraphNode | undefined {

        return this.nodeIndex.get(id);

    }

    /**
     * Check existence
     */

    public has(id: string): boolean {

        return this.nodeIndex.has(id);

    }

    /**
     * Number of indexed nodes
     */

    public size(): number {

        return this.nodeIndex.size;

    }

    /**
     * Remove node
     */

    public remove(id: string): void {

        this.nodeIndex.delete(id);

    }

    /**
     * Clear index
     */

    public clear(): void {

        this.nodeIndex.clear();

    }

}
