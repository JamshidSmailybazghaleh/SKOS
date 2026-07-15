package com.smaily.skos.core.runtime

import com.smaily.skos.core.contracts.ComponentDescriptor
import com.smaily.skos.core.contracts.Engine
import com.smaily.skos.core.lifecycle.ComponentState

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * AbstractEngine
 *
 * Base implementation for all SKOS engines.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
abstract class AbstractEngine(

    descriptor: ComponentDescriptor

) : AbstractComponent(descriptor), Engine {

    /**
     * Starts the engine.
     */
    final override fun start() {

        if (state == ComponentState.CREATED) {
            initialize()
        }

        if (state == ComponentState.INITIALIZED) {
            validate()
        }

        if (state == ComponentState.VALIDATED) {
            execute()
        }
    }

    /**
     * Returns true if the engine is currently running.
     */
    final override fun isRunning(): Boolean =
        state == ComponentState.RUNNING
}
