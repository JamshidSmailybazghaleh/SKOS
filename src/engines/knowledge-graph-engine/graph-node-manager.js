/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine     : Knowledge Graph Engine
 * Module     : Graph Node Manager
 *
 * File       : graph-node-manager.js
 * Build      : BUILD-000425
 * Version    : 2.0.0
 *
 * Mission:
 * Manage Knowledge Object Nodes
 *
 * Status:
 * Monitoring Integrated
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */

class GraphNodeManager {

    constructor(options = {}) {

        this.name =
            "Graph Node Manager";

        this.version =
            "2.0.0";

        this.status =
            "CREATED";

        this.monitoring =
            options.monitoring || null;

        this.nodes =
            new Map();

    }

    /**
     * ----------------------------------------------------------
     * Initialize
     * ----------------------------------------------------------
     */

    initialize() {

        this.status =
            "INITIALIZED";

        this.recordEvent(
            "GRAPH_NODE_MANAGER_INITIALIZED"
        );

        return true;

    }

    /**
     * ----------------------------------------------------------
     * Create Node
     * ----------------------------------------------------------
     */

    addNode(object) {

        if (!object || !object.id) {

            throw new Error(
                "Knowledge node requires a valid id."
            );

        }

        this.nodes.set(
            object.id,
            object
        );

        this.recordEvent(
            "GRAPH_NODE_CREATED",
            {
                id: object.id
            }
        );

        this.updateMetric(
            "graphNodesCreated"
        );

        return object;

    }

    /**
     * ----------------------------------------------------------
     * Read
     * ----------------------------------------------------------
     */

    getNode(id) {

        return (
            this.nodes.get(id)
            ||
            null
        );

    }

    getAllNodes() {

        return Array.from(
            this.nodes.values()
        );

    }

    /**
     * Alias for compatibility
     */

    getNodes() {

        return this.getAllNodes();

    }

    hasNode(id) {

        return this.nodes.has(id);

    }

    /**
     * ----------------------------------------------------------
     * Delete
     * ----------------------------------------------------------
     */

    removeNode(id) {

        const deleted =
            this.nodes.delete(id);

        if (deleted) {

            this.recordEvent(
                "GRAPH_NODE_REMOVED",
                {
                    id
                }
            );

            this.updateMetric(
                "graphNodesRemoved"
            );

        }

        return deleted;

    }

    clear() {

        this.nodes.clear();

        this.recordEvent(
            "GRAPH_NODES_CLEARED"
        );

    }

    /**
     * ----------------------------------------------------------
     * Statistics
     * ----------------------------------------------------------
     */

    count() {

        return this.nodes.size;

    }

    getStatus() {

        return {

            name:
                this.name,

            version:
                this.version,

            status:
                this.status,

            totalNodes:
                this.count()

        };

    }

    /**
     * ----------------------------------------------------------
     * Monitoring
     * ----------------------------------------------------------
     */

    recordEvent(
        name,
        metadata = {}
    ) {

        if (
            this.monitoring &&
            typeof this.monitoring.recordEvent === "function"
        ) {

            this.monitoring.recordEvent(
                name,
                metadata
            );

        }

    }

    updateMetric(metric) {

        if (
            this.monitoring &&
            typeof this.monitoring.updateMetric === "function"
        ) {

            this.monitoring.updateMetric(
                metric
            );

        }

    }

    /**
     * ----------------------------------------------------------
     * Shutdown
     * ----------------------------------------------------------
     */

    shutdown() {

        this.status =
            "SHUTDOWN";

        this.recordEvent(
            "GRAPH_NODE_MANAGER_SHUTDOWN"
        );

        return true;

    }

}

module.exports =
    GraphNodeManager;
