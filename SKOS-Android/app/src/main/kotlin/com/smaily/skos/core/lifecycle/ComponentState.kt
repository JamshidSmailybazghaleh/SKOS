package com.smaily.skos.core.lifecycle

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * ComponentState
 *
 * Defines the standard lifecycle states for every SKOS component.
 *
 * Every component inside SKOS must follow this lifecycle.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
enum class ComponentState {

    /**
     * Component has been created.
     */
    CREATED,

    /**
     * Component has been initialized.
     */
    INITIALIZED,

    /**
     * Component has passed validation.
     */
    VALIDATED,

    /**
     * Component is currently running.
     */
    RUNNING,

    /**
     * Component completed successfully.
     */
    COMPLETED,

    /**
     * Component has been stopped.
     */
    STOPPED,

    /**
     * Component has been disposed.
     */
    DISPOSED,

    /**
     * Component execution failed.
     */
    FAILED
}
