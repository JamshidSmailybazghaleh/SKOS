package com.smaily.skos.knowledge

import java.time.Instant
import java.util.UUID

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * KnowledgeNode
 *
 * Fundamental knowledge unit.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
data class KnowledgeNode(

    /**
     * Unique node identifier.
     */
    val id: String = UUID.randomUUID().toString(),

    /**
     * Node title.
     */
    val title: String,

    /**
     * Main textual content.
     */
    val content: String,

    /**
     * Node category.
     */
    val type: NodeType = NodeType.DOCUMENT,

    /**
     * User tags.
     */
    val tags: Set<String> = emptySet(),

    /**
     * Arbitrary metadata.
     */
    val metadata: Map<String, String> = emptyMap(),

    /**
     * Creation time.
     */
    val createdAt: Instant = Instant.now(),

    /**
     * Last modification time.
     */
    val updatedAt: Instant = Instant.now()
)
