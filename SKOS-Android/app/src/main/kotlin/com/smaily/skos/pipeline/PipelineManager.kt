package com.smaily.skos.pipeline

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * PipelineManager
 *
 * Central registry and execution manager
 * for all pipelines.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
class PipelineManager {

    /**
     * Registered pipelines.
     */
    private val pipelines =
        linkedMapOf<String, Pipeline>()

    /**
     * Registers a pipeline.
     */
    fun register(
        name: String,
        pipeline: Pipeline
    ) {

        require(name.isNotBlank()) {
            "Pipeline name cannot be blank."
        }

        require(!pipelines.containsKey(name)) {
            "Pipeline [$name] is already registered."
        }

        pipelines[name] = pipeline
    }

    /**
     * Removes a pipeline.
     */
    fun unregister(name: String) {
        pipelines.remove(name)
    }

    /**
     * Returns a pipeline.
     */
    fun get(name: String): Pipeline? =
        pipelines[name]

    /**
     * Returns all registered pipelines.
     */
    fun all(): List<Pipeline> =
        pipelines.values.toList()

    /**
     * Returns true if pipeline exists.
     */
    fun contains(name: String): Boolean =
        pipelines.containsKey(name)

    /**
     * Number of registered pipelines.
     */
    fun size(): Int =
        pipelines.size

    /**
     * Clears registry.
     */
    fun clear() {
        pipelines.clear()
    }

    /**
     * Executes a pipeline.
     */
    fun execute(name: String) {

        val pipeline =
            pipelines[name]
                ?: throw PipelineException(
                    "Pipeline [$name] not found."
                )

        pipeline.start()
    }
}
