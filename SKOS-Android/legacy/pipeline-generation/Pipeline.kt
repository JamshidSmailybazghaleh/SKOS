package com.smaily.skos.pipeline

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * Pipeline Contract
 *
 * Defines the lifecycle contract for all SKOS pipelines.
 * Every pipeline implementation must follow this contract.
 * ------------------------------------------------------------------
 */
interface Pipeline {

    /**
     * Initializes the pipeline.
     */
    fun initialize()

    /**
     * Validates the pipeline before execution.
     */
    fun validate()

    /**
     * Executes the pipeline.
     */
    fun execute()

    /**
     * Stops the pipeline.
     */
    fun stop()

    /**
     * Resets the pipeline.
     */
    fun reset()

    /**
     * Releases all allocated resources.
     */
    fun dispose()
}
