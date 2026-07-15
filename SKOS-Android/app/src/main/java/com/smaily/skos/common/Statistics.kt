package com.smaily.skos.common

import java.io.Serializable
import java.time.Duration
import java.time.Instant

/**
 * ---------------------------------------------------------
 * SKOS Professional
 * Statistics
 * ---------------------------------------------------------
 * Global runtime statistics.
 * ---------------------------------------------------------
 */
data class Statistics(

    /**
     * System start time.
     */
    val startedAt: Instant = Instant.now(),

    /**
     * Last update.
     */
    var updatedAt: Instant = Instant.now(),

    /**
     * Registered components.
     */
    var registeredComponents: Int = 0,

    /**
     * Active components.
     */
    var activeComponents: Int = 0,

    /**
     * Total processed assets.
     */
    var processedAssets: Long = 0,

    /**
     * Total scanned files.
     */
    var scannedFiles: Long = 0,

    /**
     * Total detected directories.
     */
    var scannedDirectories: Long = 0,

    /**
     * Total errors.
     */
    var errorCount: Long = 0,

    /**
     * Total warnings.
     */
    var warningCount: Long = 0

) : Serializable {

    fun registerComponent() {
        registeredComponents++
        updatedAt = Instant.now()
    }

    fun activateComponent() {
        activeComponents++
        updatedAt = Instant.now()
    }

    fun deactivateComponent() {
        if (activeComponents > 0) {
            activeComponents--
        }
        updatedAt = Instant.now()
    }

    fun addProcessedAsset() {
        processedAssets++
        updatedAt = Instant.now()
    }

    fun addScannedFile() {
        scannedFiles++
        updatedAt = Instant.now()
    }

    fun addScannedDirectory() {
        scannedDirectories++
        updatedAt = Instant.now()
    }

    fun addWarning() {
        warningCount++
        updatedAt = Instant.now()
    }

    fun addError() {
        errorCount++
        updatedAt = Instant.now()
    }

    fun uptime(): Duration {
        return Duration.between(startedAt, Instant.now())
    }

    fun reset() {
        updatedAt = Instant.now()
        registeredComponents = 0
        activeComponents = 0
        processedAssets = 0
        scannedFiles = 0
        scannedDirectories = 0
        errorCount = 0
        warningCount = 0
    }
}
