package com.smaily.skos.registry

import com.smaily.skos.model.asset.AssetCategory
import com.smaily.skos.model.asset.AssetType

/**
 * ---------------------------------------------------------
 * SKOS
 * Registry Query
 * ---------------------------------------------------------
 *
 * Represents a search request for Knowledge Registry.
 *
 * Immutable.
 * Technology independent.
 * ---------------------------------------------------------
 */
data class RegistryQuery(

    /**
     * Free text.
     */
    val text: String? = null,

    /**
     * Asset category.
     */
    val category: AssetCategory? = null,

    /**
     * Asset type.
     */
    val type: AssetType? = null,

    /**
     * User tags.
     */
    val tags: Set<String> = emptySet(),

    /**
     * Include inactive entries.
     */
    val includeInactive: Boolean = false,

    /**
     * Maximum results.
     */
    val limit: Int = 100,

    /**
     * Result offset.
     */
    val offset: Int = 0
) {

    /**
     * Returns true if query contains no filters.
     */
    fun isEmpty(): Boolean =
        text.isNullOrBlank() &&
        category == null &&
        type == null &&
        tags.isEmpty()
}
