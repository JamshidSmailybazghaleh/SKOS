/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Vault
 * Module    : Version History
 *
 * Build     : BUILD-000170
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import {
    KnowledgeAssetId
} from "./knowledge-asset";

/**
 * Asset version entry.
 */
export interface AssetVersion {

    /**
     * Version identifier.
     */
    id: string;

    /**
     * Knowledge Asset identifier.
     */
    assetId: KnowledgeAssetId;

    /**
     * Version label.
     */
    version: string;

    /**
     * Change summary.
     */
    summary: string;

    /**
     * Author of the change.
     */
    author?: string;

    /**
     * Creation timestamp.
     */
    createdAt: number;

}

/**
 * Version History Manager.
 */
export class VersionHistory {

    private readonly history =
        new Map<KnowledgeAssetId, AssetVersion[]>();

    /**
     * Add a version entry.
     */
    public add(
        entry: AssetVersion
    ): void {

        const versions =
            this.history.get(entry.assetId) ?? [];

        versions.push(entry);

        this.history.set(
            entry.assetId,
            versions
        );

    }

    /**
     * Return all versions
     * of one asset.
     */
    public list(
        assetId: KnowledgeAssetId
    ): AssetVersion[] {

        return [

            ...(this.history.get(assetId) ?? [])

        ];

    }

    /**
     * Return latest version.
     */
    public latest(
        assetId: KnowledgeAssetId
    ): AssetVersion | undefined {

        const versions =
            this.history.get(assetId);

        if (!versions || versions.length === 0) {

            return undefined;

        }

        return versions[
            versions.length - 1
        ];

    }

    /**
     * Remove all history
     * of one asset.
     */
    public clear(
        assetId: KnowledgeAssetId
    ): boolean {

        return this.history.delete(assetId);

    }

}
