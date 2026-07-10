/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Vault
 * Module    : Vault Record
 *
 * Build     : BUILD-000184
 * Version   : 1.0.0
 * ==========================================================
 */

import { KnowledgeUnit } from "../../knowledge-engine/src/knowledge-unit";

/**
 * Validation status.
 */
export enum VaultRecordStatus {

    Pending = "pending",

    Verified = "verified",

    Rejected = "rejected",

    Archived = "archived"

}

/**
 * Persistent knowledge record.
 */
export interface VaultRecord {

    /**
     * Unique vault identifier.
     */
    id: string;

    /**
     * Stored knowledge.
     */
    knowledge: KnowledgeUnit;

    /**
     * Record version.
     */
    version: number;

    /**
     * Record creation time.
     */
    createdAt: Date;

    /**
     * Last update time.
     */
    updatedAt: Date;

    /**
     * Validation status.
     */
    status: VaultRecordStatus;

    /**
     * Optional source identifier.
     */
    sourceId?: string;

    /**
     * Optional tags.
     */
    tags?: string[];

    /**
     * Additional metadata.
     */
    metadata?: Record<string, unknown>;

}
