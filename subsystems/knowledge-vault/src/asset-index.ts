/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Vault
 * Module    : Asset Index
 *
 * Build     : BUILD-000170
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import {
    KnowledgeAsset,
    KnowledgeAssetId
} from "./knowledge-asset";

/**
 * Search criteria.
 */
export interface AssetSearchCriteria {

    title?: string;

    author?: string;

    language?: string;

    tag?: string;

}

/**
 * Asset Index.
 */
export class AssetIndex {

    /**
     * Main asset registry.
     */
    private readonly assets =
        new Map<KnowledgeAssetId, KnowledgeAsset>();

    /**
     * Register one asset.
     */
    public register(
        asset: KnowledgeAsset
    ): void {

        this.assets.set(
            asset.id,
            asset
        );

    }

    /**
     * Find by identifier.
     */
    public get(
        id: KnowledgeAssetId
    ): KnowledgeAsset | undefined {

        return this.assets.get(id);

    }

    /**
     * Return all assets.
     */
    public list(): KnowledgeAsset[] {

        return Array.from(
            this.assets.values()
        );

    }

    /**
     * Remove one asset.
     */
    public remove(
        id: KnowledgeAssetId
    ): boolean {

        return this.assets.delete(id);

    }

    /**
     * Simple search.
     */
    public search(
        criteria: AssetSearchCriteria
    ): KnowledgeAsset[] {

        return this.list().filter(asset => {

            if (
                criteria.title &&
                !asset.title
                    .toLowerCase()
                    .includes(criteria.title.toLowerCase())
            ) {
                return false;
            }

            if (
                criteria.author &&
                asset.author &&
                !asset.author
                    .toLowerCase()
                    .includes(criteria.author.toLowerCase())
            ) {
                return false;
            }

            if (
                criteria.language &&
                asset.primaryLanguage !== criteria.language
            ) {
                return false;
            }

            if (
                criteria.tag &&
                !asset.tags.includes(criteria.tag)
            ) {
                return false;
            }

            return true;

        });

    }

}
