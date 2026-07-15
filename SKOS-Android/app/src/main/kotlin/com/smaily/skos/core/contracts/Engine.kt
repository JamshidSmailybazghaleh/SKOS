package com.smaily.skos.core.contracts

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * Engine
 *
 * Base contract for every execution engine inside SKOS.
 *
 * An Engine is a specialized Component responsible for
 * coordinating and executing one or more workflows.
 *
 * Examples:
 * - Pipeline Engine
 * - Registry Engine
 * - Knowledge Engine
 * - Search Engine
 * - Publication Engine
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
interface Engine : Component {

    /**
     * Starts the engine.
     */
    fun start()

    /**
     * Indicates whether the engine is currently active.
     *
     * @return true if running; otherwise false.
     */
    fun isRunning(): Boolean

    /**
     * Returns the engine version.
     *
     * Normally this value is obtained from the descriptor.
     */
    fun version(): String =
        descriptor.version
}
