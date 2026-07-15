package com.smaily.skos.engine

import com.smaily.skos.common.ComponentType
import com.smaily.skos.common.Configuration
import com.smaily.skos.common.RuntimeContext

/**
 * ---------------------------------------------------------
 * SKOS Professional
 * Mission Engine
 * ---------------------------------------------------------
 * Coordinates execution missions and workflows.
 * ---------------------------------------------------------
 */
class MissionEngine(

    configuration: Configuration,
    runtime: RuntimeContext

) : AbstractEngine(

    name = "Mission Engine",
    type = ComponentType.MISSION,
    configuration = configuration,
    runtime = runtime

) {

    override val priority: Int
        get() = 10

    override val supportsParallelExecution: Boolean
        get() = false

    override fun validate(): Boolean {
        return true
    }

    override fun onInitialize() {
        // Initialize mission resources
    }

    override fun onStart() {
        // Prepare mission execution
    }

    override fun onExecute() {
        // Execute mission workflow
    }

    override fun onStop() {
        // Stop mission execution
    }

    override fun onShutdown() {
        // Release mission resources
    }

    override fun onReset() {
        // Reset internal state
    }
}
