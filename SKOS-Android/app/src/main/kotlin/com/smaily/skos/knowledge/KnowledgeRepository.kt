package com.smaily.skos.knowledge

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * KnowledgeRepository
 *
 * Contract for knowledge persistence.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
interface KnowledgeRepository {

    /**
     * Saves a node.
     */
    fun saveNode(
        node: KnowledgeNode
    )

    /**
     * Saves multiple nodes.
     */
    fun saveNodes(
        nodes: Collection<KnowledgeNode>
    )

    /**
     * Finds a node by identifier.
     */
    fun findNode(
        id: String
    ): KnowledgeNode?

    /**
     * Returns all nodes.
     */
    fun findAllNodes(): List<KnowledgeNode>

    /**
     * Deletes a node.
     */
    fun deleteNode(
        id: String
    )

    /**
     * Removes all stored knowledge.
     */
    fun clear()
}
