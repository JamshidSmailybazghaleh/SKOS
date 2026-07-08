/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Vault
 * Module    : Knowledge Vault
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

import {
    AssetIndex
} from "./asset-index";

import {
    AssetRelations
} from "./asset-relations";

import {
    VersionHistory,
    AssetVersion
} from "./version-history";

/**
 * Knowledge Vault.
 *
 * Central repository of all
 * Knowledge Assets managed
 * by SKOS.
 */
export class KnowledgeVault {

    /**
     * Asset registry and search index.
     */
    private readonly index =
        new AssetIndex();

    /**
     * Asset relationship graph.
     */
    private readonly relations =
        new AssetRelations();

    /**
     * Version history manager.
     */
    private readonly versions =
        new VersionHistory();

    /**
     * Register a new Knowledge Asset.
     */
    public register(
        asset: KnowledgeAsset
    ): void {

        this.index.register(asset);

    }

    /**
     * Get one asset.
     */
    public get(
        assetId: KnowledgeAssetId
    ): KnowledgeAsset | undefined {

        return this.index.get(assetId);

    }

    /**
     * List all assets.
     */
    public list(): KnowledgeAsset[] {

        return this.index.list();

    }

    /**
     * Register a relation.
     */
    public addRelation(
        relation: Parameters<
            AssetRelations["add"]
        >[0]
    ): void {

        this.relations.add(relation);

    }

    /**
     * Add a version record.
     */
    public addVersion(
        version: AssetVersion
    ): void {

        this.versions.add(version);

    }

    /**
     * Return version history.
     */
    public getVersions(
        assetId: KnowledgeAssetId
    ): AssetVersion[] {

        return this.versions.list(assetId);

    }

    /**
     * Remove an asset from the index.
     *
     * Foundation implementation.
     * Future versions will support
     * Soft Delete and Audit Log.
     */
    public remove(
        assetId: KnowledgeAssetId
    ): boolean {

        return this.index.remove(assetId);

    }

}
