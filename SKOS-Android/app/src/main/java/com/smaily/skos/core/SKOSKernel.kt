package com.smaily.skos.core

import com.smaily.skos.bootstrap.BootstrapConfiguration
import java.time.Instant

/**
 * ---------------------------------------------------------
 * SKOS Professional
 * Core Kernel
 * ---------------------------------------------------------
 * Central coordinator of the SKOS platform.
 *
 * Responsibilities:
 * - System startup
 * - Engine registration
 * - Engine lifecycle
 * - Runtime state
 * ---------------------------------------------------------
 */
class SKOSKernel(

    private val configuration: BootstrapConfiguration

) {

    /**
     * Runtime context.
     */
    val context = KernelContext(
        configuration = configuration
    )

    /**
     * Registered engine names.
     */
    private val engines = mutableSetOf<String>()

    /**
     * Starts the kernel.
     */
    fun start() {

        context.lifecycle.start()
        context.updateState(
            KernelState.STARTING,
            "Kernel starting..."
        )

        context.lifecycle.initialize()
        context.updateState(
            KernelState.INITIALIZED,
            "Kernel initialized."
        )

        context.lifecycle.load()
        context.updateState(
            KernelState.LOADING,
            "Loading engines..."
        )

        context.lifecycle.run()
        context.updateState(
            KernelState.RUNNING,
            "Kernel running."
        )
    }

    /**
     * Registers an engine.
     */
    fun registerEngine(name: String) {

        if (engines.add(name)) {
            context.registerEngine()
        }
    }

    /**
     * Activates an engine.
     */
    fun activateEngine(name: String) {

        if (engines.contains(name)) {
            context.activateEngine()
        }
    }

    /**
     * Stops the kernel.
     */
    fun stop() {

        context.lifecycle.stop()
        context.updateState(
            KernelState.STOPPING,
            "Kernel stopping..."
        )

        context.lifecycle.shutdown()
        context.updateState(
            KernelState.STOPPED,
            "Kernel stopped."
        )
    }

    /**
     * Emergency shutdown.
     */
    fun fail(reason: String) {

        context.lifecycle.fail()

        context.updateState(
            KernelState.ERROR,
            reason
        )
    }

    /**
     * Runtime summary.
     */
    fun summary(): String {

        return buildString {

            appendLine("========== SKOS ==========")
            appendLine("State      : ${context.state}")
            appendLine("Session    : ${context.sessionId}")
            appendLine("Created    : ${context.createdAt}")
            appendLine("Updated    : ${Instant.now()}")
            appendLine("Registered : ${context.registeredEngines}")
            appendLine("Active     : ${context.activeEngines}")
            appendLine("Message    : ${context.message}")
            appendLine("==========================")
        }
    }
}
