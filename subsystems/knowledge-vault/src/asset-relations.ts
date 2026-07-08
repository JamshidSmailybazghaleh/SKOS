/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Vault
 * Module    : Asset Relations
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
 * Supported relation types.
 */
export enum RelationType {

    Translation = "translation",

    Version = "version",

    Parent = "parent",

    Child = "child",

    Cover = "cover",

    Sample = "sample",

    Source = "source",

    Derived = "derived",

    Reference = "reference",

    Collection = "collection"

}

/**
 * Relation between two assets.
 */
export interface AssetRelation {

    /**
     * Stable relation identifier.
     */
    id: string;

    /**
     * Source asset.
     */
    fromAsset: KnowledgeAssetId;

    /**
     * Target asset.
     */
    toAsset: KnowledgeAssetId;

    /**
     * Relation type.
     */
    type: RelationType;

    /**
     * Optional description.
     */
    description?: string;

    /**
     * Creation timestamp.
     */
    createdAt: number;

}

/**
 * Asset Relations Manager.
 */
export class AssetRelations {

    private readonly relations: AssetRelation[] = [];

    /**
     * Register a relation.
     */
    public add(
        relation: AssetRelation
    ): void {

        this.relations.push(relation);

    }

    /**
     * Return all relations.
     */
    public list(): AssetRelation[] {

        return [...this.relations];

    }

    /**
     * Find relations for one asset.
     */
    public findByAsset(
        assetId: KnowledgeAssetId
    ): AssetRelation[] {

        return this.relations.filter(

            relation =>

                relation.fromAsset === assetId ||

                relation.toAsset === assetId

        );

    }

    /**
     * Remove one relation.
     */
    public remove(
        relationId: string
    ): boolean {

        const index = this.relations.findIndex(

            relation => relation.id === relationId

        );

        if (index < 0) {

            return false;

        }

        this.relations.splice(index, 1);

        return true;

    }

}
