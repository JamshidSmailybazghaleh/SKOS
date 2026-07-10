/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Engine
 * Module    : Knowledge Unit
 *
 * Build     : BUILD-000182
 * Version   : 1.0.0
 * ==========================================================
 */

import { TextDocument } from "../../content-intelligence/src/text-document";

/**
 * Types of extracted knowledge.
 */
export enum KnowledgeUnitType {

    Keyword = "keyword",

    Entity = "entity",

    Concept = "concept",

    Relation = "relation",

    Unknown = "unknown"

}

/**
 * Extracted knowledge unit.
 */
export interface KnowledgeUnit {

    /**
     * Unique identifier.
     */
    id: string;

    /**
     * Source document.
     */
    document: TextDocument;

    /**
     * Type of knowledge.
     */
    type: KnowledgeUnitType;

    /**
     * Extracted value.
     */
    value: string;

    /**
     * Character offset in source text.
     */
    startOffset: number;

    /**
     * End character offset.
     */
    endOffset: number;

    /**
     * Confidence score (0.0–1.0).
     */
    confidence: number;

    /**
     * Optional metadata.
     */
    metadata?: Record<string, unknown>;

}
