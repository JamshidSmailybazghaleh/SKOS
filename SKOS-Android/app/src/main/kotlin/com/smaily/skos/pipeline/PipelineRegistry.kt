package com.smaily.skos.pipeline

import com.smaily.skos.core.types.ComponentId
import java.util.concurrent.ConcurrentHashMap

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * PipelineRegistry
 *
 * Central registry for all available pipelines.
 *
 * Responsibilities:
 * - Register pipelines
 * - Unregister pipelines
 * - Lookup pipelines
 * - List registered pipelines
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
class PipelineRegistry {

    /**
     * Registered pipelines.
     */
    private val pipelines =
        ConcurrentHashMap<ComponentId, Pipeline>()

    /**
     * Registers a pipeline.
     */
    fun register(
        id: ComponentId,
        pipeline: Pipeline
    ) {

        require(
            pipelines.putIfAbsent(id, pipeline) == null
        ) {
            "Pipeline [$id] already registered."
        }
    }

    /**
     * Removes a pipeline.
     */
    fun unregister(id: ComponentId) {
        pipelines.remove(id)
    }

    /**
     * Finds a pipeline.
     */
    fun find(id: ComponentId): Pipeline? =
        pipelines[id]

    /**
     * Returns all registered pipelines.
     */
    fun all(): Collection<Pipeline> =
        pipelines.values

    /**
     * Checks whether a pipeline exists.
     */
    fun contains(id: ComponentId): Boolean =
        pipelines.containsKey(id)

    /**
     * Clears the registry.
     */
    fun clear() {
        pipelines.clear()
    }

    /**
     * Number of registered pipelines.
     */
    fun size(): Int =
        pipelines.size
}
