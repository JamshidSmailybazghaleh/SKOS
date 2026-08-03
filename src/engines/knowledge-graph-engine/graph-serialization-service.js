/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Engine
 * File        : graph-serialization-service.js
 *
 * Build       : BUILD-000364
 * Version     : 1.0.0
 *
 * Mission:
 * Serialize and deserialize Knowledge Graphs
 * between runtime objects and persistent formats.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */

class GraphSerializationService {

    constructor(options = {}) {

        this.name = "Graph Serialization Service";
        this.version = "1.0.0";
        this.status = "CREATED";

        this.monitoring =
            options.monitoring || null;
    }

    initialize() {

        this.status = "INITIALIZED";

        this.recordEvent(
            "GRAPH_SERIALIZATION_INITIALIZED"
        );

        return true;
    }

    serialize(graph) {

        if (!graph) {

            throw new Error(
                "Graph is required."
            );

        }

        const result = JSON.stringify(
            graph,
            null,
            2
        );

        this.recordEvent(
            "GRAPH_SERIALIZED",
            {
                nodes:
                    graph.nodes
                        ? graph.nodes.length
                        : 0,

                edges:
                    graph.edges
                        ? graph.edges.length
                        : 0
            }
        );

        this.updateMetric(
            "graphsSerialized"
        );

        return result;
    }

    deserialize(serializedGraph) {

        if (!serializedGraph) {

            throw new Error(
                "Serialized graph is required."
            );

        }

        const graph =
            JSON.parse(serializedGraph);

        this.recordEvent(
            "GRAPH_DESERIALIZED",
            {
                nodes:
                    graph.nodes
                        ? graph.nodes.length
                        : 0,

                edges:
                    graph.edges
                        ? graph.edges.length
                        : 0
            }
        );

        this.updateMetric(
            "graphsDeserialized"
        );

        return graph;
    }

    exportMetadata(graph) {

        return {

            exportedAt:
                new Date(),

            nodeCount:
                graph.nodes
                    ? graph.nodes.length
                    : 0,

            edgeCount:
                graph.edges
                    ? graph.edges.length
                    : 0,

            format:
                "JSON",

            version:
                this.version

        };
    }

    validate(serializedGraph) {

        try {

            JSON.parse(
                serializedGraph
            );

            return true;

        } catch {

            return false;

        }

    }

    recordEvent(
        event,
        metadata = {}
    ) {

        if (this.monitoring) {

            this.monitoring.recordEvent(
                event,
                metadata
            );

        }

    }

    updateMetric(metric) {

        if (this.monitoring) {

            this.monitoring.updateMetric(
                metric
            );

        }

    }

    shutdown() {

        this.status = "SHUTDOWN";

        this.recordEvent(
            "GRAPH_SERIALIZATION_SHUTDOWN"
        );

        return true;
    }

}

module.exports =
    GraphSerializationService;
