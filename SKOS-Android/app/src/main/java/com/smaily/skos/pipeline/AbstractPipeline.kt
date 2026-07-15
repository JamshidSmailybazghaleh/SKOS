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
     * Indicates whether the pipeline has been initialized.
     */
    @Volatile
    protected var initialized: Boolean = false

    /**
     * Indicates whether execution is currently in progress.
     */
    @Volatile
    protected var running: Boolean = false

    /**
     * Pipeline creation timestamp.
     */
    protected val createdAt: Long = System.currentTimeMillis()

    /**
     * Last execution timestamp.
     */
    protected var lastExecutionTime: Long? = null

    init {
        logger.info(
            "Pipeline '$name' has been created."
        )
    }
}

@Volatile
private var state: PipelineState = PipelineState.CREATED

fun state(): PipelineState = state

fun isRunning(): Boolean =
    state == PipelineState.RUNNING

fun isCompleted(): Boolean =
    state == PipelineState.COMPLETED

fun hasFailed(): Boolean =
    state == PipelineState.FAILED

protected fun changeState(
    newState: PipelineState
) {
    logger.info(
        "Pipeline [$name] : $state -> $newState"
    )

    state = newState
}

