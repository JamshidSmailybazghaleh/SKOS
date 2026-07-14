package com.smaily.skos.core

import com.smaily.skos.bootstrap.BootstrapConfiguration
import java.io.Serializable
import java.time.Instant
import java.util.UUID

/**
 * ---------------------------------------------------------
 * SKOS Professional
 * Kernel Context
 * ---------------------------------------------------------
 * Shared runtime context for the SKOS Kernel.
 * ---------------------------------------------------------
 */
data class KernelContext(

    /**
     * Unique kernel session identifier.
     */
    val sessionId: String = UUID.randomUUID().toString(),

    /**
     * Bootstrap configuration.
     */
    val configuration: BootstrapConfiguration,

    /**
     * Lifecycle controller.
     */
    val lifecycle: KernelLifecycle = KernelLifecycle(),

    /**
     * Current kernel state.
     */
    var state: KernelState = KernelState.CREATED,

    /**
     * Kernel start time.
     */
    val createdAt: Instant = Instant.now(),

    /**
     * Last update time.
     */
    var updatedAt: Instant = Instant.now(),

    /**
     * Number of registered engines.
     */
    var registeredEngines: Int = 0,

    /**
     * Number of active engines.
     */
    var activeEngines: Int = 0,

    /**
     * Runtime message.
     */
    var message: String = "Kernel created."

) : Serializable {

    /**
     * Update kernel state.
     */
    fun updateState(
        newState: KernelState,
        message: String
    ) {
        state = newState
        updatedAt = Instant.now()
        this.message = message
    }

    /**
     * Register an engine.
     */
    fun registerEngine() {
        registeredEngines++
        updatedAt = Instant.now()
    }

    /**
     * Activate an engine.
     */
    fun activateEngine() {
        activeEngines++
        updatedAt = Instant.now()
    }

    /**
     * Deactivate an engine.
     */
    fun deactivateEngine() {
        if (activeEngines > 0) {
            activeEngines--
        }
        updatedAt = Instant.now()
    }

    /**
     * Returns true if kernel is operational.
     */
    fun isRunning(): Boolean {
        return state == KernelState.RUNNING
    }

    /**
     * Returns true if all registered engines are active.
     */
    fun allEnginesActive(): Boolean {
        return registeredEngines > 0 &&
               registeredEngines == activeEngines
    }
}
