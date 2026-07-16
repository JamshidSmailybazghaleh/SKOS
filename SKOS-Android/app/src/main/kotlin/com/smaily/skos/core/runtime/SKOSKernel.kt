package com.smaily.skos.core.runtime

import com.smaily.skos.core.container.ServiceContainer
import java.util.concurrent.atomic.AtomicBoolean

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * SKOSKernel
 *
 * Central runtime kernel of SKOS.
 *
 * Responsibilities:
 * - System lifecycle
 * - Service initialization
 * - Runtime bootstrap
 * - Shutdown
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
object SKOSKernel {

    /**
     * Global service container.
     */
    val services = ServiceContainer()

    /**
     * Kernel state.
     */
    private val started =
        AtomicBoolean(false)

    /**
     * Starts the kernel.
     */
    fun start() {

        if (!started.compareAndSet(false, true))
            return

        initialize()
    }

    /**
     * Stops the kernel.
     */
    fun shutdown() {

        if (!started.compareAndSet(true, false))
            return

        services.clear()
    }

    /**
     * Indicates whether the kernel is running.
     */
    fun isRunning(): Boolean =
        started.get()

    /**
     * Internal initialization.
     */
    private fun initialize() {

        // Registration of services,
        // repositories,
        // parsers,
        // workflow engine
        // will be added here.
    }
}
