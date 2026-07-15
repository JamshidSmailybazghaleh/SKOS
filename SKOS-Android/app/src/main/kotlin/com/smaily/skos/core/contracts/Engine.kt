package com.smaily.skos.core.contracts

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * Engine
 *
 * Root contract for all executable SKOS components.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
interface Engine {

    /**
     * Component metadata.
     */
    val descriptor: ComponentDescriptor

    /**
     * Executes engine logic.
     */
    fun execute()

    /**
     * Initializes engine.
     */
    fun initialize()

    /**
     * Stops engine execution.
     */
    fun stop()

    /**
     * Releases resources.
     */
    fun dispose()
}
