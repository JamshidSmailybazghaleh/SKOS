package com.smaily.skos.model.asset

import java.time.Instant

/**
 * ---------------------------------------------------------
 * SKOS - Smaily Knowledge Operating System
 * Asset Relation
 * ---------------------------------------------------------
 *
 * Represents a semantic relationship between two
 * Knowledge Assets.
 *
 * Independent from Database, Android and UI.
 *
 * Author : Jamshid Smaily Bazghaleh
 * Architecture : SKOS Professional Alpha
 * Version : 1.0.0
 * ---------------------------------------------------------
 */
data class AssetRelation(

    /**
     * Source asset.
     */
    val source: AssetIdentifier,

    /**
     * Target asset.
     */
    val target: AssetIdentifier,

    /**
     * Relation type.
     */
    val type: RelationType,

    /**
     * Optional confidence score (0.0 .. 1.0).
     */
    val confidence: Double = 1.0,

    /**
     * Optional description.
     */
    val description: String? = null,

    /**
     * Relation creation time.
     */
    val createdAt: Instant = Instant.now()

) {

    init {
        require(confidence in 0.0..1.0) {
            "Confidence must be between 0.0 and 1.0"
        }
    }

    /**
     * Returns true if relation is highly reliable.
     */
    fun isHighConfidence(): Boolean =
        confidence >= 0.90
}

/**
 * Semantic relationship types.
 */
enum class RelationType {

    UNKNOWN,

    /**
     * Parent → Child
     */
    PARENT_OF,

    CHILD_OF,

    /**
     * Part / Whole
     */
    PART_OF,

    CONTAINS,

    /**
     * Versioning
     */
    VERSION_OF,

    PREVIOUS_VERSION,

    NEXT_VERSION,

    /**
     * References
     */
    REFERENCES,

    REFERENCED_BY,

    CITES,

    CITED_BY,

    /**
     * Similarity
     */
    SIMILAR_TO,

    DUPLICATE_OF,

    DERIVED_FROM,

    /**
     * Translation
     */
    TRANSLATION_OF,

    /**
     * Dependency
     */
    DEPENDS_ON,

    REQUIRED_BY,

    /**
     * Knowledge Graph
     */
    RELATED_TO
}
