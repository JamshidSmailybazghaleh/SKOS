package com.smaily.skos.knowledge

import java.time.Instant
import java.util.UUID

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * KnowledgeRelation
 *
 * Represents a semantic relation between two knowledge nodes.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
data class KnowledgeRelation(

    /**
     * Unique relation identifier.
     */
    val id: String = UUID.randomUUID().toString(),

    /**
     * Source node identifier.
     */
    val sourceNodeId: String,

    /**
     * Target node identifier.
     */
    val targetNodeId: String,

    /**
     * Relation type.
     */
    val type: RelationType,

    /**
     * Optional metadata.
     */
    val metadata: Map<String, String> = emptyMap(),

    /**
     * Creation timestamp.
     */
    val createdAt: Instant = Instant.now()
)
