package com.smaily.skos.core

import java.io.Serializable
import java.time.Instant

/**
 * ---------------------------------------------------------
 * SKOS Professional
 * Kernel Lifecycle
 * ---------------------------------------------------------
 * Controls the lifecycle of the SKOS Kernel.
 * ---------------------------------------------------------
 */
class KernelLifecycle : Serializable {

    var state: KernelState = KernelState.CREATED
        private set

    var startedAt: Instant? = null
        private set

    var stoppedAt: Instant? = null
        private set

    /**
     * Start Kernel
     */
    fun start() {

        require(state == KernelState.CREATED ||
                state == KernelState.STOPPED) {
            "Kernel cannot start from state: $state"
        }

        state = KernelState.STARTING
        startedAt = Instant.now()
    }

    /**
     * Initialization completed.
     */
    fun initialize() {

        require(state == KernelState.STARTING) {
            "Kernel must be STARTING."
        }

        state = KernelState.INITIALIZED
    }

    /**
     * Load engines.
     */
    fun load() {

        require(state == KernelState.INITIALIZED) {
            "Kernel must be INITIALIZED."
        }

        state = KernelState.LOADING
    }

    /**
     * Kernel is ready.
     */
    fun run() {

        require(state == KernelState.LOADING) {
            "Kernel must be LOADING."
        }

        state = KernelState.RUNNING
    }

    /**
     * Pause execution.
     */
    fun pause() {

        require(state == KernelState.RUNNING) {
            "Kernel must be RUNNING."
        }

        state = KernelState.PAUSED
    }

    /**
     * Resume execution.
     */
    fun resume() {

        require(state == KernelState.PAUSED) {
            "Kernel must be PAUSED."
        }

        state = KernelState.RUNNING
    }

    /**
     * Stop Kernel.
     */
    fun stop() {

        require(
            state == KernelState.RUNNING ||
            state == KernelState.PAUSED
        ) {
            "Kernel must be RUNNING or PAUSED."
        }

        state = KernelState.STOPPING
    }

    /**
     * Shutdown completed.
     */
    fun shutdown() {

        require(state == KernelState.STOPPING) {
            "Kernel must be STOPPING."
        }

        state = KernelState.STOPPED
        stoppedAt = Instant.now()
    }

    /**
     * Enter error state.
     */
    fun fail() {
        state = KernelState.ERROR
    }

    /**
     * Check if Kernel is operational.
     */
    fun isRunning(): Boolean =
        state == KernelState.RUNNING
}
