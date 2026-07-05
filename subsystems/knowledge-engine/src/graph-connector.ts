/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Engine
 * Module    : Graph Connector
 *
 * Build     : BUILD-000042
 * Sprint    : Sprint 03
 * Version   : 0.0.1
 *
 * Status    : Active
 * ==========================================================
 */

import {
    KnowledgeObject
} from "./knowledge-object-builder";

import {
    GraphEdge
} from "./knowledge-graph";

export class GraphConnector {

    /**
     * Create graph connections
     * between Knowledge Objects.
     */

    public connect(

        objects: KnowledgeObject[]

    ): GraphEdge[] {

        const edges: GraphEdge[] = [];

        for (let i = 0; i < objects.length; i++) {

            for (let j = i + 1; j < objects.length; j++) {

                edges.push({

                    source: objects[i].id,

                    target: objects[j].id,

                    label: "RELATED"

                });

            }

        }

        return edges;

    }

}
