package com.smaily.skos.common

import java.io.Serializable
import java.time.Instant
import java.util.UUID

/**
 * ---------------------------------------------------------
 * SKOS Professional
 * Runtime Context
 * ---------------------------------------------------------
 * Global runtime information shared across the platform.
 * ---------------------------------------------------------
 */
data class RuntimeContext(

    /**
     * Runtime session identifier.
     */
    val sessionId: String = UUID.randomUUID().toString(),

    /**
     * System startup time.
     */
    val startedAt: Instant = Instant.now(),

    /**
     * Last update timestamp.
     */
    var updatedAt: Instant = Instant.now(),

    /**
     * Current lifecycle state.
     */
    var lifecycleState: LifecycleState = LifecycleState.CREATED,

    /**
     * Current operational status.
     */
    var componentStatus: ComponentStatus = ComponentStatus.CREATED,

    /**
     * Active profile.
     */
    var profile: String = "DEFAULT",

    /**
     * Number of registered components.
     */
    var registeredComponents: Int = 0,

    /**
     * Number of active components.
     */
    var activeComponents: Int = 0,

    /**
     * Runtime message.
     */
    var message: String = "Runtime initialized."

) : Serializable {

    /**
     * Update lifecycle.
     */
    fun updateLifecycle(state: LifecycleState) {
        lifecycleState = state
        updatedAt = Instant.now()
    }

    /**
     * Update component status.
     */
    fun updateStatus(status: ComponentStatus) {
        componentStatus = status
        updatedAt = Instant.now()
    }

    /**
     * Register a component.
     */
    fun registerComponent() {
        registeredComponents++
        updatedAt = Instant.now()
    }

    /**
     * Activate a component.
     */
    fun activateComponent() {
        activeComponents++
        updatedAt = Instant.now()
    }

    /**
     * Deactivate a component.
     */
    fun deactivateComponent() {
        if (activeComponents > 0) {
            activeComponents--
        }
        updatedAt = Instant.now()
    }

    /**
     * Returns true if every registered component is active.
     */
    fun isHealthy(): Boolean {
        return registeredComponents > 0 &&
               registeredComponents == activeComponents &&
               componentStatus == ComponentStatus.RUNNING
    }

    /**
     * Returns uptime in milliseconds.
     */
    fun uptimeMillis(): Long {
        return Instant.now().toEpochMilli() -
               startedAt.toEpochMilli()
    }
}
