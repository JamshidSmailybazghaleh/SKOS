/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Graph
 * Module    : Inference Engine
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

import {
    GraphEdge
} from "./graph-edge";

/**
 * Inference result.
 */
export interface InferenceResult {

    /**
     * Result identifier.
     */
    id: string;

    /**
     * Source node.
     */
    sourceNodeId: string;

    /**
     * Target node.
     */
    targetNodeId: string;

    /**
     * Explanation.
     */
    reason: string;

    /**
     * Confidence score.
     */
    confidence: number;

    /**
     * Creation timestamp.
     */
    createdAt: number;

}

/**
 * Inference Engine.
 */
export class InferenceEngine {

    /**
     * Execute inference.
     *
     * Foundation implementation.
     */
    public infer(

        nodes: GraphNode[],

        edges: GraphEdge[]

    ): InferenceResult[] {

        /**
         * Future versions will perform:
         *
         * - Semantic similarity
         * - Relationship expansion
         * - Path discovery
         * - Recommendation
         * - Rule evaluation
         */

        return [];

    }

    /**
     * Suggest related nodes.
     */
    public suggest(

        nodeId: string

    ): string[] {

        /**
         * Future implementation.
         */

        return [];

    }

}
