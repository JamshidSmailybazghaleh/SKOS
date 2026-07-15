package com.smaily.skos.core.runtime

import com.smaily.skos.core.contracts.ComponentDescriptor
import com.smaily.skos.core.contracts.Engine
import com.smaily.skos.core.types.ComponentState


/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * AbstractEngine
 *
 * Base implementation for all executable SKOS engines.
 *
 * Responsibilities:
 * - Lifecycle management
 * - State transition control
 * - Execution template
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
abstract class AbstractEngine(

    final override val descriptor: ComponentDescriptor

) : Engine {


    /**
     * Current engine state.
     */
    protected var state: ComponentState =
        ComponentState.CREATED
        private set



    /**
     * Initializes engine.
     */
    final override fun initialize() {

        if (state != ComponentState.CREATED &&
            state != ComponentState.STOPPED) {

            return
        }

        changeState(
            ComponentState.INITIALIZED
        )

        onInitialize()
    }



    /**
     * Executes engine.
     */
    final override fun execute() {

        if (state != ComponentState.INITIALIZED &&
            state != ComponentState.STOPPED) {

            throw IllegalStateException(
                "Engine is not initialized."
            )
        }


        changeState(
            ComponentState.RUNNING
        )


        try {

            onExecute()

            changeState(
                ComponentState.COMPLETED
            )

        } catch (ex: Exception) {

            changeState(
                ComponentState.FAILED
            )

            throw ex
        }
    }



    /**
     * Stops engine.
     */
    final override fun stop() {

        changeState(
            ComponentState.STOPPED
        )

        onStop()
    }



    /**
     * Releases resources.
     */
    final override fun dispose() {

        changeState(
            ComponentState.DISPOSED
        )

        onDispose()
    }



    /**
     * Changes engine state.
     */
    protected fun changeState(
        newState: ComponentState
    ) {

        state = newState
    }



    /**
     * Initialization hook.
     */
    protected open fun onInitialize() {

    }



    /**
     * Execution hook.
     */
    protected abstract fun onExecute()



    /**
     * Stop hook.
     */
    protected open fun onStop() {

    }



    /**
     * Dispose hook.
     */
    protected open fun onDispose() {

    }
}
