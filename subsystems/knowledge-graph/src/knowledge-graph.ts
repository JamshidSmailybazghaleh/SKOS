/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Graph
 * Module    : Knowledge Graph
 *
 * Build     : BUILD-000171
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import {
    GraphNode,
    GraphNodeRegistry
} from "./graph-node";

import {
    GraphEdge,
    GraphEdgeRegistry
} from "./graph-edge";

import {
    SemanticConcept,
    SemanticIndex
} from "./semantic-index";

import {
    InferenceEngine,
    InferenceResult
} from "./inference-engine";

/**
 * Knowledge Graph Engine.
 */
export class KnowledgeGraph {

    /**
     * Node registry.
     */
    private readonly nodes =
        new GraphNodeRegistry();

    /**
     * Edge registry.
     */
    private readonly edges =
        new GraphEdgeRegistry();

    /**
     * Semantic index.
     */
    private readonly semantic =
        new SemanticIndex();

    /**
     * Inference engine.
     */
    private readonly inference =
        new InferenceEngine();

    /**
     * Register a graph node.
     */
    public addNode(
        node: GraphNode
    ): void {

        this.nodes.register(node);

    }

    /**
     * Register a graph edge.
     */
    public addEdge(
        edge: GraphEdge
    ): void {

        this.edges.register(edge);

    }

    /**
     * Register a semantic concept.
     */
    public addConcept(
        concept: SemanticConcept
    ): void {

        this.semantic.register(concept);

    }

    /**
     * Execute inference.
     */
    public infer(): InferenceResult[] {

        return this.inference.infer(

            this.nodes.list(),

            this.edges.list()

        );

    }

    /**
     * Search semantic concepts.
     */
    public searchConcept(
        keyword: string
    ): SemanticConcept[] {

        return this.semantic.search(keyword);

    }

    /**
     * Return all nodes.
     */
    public listNodes(): GraphNode[] {

        return this.nodes.list();

    }

    /**
     * Return all edges.
     */
    public listEdges(): GraphEdge[] {

        return this.edges.list();

    }

}
