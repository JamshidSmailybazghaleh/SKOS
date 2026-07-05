/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Engine
 * Module    : Knowledge Graph
 *
 * Build     : BUILD-000041
 * Sprint    : Sprint 03
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import { KnowledgeObject } from "./knowledge-object-builder";

export interface GraphNode {

    id: string;

    label: string;

}

export interface GraphEdge {

    source: string;

    target: string;

    label: string;

}

export interface KnowledgeGraph {

    nodes: GraphNode[];

    edges: GraphEdge[];

}

export class KnowledgeGraphBuilder {

    public build(

        objects: KnowledgeObject[]

    ): KnowledgeGraph {

        const graph: KnowledgeGraph = {

            nodes: [],

            edges: []

        };

        for (const object of objects) {

            graph.nodes.push({

                id: object.id,

                label: object.id

            });

        }

        return graph;

    }

}
