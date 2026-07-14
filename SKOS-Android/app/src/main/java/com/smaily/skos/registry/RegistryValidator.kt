package com.smaily.skos.registry

import com.smaily.skos.model.asset.KnowledgeAsset

/**
 * ---------------------------------------------------------
 * SKOS
 * Registry Validator
 * ---------------------------------------------------------
 *
 * Validates Knowledge Assets before registration.
 *
 * ---------------------------------------------------------
 */
interface RegistryValidator {

    /**
     * Validates a Knowledge Asset.
     *
     * Throws RegistryException if validation fails.
     */
    @Throws(RegistryException::class)
    fun validate(asset: KnowledgeAsset)

    /**
     * Returns true if asset is valid.
     */
    fun isValid(asset: KnowledgeAsset): Boolean
}
