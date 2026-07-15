package com.smaily.skos.core.runtime

import com.smaily.skos.core.contracts.Component
import com.smaily.skos.core.contracts.ComponentDescriptor
import com.smaily.skos.core.lifecycle.ComponentState

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * AbstractComponent
 *
 * Base implementation for every SKOS component.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
abstract class AbstractComponent(

    final override val descriptor: ComponentDescriptor

) : Component {

    /**
     * Current lifecycle state.
     */
    final override var state: ComponentState =
        ComponentState.CREATED
        protected set

    /**
     * Initializes the component.
     */
    final override fun initialize() {

        check(state == ComponentState.CREATED) {
            "Component '${descriptor.name}' cannot be initialized from state $state."
        }

        onInitialize()

        state = ComponentState.INITIALIZED
    }

    /**
     * Validates the component.
     */
    final override fun validate() {

        check(state == ComponentState.INITIALIZED) {
            "Component '${descriptor.name}' must be initialized before validation."
        }

        onValidate()

        state = ComponentState.VALIDATED
    }

    /**
     * Executes the component.
     */
    final override fun execute() {

        check(state == ComponentState.VALIDATED) {
            "Component '${descriptor.name}' must be validated before execution."
        }

        state = ComponentState.RUNNING

        try {

            onExecute()

            state = ComponentState.COMPLETED

        } catch (ex: Exception) {

            state = ComponentState.FAILED

            throw ex
        }
    }

    /**
     * Stops the component.
     */
    final override fun stop() {

        onStop()

        state = ComponentState.STOPPED
    }

    /**
     * Releases allocated resources.
     */
    final override fun dispose() {

        onDispose()

        state = ComponentState.DISPOSED
    }

    /**
     * Initialization hook.
     */
    protected open fun onInitialize() {}

    /**
     * Validation hook.
     */
    protected open fun onValidate() {}

    /**
     * Execution hook.
     */
    protected abstract fun onExecute()

    /**
     * Stop hook.
     */
    protected open fun onStop() {}

    /**
     * Dispose hook.
     */
    protected open fun onDispose() {}
}
