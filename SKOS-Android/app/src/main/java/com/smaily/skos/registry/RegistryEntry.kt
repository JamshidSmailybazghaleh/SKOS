package com.smaily.skos.registry

import com.smaily.skos.model.asset.AssetIdentifier
import com.smaily.skos.model.asset.KnowledgeAsset
import java.time.Instant

/**
 * ---------------------------------------------------------
 * SKOS
 * Registry Entry
 * ---------------------------------------------------------
 *
 * Represents one registered asset inside Registry.
 *
 * ---------------------------------------------------------
 */
data class RegistryEntry(

    /**
     * Asset Identifier.
     */
    val identifier: AssetIdentifier,

    /**
     * Registered Knowledge Asset.
     */
    val asset: KnowledgeAsset,

    /**
     * Registration timestamp.
     */
    val registeredAt: Instant = Instant.now(),

    /**
     * Last update timestamp.
     */
    val updatedAt: Instant = Instant.now(),

    /**
     * Registry version.
     */
    val registryVersion: Long = 1L,

    /**
     * Active flag.
     */
    val active: Boolean = true
) {

    /**
     * Returns true if this entry is active.
     */
    fun isActive(): Boolean = active

    /**
     * Returns true if this is the initial version.
     */
    fun isInitialVersion(): Boolean =
        registryVersion == 1L
}
