package com.smaily.skos.engine

import com.smaily.skos.common.ComponentType
import com.smaily.skos.common.Configuration
import com.smaily.skos.common.RuntimeContext

/**
 * ---------------------------------------------------------
 * SKOS Professional
 * Processing Engine
 * ---------------------------------------------------------
 * Coordinates knowledge processing workflows.
 * ---------------------------------------------------------
 */
class ProcessingEngine(

    configuration: Configuration,
    runtime: RuntimeContext

) : AbstractEngine(

    name = "Processing Engine",
    type = ComponentType.PROCESSING,
    configuration = configuration,
    runtime = runtime

) {

    override val priority: Int
        get() = 40

    override val supportsParallelExecution: Boolean
        get() = true

    override fun validate(): Boolean = true

    override fun onInitialize() {
        // Initialize processing resources
    }

    override fun onStart() {
        // Prepare processing pipeline
    }

    override fun onExecute() {

        /*
         * Future implementation:
         *
         * KnowledgePipeline.execute()
         *
         * Parser
         * Builder
         * Deduplicator
         * Graph Builder
         *
         */

    }

    override fun onStop() {
        // Stop processing pipeline
    }

    override fun onShutdown() {
        // Release processing resources
    }

    override fun onReset() {
        // Reset processing state
    }
}
