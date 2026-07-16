package com.smaily.skos.pipeline

import com.smaily.skos.core.types.ComponentId

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * PipelineManager
 *
 * Executes registered pipelines.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
class PipelineManager(

    private val registry: PipelineRegistry

) {

    /**
     * Executes a pipeline.
     */
    fun execute(
        id: ComponentId
    ) {

        val pipeline =
            registry.find(id)
                ?: throw PipelineException(
                    "Pipeline [$id] not found."
                )

        pipeline.initialize()

        pipeline.execute()
    }

    /**
     * Stops a pipeline.
     */
    fun stop(
        id: ComponentId
    ) {

        registry.find(id)?.stop()
    }

    /**
     * Disposes a pipeline.
     */
    fun dispose(
        id: ComponentId
    ) {

        registry.find(id)?.dispose()
    }

    /**
     * Returns true if the pipeline exists.
     */
    fun exists(
        id: ComponentId
    ): Boolean =
        registry.contains(id)
}
