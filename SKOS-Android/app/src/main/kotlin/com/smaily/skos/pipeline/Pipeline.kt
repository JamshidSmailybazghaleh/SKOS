package com.smaily.skos.pipeline

import com.smaily.skos.core.contracts.Engine

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * Pipeline
 *
 * Root contract for every SKOS pipeline.
 *
 * Pipelines are specialized engines responsible for
 * processing ordered execution stages.
 *
 * Examples:
 * - ScanPipeline
 * - ImportPipeline
 * - IndexPipeline
 * - PublicationPipeline
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
interface Pipeline : Engine {

    /**
     * Returns the unique pipeline name.
     */
    val pipelineName: String

    /**
     * Executes a single processing stage.
     *
     * @return true if the stage completed successfully.
     */
    fun executeStage(): Boolean

    /**
     * Resets the pipeline state.
     */
    fun reset()

    /**
     * Cancels the current execution.
     */
    fun cancel()
}
