package com.smaily.skos.registry

import java.time.Instant

/**
 * ---------------------------------------------------------
 * SKOS
 * Registry Statistics
 * ---------------------------------------------------------
 *
 * Statistical summary of the Knowledge Registry.
 * ---------------------------------------------------------
 */
data class RegistryStatistics(

    /**
     * Total registered assets.
     */
    val totalAssets: Long = 0,

    /**
     * Active assets.
     */
    val activeAssets: Long = 0,

    /**
     * Inactive assets.
     */
    val inactiveAssets: Long = 0,

    /**
     * Duplicate assets.
     */
    val duplicateAssets: Long = 0,

    /**
     * Total relations.
     */
    val totalRelations: Long = 0,

    /**
     * Total registry versions.
     */
    val totalVersions: Long = 0,

    /**
     * Total storage size (bytes).
     */
    val totalStorageBytes: Long = 0,

    /**
     * Registry creation time.
     */
    val createdAt: Instant = Instant.now(),

    /**
     * Last update time.
     */
    val updatedAt: Instant = Instant.now()

) {

    /**
     * Returns true if registry is empty.
     */
    fun isEmpty(): Boolean =
        totalAssets == 0L

    /**
     * Returns duplicate percentage.
     */
    fun duplicatePercentage(): Double {

        if (totalAssets == 0L)
            return 0.0

        return duplicateAssets.toDouble() * 100.0 /
                totalAssets.toDouble()
    }

    /**
     * Returns active percentage.
     */
    fun activePercentage(): Double {

        if (totalAssets == 0L)
            return 0.0

        return activeAssets.toDouble() * 100.0 /
                totalAssets.toDouble()
    }
}
