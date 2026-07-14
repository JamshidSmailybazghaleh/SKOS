package com.smaily.skos.model

import java.time.Instant

/**
 * ---------------------------------------------------------
 * SKOS - Smaily Knowledge Operating System
 * Asset Metadata
 * ---------------------------------------------------------
 *
 * Universal metadata model describing any digital asset.
 *
 * This model is intentionally independent from scanner,
 * registry, database and UI layers.
 *
 * Author : Jamshid Smaily Bazghaleh
 * Architecture : SKOS Professional Alpha
 * Version : 1.0.0
 * ---------------------------------------------------------
 */
data class AssetMetadata(

    /**
     * Absolute file path.
     */
    val path: String,

    /**
     * File name.
     */
    val fileName: String,

    /**
     * File extension.
     */
    val extension: String,

    /**
     * MIME type.
     */
    val mimeType: String? = null,

    /**
     * File size in bytes.
     */
    val size: Long,

    /**
     * SHA-256 fingerprint.
     */
    val sha256: String? = null,

    /**
     * Creation time.
     */
    val createdAt: Instant? = null,

    /**
     * Last modification time.
     */
    val modifiedAt: Instant? = null,

    /**
     * Last access time.
     */
    val lastAccessedAt: Instant? = null,

    /**
     * Whether the asset is hidden.
     */
    val hidden: Boolean = false,

    /**
     * Whether the asset is readable.
     */
    val readable: Boolean = true,

    /**
     * Whether the asset is writable.
     */
    val writable: Boolean = false,

    /**
     * Whether the asset is executable.
     */
    val executable: Boolean = false,

    /**
     * Optional owner.
     */
    val owner: String? = null,

    /**
     * Optional description.
     */
    val description: String? = null,

    /**
     * Optional user tags.
     */
    val tags: Set<String> = emptySet(),

    /**
     * Additional metadata.
     */
    val attributes: Map<String, String> = emptyMap()

) {

    /**
     * File name without extension.
     */
    val baseName: String
        get() = fileName.substringBeforeLast('.', fileName)

    /**
     * Returns true if fingerprint exists.
     */
    fun hasFingerprint(): Boolean =
        !sha256.isNullOrBlank()

    /**
     * Returns true if metadata contains tags.
     */
    fun hasTags(): Boolean =
        tags.isNotEmpty()

    /**
     * Returns true if metadata contains custom attributes.
     */
    fun hasAttributes(): Boolean =
        attributes.isNotEmpty()

    /**
     * Returns true if this asset can be processed.
     */
    fun isProcessable(): Boolean =
        readable && size >= 0
}
