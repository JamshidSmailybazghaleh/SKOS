package com.smaily.skos.registry

import com.smaily.skos.model.asset.KnowledgeAsset

/**
 * ---------------------------------------------------------
 * SKOS
 * Registry Filter
 * ---------------------------------------------------------
 *
 * Defines filtering rules for Knowledge Assets.
 *
 * Independent from storage engine.
 * ---------------------------------------------------------
 */
fun interface RegistryFilter {

    /**
     * Returns true if the asset satisfies the filter.
     */
    fun matches(asset: KnowledgeAsset): Boolean
}
