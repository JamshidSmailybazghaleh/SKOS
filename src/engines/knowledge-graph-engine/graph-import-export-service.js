/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Engine
 * File        : graph-import-export-service.js
 *
 * Build       : BUILD-000365
 * Version     : 1.0.0
 *
 * Mission:
 * Import and export Knowledge Graphs.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */

const fs = require("fs");
const path = require("path");

class GraphImportExportService {

    constructor(options = {}) {

        this.name =
            "Graph Import Export Service";

        this.version =
            "1.0.0";

        this.status =
            "CREATED";

        this.monitoring =
            options.monitoring || null;

        this.serializer =
            options.serializer || null;

    }

    initialize() {

        this.status =
            "INITIALIZED";

        this.recordEvent(
            "GRAPH_IMPORT_EXPORT_INITIALIZED"
        );

        return true;

    }

    exportGraph(
        graph,
        outputFile
    ) {

        if (!graph)
            throw new Error(
                "Graph is required."
            );

        if (!outputFile)
            throw new Error(
                "Output file is required."
            );

        const content =
            this.serializer
                ? this.serializer.serialize(graph)
                : JSON.stringify(
                      graph,
                      null,
                      2
                  );

        fs.writeFileSync(
            outputFile,
            content,
            "utf8"
        );

        this.recordEvent(
            "GRAPH_EXPORTED",
            {
                file:
                    outputFile,

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
            "graphsExported"
        );

        return outputFile;

    }

    importGraph(
        inputFile
    ) {

        if (!inputFile)
            throw new Error(
                "Input file is required."
            );

        if (
            !fs.existsSync(
                inputFile
            )
        ) {

            throw new Error(
                "File not found."
            );

        }

        const content =
            fs.readFileSync(
                inputFile,
                "utf8"
            );

        const graph =
            this.serializer
                ? this.serializer.deserialize(content)
                : JSON.parse(
                      content
                  );

        this.recordEvent(
            "GRAPH_IMPORTED",
            {
                file:
                    inputFile,

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
            "graphsImported"
        );

        return graph;

    }

    exportExists(
        file
    ) {

        return fs.existsSync(
            file
        );

    }

    getFileInformation(
        file
    ) {

        if (
            !fs.existsSync(
                file
            )
        ) {

            return null;

        }

        const stat =
            fs.statSync(
                file
            );

        return {

            fileName:
                path.basename(
                    file
                ),

            size:
                stat.size,

            created:
                stat.birthtime,

            modified:
                stat.mtime

        };

    }

    recordEvent(
        event,
        metadata = {}
    ) {

        if (
            this.monitoring
        ) {

            this.monitoring.recordEvent(
                event,
                metadata
            );

        }

    }

    updateMetric(
        metric
    ) {

        if (
            this.monitoring
        ) {

            this.monitoring.updateMetric(
                metric
            );

        }

    }

    shutdown() {

        this.status =
            "SHUTDOWN";

        this.recordEvent(
            "GRAPH_IMPORT_EXPORT_SHUTDOWN"
        );

        return true;

    }

}

module.exports =
    GraphImportExportService;
