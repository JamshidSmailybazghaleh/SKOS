package com.smaily.skos.engine

import com.smaily.skos.common.Component

/**
 * ---------------------------------------------------------
 * SKOS Professional
 * Engine Contract
 * ---------------------------------------------------------
 * Base contract for every executable engine inside SKOS.
 * ---------------------------------------------------------
 */
interface Engine : Component {

    /**
     * Engine execution priority.
     */
    val priority: Int

    /**
     * Indicates whether this engine supports parallel execution.
     */
    val supportsParallelExecution: Boolean

    /**
     * Execute the engine.
     */
    fun execute()

    /**
     * Validate engine configuration before execution.
     *
     * @return true if validation succeeds.
     */
    fun validate(): Boolean

    /**
     * Reset engine internal state.
     */
    fun reset()
}
