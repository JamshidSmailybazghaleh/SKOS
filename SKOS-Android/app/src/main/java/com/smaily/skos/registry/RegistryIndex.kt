package com.smaily.skos.registry

import com.smaily.skos.model.asset.AssetCategory
import com.smaily.skos.model.asset.AssetIdentifier
import com.smaily.skos.model.asset.AssetType

/**
 * ---------------------------------------------------------
 * SKOS
 * Registry Index
 * ---------------------------------------------------------
 *
 * In-memory indexes for fast lookup.
 *
 * ---------------------------------------------------------
 */
data class RegistryIndex(

    /**
     * Index by Asset Identifier.
     */
    val identifierIndex: MutableMap<AssetIdentifier, RegistryEntry> = mutableMapOf(),

    /**
     * Index by Category.
     */
    val categoryIndex: MutableMap<AssetCategory, MutableSet<AssetIdentifier>> = mutableMapOf(),

    /**
     * Index by Type.
     */
    val typeIndex: MutableMap<AssetType, MutableSet<AssetIdentifier>> = mutableMapOf(),

    /**
     * Index by SHA-256 fingerprint.
     */
    val fingerprintIndex: MutableMap<String, MutableSet<AssetIdentifier>> = mutableMapOf(),

    /**
     * Index by Tag.
     */
    val tagIndex: MutableMap<String, MutableSet<AssetIdentifier>> = mutableMapOf()
)
