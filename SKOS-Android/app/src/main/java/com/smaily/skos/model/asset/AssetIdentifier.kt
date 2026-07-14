package com.smaily.skos.model.asset

import java.util.UUID

/**
 * ---------------------------------------------------------
 * SKOS
 * Asset Identifier
 * ---------------------------------------------------------
 *
 * Global unique identifier for every Knowledge Asset.
 *
 * Technology independent.
 * Immutable.
 *
 * ---------------------------------------------------------
 */
data class AssetIdentifier(

    /**
     * Global unique identifier.
     */
    val id: String = UUID.randomUUID().toString(),

    /**
     * Original source identifier.
     *
     * Examples:
     * Internal Storage
     * SD Card
     * Google Drive
     * GitHub
     */
    val sourceId: String,

    /**
     * Original asset path.
     */
    val sourcePath: String,

    /**
     * SHA-256 fingerprint.
     */
    val fingerprint: String? = null,

    /**
     * Asset version.
     */
    val version: Long = 1L

) {

    /**
     * Returns true if fingerprint exists.
     */
    fun hasFingerprint(): Boolean =
        !fingerprint.isNullOrBlank()

    /**
     * Returns true if this asset belongs
     * to a cloud provider.
     */
    fun isCloudAsset(): Boolean =
        sourceId.startsWith("cloud:")

    /**
     * Returns true if asset belongs
     * to local storage.
     */
    fun isLocalAsset(): Boolean =
        !isCloudAsset()
}
