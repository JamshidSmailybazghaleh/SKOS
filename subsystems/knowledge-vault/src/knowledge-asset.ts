/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Vault
 * Module    : Knowledge Asset
 *
 * Build     : BUILD-000170
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import {
    ContentLanguage,
    ContentType,
    PublicationStatus
} from "../../content-intelligence/src/content-type";

/**
 * Knowledge Asset identifier.
 */
export type KnowledgeAssetId = string;

/**
 * One physical file belonging
 * to a Knowledge Asset.
 */
export interface AssetFile {

    /**
     * File identifier.
     */
    id: string;

    /**
     * Original file name.
     */
    name: string;

    /**
     * File location.
     */
    path: string;

    /**
     * File size.
     */
    size: number;

    /**
     * SHA-256 hash.
     */
    hash?: string;

    /**
     * Content type.
     */
    type: ContentType;

    /**
     * Language.
     */
    language: ContentLanguage;

}

/**
 * Knowledge Asset.
 */
export interface KnowledgeAsset {

    /**
     * Stable identifier.
     */
    id: KnowledgeAssetId;

    /**
     * Display title.
     */
    title: string;

    /**
     * Optional subtitle.
     */
    subtitle?: string;

    /**
     * Author.
     */
    author?: string;

    /**
     * Primary language.
     */
    primaryLanguage: ContentLanguage;

    /**
     * Publication status.
     */
    publicationStatus: PublicationStatus;

    /**
     * Asset tags.
     */
    tags: string[];

    /**
     * Related physical files.
     */
    files: AssetFile[];

    /**
     * Creation time.
     */
    createdAt: number;

    /**
     * Last update time.
     */
    updatedAt: number;

}
