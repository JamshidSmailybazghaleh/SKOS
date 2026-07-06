/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Build : BUILD-000110
 * Sprint: Sprint 15
 *
 * Knowledge Layer Integration Test
 * ==========================================================
 */

import { KnowledgeGraph } from "./knowledge-graph";
import { EntityManager } from "./entity-manager";
import { RelationshipEngine } from "./relationship-engine";
import { SemanticSearch } from "./semantic-search";

export class KnowledgeLayerIntegrationTest {

    public run(): boolean {

        const graph = new KnowledgeGraph();

        const entities = new EntityManager(graph);

        const relations = new RelationshipEngine(graph);

        const search = new SemanticSearch(graph);

        entities.create({

            id: "entity-001",

            label: "Artificial Intelligence",

            type: "Concept"

        });

        entities.create({

            id: "entity-002",

            label: "Knowledge Graph",

            type: "Concept"

        });

        relations.connect({

            id: "edge-001",

            source: "entity-001",

            target: "entity-002",

            relation: "uses"

        });

        const results = search.search("Knowledge");

        return (

            results.length === 1 &&

            results[0].id === "entity-002" &&

            relations.getRelationships().length === 1

        );

    }

}
