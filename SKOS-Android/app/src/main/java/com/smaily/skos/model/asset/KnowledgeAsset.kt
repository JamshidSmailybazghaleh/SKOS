package com.smaily.skos.model.asset

import java.time.Instant

/**
 * ---------------------------------------------------------
 * SKOS - Smaily Knowledge Operating System
 * Knowledge Asset
 * ---------------------------------------------------------
 *
 * Represents a registered knowledge asset inside SKOS.
 *
 * Independent from Scanner, Database, Android and UI.
 *
 * Author : Jamshid Smaily Bazghaleh
 * Architecture : SKOS Professional Alpha
 * Version : 1.0.0
 * ---------------------------------------------------------
 */
data class KnowledgeAsset(

    /**
     * Unique asset identifier.
     */
    val identifier: AssetIdentifier,

    /**
     * Asset metadata.
     */
    val metadata: AssetMetadata,

    /**
     * Asset category.
     */
    val category: AssetCategory,

    /**
     * Asset type.
     */
    val type: AssetType,

    /**
     * Human readable title.
     */
    val title: String,

    /**
     * Optional summary.
     */
    val summary: String? = null,

    /**
     * Optional keywords.
     */
    val keywords: Set<String> = emptySet(),

    /**
     * Creation timestamp.
     */
    val createdAt: Instant = Instant.now(),

    /**
     * Last update timestamp.
     */
    val updatedAt: Instant = Instant.now(),

    /**
     * User defined properties.
     */
    val properties: Map<String, String> = emptyMap()

) {

    /**
     * Returns true if this asset contains keywords.
     */
    fun hasKeywords(): Boolean =
        keywords.isNotEmpty()

    /**
     * Returns true if this asset contains properties.
     */
    fun hasProperties(): Boolean =
        properties.isNotEmpty()

    /**
     * Returns true if title exists.
     */
    fun hasTitle(): Boolean =
        title.isNotBlank()

    /**
     * Returns true if summary exists.
     */
    fun hasSummary(): Boolean =
        !summary.isNullOrBlank()
}
