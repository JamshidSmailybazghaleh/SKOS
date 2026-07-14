package com.smaily.skos.registry

import com.smaily.skos.model.asset.AssetIdentifier
import com.smaily.skos.model.asset.KnowledgeAsset

/**
 * ---------------------------------------------------------
 * SKOS
 * Knowledge Registry
 * ---------------------------------------------------------
 *
 * Central registry for all Knowledge Assets.
 *
 * Coordinates validation, indexing, storage,
 * duplicate detection and retrieval.
 * ---------------------------------------------------------
 */
interface KnowledgeRegistry {

    /**
     * Registers a new Knowledge Asset.
     */
    fun register(asset: KnowledgeAsset): AssetIdentifier

    /**
     * Updates an existing asset.
     */
    fun update(asset: KnowledgeAsset)

    /**
     * Removes an asset.
     */
    fun remove(identifier: AssetIdentifier)

    /**
     * Finds an asset by identifier.
     */
    fun find(identifier: AssetIdentifier): KnowledgeAsset?

    /**
     * Returns true if asset exists.
     */
    fun exists(identifier: AssetIdentifier): Boolean

    /**
     * Total registered assets.
     */
    fun count(): Long

    /**
     * Returns all assets.
     */
    fun all(): Sequence<KnowledgeAsset>

    /**
     * Clears registry.
     */
    fun clear()
}
