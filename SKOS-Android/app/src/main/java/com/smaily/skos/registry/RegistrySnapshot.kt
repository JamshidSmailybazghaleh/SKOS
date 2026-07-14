package com.smaily.skos.registry

import java.time.Instant

/**
 * ---------------------------------------------------------
 * SKOS
 * Registry Snapshot
 * ---------------------------------------------------------
 *
 * Immutable snapshot of the Knowledge Registry.
 *
 * Used for:
 * - Backup
 * - Restore
 * - Versioning
 * - Synchronization
 * - Migration
 * ---------------------------------------------------------
 */
data class RegistrySnapshot(

    /**
     * Snapshot unique identifier.
     */
    val snapshotId: String,

    /**
     * Snapshot creation time.
     */
    val createdAt: Instant = Instant.now(),

    /**
     * Registry version.
     */
    val registryVersion: Long,

    /**
     * Registry statistics.
     */
    val statistics: RegistryStatistics,

    /**
     * Registered entries.
     */
    val entries: List<RegistryEntry>

) {

    /**
     * Returns number of entries.
     */
    fun size(): Int = entries.size

    /**
     * Returns true if snapshot is empty.
     */
    fun isEmpty(): Boolean = entries.isEmpty()
}
