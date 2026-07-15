package com.smaily.skos.core.contracts

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * Service
 *
 * Base contract for every infrastructure service inside SKOS.
 *
 * Services provide shared capabilities used by engines
 * and other components.
 *
 * Examples:
 * - LoggerService
 * - ConfigurationService
 * - StatisticsService
 * - ValidationService
 * - MonitoringService
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
interface Service : Component {

    /**
     * Indicates whether the service is available.
     *
     * @return true if the service is operational.
     */
    fun isAvailable(): Boolean

    /**
     * Returns the service version.
     *
     * Normally this value is obtained from the descriptor.
     */
    fun version(): String =
        descriptor.version
}
