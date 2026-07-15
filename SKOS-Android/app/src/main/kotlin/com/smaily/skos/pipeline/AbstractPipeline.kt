package com.smaily.skos.pipeline

import com.smaily.skos.common.Configuration
import com.smaily.skos.common.RuntimeContext
import com.smaily.skos.core.contracts.ComponentDescriptor
import com.smaily.skos.core.runtime.AbstractEngine
import com.smaily.skos.logging.LoggerService
import com.smaily.skos.statistics.PipelineStatistics

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * AbstractPipeline
 *
 * Base implementation for all SKOS pipelines.
 *
 * Responsibilities:
 * - Pipeline lifecycle
 * - Stage execution
 * - Statistics collection
 * - Logging integration
 * - Runtime context access
 * - Configuration access
 *
 * Derived classes should implement only
 * pipeline-specific behaviour.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
abstract class AbstractPipeline(

    descriptor: ComponentDescriptor,

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
     * Pipeline statistics.
     */
    protected val statistics: PipelineStatistics

) : AbstractEngine(descriptor), Pipeline {

    /**
     * Pipeline creation timestamp.
     */
    protected val createdAt: Long =
        System.currentTimeMillis()

    /**
     * Last execution timestamp.
     */
    protected var lastExecutionTime: Long? = null

    /**
     * Indicates whether execution has been cancelled.
     */
    @Volatile
    protected var cancelled: Boolean = false

    init {

        logger.info(
            "Pipeline '${descriptor.name}' created."
        )
    }
    /**
 * Internal pipeline execution.
 */
private fun executePipeline() {

        val started = System.currentTimeMillis()

        cancelled = false

        logger.info(
            "Pipeline '${descriptor.name}' execution started."
        )

        try {

            beforeExecution()

            while (!cancelled) {

    beforeStage()

    val continueExecution = executeStage()

    afterStage()

    if (!continueExecution) {
        break
    }
}

            afterExecution()

            val duration =
                System.currentTimeMillis() - started

            lastExecutionTime = duration

            statistics.recordSuccess(duration)

            logger.info(
                "Pipeline '${descriptor.name}' completed in ${duration} ms."
            )

        } catch (ex: Exception) {

            val duration =
                System.currentTimeMillis() - started

            lastExecutionTime = duration

            statistics.recordFailure(duration)

            logger.error(
                "Pipeline '${descriptor.name}' failed.",
                ex
            )

            throw ex
        }
    }

    /**
     * Resets the pipeline state.
     */
    final override fun reset() {

        cancelled = false

        lastExecutionTime = null

        statistics.reset()

        logger.info(
            "Pipeline '${descriptor.name}' has been reset."
        )
    }

    /**
     * Cancels the current execution.
     */
    final override fun cancel() {

        cancelled = true

        logger.warn(
            "Pipeline '${descriptor.name}' cancellation requested."
        )
    }
    /**
     * Executes the pipeline through the engine lifecycle.
     */
    final override fun onExecute() {
    executePipeline()
}

    /**
     * Called before pipeline execution starts.
     *
     * Derived classes may override this method.
     */
    protected open fun beforeExecution() {
        logger.debug(
            "Pipeline '${descriptor.name}' : beforeExecution()"
        )
    }

    /**
     * Called after pipeline execution completes.
     *
     * Derived classes may override this method.
     */
    protected open fun afterExecution() {
        logger.debug(
            "Pipeline '${descriptor.name}' : afterExecution()"
        )
    }

    /**
     * Called before each stage execution.
     *
     * Derived classes may override this method.
     */
    protected open fun beforeStage() {
        logger.debug(
            "Pipeline '${descriptor.name}' : beforeStage()"
        )
    }

    /**
     * Called after each stage execution.
     *
     * Derived classes may override this method.
     */
    protected open fun afterStage() {
        logger.debug(
            "Pipeline '${descriptor.name}' : afterStage()"
        )
    }

    /**
     * Executes a single pipeline stage.
     *
     * Returning:
     *  true  -> continue execution
     *  false -> pipeline finished
     */
    abstract override fun executeStage(): Boolean
}

    
    
