/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Engine
 * File        : graph-cache-manager.js
 *
 * Build       : BUILD-000366
 * Version     : 1.0.0
 *
 * Mission:
 * Cache frequently accessed graph objects
 * to improve graph query performance.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */

class GraphCacheManager {

    constructor(options = {}) {

        this.name =
            "Graph Cache Manager";

        this.version =
            "1.0.0";

        this.status =
            "CREATED";

        this.monitoring =
            options.monitoring || null;

        this.maxEntries =
            options.maxEntries || 1000;

        this.cache =
            new Map();

    }

    initialize() {

        this.status =
            "INITIALIZED";

        this.recordEvent(
            "GRAPH_CACHE_INITIALIZED"
        );

        return true;

    }

    put(key, value) {

        if (
            key === undefined ||
            key === null
        ) {

            throw new Error(
                "Cache key is required."
            );

        }

        if (
            this.cache.has(key)
        ) {

            this.cache.delete(key);

        }

        this.cache.set(
            key,
            {
                value,
                timestamp:
                    new Date()
            }
        );

        while (
            this.cache.size >
            this.maxEntries
        ) {

            const oldestKey =
                this.cache.keys().next().value;

            this.cache.delete(
                oldestKey
            );

        }

        this.recordEvent(
            "GRAPH_CACHE_PUT",
            {
                key
            }
        );

        this.updateMetric(
            "cacheWrites"
        );

        return value;

    }

    get(key) {

        const entry =
            this.cache.get(key);

        if (!entry) {

            this.updateMetric(
                "cacheMisses"
            );

            this.recordEvent(
                "GRAPH_CACHE_MISS",
                {
                    key
                }
            );

            return null;

        }

        this.cache.delete(key);

        this.cache.set(
            key,
            entry
        );

        this.updateMetric(
            "cacheHits"
        );

        this.recordEvent(
            "GRAPH_CACHE_HIT",
            {
                key
            }
        );

        return entry.value;

    }

    has(key) {

        return this.cache.has(key);

    }

    remove(key) {

        const removed =
            this.cache.delete(key);

        if (removed) {

            this.recordEvent(
                "GRAPH_CACHE_REMOVED",
                {
                    key
                }
            );

            this.updateMetric(
                "cacheRemovals"
            );

        }

        return removed;

    }

    clear() {

        this.cache.clear();

        this.recordEvent(
            "GRAPH_CACHE_CLEARED"
        );

        this.updateMetric(
            "cacheClears"
        );

        return true;

    }

    size() {

        return this.cache.size;

    }

    keys() {

        return Array.from(
            this.cache.keys()
        );

    }

    statistics() {

        return {

            entries:
                this.cache.size,

            capacity:
                this.maxEntries,

            status:
                this.status,

            version:
                this.version

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

    updateMetric(metric) {

        if (
            this.monitoring
        ) {

            this.monitoring.updateMetric(
                metric
            );

        }

    }

    shutdown() {

        this.clear();

        this.status =
            "SHUTDOWN";

        this.recordEvent(
            "GRAPH_CACHE_SHUTDOWN"
        );

        return true;

    }

}

module.exports =
    GraphCacheManager;
