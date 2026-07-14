package com.smaily.skos.core

import java.io.Serializable

/**
 * ---------------------------------------------------------
 * SKOS Professional
 * Kernel State
 * ---------------------------------------------------------
 * Represents the current runtime state of SKOS Kernel.
 * ---------------------------------------------------------
 */
enum class KernelState : Serializable {

    /**
     * Kernel has not been initialized.
     */
    CREATED,

    /**
     * Kernel is starting.
     */
    STARTING,

    /**
     * Kernel initialization completed.
     */
    INITIALIZED,

    /**
     * Engines are loading.
     */
    LOADING,

    /**
     * Kernel is fully operational.
     */
    RUNNING,

    /**
     * Kernel is temporarily paused.
     */
    PAUSED,

    /**
     * Shutdown process started.
     */
    STOPPING,

    /**
     * Kernel stopped successfully.
     */
    STOPPED,

    /**
     * Unexpected error occurred.
     */
    ERROR
}
