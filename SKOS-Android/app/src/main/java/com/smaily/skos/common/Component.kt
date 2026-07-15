package com.smaily.skos.common

/**
 * ---------------------------------------------------------
 * SKOS Professional
 * Component Contract
 * ---------------------------------------------------------
 * Base contract for every major component in SKOS.
 * ---------------------------------------------------------
 */
interface Component {

    /**
     * Unique component name.
     */
    val name: String

    /**
     * Component version.
     */
    val version: String

    /**
     * Component type.
     */
    val type: ComponentType

    /**
     * Current status.
     */
    val status: ComponentStatus

    /**
     * Initialize component resources.
     */
    fun initialize()

    /**
     * Start component.
     */
    fun start()

    /**
     * Stop component.
     */
    fun stop()

    /**
     * Shutdown component and release resources.
     */
    fun shutdown()

    /**
     * Health check.
     *
     * @return true if component is healthy.
     */
    fun healthCheck(): Boolean
}
