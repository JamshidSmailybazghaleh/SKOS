package com.smaily.skos.core.contracts

import com.smaily.skos.core.lifecycle.ComponentState

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * Component
 *
 * Root contract for every SKOS component.
 *
 * All engines, services and pipelines must implement this interface.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
interface Component {

    /**
     * Immutable component descriptor.
     */
    val descriptor: ComponentDescriptor

    /**
     * Current component state.
     */
    val state: ComponentState

    /**
     * Initializes the component.
     */
    fun initialize()

    /**
     * Validates the component.
     */
    fun validate()

    /**
     * Executes the component.
     */
    fun execute()

    /**
     * Stops the component.
     */
    fun stop()

    /**
     * Releases all allocated resources.
     */
    fun dispose()
}
