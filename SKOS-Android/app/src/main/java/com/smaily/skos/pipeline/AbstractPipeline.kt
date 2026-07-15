package com.smaily.skos.pipeline

import com.smaily.skos.common.Configuration
import com.smaily.skos.common.RuntimeContext
import com.smaily.skos.logging.LoggerService
import com.smaily.skos.statistics.PipelineStatistics

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * AbstractPipeline
 *
 * Base class for every pipeline implementation inside SKOS.
 *
 * Responsibilities:
 * - Lifecycle management
 * - Validation entry point
 * - Statistics collection
 * - Logging integration
 * - Common execution infrastructure
 *
 * Derived classes should only implement pipeline-specific behaviour.
 * ------------------------------------------------------------------
 */
abstract class AbstractPipeline(

    /**
     * Human readable pipeline name.
     */
    val name: String,

    /**
     * Immutable system configuration.
     */
    protected val configuration: Configuration,

    /**
     * Runtime execution context.
     */
    protected val runtimeContext: RuntimeContext,

    /**
     * Central logging service.
     */
    protected val logger: LoggerService,

    /**
     * Pipeline statistics collector.
     */
    protected val statistics: PipelineStatistics

) : Pipeline {

    /**
     * Pipeline creation timestamp.
     */
    protected val createdAt: Long = System.currentTimeMillis()

    /**
     * Last execution timestamp.
     */
    protected var lastExecutionTime: Long? = null

    /**
     * Current lifecycle state.
     */
    @Volatile
    private var state: PipelineState = PipelineState.CREATED

    init {
        logger.info(
            "Pipeline '$name' has been created."
        )
    }

    /**
     * Returns current lifecycle state.
     */
    val currentState: PipelineState
        get() = state

    /**
     * Returns true if pipeline is currently running.
     */
    fun isRunning(): Boolean =
        state == PipelineState.RUNNING

    /**
     * Returns true if pipeline completed successfully.
     */
    fun isCompleted(): Boolean =
        state == PipelineState.COMPLETED

    /**
     * Returns true if pipeline execution failed.
     */
    fun hasFailed(): Boolean =
        state == PipelineState.FAILED

    /**
     * Changes pipeline lifecycle state.
     */
    protected fun changeState(
        newState: PipelineState
    ) {

        logger.info(
            "Pipeline [$name] : $state -> $newState"
        )

        state = newState
    }

}
